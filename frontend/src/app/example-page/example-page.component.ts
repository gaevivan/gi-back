import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { StorageRequests } from '@shared/requests/storage.requests';
import { CurrentAppActions } from '@shared/stores/current-app/current-app.actions';

@Component({
  selector: 'app-example-page',
  templateUrl: './example-page.component.html',
  styleUrls: ['./example-page.component.scss'],
})
export class ExamplePageComponent implements OnInit {
  constructor(
    private readonly store: Store,
    private readonly storageRequests: StorageRequests
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new CurrentAppActions.Cache({ title: 'Test-App' }));
    this.storageRequests.select().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.store.dispatch(new CurrentAppActions.Cache(null));
  }
}
