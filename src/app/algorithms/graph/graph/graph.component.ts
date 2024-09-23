import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent {
  title = 'Graph Algorithms';
}
