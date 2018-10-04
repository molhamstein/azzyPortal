import { MainService } from './../../../../services/main.service';
import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'fuse-nav-vertical-item',
    templateUrl: './nav-vertical-item.component.html',
    styleUrls: ['./nav-vertical-item.component.scss']
})
export class FuseNavVerticalItemComponent implements OnInit {
    @HostBinding('class') classes = 'nav-item';
    @Input() item: any;

    constructor(private mainSer: MainService) {
    }

    ngOnInit() {
    }

    isAllowed(role) {
        return this.mainSer.globalServ.isAllowed(role);

    }
}
