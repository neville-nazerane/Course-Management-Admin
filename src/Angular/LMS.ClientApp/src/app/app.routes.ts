import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Teachers } from './pages/teachers';
import { Courses } from './pages/courses';
import { StudyPrograms } from './pages/study-programs';
import { Students } from './pages/students';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'teachers', component: Teachers },
    { path: 'courses', component: Courses },
    { path: 'study-programs', component: StudyPrograms },
    { path: 'students', component: Students },
];
