import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggComponent } from './logg/logg.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreatePostComponent } from './createPost/createPost.component';
import { PostPageComponent } from './post-page/post-page.component';
import { LoginInterceptorProvider } from './interceptors/login.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoggComponent,
 CreatePostComponent,
 PostPageComponent
  
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
   
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoginInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
