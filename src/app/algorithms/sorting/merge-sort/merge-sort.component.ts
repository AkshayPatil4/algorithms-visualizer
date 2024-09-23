import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-merge-sort',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './merge-sort.component.html',
  styleUrl: './merge-sort.component.scss'
})
export class MergeSortComponent {
  title = 'Merge Sort Visualization';
  inputArray: string = '';      // User input string
  array: number[] = [];         // Parsed array from user input
  sortedArray: number[] = [];   // Sorted result
  steps: string[] = [];         // Steps to visualize merge sort

  // Start merge sort and initialize the steps
  startMergeSort() {
    this.array = this.inputArray
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num));  // Ensure only valid numbers are parsed

    this.steps = [];  // Clear previous steps
    this.sortedArray = this.mergeSort(this.array);  // Begin the sorting process
  }

  // Merge Sort with visualization steps
  mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Add current state of splitting to steps
    this.steps.push(`Splitting: [${arr.join(', ')}] into [${left.join(', ')}] and [${right.join(', ')}]`);

    // Recursively sort the left and right halves
    const sortedLeft = this.mergeSort(left);
    const sortedRight = this.mergeSort(right);

    // Merge the sorted halves and log the merge step
    const merged = this.merge(sortedLeft, sortedRight);

    this.steps.push(`Merging: [${sortedLeft.join(', ')}] and [${sortedRight.join(', ')}] into [${merged.join(', ')}]`);

    return merged;
  }

  // Merge two sorted arrays into one sorted array
  merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    // Append any remaining elements from the left or right arrays
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
}