// data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private formDataSubject = new BehaviorSubject<any>(null);
  formData$ = this.formDataSubject.asObservable();

  setFormData(formData: any) {
    this.formDataSubject.next(formData);
  }

  getFormData(): any {
    return this.formDataSubject.value;
  }
}
