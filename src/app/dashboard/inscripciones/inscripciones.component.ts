import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InscripcionDialogComponent } from './components/inscripcion-dialog/inscripcion-dialog.component';
import { InscripcionesActions } from './store/inscripciones.actions';
import { selectInscripcionesState } from './store/inscripciones.selectors';
import { State } from './store/inscripciones.reducer';


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  state$: Observable<State>;

  constructor(

    private matDialog: MatDialog,
    private store: Store<State>
  ) {
    this.state$ = this.store.select(selectInscripcionesState);
  }
  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());
  }

  eliminarInscripcionPorId(id: number): void {
    this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
  }

  crearInscripcion(): void {
    this.matDialog.open(InscripcionDialogComponent);
  }


}
