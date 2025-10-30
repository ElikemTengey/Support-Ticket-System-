import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ticket-card',
  imports: [],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.scss',
})
export class TicketCard {
  ticket = input.required<any>();

  //title = computed(() => this.ticket().title.toUpperCase());
 // shortDescription = computed(() => this.ticket().description.slice(0, 100));
//}
}
