import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, shareReplay, catchError } from 'rxjs/operators';
import { FruitTableViewModel } from 'src/app/fruit-challenge/components/fruit-table/fruit-table-view-model';
import { Fruit } from 'src/app/fruit-challenge/models/fruit';
import { FruitDialogComponent } from '../fruit-dialog/fruit-dialog';
import { MatDialog } from '@angular/material/dialog';

interface SortOption {
  name: string;
  value: 'name-asc' | 'name-desc' | 'carbs-asc' | 'carbs-desc';
}
export const NUTRITION_THRESHOLDS = {
  LOW_CALORIE: 50,
  HIGH_SUGAR: 8
} as const;

@Component({
  selector: 'app-fruit-table',
  templateUrl: './fruit-table.component.html',
  styleUrls: ['./fruit-table.component.scss'],
  providers: [FruitTableViewModel]
})
export class FruitTableComponent implements OnInit {
  columnsToDisplay = ['id', 'name', 'genus', 'calories', 'carbohydrates', 'sugar'];
  sortOptions: SortOption[] = [
    { name: 'Name Ascending', value: 'name-asc' },
    { name: 'Name Descending', value: 'name-desc' },
    { name: 'Carbohydrates Ascending', value: 'carbs-asc' },
    { name: 'Carbohydrates Descending', value: 'carbs-desc' }
  ];
  selectedSort: string = this.sortOptions[0].value;
  searchTerm = '';

  private searchTermSubject = new BehaviorSubject<string>('');
  private readonly sortSubject = new BehaviorSubject<string>(this.sortOptions[0].value);

  filteredFruitData$: Observable<Fruit[]> = combineLatest([
    this.viewModel.fruitData$,
    this.searchTermSubject.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ),
    this.sortSubject.asObservable()
  ]).pipe(
    map(([fruitList, searchTerm, sortValue]) => this.processData(fruitList, searchTerm, sortValue)),
    catchError(error => {
      console.error('Error processing fruit data:', error);
      return of([]); // Return empty array on error
    }),
    shareReplay(1) // Cache the latest result
  );


  private processData(fruitList: Fruit[], searchTerm: string, sortValue: string): Fruit[] {
    if (!fruitList?.length) return [];

    const filtered = this.filterFruits(fruitList, searchTerm);
    return this.sortFruits(filtered, sortValue);
  }

  private filterFruits(fruits: Fruit[], searchTerm: string): Fruit[] {
    if (!searchTerm?.trim()) return fruits;

    const normalizedTerm = searchTerm.toLowerCase().trim();
    return fruits.filter(fruit => this.matchesSearchTerm(fruit, normalizedTerm));
  }

  private matchesSearchTerm(fruit: Fruit, searchTerm: string): boolean {
    if (!fruit) return false;

    const searchableFields = [
      fruit.name,
      fruit.genus,
      fruit.family,
      fruit.order
    ];

    return searchableFields.some(field =>
      field?.toLowerCase().includes(searchTerm)
    );
  }

  private sortFruits(fruits: Fruit[], sortValue: string): Fruit[] {
    if (!sortValue) return fruits;

    return [...fruits].sort((a, b) => this.compareFunction(a, b, sortValue));
  }

  private compareFunction(a: Fruit, b: Fruit, sortValue: string): number {
    switch (sortValue) {
      case 'name-asc':
        return a.name?.localeCompare(b.name || '') || 0;
      case 'name-desc':
        return b.name?.localeCompare(a.name || '') || 0;
      case 'carbs-asc':
        return (a.nutritions?.carbohydrates || 0) - (b.nutritions?.carbohydrates || 0);
      case 'carbs-desc':
        return (b.nutritions?.carbohydrates || 0) - (a.nutritions?.carbohydrates || 0);
      default:
        return 0;
    }
  }

  constructor(public viewModel: FruitTableViewModel, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.selectedSort = this.sortOptions[0].value;
    this.sortSubject.next(this.selectedSort);
  }

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchTermSubject.next(searchTerm);
  }

  onSortChange(sortValue: string): void {
    this.selectedSort = sortValue;
    this.sortSubject.next(sortValue);
  }

  isLowCalorie(fruit: Fruit): boolean {
    return fruit?.nutritions?.calories <= NUTRITION_THRESHOLDS.LOW_CALORIE;
  }

  isHighSugar(fruit: Fruit): boolean {
    return (fruit?.nutritions?.calories <= NUTRITION_THRESHOLDS.LOW_CALORIE) &&
      (fruit?.nutritions?.sugar >= NUTRITION_THRESHOLDS.HIGH_SUGAR);
  }

  openFruitDialog(fruit: Fruit) {
    this.dialog.open(FruitDialogComponent, {
      maxWidth: '95vw',  // Prevents overflow on small screens
      maxHeight: '90vh', // Prevents vertical overflow
      data: fruit,
      panelClass: 'custom-dialog-container'
    });
  }
}
