import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { File } from '@shared/interfaces/file.interface';
import { FilesState } from '@shared/stores/files/files.state';
import { Observable } from 'rxjs';

@Injectable()
export class FilesPageService {
  public readonly filesList$: Observable<File[]> = this.store.select(
    FilesState
  );

  constructor(private readonly store: Store) {}
}
