import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Link } from '@shared/interfaces/link.interface';
import { Observable } from 'rxjs';
import { LinksPageService } from './links-page.service';

@Component({
  selector: 'app-links-page',
  templateUrl: './links-page.component.html',
  styleUrls: ['./links-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksPageComponent {
  public readonly linksList$: Observable<Link[]> = this.linksPageService
    .linksList$;

  constructor(private readonly linksPageService: LinksPageService) {}
}
