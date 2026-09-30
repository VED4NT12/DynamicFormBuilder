import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { DynamicField } from '../../Models/field.model';

import { DynamicFormComponent } from '../dynamic-form.component/dynamic-form.component';

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormComponent,
  ],
  templateUrl: './form-renderer.html',
  styleUrl: './form-renderer.css',
})
export class FormRendererComponent
  implements OnInit
{
  fields: DynamicField[] = [];

  ngOnInit(): void {

    const savedForm =
      localStorage.getItem(
        'dynamic-form'
      );

    if (savedForm) {

      this.fields =
        JSON.parse(savedForm);

    }
  }
}