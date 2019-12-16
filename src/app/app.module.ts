import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderModule } from 'ngx-order-pipe';
import {NgPipesModule} from 'ngx-pipes';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter.component';

@NgModule({
  imports:[ 
    BrowserModule, 
    HttpClientModule, 
    FormsModule,
    OrderModule,
    NgPipesModule
     ], 
  declarations: [
     AppComponent, 
     FilterComponent 
    ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
