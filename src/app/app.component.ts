import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'DWEC_UD06_TE01';
    private route: ActivatedRoute;
    private router: Router;
    private pathWrapper: HTMLElement;

    constructor(route: ActivatedRoute, router: Router) {
        this.route = route;
        this.router = router;
        this.pathWrapper = document.querySelector(".path-wrapper") as HTMLElement;

        this.router.events.subscribe((e) => {
            if (e instanceof NavigationEnd) {
                this.handleRouteChange(e.url);
            }
        });
    }

    handleRouteChange(url: string) {
        let navigationButton: HTMLAnchorElement;

        // Clear the current path.
        this.pathWrapper = document.querySelector(".path-wrapper") as HTMLElement;
        this.pathWrapper.innerHTML = "";

        // Set to white all the navigation button borders.
        document.querySelectorAll(".header-nav a").forEach((element) => {
            (element as HTMLAnchorElement).style.borderBottomColor = "#fff";
        });

        console.log(url);

        switch (url) {
            case '/':
                // Set to black the current page's navigation button border.
                navigationButton = document.querySelector(".header-nav a:nth-child(1)") as HTMLAnchorElement;
                navigationButton.style.borderBottomColor = "#000";

                this.appendChildToPath("Home", url, "path-root");

                break;

            case '/orders':
                // Set to black the current page's navigation button border.
                navigationButton = document.querySelector(".header-nav a:nth-child(2)") as HTMLAnchorElement;
                navigationButton.style.borderBottomColor = "#000";

                this.appendChildToPath("Orders", url, "path-root");

                break;

            case '/products':
                // Set to black the current page's navigation button border.
                navigationButton = document.querySelector(".header-nav a:nth-child(3)") as HTMLAnchorElement;
                navigationButton.style.borderBottomColor = "#000";

                this.appendChildToPath("Products", url, "path-root");

                break;

            default:
                // Handle the routes that cannot be handled in the switch statement.
                if (url.includes("/productForm")) {
                    this.appendChildToPath("Products", "/products", "path-root", true);

                    if (url.split('/').length == 2) {
                        this.appendChildToPath("New Product", url, "path-element");
                    } else {
                        this.appendChildToPath("Edit Product", url, "path-element");
                    }
                }

                break;
        }
    }

    appendChildToPath(text: string, relativeUrl: string, cssClass: string, addSlash?: boolean) {
        let span: HTMLSpanElement;
        let url;
        let a = document.createElement('a') as HTMLAnchorElement;

        url = window.location;

        a.innerHTML = text;
        a.href = url.protocol + "//" + url.host + relativeUrl;
        console.log(a.href);
        a.classList.add(cssClass);

        this.pathWrapper.appendChild(a);

        if (addSlash) {
            span = document.createElement('span');
            span.innerHTML = "/";
            span.classList.add("path-slash");
            this.pathWrapper.appendChild(span);
        }
    }
}
