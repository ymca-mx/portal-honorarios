import { Component } from '@angular/core';
import { MenuModule, MenuItem } from 'primeng/primeng';

@Component({
    selector: 'MenuComponent',
    templateUrl: './menu.component.html'
})
export class MenuComponent {
    isIn = false;   // store state
    toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
    }
}