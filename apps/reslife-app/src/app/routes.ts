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
            roles: []
          }
      },
      {
        path: 'room-inspection',
        pathMatch: 'full',
        data: {
          name: 'Room Inspection',
          icon: 'hotel',
          roles: []
        },
        loadChildren: () => 
        import('@reslife/room-inspection-feature').then(
          (module) => module.RoomInspectionFeatureModule
        ),
      },
      {
        path: 'student-signout',
        pathMatch: 'full',
        data: {
          name: 'Student Signout',
          icon: 'person_pin_circle',
          roles: []
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
          roles: []
        },
        loadChildren: () => 
        import('@reslife/maintenance-request-feature').then(
          (module) => module.MaintenanceRequestFeatureModule
        ),
      },
      {
        path: 'dorm-notes',
        pathMatch: 'full',
        data: {
          name: 'Dorm Notes',
          icon: 'assignment',
          roles: []
        },
        loadChildren: () => 
        import('@reslife/dorm-notes-feature').then(
          (module) => module.DormNotesFeatureModule
        ),
      },
      {
        path: 'admin',
        loadChildren: () => 
          import('@reslife/admin-feature').then(
            (module) => module.AdminFeatureModule
          ),
          data: {
            name: 'Admin Features',
            icon: 'admin_panel_settings',
            roles: ['superadmin']
          }
      },
      {
        path: 'aod', 
        loadChildren: () => import('@reslife/aod-feature').then(
          (module) => module.AodFeatureModule
        ),
        data: {
          name: 'AOD Features',
          icon: 'supervisor_account',
          roles: ['aod']
        }
      }
]; 