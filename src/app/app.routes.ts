import { Routes } from '@angular/router';

import { CollectionComponent } from './components/colletion/colletion.component'; 
import { ElementComponent } from './components/element/element.component';
import { CreateElementComponent } from './components/create-element/create-element.component';

export const routes: Routes = [
  {
    path: 'elements',
    component: CollectionComponent
  },
  /**
 * ============================================
 * ROUTING - Paso de datos en Routing
 * ============================================
 * Los datos se pasan via Navigation Extras (state), no por URL.
 * Esto permite pasar objetos completos sin exponerlos en la ruta.
 * En el destino se accede con: history.state.data
 */
  {
    path: 'elements/new',
    component: CreateElementComponent
  },
  {
    path: 'elements/:id',
    component: ElementComponent
  },
  {
    path: '',
    redirectTo: '/elements',
    pathMatch: 'full'
  }
];
