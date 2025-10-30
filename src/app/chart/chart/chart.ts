import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { NgApexchartsModule, ChartComponent } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './chart.html',
  styleUrl: './chart.scss'
})
export class Chart implements OnInit, OnDestroy {
  @ViewChild('chart') chart!: ChartComponent;
  private http = inject(HttpClient);

  chartOptions!: ChartOptions;
  private refreshSub!: Subscription;
  private readonly baseUrl = 'http://localhost:3000/tickets';

  ngOnInit() {
    // Initialize chart config
    this.chartOptions = {
      series: [0, 0, 0],
      chart: {
        type: 'pie',
        width: 380,
        animations: { enabled: true, dynamicAnimation: { speed: 500 } }
      },
      labels: ['Closed', 'Pending', 'Resolved'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 300 },
            legend: { position: 'bottom' }
          }
        }
      ],
      title: {
        text: 'Ticket Status Distribution'
      }
    };

    // Load initial data
    this.loadTicketData();

    // 🔁 Refresh chart data automatically every 5 seconds
    this.refreshSub = interval(5000).subscribe(() => {
      this.loadTicketData();
    });
  }

  loadTicketData() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (tickets) => {
        const closed = tickets.filter(t => t.status === 'closed').length;
        const pending = tickets.filter(t => t.status === 'pending').length;
        const resolved = tickets.filter(t => t.status === 'resolved').length;

        // Update chart dynamically
        this.chartOptions = {
          ...this.chartOptions,
          series: [closed, pending, resolved]
        };
      },
      error: (err) => console.error('Error loading ticket data:', err)
    });
  }

  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }
}
