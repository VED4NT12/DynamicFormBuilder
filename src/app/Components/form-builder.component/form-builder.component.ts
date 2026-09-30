import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicField } from '../../Models/field.model';
import { DynamicFormComponent } from '../dynamic-form.component/dynamic-form.component';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.css',
})
export class FormBuilderComponent {
  jsonData = '';
  fields: DynamicField[] = [];
  constructor(private router: Router) {}

  availableFields = [
    { type: 'text', label: 'Text' },
    { type: 'email', label: 'Email' },
    { type: 'number', label: 'Number' },
    { type: 'textarea', label: 'Textarea' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'radio', label: 'Radio' },
    { type: 'dropdown', label: 'Dropdown' },
    { type: 'date', label: 'Date' },
  ];

  addField(type: string, index?: number) {
    const newField: DynamicField = {
      id: crypto.randomUUID(),
      label: 'New Field',
      type: type as any,
      required: false,
      placeholder: '',
      defaultValue: '',
      minLength: 0,
      maxLength: 100,
      min: 0,
      max: 100,
      options: type === 'radio' || type === 'checkbox' || type === 'dropdown' ? ['Option 1'] : [],
    };

    if (index === undefined || index >= this.fields.length) {
      this.fields = [...this.fields, newField];
    } else {
      const updated = [...this.fields];
      updated.splice(index, 0, newField);
      this.fields = updated;
    }

    console.log('FIELDS:', this.fields);
  }

  exportJson() {
    this.jsonData = JSON.stringify(this.fields, null, 2);
    console.log(this.jsonData);
  }

  importJson() {
    try {
      const importedFields = JSON.parse(this.jsonData);
      this.fields = importedFields;
      this.refreshPreview();
      console.log('Imported Successfully');
    } catch {
      alert('Invalid JSON');
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  removeField(index: number) {
    this.fields.splice(index, 1);
    this.refreshPreview();
  }

  addOption(field: DynamicField) {
    field.options ??= [];
    field.options.push(`Option ${field.options.length + 1}`);
    this.refreshPreview();
  }
  
  trackByField(index: number, field: DynamicField): string {
    return field.id;
  }

  removeOption(field: DynamicField, index: number) {
    field.options?.splice(index, 1);
    this.refreshPreview();
  }

  refreshPreview() {
    this.fields = [...this.fields];
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // Reordering within the designer
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
      this.refreshPreview();
    } else {
      // Dragged in from the toolbox palette
      const draggedType = event.previousContainer.data[event.previousIndex].type;
      this.addField(draggedType, event.currentIndex);
    }
  }
  saveForm() {
    localStorage.setItem('dynamic-form', JSON.stringify(this.fields));

    this.router.navigate(['/render']);
  }
}
