import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DynamicField } from '../../Models/field.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent implements OnChanges {
  @Input()
  fields: DynamicField[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fields.forEach((field) => {
      if (!this.form.contains(field.id)) {
        this.form.addControl(
          field.id,
          this.fb.control(field.type === 'checkbox' ? [] : (field.defaultValue ?? '')),
        );
      }

      const control = this.form.get(field.id);

      control?.setValidators(this.getValidators(field));

      control?.updateValueAndValidity();
    });
  }
  isChecked(fieldId: string, option: string): boolean {
    const control = this.form.get(fieldId);

    return control?.value?.includes(option) ?? false;
  }
  onCheckboxChange(event: any, fieldId: string, option: string) {
    const control = this.form.get(fieldId);

    if (!control) return;

    const values = [...(control.value || [])];

    if (event.target.checked) {
      values.push(option);
    } else {
      const index = values.indexOf(option);

      if (index > -1) {
        values.splice(index, 1);
      }
    }

    control.setValue(values);
  }
  getValidators(field: DynamicField) {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }

    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }

    if (field.type === 'number') {
      if (field.min !== undefined) {
        validators.push(Validators.min(field.min));
      }

      if (field.max !== undefined) {
        validators.push(Validators.max(field.max));
      }
    }

    return validators;
  }

  submit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      console.log('FORM INVALID');

      console.log(this.form.errors);

      return;
    }

    console.log(this.form.value);
  }
}
