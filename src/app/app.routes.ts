import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'home', component: DashboardComponent },
];
