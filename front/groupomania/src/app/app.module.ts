import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggComponent } from './logg/logg.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreatePostComponent } from './createPost/createPost.component';
import { PostPageComponent } from './post-page/post-page.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
