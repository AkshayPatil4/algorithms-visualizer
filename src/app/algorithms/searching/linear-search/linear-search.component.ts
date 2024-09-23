import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-linear-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './linear-search.component.html',
  styleUrl: './linear-search.component.scss'
})
export class LinearSearchComponent {
  inputArray: string = ''; // User input as a comma-separated string
  target: number | null = null; // Target number to search for
  array: number[] = []; // Parsed array of numbers
  currentIndex: number | null = null; // Index currently being checked
  currentStep: string = ''; // Message for the current step
  searchComplete: boolean = false; // Flag to check if the search is complete
  searchResult: string = ''; // Final search result

  // Initialize the search with the array
  initializeSearch() {
    this.array = this.inputArray
      .split(',')
      .map(num => parseFloat(num.trim()))
      .filter(num => !isNaN(num));

    this.currentIndex = 0;
    this.searchComplete = false;
    this.searchResult = '';
    this.currentStep = 'Ready to start the search.';
  }

  // Move to the next step of linear search
  nextStep() {
    // Ensure the index is within bounds and the target is provided
    if (this.currentIndex !== null && this.currentIndex < this.array.length && this.target !== null) {
      const value = this.array[this.currentIndex];
      
      // Update the current step message for the current index BEFORE incrementing
      this.currentStep = `Checking index ${this.currentIndex}: Value = ${value}`;

      // Check if the current value matches the target
      if (value === this.target) {
        this.searchResult = `Target ${this.target} found at index ${this.currentIndex}.`;
        this.searchComplete = true;
      } else {
        // Increment the index only AFTER the current index is displayed
        this.currentIndex += 1;
      }
    } else {
      this.searchResult = `Target ${this.target} not found.`;
      this.searchComplete = true;
    }
  }

  // Reset the search to start over
  resetSearch() {
    this.currentIndex = null;
    this.searchComplete = false;
    this.currentStep = '';
    this.searchResult = '';
    this.array = [];
  }
}