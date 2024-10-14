import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { catchError, finalize, forkJoin, map, Observable, of } from 'rxjs';
import { toMove } from '../utils/move.utils';
import { PokemonMove } from '../models/move.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonMovesService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  constructor() {}

  getMoves(movesUrl: string[]): Observable<PokemonMove[]> {
    this.loadingService.start();

    const requests = movesUrl.map((url) => {
      return this.http.get<any>(url).pipe(map((result) => toMove(result)));
    });

    return forkJoin(requests).pipe(
      catchError((error) => {
        console.error(error);
        return of([]);
      }),
      finalize(() => this.loadingService.stop())
    );
  }
}
