import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { 

    path:'inicio',
    component:InicioComponent
   },
];

export const InicioRoutes = RouterModule.forChild(routes);
