import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heap-sort',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './heap-sort.component.html',
  styleUrl: './heap-sort.component.scss'
})
export class HeapSortComponent {
  title = 'Heap Sort Visualization';
  inputArray: string = '';    // User input as a string
  array: number[] = [];       // Parsed array of numbers
  sortedArray: number[] = []; // Result after sorting
  steps: string[] = [];       // Steps to visualize heap sort process

  // Start heap sort and initialize steps
  startHeapSort() {
    // Convert user input into a number array
    this.array = this.inputArray
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num));  // Ensure only valid numbers are parsed

    this.steps = [];  // Clear previous steps
    this.sortedArray = []; // Clear previous sorted array
    this.heapSort(this.array);  // Begin heap sort
  }

  // Heap Sort Algorithm with Visualization
  heapSort(arr: number[]) {
    const n = arr.length;

    // Step 1: Build a Max-Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(arr, n, i);
    }
    this.steps.push(`Max-Heap built: [${arr.join(', ')}]`);

    // Step 2: Extract elements one by one from the heap
    for (let i = n - 1; i > 0; i--) {
      // Move the current root to the end
      [arr[0], arr[i]] = [arr[i], arr[0]];
      this.sortedArray.unshift(arr[i]); // Add to sorted array
      this.steps.push(`Swapped root with last element: [${arr.slice(0, i).join(', ')}] | Sorted: [${this.sortedArray.join(', ')}]`);

      // Call heapify on the reduced heap
      this.heapify(arr, i, 0);
      this.steps.push(`Heapified array after extraction: [${arr.slice(0, i).join(', ')}]`);
    }

    // The last remaining element is also sorted
    this.sortedArray.unshift(arr[0]);
    this.steps.push(`Final sorted array: [${this.sortedArray.join(', ')}]`);
  }

  // Heapify a subtree rooted with node i, which is an index in arr[].
  // n is the size of the heap.
  heapify(arr: number[], n: number, i: number) {
    let largest = i;        // Initialize largest as root
    const left = 2 * i + 1;  // Left child index
    const right = 2 * i + 2; // Right child index

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // If right child is larger than the largest so far
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // If largest is not root, swap it with the largest and heapify
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      // Recursively heapify the affected subtree
      this.heapify(arr, n, largest);
    }
  }
}