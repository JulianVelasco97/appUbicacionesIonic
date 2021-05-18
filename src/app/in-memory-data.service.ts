import { InMemoryDbService } from 'angular-in-memory-web-api';

import {Sede} from './sede';

export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    let sedes=[
      {id:1, nombre:'Hospital Nivel 1 Piendamó', latitud:"2.646331579009837", longitud:"-76.53828132981212"},
      {id:2, nombre:'Hospital Universitario San José Ese', latitud:"2.45", longitud:"-76.60"},
      {id:3, nombre:'Hospital Susana López de Valencia E.S.E.', latitud:"2.44", longitud:"-76.62"},
      {id:4, nombre:'Casa Rosada - E.S.E. Popayán', latitud:"2.44", longitud:"-76.61"},
    ];
    return {sedes};
  }
}
