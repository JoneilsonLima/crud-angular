import { Observable, catchError, of, tap } from 'rxjs';
import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  // public courses: Course[] = [];
  public courses$: Observable<Course[]>;

  public displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    public dialog: MatDialog,
    private service: CoursesService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.courses$ = this.service.list()
    .pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    )
  }

  ngOnInit(): void {
    // this.service.list().subscribe({
    //   next: (res) => {
    //     this.courses = res;
    //   }
    // })
  }

  onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onAdd(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
