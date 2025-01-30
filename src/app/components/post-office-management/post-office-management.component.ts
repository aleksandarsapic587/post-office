import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PostOfficeService } from '../../services/post-office.service';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms'; // <-- Add FormsModule here

@Component({
  selector: 'app-post-office-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,  // <-- Add FormsModule to the imports
  ],
  templateUrl: './post-office-management.component.html',
  styleUrls: ['./post-office-management.component.css'],
})
export class PostOfficeManagementComponent implements OnInit {
  postOfficeForm: FormGroup;
  postOffices: any[] = [];
  displayedColumns: string[] = ['zip_code', 'location', 'actions'];
  length: number = 0;

  constructor(private fb: FormBuilder, private postOfficeService: PostOfficeService) {
    this.postOfficeForm = this.fb.group({
      zip_code: [''],
      location: [''],
    });
  }

  ngOnInit(): void {
    this.getPostOffices();
  }

  getPostOffices(): void {
    this.postOfficeService.getPostOffices().subscribe((data) => {
      this.postOffices = data;
      this.length = data.length;
    });
  }

  submitPostOffice(): void {
    if (this.postOfficeForm.valid) {
      this.postOfficeService.addPostOffice(this.postOfficeForm.value).subscribe(() => {
        alert('Post office added successfully!');
        this.postOfficeForm.reset();
        this.getPostOffices();
      });
    }
  }

  removePostOffice(id: string): void {
    this.postOfficeService.deletePostOffice(id).subscribe(() => {
      alert('Post office removed successfully!');
      this.getPostOffices();
    });
  }

  updatePostOffice(id: string, updatedData: any): void {
    this.postOfficeService.updatePostOffice(id, updatedData).subscribe(() => {
      alert('Post office updated successfully!');
      this.getPostOffices();
    });
  }

  // This function will be triggered when the user clicks 'Save' after editing
  saveChanges(postOffice: any): void {
    this.updatePostOffice(postOffice._id, postOffice);
  }

  // This function sets the editing mode for a post office
  editPostOffice(postOffice: any): void {
    postOffice.isEditing = true;
  }

  // This function will reset the editing mode and revert to original data
  cancelEdit(postOffice: any): void {
    postOffice.isEditing = false;
    this.getPostOffices(); // Reload the data to reset changes
  }
}
