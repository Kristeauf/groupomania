import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggComponent } from './logg/logg.component'
const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'connexion' },
{ path: 'connexion', component: LoggComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
