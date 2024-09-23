import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-searching',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './searching.component.html',
  styleUrl: './searching.component.scss'
})
export class SearchingComponent {
  title = 'Searching Algorithms';
}
