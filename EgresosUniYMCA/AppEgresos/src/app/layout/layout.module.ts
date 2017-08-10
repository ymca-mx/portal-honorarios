
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { BlockUIModule } from 'ng-block-ui';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
import { LayoutService } from './services/layout.service';


@NgModule({
    imports: [
        HttpModule,
        CommonModule,
        FormsModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        BlockUIModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent
    ],
    providers: [LayoutService]
})
export class LayoutModule { }
