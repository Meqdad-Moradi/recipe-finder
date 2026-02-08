import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Home } from './components/pages/home/home';
import { Recipes } from './components/pages/recipes/recipes';
import { RecipeReview } from './components/pages/recipes/recipe-review/recipe-review';
import { Favorites } from './components/pages/favorites/favorites';
import { About } from './components/pages/about/about';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'recipes', component: Recipes, pathMatch: 'full' },
      { path: 'recipes/review', component: RecipeReview, pathMatch: 'full' },
      { path: 'favorites', component: Favorites, pathMatch: 'full' },
      { path: 'about', component: About, pathMatch: 'full' },
    ],
  },
];
