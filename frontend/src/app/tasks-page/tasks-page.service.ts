import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Task } from '@shared/interfaces/task.interface';
import { TasksState } from '@shared/stores/tasks/tasks.state';
import { Observable } from 'rxjs';

@Injectable()
export class TasksPageService {
  public readonly tasksList$: Observable<Task[]> = this.store.select(
    TasksState
  );

  constructor(private readonly store: Store) {}
}
