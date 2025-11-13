import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private http=inject(HttpClient);
  private auth = inject(AuthService);
  private baseUrl = 'http://localhost:3000/tickets';

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?_expand=user`);
  }

  getUserTickets(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?userId=${userId}&_expand=user`);
  }

  createTicket(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  updateTicket(id: number, data: any) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }


}


