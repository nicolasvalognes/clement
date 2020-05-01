import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalisationFormComponent } from './localisation-form/localisation-form.component'

const routes: Routes = [
  {path: '', component: LocalisationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
