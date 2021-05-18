import { Injectable } from '@angular/core';
import {Observable, of, observable} from 'rxjs';
import {catchError,map,tap} from 'rxjs/operators';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Sede} from './sede';

const httpOptions={headers: new HttpHeaders({'Content-Type':'application/json'})};
@Injectable({
  providedIn: 'root'
})
export class SedeService {

  private sedesUrl ='api/sedes';
  constructor(
    private http:HttpClient
  ) { }

  private log (message:string){
    console.timeLog(`SedeService${message}`);
  };

  private handleError <T>(operation='operation', result?:T){
    return(error:any): Observable <T> =>{
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of (result as T);
    };
  }
  getSedes():Observable<Sede[]>{
    return this.http.get<Sede[]>(this.sedesUrl)
    .pipe(
      tap(_=>this.log('Sedes Almacenadas')),
      catchError(this.handleError('getSedes',[]))
    );
  }

  crearNueva(sede:Sede): Observable<Sede>{
    return this.http.post<Sede>(this.sedesUrl,sede,httpOptions).pipe(
      tap((sede:Sede)=>this.log(`Nueva Sede w/ id=${sede.id}`)),
      tap((sede:Sede)=>this.log(`Nueva Sede w/ nombre=${sede.nombre}`)),
      tap((sede:Sede)=>this.log(`Nueva Sede w/ latitud=${sede.latitud}`)),
      tap((sede:Sede)=>this.log(`Nueva Sede w/ longitud=${sede.longitud}`)),
      catchError(this.handleError<Sede>('crearNueva'))
    )
  }
}
