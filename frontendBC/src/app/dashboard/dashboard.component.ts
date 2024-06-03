import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import Chart from 'chart.js/auto';
import { DashboardCounts, PurchaseOrderGrowth } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  counts: DashboardCounts = { fournisseursCount: 0, articlesCount: 0, totalRevenue: 0 };
  purchaseOrderGrowths: PurchaseOrderGrowth[] = [];
  chart: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchCounts();
    this.fetchPurchaseOrderGrowth();
  }

  fetchCounts(): void {
    this.dataService.getDashboardCounts().subscribe({
      next: (data) => {
        this.counts = data;
      },
      error: (error) => console.error('Error fetching dashboard counts:', error)
    });
  }

  fetchPurchaseOrderGrowth(): void {
    this.dataService.getPurchaseOrderGrowth().subscribe({
      next: (data) => {
        this.purchaseOrderGrowths = data; 
        this.renderChart(data.map(d => d.date), data.map(d => d.count));
      },
      error: (error) => console.error('Error fetching purchase order growth:', error)
    });
  }

  renderChart(labels: string[], data: number[]): void {
    const ctx = (document.getElementById('purchaseOrderGrowthChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      if (this.chart) {
        this.chart.destroy(); // Destroy the previous chart instance if it exists
      }

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'variation de commandes',
            data: data,
            borderColor: '#007BFF', 
            backgroundColor: 'rgba(0, 123, 255, 0.2)', // Light blue background color
            borderWidth: 2,
            pointBackgroundColor: '#007BFF',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#007BFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mois/Année'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Nombre de commandes'
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
