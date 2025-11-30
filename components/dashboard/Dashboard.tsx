import React, { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

interface DashboardStats {
  customers: {
    total: number;
    active: number;
    inactive: number;
    individual: number;
    company: number;
  };
  products: {
    total: number;
    active: number;
    inactive: number;
    lowStock: number;
    totalValue: number;
  };
  invoices: {
    total: number;
    draft: number;
    sent: number;
    paid: number;
    overdue: number;
    totalRevenue: number;
    unpaidRevenue: number;
  };
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const dashboardStats = await apiClient.getDashboardStats();
      setStats(dashboardStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
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
            onClick={loadDashboardStats}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Ray Egypt System</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Customers Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Customers</h3>
            <div className="bg-blue-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.customers.total}</div>
          <div className="text-sm text-gray-600">Total Customers</div>
          <div className="mt-2 text-xs text-green-600">
            {stats.customers.active} active
          </div>
        </div>

        {/* Products Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Products</h3>
            <div className="bg-green-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.products.total}</div>
          <div className="text-sm text-gray-600">Total Products</div>
          <div className="mt-2 text-xs text-orange-600">
            {stats.products.lowStock} low stock
          </div>
        </div>

        {/* Invoices Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Invoices</h3>
            <div className="bg-purple-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.invoices.total}</div>
          <div className="text-sm text-gray-600">Total Invoices</div>
          <div className="mt-2 text-xs text-blue-600">
            {stats.invoices.paid} paid
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
            <div className="bg-yellow-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${stats.invoices.totalRevenue.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Total Revenue</div>
          <div className="mt-2 text-xs text-red-600">
            ${stats.invoices.unpaidRevenue.toFixed(2)} unpaid
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Customer Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Individual</span>
              <span className="font-semibold">{stats.customers.individual}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Companies</span>
              <span className="font-semibold">{stats.customers.company}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active</span>
              <span className="font-semibold text-green-600">{stats.customers.active}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Inactive</span>
              <span className="font-semibold text-red-600">{stats.customers.inactive}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Product Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Active</span>
              <span className="font-semibold text-green-600">{stats.products.active}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Inactive</span>
              <span className="font-semibold text-red-600">{stats.products.inactive}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low Stock</span>
              <span className="font-semibold text-orange-600">{stats.products.lowStock}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Value</span>
              <span className="font-semibold">${stats.products.totalValue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Invoice Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Draft</span>
              <span className="font-semibold text-gray-600">{stats.invoices.draft}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sent</span>
              <span className="font-semibold text-blue-600">{stats.invoices.sent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Paid</span>
              <span className="font-semibold text-green-600">{stats.invoices.paid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overdue</span>
              <span className="font-semibold text-red-600">{stats.invoices.overdue}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={loadDashboardStats}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Refresh Dashboard
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
