import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Character} from './character';
import {CHARACTERS} from './characterData';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor() { }

  getCharacters(): Observable<Character[]> {
    return of(CHARACTERS);
  }
}
