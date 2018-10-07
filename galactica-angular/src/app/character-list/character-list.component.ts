import { Component, OnInit } from '@angular/core';
import {Character} from "./../character";
import {CharacterService} from "./../character.service";

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  constructor(private characterService: CharacterService) { }
  
  characters: Character[];

  ngOnInit() {
    this.getCharacters();
  }
  getCharacters(): void {
    this.characterService.getCharacters().subscribe(characters => this.characters = characters);
  }
}
