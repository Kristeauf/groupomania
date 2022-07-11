// import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";

// import { CookieService } from 'ngx-cookie-service';
// import { Observable } from "rxjs";
// const headers= new HttpHeaders()

// export class LoginInterceptor implements HttpInterceptor{
//     intercept( req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {

//     const cloneRequest = req.clone(
  
   
//     );
    
//  alert(cloneRequest)

    
     
  
     




   
//         return next.handle(req)
//     }

// }
// export const LoginInterceptorProvider ={
//     provide:HTTP_INTERCEPTORS,
//     useClass:LoginInterceptor,
// multi:true
// }
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<unknown>> {
    const authToken = this.auth.getCredentials().token;
    const newRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    })
    return next.handle(newRequest).pipe(
      catchError( (error: HttpErrorResponse) => {
        // If token is expired, unlog the user
        if (error.status == 401 && error.error.error === "jwt expired"){
          this.auth.logout();
        }
        return throwError(() => error)
      })
    )
  }
} // export class AuthInterceptor