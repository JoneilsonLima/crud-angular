import { Course } from './../models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(2000),
      tap({
        next: (res: Course[]) => console.log(res),
      })
    );
  }

  save(curso: Course) {
    return this.httpClient.post<Course>(this.API, curso).pipe(first());
  }
}
