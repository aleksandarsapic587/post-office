import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ShipmentService } from '../../services/shipment.service';
import { PostOfficeService } from '../../services/post-office.service'; // Import the PostOfficeService
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shipment-management',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './shipment-management.component.html',
  styleUrls: ['./shipment-management.component.css'],
})
export class ShipmentManagementComponent implements OnInit {
  shipmentForm: FormGroup;
  zipCodes: string[] = []; // To hold the list of zip codes

  constructor(
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private postOfficeService: PostOfficeService // Inject PostOfficeService
  ) {
    this.shipmentForm = this.fb.group({
      type: [''],
      weight: [''],
      status: [''],
      origin_zip_code: [''],
      destination_zip_code: [''],
    });
  }

  ngOnInit(): void {
    // Fetching the zip codes from PostOfficeService
    this.getZipCodes();
  }

  // Fetch all zip codes
  getZipCodes(): void {
    this.shipmentService.getZipCodes().subscribe((postOffices) => {
      // Extracting zip codes from postOffices and assuming postOffices is an array of objects
      this.zipCodes = postOffices.map((postOffice) => postOffice.zip_code);
    });
  }

  // Submit shipment and check that origin and destination zip codes are different
  submitShipment(): void {
    if (this.shipmentForm.valid) {
      const { origin_zip_code, destination_zip_code } = this.shipmentForm.value;
      
      // Check if origin and destination zip codes are the same
      if (origin_zip_code === destination_zip_code) {
        alert('Origin and destination ZIP codes must be different.');
        return;
      }

      this.shipmentService.addShipment(this.shipmentForm.value).subscribe(() => {
        alert('Shipment added successfully!');
        this.shipmentForm.reset();
      });
    }
  }
}
