import { Route } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { RoleGuard } from '@reslife/authentication';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => 
          import('@reslife/welcome-feature').then(
            (module) => module.WelcomeFeatureModule
          ),
          data: {
            menuItem: false,
            authGuardPipe: redirectUnauthorizedToLogin
          },
          canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'check-in',
        canActivate: [AngularFireAuthGuard],
        pathMatch: 'full',
        loadChildren: () => 
          import('@reslife/check-ins/check-in-feature').then(
            (module) => module.CheckInFeatureModule
          ),
          data: {
            name: 'Check In',
            icon: 'check',
            roles: [],
            menuItem: true,
            authGuardPipe: redirectUnauthorizedToLogin
          }
      },
      {
        path: 'room-inspection',
        canActivate: [AngularFireAuthGuard],
        pathMatch: 'full',
        data: {
          name: 'Room Inspection',
          icon: 'hotel',
          roles: [],
          menuItem: true,
          authGuardPipe: redirectUnauthorizedToLogin
        },
        loadChildren: () => 
        import('@reslife/room-inspection-feature').then(
          (module) => module.RoomInspectionFeatureModule
        ),
      },
      {
        path: 'student-signout',
        canActivate: [AngularFireAuthGuard],
        pathMatch: 'full',
        data: {
          name: 'Student Signout',
          icon: 'person_pin_circle',
          roles: [],
          menuItem: true,
          authGuardPipe: redirectUnauthorizedToLogin
        },
        loadChildren: () => 
          import('@reslife/student-signout-feature').then(
            (module) => module.StudentSignoutFeatureModule
          ),
      },
      {
        path: 'maintenance',
        canActivate: [AngularFireAuthGuard],
        pathMatch: 'full',
        data: {
          name: 'Maintenance Request',
          icon: 'build',
          roles: [],
          menuItem: true,
          authGuardPipe: redirectUnauthorizedToLogin
        },
        loadChildren: () => 
        import('@reslife/maintenance-request-feature').then(
          (module) => module.MaintenanceRequestFeatureModule
        ),
      },
      {
        path: 'dorm-notes',
        canActivate: [AngularFireAuthGuard],
        pathMatch: 'full',
        data: {
          name: 'Dorm Notes',
          icon: 'assignment',
          roles: [],
          menuItem: true,
          authGuardPipe: redirectUnauthorizedToLogin
        },
        loadChildren: () => 
        import('@reslife/dorm-notes-feature').then(
          (module) => module.DormNotesFeatureModule
        ),
      },
      {
        path: 'admin',
        canActivate: [AngularFireAuthGuard, RoleGuard],
        loadChildren: () => 
          import('@reslife/admin-feature').then(
            (module) => module.AdminFeatureModule
          ),
          data: {
            name: 'Admin Features',
            icon: 'admin_panel_settings',
            roles: ['superadmin'],
            menuItem: true,
            authGuardPipe: redirectUnauthorizedToLogin
          }
      },
      {
        path: 'aod', 
        canActivate: [AngularFireAuthGuard],
        loadChildren: () => import('@reslife/aod-feature').then(
          (module) => module.AodFeatureModule
        ),
        data: {
          name: 'AOD Features',
          icon: 'supervisor_account',
          roles: ['aod', 'superadmin'],
          menuItem: true,
          authGuardPipe: redirectUnauthorizedToLogin
        }
      },
      {
        path: 'login',
        loadChildren: () => import('@reslife/authentication').then(
          (module) => module.AuthenticationModule
        ),
        data: {
          menuItem: false
        }
      }
]; 