import { Routes } from '@angular/router';

/**
 * ============================================
 * ROUTING - Lazy loading with loadComponent
 * ============================================
 * loadComponent: () => import(...) loads the component (and the
 * Angular Material modules it uses) in a separate JavaScript chunk,
 * only when the user navigates to that route.
 * The initial bundle is smaller and the app starts faster.
 * There are no static imports of the components in this file.
 */
export const routes: Routes = [
  {
    path: 'elements',
    loadComponent: () => import('./components/colletion/colletion.component')
      .then(m => m.CollectionComponent)
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
    loadComponent: () => import('./components/create-element/create-element.component')
      .then(m => m.CreateElementComponent)
  },
  /**
   * ':id' is received in ElementComponent as: id = input.required<string>()
   * thanks to withComponentInputBinding() in app.config.ts
   */
  {
    path: 'elements/:id',
    loadComponent: () => import('./components/element/element.component')
      .then(m => m.ElementComponent)
  },
  {
    path: '',
    redirectTo: '/elements',
    pathMatch: 'full'
  }
];
