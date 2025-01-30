import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostOfficeService } from './post-office.service'; // Import the PostOfficeService

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private apiUrl = 'http://localhost:3000/api/shipments'; // Replace with your backend API URL

  constructor(
    private http: HttpClient,
    private postOfficeService: PostOfficeService // Inject the PostOfficeService
  ) {}

  // Fetch all shipments
  getShipments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new shipment
  addShipment(shipment: any): Observable<any> {
    console.log(shipment)
    return this.http.post(this.apiUrl, shipment);
  }

  // Update an existing shipment
  updateShipment(id: string, shipment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, shipment);
  }

  // Delete a shipment
  deleteShipment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Fetch all zip codes from PostOfficeService
  getZipCodes(): Observable<any[]> {
    return this.postOfficeService.getPostOffices(1, 100); // Retrieve all zip codes, adjust limit if needed
  }
}
