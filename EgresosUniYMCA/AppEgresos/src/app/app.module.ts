import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
      RouterModule.forRoot([
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: HomeComponent },
          { path: 'AltaDocente', component: AltaDocenteComponent },
          { path: '**', redirectTo: 'home' }
      ]),
      BsDropdownModule.forRoot(),
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
