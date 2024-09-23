import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss'
})
export class SortingComponent {
  title = 'Sorting Algorithms';
}
