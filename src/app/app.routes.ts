import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'shipments',
    loadComponent: () =>
      import('./components/shipment-management/shipment-management.component').then(
        (m) => m.ShipmentManagementComponent
      ),
  },
  {
    path: 'post-offices',
    loadComponent: () =>
      import('./components/post-office-management/post-office-management.component').then(
        (m) => m.PostOfficeManagementComponent
      ),
  },
];
