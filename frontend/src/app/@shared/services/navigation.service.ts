import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(
    private readonly router: Router
  ) {}

  public goToRoute(route: string): void {
    this.router.navigateByUrl(route);
  }
}