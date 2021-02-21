import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Link } from '@shared/interfaces/link.interface';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LinksPageService } from './links-page.service';

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksPageComponent {
  public readonly searchControl: FormControl = new FormControl('');
  public readonly linksList$: Observable<Link[]> = this.getLinksList();
  public readonly isEmptyLinksList$: Observable<boolean> = this.linksList$.pipe(
    map((linksList: Link[]) => linksList === null || linksList.length === 0)
  );

  constructor(private readonly linksPageService: LinksPageService) {}

  private getLinksList(): Observable<Link[]> {
    return combineLatest([
      this.linksPageService.linksList$,
      this.searchControl.valueChanges.pipe(startWith(null)),
    ]).pipe(
      map(([linksList, searchValue]: [Link[], string]) => {
        if (!searchValue || searchValue.length === 0) {
          return linksList;
        }
        return linksList.filter((link: Link) => {
          const lowerSearchValue: string = searchValue.toLowerCase();
          const lowerName: string = link.name?.toLowerCase();
          const lowerUrl: string = link.url?.toLowerCase();
          const foundInName: boolean = lowerName.includes(lowerSearchValue);
          const foundInUrl: boolean = lowerUrl.includes(lowerSearchValue);
          return foundInName || foundInUrl;
        });
      })
    );
  }
}
