import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Graph {
  [key: string]: string[]; // Adjacency list representation
}

@Component({
  selector: 'app-bfs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bfs.component.html',
  styleUrl: './bfs.component.scss'
})
export class BfsComponent {
  graphInput: string = ''; // User input for the graph (e.g., "A: B, C; B: D, E; C: F; D: ; E: ; F: ")
  graph: Graph = {}; // Parsed graph as adjacency list
  startNode: string = ''; // Starting node for BFS
  visited: string[] = []; // Visited nodes
  queue: string[] = []; // Queue for BFS traversal
  currentNode: string | null = null; // Current node being visited
  bfsComplete: boolean = false; // Flag to check if BFS is complete
  bfsSteps: string[] = []; // Steps of the BFS traversal

  // Initialize BFS with the graph and start node
  initializeBFS() {
    this.parseGraph(); // Parse the graph input into adjacency lists
    this.visited = [];
    this.queue = [this.startNode]; // Start with the start node in the queue
    this.currentNode = null;
    this.bfsComplete = false;
    this.bfsSteps = [];
    this.bfsSteps.push(`Starting BFS from node ${this.startNode}.`);
  }

  // Parse the graph input string into an adjacency list
  parseGraph() {
    this.graph = {};
    const edges = this.graphInput.split(';');
    edges.forEach(edge => {
      const [node, neighbors] = edge.split(':');
      const trimmedNode = node.trim();
      const trimmedNeighbors = neighbors ? neighbors.split(',').map(n => n.trim()) : [];
      this.graph[trimmedNode] = trimmedNeighbors;
    });
  }

  // Perform the next step of BFS
  nextStep() {
    if (this.queue.length > 0) {
      const node = this.queue.shift()!;
      if (!this.visited.includes(node)) {
        this.visited.push(node);
        this.currentNode = node;
        this.bfsSteps.push(`Visited node: ${node}`);

        // Add neighbors to the queue
        const neighbors = this.graph[node] || [];
        neighbors.forEach(neighbor => {
          if (!this.visited.includes(neighbor)) {
            this.queue.push(neighbor);
          }
        });
      }
    } else {
      this.bfsComplete = true;
      this.bfsSteps.push('BFS traversal complete.');
    }
  }

  // Reset the BFS traversal
  resetBFS() {
    this.graph = {};
    this.visited = [];
    this.queue = [];
    this.currentNode = null;
    this.bfsComplete = false;
    this.bfsSteps = [];
  }

  // Helper method to get graph keys
  getGraphKeys(): string[] {
    return Object.keys(this.graph);
  }
}