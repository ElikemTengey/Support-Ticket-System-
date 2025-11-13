import { Routes } from '@angular/router';
import { Signup } from './pages/logs/signup/signup';
import { Login } from './pages/logs/login/login';
import { UserDashboard } from './pages/user/user-dashboard/user-dashboard';
import { authGuard } from './guards/auth-guard';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { adminGuard } from './guards/admin-guard';
import { SubmitTicket } from './pages/user/submit-ticket/submit-ticket';

export const routes: Routes = [
    { path: '', component: Login},
    { path: 'signup', component: Signup },
    { path: 'user/dashboard', component: UserDashboard, canActivate: [authGuard] },
    {path: 'submitTicket', component:SubmitTicket},
    { path: 'admin/dashboard', component: AdminDashboard, canActivate: [adminGuard] }
];
