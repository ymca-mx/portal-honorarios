import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouting } from 'app/app.routing';
import {
    ButtonModule,
    GrowlModule,
    DataTableModule,
    SharedModule,
    DropdownModule,
    StepsModule, TabViewModule, PanelModule, ChipsModule, CalendarModule, CheckboxModule, FileUploadModule
} from 'primeng/primeng';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './component.menu/menu.component';
import { HomeComponent } from './component.home/home.component';
import { AltaDocenteComponent } from './Docente/AltaDocente.component';

@NgModule({
  declarations: [
      AppComponent,
      MenuComponent,
      HomeComponent,
      AltaDocenteComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      CommonModule,
      FormsModule, 
      ReactiveFormsModule,
      ButtonModule,
      GrowlModule,
      DataTableModule,
      SharedModule,
      DropdownModule,
      StepsModule,
      TabViewModule,
      PanelModule,
      ChipsModule,
      CalendarModule,
      CheckboxModule,
      FileUploadModule,
      BrowserAnimationsModule,
      AppRouting,
      BsDropdownModule.forRoot(),
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
