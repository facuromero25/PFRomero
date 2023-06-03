import { Injectable } from '@angular/core';
import { Observable, concatMap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import { CreateInscripcionData, InscripcionWithAll, Inscripcion } from '../models';


@Injectable({
  providedIn: 'root'
})
export class InscripcionesServicesService {
  constructor(private httpClient: HttpClient) {}

  createInscripcion(data: CreateInscripcionData): Observable<InscripcionWithAll> {
    return this.httpClient
      .post<Inscripcion>(`${enviroment.apiBaseUrl}/inscriptions`, data)
      .pipe(
        concatMap((createResponse) =>
          this.getInscripcionWithAllById(createResponse.id)
        )
      );
  }

  getInscripcionWithAllById(id: number): Observable<InscripcionWithAll> {
    return this.httpClient.get<InscripcionWithAll>(
      `${enviroment.apiBaseUrl}/inscriptions/${id}?_expand=student&_expand=subject&_expand=course`
    )
  }

  getAllInscripciones(): Observable<InscripcionWithAll[]> {
    return this.httpClient.get<InscripcionWithAll[]>(
      `${enviroment.apiBaseUrl}/inscriptions?_expand=course&_expand=student&_expand=subject`
    );
  }

  deleteInscripcionById(id: number): Observable<unknown> {
    return this.httpClient.delete(
      `${enviroment.apiBaseUrl}/inscriptions/${id}`
    );
  }
}
