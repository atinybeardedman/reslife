export const appRoutes = [
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
            pageTitle: 'Check In'
          }
      }
]; 