import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostOfficeService {
  private apiUrl = 'http://localhost:3000/api/post-offices'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all post offices with pagination
  getPostOffices(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  // Add a new post office
  addPostOffice(postOffice: any): Observable<any> {
    return this.http.post(this.apiUrl, postOffice);
  }

  // Update an existing post office
  updatePostOffice(id: string, postOffice: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, postOffice);
  }

  // Delete a post office
  deletePostOffice(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
