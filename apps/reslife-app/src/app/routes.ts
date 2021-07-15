export const appRoutes = [
    {
        path: '',
        pathMatch: 'full',
        loadChildren: () => 
          import('@reslife/reslife-main/welcome').then(
            (module) => module.ReslifeMainWelcomeModule
          )
      },
      {
        path: 'check-in',
        pathMatch: 'full',
        loadChildren: () => 
          import('@reslife/reslife-main/check-in').then(
            (module) => module.ReslifeMainCheckInModule
          ),
          data: {
            pageTitle: 'Check In'
          }
      }
]; 