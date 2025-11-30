import React, { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

interface ReportData {
  revenue: {
    monthly: Array<{ month: string; revenue: number }>;
    total: number;
  };
  topCustomers: Array<{ name: string; totalSpent: number; invoiceCount: number }>;
  topProducts: Array<{ name: string; soldQuantity: number; revenue: number }>;
  paymentMethods: Array<{ method: string; amount: number; percentage: number }>;
}

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    loadReportData();
  }, [dateRange]);

  const loadReportData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, we'll create mock data since we don't have a dedicated reports API
      // In a real implementation, you would call: apiClient.getReports(dateRange)
      const mockData: ReportData = {
        revenue: {
          monthly: [
            { month: 'Jan 2025', revenue: 45000 },
            { month: 'Feb 2025', revenue: 52000 },
            { month: 'Mar 2025', revenue: 48000 },
            { month: 'Apr 2025', revenue: 61000 },
            { month: 'May 2025', revenue: 58000 },
            { month: 'Jun 2025', revenue: 72000 },
          ],
          total: 336000
        },
        topCustomers: [
          { name: 'Ahmed Mohamed', totalSpent: 85000, invoiceCount: 12 },
          { name: 'Sarah Ahmed', totalSpent: 62000, invoiceCount: 8 },
          { name: 'Mohamed Ali', totalSpent: 48000, invoiceCount: 6 },
          { name: 'Fatima Hassan', totalSpent: 35000, invoiceCount: 5 },
          { name: 'Omar Khalid', totalSpent: 28000, invoiceCount: 4 },
        ],
        topProducts: [
          { name: 'Laptop Dell XPS 15', soldQuantity: 45, revenue: 1125000 },
          { name: 'iPhone 15 Pro', soldQuantity: 120, revenue: 144000 },
          { name: 'Samsung Galaxy S24', soldQuantity: 85, revenue: 68000 },
          { name: 'iPad Air', soldQuantity: 35, revenue: 28000 },
          { name: 'AirPods Pro', soldQuantity: 200, revenue: 50000 },
        ],
        paymentMethods: [
          { method: 'Bank Transfer', amount: 180000, percentage: 53.6 },
          { method: 'Cash', amount: 85000, percentage: 25.3 },
          { method: 'Credit Card', amount: 45000, percentage: 13.4 },
          { method: 'Check', amount: 26000, percentage: 7.7 },
        ]
      };
      
      setReportData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading reports...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">
          <h3 className="text-lg font-semibold">Error</h3>
          <p>{error}</p>
          <button
            onClick={loadReportData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-2">Business analytics and insights</p>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={loadReportData}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue Trend</h3>
          <div className="space-y-3">
            {reportData.revenue.monthly.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{item.month}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(item.revenue / Math.max(...reportData.revenue.monthly.map(m => m.revenue))) * 100}%` }}
                    />
                  </div>
                  <span className="font-semibold">${item.revenue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">Total Revenue</span>
              <span className="text-xl font-bold text-green-600">
                ${reportData.revenue.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {reportData.paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{method.method}</span>
                <div className="text-right">
                  <div className="font-semibold">${method.amount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{method.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Customers</h3>
          <div className="space-y-3">
            {reportData.topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-600">{customer.invoiceCount} invoices</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    ${customer.totalSpent.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Top Products</h3>
          <div className="space-y-3">
            {reportData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.soldQuantity} units sold</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">
                    ${product.revenue.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Export Options</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            Export as Excel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Export as PDF
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
            Export as CSV
          </button>
          <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
