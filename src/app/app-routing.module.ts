import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { ElementListComponent } from './components/element-list/element-list.component';
import { CreateElementComponent } from './components/create-element/create-element.component';

const routes: Routes = [
  {
    path: 'collections',
    component: CollectionListComponent
  },
  {
    path: 'elements',
    component: ElementListComponent
  },
  {
    path: 'elements/new',
    component: CreateElementComponent
  },
  {
    path: 'elements/:id',
    component: CreateElementComponent
  },
  {
    path: '',
    redirectTo: '/collections',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
