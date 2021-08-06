import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => 
          import('@reslife/welcome-feature').then(
            (module) => module.WelcomeFeatureModule
          )
      },
      {
        path: 'check-in',
        pathMatch: 'full',
        loadChildren: () => 
          import('@reslife/check-ins/check-in-feature').then(
            (module) => module.CheckInFeatureModule
          ),
          data: {
            name: 'Check In',
            icon: 'check',
            roles: ['any']
          }
      },
      {
        path: 'room-inspection',
        pathMatch: 'full',
        data: {
          name: 'Room Inspection',
          icon: 'hotel',
          roles: ['any']
        },
        redirectTo: ''
      },
      {
        path: 'student-signout',
        pathMatch: 'full',
        data: {
          name: 'Student Signout',
          icon: 'person_pin_circle',
          roles: ['any']
        },
        loadChildren: () => 
          import('@reslife/student-signout-feature').then(
            (module) => module.StudentSignoutFeatureModule
          ),
      },
      {
        path: 'maintenance',
        pathMatch: 'full',
        data: {
          name: 'Maintenance Request',
          icon: 'build',
          roles: ['any']
        },
        redirectTo: ''
      },
      {
        path: 'dorm-notes',
        pathMatch: 'full',
        data: {
          name: 'Dorm Notes',
          icon: 'assignment',
          roles: ['any']
        },
        redirectTo: ''
      },
      {
        path: 'admin/manage-boarders',
        pathMatch: 'full',
        loadChildren: () => 
          import('@reslife/boarder-management-feature').then(
            (module) => module.BoarderManagementFeatureModule
          ),
          data: {
            name: 'Manage Boarders',
            icon: 'verified_user',
            roles: ['superadmin']
          }
      },
]; 