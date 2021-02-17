import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Note } from '@shared/interfaces/note.interface';
import { NotesState } from '@shared/stores/notes/notes.state';
import { Observable } from 'rxjs';

@Injectable()
export class NotesPageService {
  public readonly notesList$: Observable<Note[]> = this.store.select(
    NotesState
  );

  constructor(private readonly store: Store) {}
}
