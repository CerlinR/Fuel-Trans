import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  breadcrumbs: { label: string, url: string }[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.url),
      map(segments => segments.map(segment => segment.path))
    ).subscribe(paths => {
      this.breadcrumbs = this.generateBreadcrumbs(paths);
    });
  }

  generateBreadcrumbs(paths: string[]): { label: string, url: string }[] {
    let breadcrumbs: { label: string, url: string }[] = [];
    let url = '';
    for (let i = 0; i < paths.length; i++) {
      url += '/' + paths[i];
      breadcrumbs.push({ label: paths[i].charAt(0).toUpperCase() + paths[i].slice(1), url: url });
    }
    return breadcrumbs;
  }
}
