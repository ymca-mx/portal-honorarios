import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ButtonModule, GrowlModule, DataTableModule, SharedModule, DropdownModule, StepsModule, TabViewModule, PanelModule, ChipsModule, CalendarModule, CheckboxModule, FileUploadModule, DialogModule, ConfirmDialogModule
} from 'primeng/primeng';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DocenteRoutingModule } from './docente-routing.module';
import { AltaDocenteComponent } from './altadocente.component';
import { FileComponent } from '../file/file.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        DocenteRoutingModule,
        PageHeaderModule,
        ButtonModule, GrowlModule, DataTableModule, SharedModule, DropdownModule, StepsModule, TabViewModule, PanelModule, ChipsModule, CalendarModule, CheckboxModule, FileUploadModule, DialogModule, ConfirmDialogModule,
        BsDropdownModule
    ],
    declarations: [AltaDocenteComponent, FileComponent]
})
export class DocenteModule { }
