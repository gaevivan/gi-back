import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CurrentAppActions } from '@shared/stores/current-app/current-app.actions';
import { CurrentUserActions } from '@shared/stores/current-user/current-user.actions';
import { UsersActions } from '@shared/stores/users/users.actions';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new CurrentAppActions.Cache({ title: 'Test-App' }));
    this.store.dispatch(new CurrentUserActions.GetCurrentUser());
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CurrentAppActions.Cache(null));
  }
}
