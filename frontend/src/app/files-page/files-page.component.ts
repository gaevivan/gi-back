import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { File } from '@shared/interfaces/file.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilesPageService } from './files-page.service';

@Component({
  selector: 'app-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesPageComponent {
  public readonly filesList$: Observable<File[]> = this.filesPageService
    .filesList$;
  public readonly isEmptyFilesList$: Observable<boolean> = this.filesList$.pipe(
    map((filesList: File[]) => filesList === null || filesList.length === 0)
  );

  constructor(private readonly filesPageService: FilesPageService) {}
}
