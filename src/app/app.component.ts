import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular 6';
  characterItems: any;
  searchText: string = "";
  selected_count: number = 0;
  filterItems: any;
  speciesItem = []
  genderItem = [];
  originItem = [];
  reverse:any;
  sortOrder = " ";
  characterAPIUrl = "https://rickandmortyapi.com/api/character/";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCharacterItems();
  }

  // Read all Character Items
  getCharacterItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        characterItems=> {
          this.characterItems = characterItems && characterItems["results"];
          this.filterItems = this.characterItems;
          //this.initialFilterSetup()
          console.log(this.characterItems);
        }
      )
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.characterAPIUrl)
      .pipe(map(data => data));
  }

   changeSortOrder(key){
     //key = ! Boolean(parseInt(key))
     this.reverse = key ==="true" ? "id" : "-id";
     //this.reverse =! this.reverse ;
   }

   // Getting Selected Character and Count
  getSelected(evt, type, category) {
    //if(this.characterItems.length === this.filterItems.length) this.characterItems = [];
    if(evt.target.checked)
      this.addFilter(evt, type, category);
     else 
      this.removeFilter(evt,type,category);
     
    //this.characterItems = this.characterItems.filter((v, i, a) => a.indexOf(v) === i);
    this.selected_count = this.characterItems.length;  
    //this.initialFilterSetup();  
  }

  addFilter(evt, type, category){
    let isType = type === 'species' ? 'isspecies' : type === 'origin' ? 'isorigin' : 'isgender';
    this.characterItems = this.characterItems.filter(s => {
      return type === "origin" ?(s[type]["name"] ===category[type]["name"]) && category[isType] : (s[type]===category[type]) && category[isType];
    });
    this.characterItems.filter(v => {v[isType] = true;});
    //this.filterItems.filter(v => { if (v[type] === category[type] && (v.isgender || v.isspecies || v.isorigin)) this.characterItems.concat(v) });  
  }

  removeFilter(evt, type, category){
    // TO DO
  }
 
  // Clearing All Selections
  clearSelection() {
    this.searchText = "";
    this.characterItems = this.characterItems.filter(g => {
      g.selected = false;
      return true;
    });
    //this.initialFilterSetup();
  }
 
  //Delete Single Listed Game TagfilterItems
  deleteGame(id: number) {
    this.searchText = "";
    this.characterItems = this.characterItems.filter(g => {
      if (g.id == id)
        g.selected = false;
 
      return true;
    });
    this.getSelected({},false, false);
  }
 
  //Clear term types by user
  clearFilter() {
    this.searchText = "";
  }
}
