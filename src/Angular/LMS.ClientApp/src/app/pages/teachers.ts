import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiConsumer } from '../services/api-consumer';

@Component({
  imports: [],
  templateUrl: './teachers.html',
})
export class Teachers implements OnInit {

  private apiConsumer = inject(ApiConsumer);

  ngOnInit(): void {
    console.log(234);
    this.apiConsumer.getTeachers();

  }

}