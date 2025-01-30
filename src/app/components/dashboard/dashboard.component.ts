import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ShipmentService } from '../../services/shipment.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  shipments: any[] = [];
  displayedColumns: string[] = [
    'id', 
    'type', 
    'weight', 
    'status', 
    'origin_address', 
    'destination_address', 
    'actions'
  ];

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.shipmentService.getShipments().subscribe((data) => {
      this.shipments = data.map(shipment => {
        // Assuming the shipment object has origin and destination zip codes, you can map them to addresses
        shipment.origin_address = this.getAddressByZipCode(shipment.origin_zip_code); // Add this logic
        shipment.destination_address = this.getAddressByZipCode(shipment.destination_zip_code); // Add this logic
        return shipment;
      });
    });
  }

  // Placeholder function for mapping zip code to an address
  getAddressByZipCode(zipCode: string): string {
    // In a real application, you'd query the backend or an external service to get the address
    // For now, return a placeholder address
    return `Address for ${zipCode}`;
  }

  deleteShipment(id: string): void {
    this.shipmentService.deleteShipment(id).subscribe(() => {
      this.loadShipments();
    });
  }
}
