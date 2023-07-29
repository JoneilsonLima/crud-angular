import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  // public courses: Course[] = [];
  public courses: Observable<Course[]>;

  public displayedColumns: string[] = ['name', 'category'];

  constructor(private service: CoursesService) {
    this.courses = this.service.list();
  }

  ngOnInit(): void {
    // this.service.list().subscribe({
    //   next: (res) => {
    //     this.courses = res;
    //   }
    // })
  }
}
