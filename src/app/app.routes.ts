import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderBookingComponent } from './order-booking/order-booking.component';

export const routes: Routes = [

    {
        path:"dashboard",
        component:DashboardComponent
    },
    {
        path:"order-booking",
        component:OrderBookingComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
];
