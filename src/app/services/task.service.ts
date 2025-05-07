import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { Task } from "../models/task.model";
import { map } from "rxjs/operators"

@Injectable({
  providedIn:  'root'
})

export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private filterSubject = new BehaviorSubject<'all' | 'completed' | 'incomplete'>('all');

  constructor() {
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks) {
      this.tasksSubject.next(JSON.parse(savedTasks));
    }
    this.tasks$.subscribe(tasks => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  tasks$ = this.tasksSubject.asObservable();
  filter$ = this.filterSubject.asObservable();

  filteredTasks$: Observable<Task[]> = combineLatest([
    this.tasks$,
    this.filter$
  ]).pipe(
    map(([tasks, filter]) => {
      if (filter === 'completed') return tasks.filter(t => t.done);
      if (filter === 'incomplete') return tasks.filter(t => !t.done);
      return tasks;
    })
  );

  setFilter(filter: 'all' | 'completed' | 'incomplete'): void {
    this.filterSubject.next(filter);
  }

  addTask(title: string): void {
    const newTask: Task = { title, done: false };
    this.tasksSubject.next([...this.tasksSubject.value, newTask]);
  }

  toggleTask(taskToToggle: Task): void {
    this.tasksSubject.next(
      this.tasksSubject.value.map(task =>
        task === taskToToggle ? { ...task, done: !task.done } : task
      )
    );
  }

  deleteTask(taskToDelete: Task): void {
    this.tasksSubject.next(
      this.tasksSubject.value.filter(task => task !== taskToDelete)
    );
  }
}
