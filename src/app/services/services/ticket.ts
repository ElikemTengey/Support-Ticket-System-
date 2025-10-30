import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {authGuard} from '../../guards/auth-guard';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http=inject(HttpClient);
  private baseUrl = 'http://localhost:3000/tickets';
  private auth= inject(authGuard);

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getUserTickets(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?userId=${userId}`);
  }

  createTicket(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  updateTicket(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }


}
