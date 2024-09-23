import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchingComponent } from './app/algorithms/searching/searching/searching.component';
import { GraphComponent } from './app/algorithms/graph/graph/graph.component'; 
import { NavbarComponent } from './app/navbar/navbar/navbar.component'; 
import { SortingComponent } from './app/algorithms/sorting/sorting/sorting.component';

const routes: Routes = [
  {
    path: 'sorting',
    component: SortingComponent,  // Parent component for sorting
    children: [
      {
        path: 'quick-sort',
        loadComponent: () => import('./app/algorithms/sorting/quick-sort/quick-sort.component').then((m) => m.QuickSortComponent),
      },
      {
        path: 'merge-sort',
        loadComponent: () => import('./app/algorithms/sorting/merge-sort/merge-sort.component').then((m) => m.MergeSortComponent),
      },
      {
        path: 'heap-sort',
        loadComponent: () => import('./app/algorithms/sorting/heap-sort/heap-sort.component').then((m) => m.HeapSortComponent),
      },
      {
        path: '',
        redirectTo: 'quick-sort',  // Redirect to quick-sort by default
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'searching',
    loadComponent: () => import('./app/algorithms/searching/searching/searching.component').then(m => m.SearchingComponent),
    children: [
      { path: 'binary-search', loadComponent: () => import('./app/algorithms/searching/binary-search/binary-search.component').then(m => m.BinarySearchComponent) },
      { path: 'linear-search', loadComponent: () => import('./app/algorithms/searching/linear-search/linear-search.component').then(m => m.LinearSearchComponent) },
      { path: '', redirectTo: 'binary-search', pathMatch: 'full' }
    ]
  },
  {
    path: 'graph',
    loadComponent: () => import('./app/algorithms/graph/graph/graph.component').then(m => m.GraphComponent),
    children: [
      { path: 'dfs', loadComponent: () => import('./app/algorithms/graph/dfs/dfs.component').then(m => m.DfsComponent) },
      { path: 'bfs', loadComponent: () => import('./app/algorithms/graph/bfs/bfs.component').then(m => m.BfsComponent) },
      { path: 'dijkstra', loadComponent: () => import('./app/algorithms/graph/dijkstra/dijkstra.component').then(m => m.DijkstraComponent) },
      { path: '', redirectTo: 'dfs', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    redirectTo: 'sorting/quick-sort',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'sorting/quick-sort',
  },
];

 

bootstrapApplication(AppComponent, {
  ...appConfig, // Spread appConfig contents into the new configuration
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })
    )
  ]
}).catch((err) => console.error(err));
