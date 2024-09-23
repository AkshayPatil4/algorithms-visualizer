import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Graph {
  [key: string]: { node: string, weight: number }[]; // Adjacency list representation with weights
}
@Component({
  selector: 'app-dijkstra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dijkstra.component.html',
  styleUrl: './dijkstra.component.scss'
})
export class DijkstraComponent {
  graphInput: string = ''; // User input for the graph (e.g., "A: B 5, C 3; B: D 1; C: D 7")
  graph: Graph = {}; // Parsed graph as adjacency list with weights
  startNode: string = ''; // Starting node for Dijkstra's algorithm
  distances: { [key: string]: number } = {}; // Distance from the start node to each node
  previous: { [key: string]: string | null } = {}; // Previous node to reconstruct the shortest path
  unvisited: string[] = []; // List of unvisited nodes
  visited: string[] = []; // List of visited nodes
  currentNode: string | null = null; // Current node being processed
  dijkstraComplete: boolean = false; // Flag to check if Dijkstra's algorithm is complete
  dijkstraSteps: string[] = []; // Steps of Dijkstra's algorithm

  // Initialize Dijkstra's Algorithm with the graph and start node
  initializeDijkstra() {
    this.parseGraph(); // Parse the graph input into adjacency lists with weights
    this.initializeDistances(); // Initialize distances to infinity for all nodes except the start node
    this.currentNode = this.startNode;
    this.unvisited = Object.keys(this.graph); // All nodes are initially unvisited
    this.dijkstraComplete = false;
    this.dijkstraSteps = [];
    this.dijkstraSteps.push(`Starting Dijkstra's algorithm from node ${this.startNode}.`);
  }

  // Parse the graph input string into an adjacency list with weights
  parseGraph() {
    this.graph = {};
    const edges = this.graphInput.split(';');

    edges.forEach(edge => {
      const [node, neighbors] = edge.split(':');
      const trimmedNode = node.trim();

      if (neighbors) {
        // Split the neighbors by ',' and process each neighbor
        const neighborList = neighbors.split(',').map(n => {
          const [neighbor, weight] = n.trim().split(/[ ]+/);
          return { node: neighbor, weight: parseInt(weight, 10) };
        });

        this.graph[trimmedNode] = neighborList;
      }
    });
  }

  // Initialize distances and previous nodes
  initializeDistances() {
    this.distances = {};
    this.previous = {};
    for (const node of Object.keys(this.graph)) {
      this.distances[node] = Infinity; // Initially set all distances to infinity
      this.previous[node] = null; // No previous node
    }
    this.distances[this.startNode] = 0; // Distance to start node is 0
  }

  // Perform the next step of Dijkstra's algorithm
  nextStep() {
    if (this.currentNode !== null) {
      const neighbors = this.graph[this.currentNode];

      // Iterate through all neighbors of the current node
      neighbors.forEach(neighbor => {
        if (!this.visited.includes(neighbor.node)) {
          const newDist = this.distances[this.currentNode!] + neighbor.weight;
          // If a shorter path is found, update the distance
          if (newDist < this.distances[neighbor.node]) {
            this.distances[neighbor.node] = newDist;
            this.previous[neighbor.node] = this.currentNode;
          }
        }
      });

      // Mark the current node as visited and remove it from unvisited
      this.visited.push(this.currentNode);
      this.unvisited = this.unvisited.filter(node => node !== this.currentNode);

      // Check if there are unvisited nodes left
      if (this.unvisited.length > 0) {
        // Find the next unvisited node with the smallest distance
        const nextNode = this.unvisited.reduce((minNode, node) =>
          this.distances[node] < this.distances[minNode] ? node : minNode,
          this.unvisited[0]
        );

        // Update the current node and add a step log
        this.currentNode = nextNode;
        this.dijkstraSteps.push(`Next node: ${this.currentNode} with distance ${this.distances[this.currentNode]}.`);
      } else {
        // If no unvisited nodes remain, complete the algorithm
        this.dijkstraComplete = true;
        this.dijkstraSteps.push("Dijkstra's algorithm complete.");
      }
    }
  }

  // Convert neighbors for display purposes
  getNeighborsForDisplay(node: string): string {
    const neighbors = this.graph[node];
    return neighbors
      ? neighbors.map(n => `${n.node} (${n.weight})`).join(', ')
      : '';
  }

  // Helper method to handle 'Infinity' display in the template
  displayDistance(node: string): string {
    const distance = this.distances[node];
    return distance === Infinity ? '∞' : distance.toString();
  }

  // Reset Dijkstra's algorithm
  resetDijkstra() {
    this.graph = {};
    this.distances = {};
    this.previous = {};
    this.unvisited = [];
    this.visited = [];
    this.currentNode = null;
    this.dijkstraComplete = false;
    this.dijkstraSteps = [];
  }

  // Helper method to get graph keys
  getGraphKeys(): string[] {
    return Object.keys(this.graph);
  }
}