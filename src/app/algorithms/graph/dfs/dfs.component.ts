import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Graph {
  [key: string]: string[]; // Adjacency list representation
}
@Component({
  selector: 'app-dfs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dfs.component.html',
  styleUrl: './dfs.component.scss'
})
export class DfsComponent {
  graphInput: string = ''; // User input for the graph (e.g., "A: B, C; B: D, E; C: F; D: ; E: ; F: ")
  graph: Graph = {}; // Parsed graph as adjacency list
  startNode: string = ''; // Starting node for DFS
  visited: string[] = []; // Visited nodes
  stack: string[] = []; // Stack for DFS traversal
  currentNode: string | null = null; // Current node being visited
  dfsComplete: boolean = false; // Flag to check if DFS is complete
  dfsSteps: string[] = []; // Steps of the DFS traversal

  // Initialize DFS with the graph and start node
  initializeDFS() {
    this.parseGraph(); // Parse the graph input into adjacency lists
    this.visited = [];
    this.stack = [this.startNode]; // Start with the start node in the stack
    this.currentNode = null;
    this.dfsComplete = false;
    this.dfsSteps = [];
    this.dfsSteps.push(`Starting DFS from node ${this.startNode}.`);
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

  // Helper method to get graph keys
  getGraphKeys(): string[] {
    return Object.keys(this.graph);
  }

  // Perform the next step of DFS
  nextStep() {
    if (this.stack.length > 0) {
      const node = this.stack.pop()!;
      if (!this.visited.includes(node)) {
        this.visited.push(node);
        this.currentNode = node;
        this.dfsSteps.push(`Visited node: ${node}`);
        
        // Add neighbors to the stack in reverse order to maintain DFS behavior
        const neighbors = this.graph[node] || [];
        for (let i = neighbors.length - 1; i >= 0; i--) {
          const neighbor = neighbors[i];
          if (!this.visited.includes(neighbor)) {
            this.stack.push(neighbor);
          }
        }
      }
    } else {
      this.dfsComplete = true;
      this.dfsSteps.push('DFS traversal complete.');
    }
  }

  // Reset the DFS traversal
  resetDFS() {
    this.graph = {};
    this.visited = [];
    this.stack = [];
    this.currentNode = null;
    this.dfsComplete = false;
    this.dfsSteps = [];
  }
}