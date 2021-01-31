import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Application } from '@shared/interfaces/app.interface';
import { ApplicationsActions } from '@shared/stores/applications/applications.actions';
import { ApplicationsState } from '@shared/stores/applications/applications.state';
import { CurrentAppActions } from '@shared/stores/current-app/current-app.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit {

  public readonly applications$: Observable<Application[]> = this.store.select(ApplicationsState);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new CurrentAppActions.Cache({ title: 'Test-App' }));
    this.store.dispatch(new ApplicationsActions.Select({}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CurrentAppActions.Cache(null));
  }
}
