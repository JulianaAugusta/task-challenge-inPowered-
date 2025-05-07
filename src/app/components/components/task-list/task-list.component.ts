import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  filteredTasks$: Observable<Task[]>;
  filter: 'all' | 'completed' | 'incomplete' = 'all';
  showModal = false;
  taskToDelete: Task | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.filteredTasks$ = this.taskService.filteredTasks$;
  }

  setFilter(newFilter: 'all' | 'completed' | 'incomplete') {
    this.filter = newFilter;
    this.taskService.setFilter(newFilter);
  }

  toggleTask(task: Task): void {
    this.taskService.toggleTask(task);
  }

  openDeleteModal(task: Task): void {
    this.taskToDelete = task;
    this.showModal = true;
  }

  confirmDelete(): void {
    if(this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete);
    }
    this.closeModal();
  }

  closeModal(): void {
    this.taskToDelete = null;
    this.showModal = false;
  }

  cancelDelete(): void {
    this.closeModal();
  }
}
