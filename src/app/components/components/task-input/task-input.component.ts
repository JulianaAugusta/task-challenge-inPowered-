import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {

  @Output() taskCreated = new EventEmitter<string>();

  constructor() { }

  task: string = '';

  ngOnInit(): void {
  }

  addTask(): void {
    if (this.task.trim()) {
      this.taskCreated.emit(this.task.trim());
      this.task = '';
    }
  }

}
