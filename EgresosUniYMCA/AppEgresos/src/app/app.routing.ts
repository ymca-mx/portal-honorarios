import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuComponent } from './component.menu/menu.component';
import { HomeComponent } from './component.home/home.component';
import { AltaDocenteComponent } from './Docente/AltaDocente.component';
import { FileComponent } from './component.file/file.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'AltaDocente', component: AltaDocenteComponent },
    { path: 'File', component: FileComponent },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRouting
{ }