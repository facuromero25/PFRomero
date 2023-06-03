import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Alumno } from '../alumnos.component';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {




  private estudiantes$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Sosa',
      fecha_registro: new Date()
    },
    {
      id: 2,
      nombre: 'Camila',
      apellido: 'Lopez',
      fecha_registro: new Date()
    },
    {
      id: 3,
      nombre: 'Sol',
      apellido: 'Santillan',
      fecha_registro: new Date()
    },
  ])

  constructor(private httpClient: HttpClient) { }

  getStudentsFromDB(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${enviroment.apiBaseUrl}/students`);
  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.estudiantes$.asObservable();
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined> {
    return this.estudiantes$.asObservable()
      .pipe(
        map((alumnos) => alumnos.find((a) => a.id === id))
      )
  }
}
