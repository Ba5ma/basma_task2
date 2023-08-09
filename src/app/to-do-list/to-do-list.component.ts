import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {
  tasks: string[] = [];
  newTask: string = '';
  errorMessage : string = '';

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }

  addTask() {
    
    const trimmedTask = this.newTask.trim();
    if (trimmedTask.length >= 4 && trimmedTask.length <= 200 && /^[a-zA-Z0-9\s]*$/.test(trimmedTask)) {
      this.tasks.push(trimmedTask);
      this.newTask = '';
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Task must be between 4 and 200 characters and contain only letters, numbers, and spaces.';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.errorMessage = '';
  }


 

  private loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }
}

