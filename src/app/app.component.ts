import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private taskService: TaskService) {}

  handleTaskCreated(title: string): void {
    this.taskService.addTask(title);
  }
}
