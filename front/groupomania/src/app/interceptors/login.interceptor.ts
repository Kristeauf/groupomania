import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from "rxjs";

export class LoginInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneRequest = req.clone();
   
     




   
        return next.handle(req)
    }

}
export const LoginInterceptorProvider ={
    provide:HTTP_INTERCEPTORS,
    useClass:LoginInterceptor,
multi:true
}