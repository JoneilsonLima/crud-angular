import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/course';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar) {
    this.formGroup = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  montarRequestSalvarCurso(): Course {
    const {
      name,
      category
    } = this.formGroup.getRawValue()

    const request = {
      name: name,
      category: category
    } as Course;

    return request;
  }

  onSubmit(): void {
    const request = this.montarRequestSalvarCurso();
    this.service.save(request).subscribe({
      next: (resp) => {
        console.log(resp)
      },
      error: (err) => {
        this._onError();
      }
    });
  }

  onCancel(): void {

  }

  private _onError(): void {
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 3000});
  }

}
