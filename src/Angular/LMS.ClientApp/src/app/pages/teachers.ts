import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiConsumer } from '../services/api-consumer';
import { Teacher } from '../models/teacher';

@Component({
  imports: [],
  templateUrl: './teachers.html',
})
export class Teachers implements OnInit {

  private apiConsumer = inject(ApiConsumer);

  protected teachers: Teacher[] = [];

  async ngOnInit(): Promise<void> {

    this.teachers = await this.apiConsumer.getTeachers();

  }

}