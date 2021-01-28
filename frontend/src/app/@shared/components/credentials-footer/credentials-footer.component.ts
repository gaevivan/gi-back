import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { App } from '@shared/interfaces/app.interface';
import { filterNil } from '@shared/rxjs-operators/filter-not-nil.operator';
import { CurrentAppState } from '@shared/stores/current-app/current-app.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-credentials-footer',
  templateUrl: './credentials-footer.component.html',
  styleUrls: ['./credentials-footer.component.scss']
})
export class CredentialsFooterComponent {

  public readonly currentAppTitle$: Observable<string> = this.getCurrentTitle();

  constructor(
    private readonly store: Store
  ) { }

  private getCurrentTitle(): Observable<string> {
    return this.store.select(CurrentAppState.getCurrentApp()).pipe(
      map((currentApp: App) => currentApp?.title ?? null),
    );
  }

}