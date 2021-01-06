import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {TaskService} from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private taskService: TaskService) {
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username !== null) {
      this.taskService.getTask(username).subscribe((task) => {
        if (task.user !== null) {
          this.todo = task.leftColumn;
          this.done = task.rightColumn;
        }
      });
    }

  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('user name: ' + localStorage.getItem('username'));
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.saveTask({
        id: null,
        leftColumn: event.container.data,
        user: localStorage.getItem('username')
      }).subscribe((tasks) => console.log('returned tasks ' + tasks.leftColumn + ' - ' + tasks.rightColumn));
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.taskService.saveTask({
        id: null,
        leftColumn: event.previousContainer.data,
        rightColumn: event.container.data,
        user: localStorage.getItem('username')
      }).subscribe((tasks) => console.log('returned tasks ' + tasks.leftColumn + ' - ' + tasks.rightColumn));
    }
  }

}
