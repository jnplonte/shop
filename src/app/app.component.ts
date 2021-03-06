import { Component, Inject } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Title } from '@angular/platform-browser';

import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-shop',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})

export class AppComponent {
    appActive: boolean = true;
    configError: boolean = false;

    constructor(private title: Title, private router: Router, @Inject('alertService') private alertService: any, @Inject('authenticationService') private authenticationService: any, @Inject('translateService') private translateService: any, @Inject('configService') private configService: any, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
        this.translateService.setDefaultLang('default');

        this.configError = (typeof(configService.data.hasError) !== 'undefined' && configService.data.hasError === 'true');

        this.setIcons();
        this.setTitle();
    }

    private setTitle() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                let titleString: string = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
                if (titleString) {
                   this.title.setTitle(titleString);
                }
            }
        });
    }

    private getTitle(state: any, parent: any) {
        let data: any = [], companyName: string = this.configService.data.companyName || 'Shop';
        if (parent && parent.snapshot.data && parent.snapshot.data.title) {
            data.push(companyName + ' | ' + parent.snapshot.data.title);
        }

        if (state && parent) {
            data.push(... this.getTitle(state, state.firstChild(parent)));
        }

        return data;
    }

    private setIcons() {
        this.iconRegistry.addSvgIcon('menu', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../img/icons/menu.svg')));

        this.iconRegistry.addSvgIcon('error', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../img/icons/error.svg')));
        this.iconRegistry.addSvgIcon('warning', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../img/icons/warning.svg')));
        this.iconRegistry.addSvgIcon('success', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../img/icons/success.svg')));

        this.iconRegistry.addSvgIcon('more_vert', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../img/icons/more_vert.svg')));
        this.iconRegistry.addSvgIcon('face', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../img/icons/face.svg')));
        this.iconRegistry.addSvgIcon('cart', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../img/icons/cart.svg')));
        this.iconRegistry.addSvgIcon('help', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../img/icons/help.svg')));
        this.iconRegistry.addSvgIcon('exit', this.sanitizer.bypassSecurityTrustResourceUrl(require('./../img/icons/exit.svg')));
    }

    onLogOut() {
        this.authenticationService.logout();
        this.router.navigate(['/log-in']).then(() => {
            this.alertService.success('logout success');
        });
    }
}
