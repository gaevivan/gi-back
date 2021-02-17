import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Task } from '@shared/interfaces/task.interface';
import { Observable } from 'rxjs';
import { TasksPageService } from './tasks-page.service';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPageComponent {
  public readonly tasksList$: Observable<Task[]> = this.tasksPageService
    .tasksList$;

  constructor(private readonly tasksPageService: TasksPageService) {}
}
