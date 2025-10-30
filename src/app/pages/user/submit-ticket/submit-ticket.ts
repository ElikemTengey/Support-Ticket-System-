import {Component, inject} from '@angular/core';
import { TicketService } from '../../../services/services/ticket';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../../services/services/auth';


@Component({
  selector: 'app-submit-ticket',
  imports: [
    ReactiveFormsModule, 
    ],
  templateUrl: './submit-ticket.html',
  styleUrl: './submit-ticket.scss',
})
export class SubmitTicket {
  ticketService = inject(TicketService);
  auth = inject(AuthService);
  form = new FormGroup({
    title: new FormControl(''),
    priority: new FormControl('medium'),
    description: new FormControl('')
  });
  message = '';

  submit() {
    const user = this.auth.getCurrentUser();
    if (!user) { this.message = 'You must be logged in'; return; }
    const payload = {
      ...this.form.value,
      status: 'open',
      userId: user.id,
      createdAt: new Date().toISOString(),
      responses: []
    };
    this.ticketService.createTicket(payload).subscribe(() => {
      this.message = 'Ticket submitted';
      this.form.reset({ priority: 'medium' });
    });
  }

}
