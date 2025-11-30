import React, { useState } from 'react';
import Navigation from '../layout/Navigation';
import DashboardNew from '../dashboard/Dashboard';
import Reports from '../reports/Reports';
import apiClient from '../../lib/api-client';

const RayEgyptSystem: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardNew />;
      case 'reports':
        return <Reports />;
      case 'companies':
        return <div className="p-6"><h2 className="text-2xl font-bold">Companies Management</h2><p className="text-gray-600">Coming soon...</p></div>;
      case 'customers':
        return <div className="p-6"><h2 className="text-2xl font-bold">Customers Management</h2><p className="text-gray-600">Coming soon...</p></div>;
      case 'products':
        return <div className="p-6"><h2 className="text-2xl font-bold">Products Management</h2><p className="text-gray-600">Coming soon...</p></div>;
      case 'invoices':
        return <div className="p-6"><h2 className="text-2xl font-bold">Invoices Management</h2><p className="text-gray-600">Coming soon...</p></div>;
      default:
        return <DashboardNew />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default RayEgyptSystem;
