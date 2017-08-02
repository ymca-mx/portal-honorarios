import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaDocenteComponent } from './altadocente.component';
import { FileComponent } from '../file/file.component';

const routes: Routes = [
    { path: 'altadocente', component: AltaDocenteComponent },
    { path: 'file', component: FileComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocenteRoutingModule { }
