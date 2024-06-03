export interface DashboardCounts {
    fournisseursCount: number;
    articlesCount: number;
    totalRevenue: number;  // Add this line
}

export class PurchaseOrderGrowth {
    date: string = '';
    count: number = 0;
}
