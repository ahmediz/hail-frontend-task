import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
  },
  {
    path: 'news',
    loadComponent: () => import('./pages/news/news').then((m) => m.News),
  },
  {
    path: 'news/:id',
    loadComponent: () =>
      import('./pages/news/article-details/article-details').then(
        (m) => m.ArticleDetails
      ),
  },
];
