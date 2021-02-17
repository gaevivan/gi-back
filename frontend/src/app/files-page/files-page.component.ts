import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { File } from "@shared/interfaces/file.interface";
import { Observable } from "rxjs";
import { FilesPageService } from "./files-page.service";

@Component({
  selector: 'app-files-page',
  templateUrl: './files-page.component.html',
  styleUrls: ['./files-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesPageComponent {
  public readonly notesList$: Observable<File[]> = this.filesPageService
    .filesList$;

  constructor(private readonly filesPageService: FilesPageService) {}
}