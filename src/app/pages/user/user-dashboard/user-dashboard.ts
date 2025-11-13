import { Component, inject, OnInit } from '@angular/core';
import { TicketService } from '../../../services/services/ticket';
import { AuthService } from '../../../services/services/auth';
import { TicketCard } from '../../../components/ticket-card/ticket-card';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [TicketCard,SlicePipe],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit{
  tickets: any[] = [];
  private ticketService = inject(TicketService);
  private auth = inject(AuthService);
  private router = inject(Router);
  
  reloadTickets() {
    const user = localStorage.getItem('currentUser');
  }

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (user) this.fetch(user.id);
  }

  fetch(userId: number) {
    this.ticketService.getUserTickets(userId).subscribe(t =>
       this.tickets = t);
  }

  closeTicket(ticket: any) {
    this.ticketService.updateTicket(ticket.id, { status: 'resolved' }).subscribe(() => {
      ticket.status = 'resolved';
    });
  }
  onTicketSubmitted(newTicket: any) {
  // Add the new ticket to the top of the list
  this.tickets = [...this.tickets, newTicket];
  }

  createTicket(): void {
    
    this.router.navigateByUrl('/submitTicket');
  }
}