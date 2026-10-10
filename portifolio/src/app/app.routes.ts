import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '', // Se a URL estiver vazia, carrega a Home
    component: Home
  }
];