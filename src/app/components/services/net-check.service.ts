import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RouterConstants} from '../../constants/router.constants';
import {catchError, tap} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class NetCheckService {

  constructor(private http: HttpClient) {
  }

  checkInternetConnectionUrl(url: string): Observable<any> {
    return this.http.get(`${RouterConstants.LOCAL_BACKEND_8081}/recipes/check-net-connection/${url}`,
      {observe: 'response'}).pipe(
      tap(_ => console.log('returned from backend'),
        catchError(() => error('error'))));
  }

}
