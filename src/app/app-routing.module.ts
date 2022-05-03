
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule),
    canActivate: []
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),pathMatch: 'full',
    canActivate: []
  },

  // {
  //   path: '',
  //   redirectTo: '/sample/sample-component',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '',
  //   component: ContentLayoutComponent,
  //   children: content
  // },
  // {
  //   path: '**',
  //   redirectTo: '/sample/sample-component'
  // }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
  // useHash: true
});
