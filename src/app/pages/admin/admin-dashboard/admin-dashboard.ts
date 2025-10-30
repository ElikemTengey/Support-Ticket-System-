import { Component, computed, effect, inject, signal } from '@angular/core';
import { TicketService } from '../../../services/services/ticket';
import { TicketCard } from '../../../components/ticket-card/ticket-card';

@Component({
  selector: 'app-admin-dashboard',
  imports: [TicketCard],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  private ticketService = inject(TicketService);

  tickets = signal<any[]>([]);

  total = computed(() => this.tickets().length);
  open = computed(() => this.tickets().filter(t => t.status === 'open').length);
  resolved = computed(() => this.tickets().filter(t => t.status === 'resolved').length);

  constructor() {

    effect(() => {
      this.load();
    });
  }

  load() {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets.set(tickets);
    });
  }

  changeStatus(ticket: any, status: string) {
    this.ticketService.updateTicket(ticket.id, { status }).subscribe(() => {
      // Update local signal value immutably
      this.tickets.update(tickets =>
        tickets.map(t =>
          t.id === ticket.id ? { ...t, status } : t
        )
      );
    });
  }
}


