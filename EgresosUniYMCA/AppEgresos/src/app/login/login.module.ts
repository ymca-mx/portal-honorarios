import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { UserService } from '../shared/services/user.service';


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule, FormsModule, ReactiveFormsModule
    ],
    declarations: [LoginComponent, SpinnerComponent],
    providers: [UserService]
})
export class LoginModule {
}
