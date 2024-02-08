import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from './componentes/main/main.component';
import { LogupComponent } from './componentes/logup/logup.component';
import { sesionGuard } from './guards/sesion.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'main', component: MainComponent, canActivate: [sesionGuard]},
    {path: 'logup', component: LogupComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
