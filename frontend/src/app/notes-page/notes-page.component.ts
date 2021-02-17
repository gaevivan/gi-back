import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Note } from '@shared/interfaces/note.interface';
import { Observable } from 'rxjs';
import { NotesPageService } from './notes-page.service';

@Component({
  selector: 'app-notes-page',
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesPageComponent {
  public readonly notesList$: Observable<Note[]> = this.notesPageService
    .notesList$;

  constructor(private readonly notesPageService: NotesPageService) {}
}
