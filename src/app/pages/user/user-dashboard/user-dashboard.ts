import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/services/ticket';
import { AuthService } from '../../../services/services/auth';
import { TicketCard } from '../../../components/ticket-card/ticket-card';
import { SubmitTicket } from '../submit-ticket/submit-ticket';

@Component({
  selector: 'app-user-dashboard',
  imports: [TicketCard,SubmitTicket],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss',
})
export class UserDashboard implements OnInit{
  tickets: any[] = [];
  constructor(private ticketService: TicketService, private auth: AuthService) {}

  ngOnInit() {
    const user = this.auth.getCurrentUser();
    if (user) this.fetch(user.id);
  }

  fetch(userId: number) {
    this.ticketService.getUserTickets(userId).subscribe(t => this.tickets = t);
  }

  closeTicket(ticket: any) {
    this.ticketService.updateTicket(ticket.id, { status: 'resolved' }).subscribe(() => {
      ticket.status = 'resolved';
    });
  }

}