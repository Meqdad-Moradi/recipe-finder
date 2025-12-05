import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Home } from './components/pages/home/home';
import { Recipes } from './components/pages/recipes/recipes';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'recipes', component: Recipes, pathMatch: 'full' },
    ],
  },
];
