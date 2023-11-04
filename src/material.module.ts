import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  exports: [MatInputModule, MatFormFieldModule, FormsModule,MatButtonModule],
})
export class MaterialModule {}
