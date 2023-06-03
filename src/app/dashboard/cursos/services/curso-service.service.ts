import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, mergeMap, map, take } from 'rxjs';
import { enviroment } from 'src/environments/environments';
import { Curso, CrearCursoPayload, CursoWithSubject } from '../models';


@Injectable({
  providedIn: 'root'
})
export class CursoServiceService {

  private cursos$ = new BehaviorSubject<Curso[]>(
    []
  );

  constructor(
    private httpClient: HttpClient
  ) {}

  get cursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${enviroment.apiBaseUrl}/courses`)
      .pipe(
        tap((cursos) => this.cursos$.next(cursos)),
        mergeMap(() => this.cursos$.asObservable())
      );
  }

  obtenerCursosWithSubject(): Observable<CursoWithSubject[]> {
    return this.httpClient.get<CursoWithSubject[]>(
      `${enviroment.apiBaseUrl}/courses?_expand=subject`
    );
  }

  getCursoById(courseId: number): Observable<Curso | undefined> {
    return this.cursos$.asObservable()
      .pipe(
        map((cursos) => cursos.find((c) => c.id === courseId))
      )
  }

  crearCurso(payload: CrearCursoPayload): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (cursos) => {
          this.cursos$.next([
            ...cursos,
            {
              id: cursos.length + 1,
              ...payload,
            },
          ]);
        },
        complete: () => {},
        error: () => {}
      });

    return this.cursos$.asObservable();
  }

  editarCurso(courseId: number, actualizacion: Partial<Curso>): Observable<Curso[]> {
    this.cursos$
      .pipe(
        take(1),
      )


    return this.cursos$.asObservable();
  }


  eliminarCurso(courseId: number): Observable<Curso[]> {
    this.cursos$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (cursos) => {
        const cursosActualizados = cursos.filter((curso) => curso.id !== courseId)
        this.cursos$.next(cursosActualizados);
      },
      complete: () => {},
      error: () => {}
    });

    return this.cursos$.asObservable();
  }
}
