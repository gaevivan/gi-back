import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Link } from '@shared/interfaces/link.interface';
import { LinksState } from '@shared/stores/links/links.state';
import { Observable } from 'rxjs';

@Injectable()
export class LinksPageService {
  public readonly linksList$: Observable<Link[]> = this.store.select(
    LinksState
  );

  constructor(private readonly store: Store) {}
}
