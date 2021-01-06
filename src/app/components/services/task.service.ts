import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TaskEntity} from '../task/entity/task.entity';
import {Observable} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {error} from '@angular/compiler/src/util';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  saveTask(task: TaskEntity): Observable<TaskEntity> {
    return this.http.post<TaskEntity>(environment.backendURL + '/tasks/saveTask', task).pipe(
      tap(_ => console.log('returned from backend' + _),
        catchError(() => error('error'))));
  }

  getTask(username: string): Observable<TaskEntity> {
    return this.http.get<TaskEntity>(environment.backendURL + '/tasks/getTask/' + username).pipe(
      tap(response => console.log(response),
        catchError(() => error('error'))));
  }
}
