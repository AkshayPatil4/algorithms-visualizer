import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-sort',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './quick-sort.component.html',
  styleUrl: './quick-sort.component.scss'
})
export class QuickSortComponent {
  title = 'Quick Sort Algorithm ';

  
  inputArray: string = '';  // User input as a string
  array: number[] = [];     // Array to sort
  steps: number[][] = [];   // Each step of the sorting process
  sorting: boolean = false; // Flag to indicate if sorting is in progress
  speed: number = 300;      // Speed of the sorting animation

  // Method to parse input and trigger the sorting process
  sortArray() {
    this.steps = [];
    this.array = this.inputArray
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num)); // Remove any invalid entries

    // Start Quick Sort
    this.quickSort(this.array.slice(), 0, this.array.length - 1);
    this.startVisualization();
  }

  // Quick Sort Algorithm with Steps Recorded
  quickSort(arr: number[], low: number, high: number): void {
    if (low < high) {
      const pivotIndex = this.partition(arr, low, high);
      this.quickSort(arr, low, pivotIndex - 1);
      this.quickSort(arr, pivotIndex + 1, high);
    }
  }

  partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        this.steps.push(arr.slice()); // Record each step of the array
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    this.steps.push(arr.slice()); // Record the final swap
    return i + 1;
  }

  // Start the visualization process
  startVisualization() {
    this.sorting = true;
    let index = 0;

    const interval = setInterval(() => {
      if (index < this.steps.length) {
        this.array = this.steps[index];
        index++;
      } else {
        clearInterval(interval);
        this.sorting = false;
      }
    }, this.speed); // Delay between steps
  }
}