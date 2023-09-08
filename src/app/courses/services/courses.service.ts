import { Course } from './../models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api';

  constructor(private httpClient: HttpClient) {}

  list(): Observable<Course[]> {
    const url = `${this.API}/courses`
    return this.httpClient.get<Course[]>(url)
    .pipe(
      first(),
      delay(5000),
      tap({
        next: (res) => console.log(res),
      })
    );
  }
}
