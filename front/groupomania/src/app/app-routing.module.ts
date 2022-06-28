import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggComponent } from './logg/logg.component'
import { MainPageComponent } from './main-page/main-page.component';
const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'connexion' },
{ path: 'connexion', component: LoggComponent },{path:'mainpage',component:MainPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
