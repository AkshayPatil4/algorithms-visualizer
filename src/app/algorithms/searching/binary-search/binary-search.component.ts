import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-binary-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './binary-search.component.html',
  styleUrl: './binary-search.component.scss'
})
export class BinarySearchComponent {
  inputArray: string = ''; // User input as a comma-separated string
  target: number | null = null; // Target number to search for
  array: number[] = []; // Parsed and sorted array of numbers
  low: number | null = null; // Low index
  high: number | null = null; // High index
  mid: number | null = null; // Mid index
  currentStep: string = ''; // Message for the current step
  searchComplete: boolean = false; // Flag to check if the search is complete
  searchResult: string = ''; // Final search result

  // Initialize the binary search with a sorted array
  initializeSearch() {
    this.array = this.inputArray
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num))
      .sort((a, b) => a - b); // Sort the array

    this.low = 0;
    this.high = this.array.length - 1;
    this.mid = null;
    this.searchComplete = false;
    this.searchResult = '';
    this.currentStep = 'Ready to start the search.';
  }

  // Move to the next step of binary search
  nextStep() {
    if (this.low !== null && this.high !== null && this.target !== null) {
      if (this.low <= this.high) {
        this.mid = Math.floor((this.low + this.high) / 2);

        // Update the current step message
        this.currentStep = `Lowest index: ${this.low}, Highest index: ${this.high}, mid index: ${this.mid}, Mid Value: ${this.array[this.mid!]}`;

        // Check if target is found
        if (this.array[this.mid] === this.target) {
          this.searchResult = `Target ${this.target} found at index ${this.mid}.`;
          this.searchComplete = true;
        } else if (this.array[this.mid] < this.target) {
          this.low = this.mid + 1; // Search in the right half
        } else {
          this.high = this.mid - 1; // Search in the left half
        }
      } else {
        this.searchResult = `Target ${this.target} not found.`;
        this.searchComplete = true;
      }
    }
  }

  // Reset the search to start over
  resetSearch() {
    this.low = null;
    this.high = null;
    this.mid = null;
    this.searchComplete = false;
    this.currentStep = '';
    this.searchResult = '';
    this.array = [];
  }
}