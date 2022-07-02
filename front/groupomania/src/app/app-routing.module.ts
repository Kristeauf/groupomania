import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggComponent } from './logg/logg.component'
import { CreatePostComponent} from './createPost/createPost.component';
import { PostPageComponent } from './post-page/post-page.component';
const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'connexion' },
{ path: 'connexion', component: LoggComponent },{path:'createpost',component:CreatePostComponent},{path:'postpage',component:PostPageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
