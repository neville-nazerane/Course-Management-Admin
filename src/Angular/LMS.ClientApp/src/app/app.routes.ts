import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Teachers } from './pages/teachers';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'teachers', component: Teachers },
];
