import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";

import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs";
const headers= new HttpHeaders()

export class LoginInterceptor implements HttpInterceptor{
    intercept( req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {

    const cloneRequest = req.clone(
  
   
    );
    
 alert(cloneRequest)

    
     
  
     




   
        return next.handle(req)
    }

}
export const LoginInterceptorProvider ={
    provide:HTTP_INTERCEPTORS,
    useClass:LoginInterceptor,
multi:true
}