import { Injectable, Inject } from '@angular/core';
import { Observable }  from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userModel }  from './../../models/user.model';

const httpOptions: Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {
    private url: string = '';

    constructor(private http: HttpClient, @Inject('configService') private configService: any, @Inject('helperService') private helperService: any) {
        this.url = this.configService.data.api.logIn;
    }

    private handleError<T> (operation: string = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          return of(result as T);
        };
    }

    login(username: string, password: string, isAdmin: boolean = false): Observable<userModel[]> {

        username = this.helperService.cleanData(username);
        password = this.helperService.cleanData(password);

        return this.http.post<userModel[]>(this.url, {username: username, password: username}, httpOptions).pipe(
            map((result) => {
                if (typeof(result) !== 'undefined' && result['status'] === 'success' ) {
                    return result['data'][0];
                }
            }),
            tap((result) => {
                this.helperService.createStorage('auth-token', result);
            }),
            catchError(this.handleError('login', null))
        );
    }

    logout() {
        return this.helperService.clearStorage();
    }

    get isLogin(){
        return (this.helperService.readStorage('auth-token')) ? true : false;
    }
}
