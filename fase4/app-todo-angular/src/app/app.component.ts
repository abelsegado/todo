import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MainComponent } from "./componentes/main/main.component";
import { LogupComponent } from "./componentes/logup/logup.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LoginComponent, MainComponent, LogupComponent]
})
export class AppComponent {

}
