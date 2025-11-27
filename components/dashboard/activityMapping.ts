// نظام تعيين الأنشطة مع مكونات لوحات المعلومات
import React from 'react';
import { ActivityGroupType } from '../../types/activities';

// Dynamic imports for lazy loading (reduces bundle size)
const dashboardComponents: Record<string, React.LazyExoticComponent<any>> = {
  FoodDashboard: React.lazy(() => import('./restaurant/RestaurantDashboard')),
  RetailDashboard: React.lazy(() => import('./retail/RetailDashboard')),
  ServicesDashboard: React.lazy(() => import('./services/ServicesDashboard')),
  HealthDashboard: React.lazy(() => import('./clinic/ClinicDashboard')),
  RealEstateDashboard: React.lazy(() => import('./realestate/RealEstateDashboard')),
  AutomotiveDashboard: React.lazy(() => import('./cars/CarsDashboard')),
  EntertainmentDashboard: React.lazy(() => import('./admin/AdminDashboard')), // Placeholder
};

// Activity group to dashboard component mapping
export const activityGroupDashboardMap: Record<ActivityGroupType, string> = {
  food: 'FoodDashboard',
  services: 'ServicesDashboard',
  retail: 'RetailDashboard',
  health: 'HealthDashboard',
  realestate: 'RealEstateDashboard',
  automotive: 'AutomotiveDashboard',
  entertainment: 'EntertainmentDashboard',
};

// Mapping of activity types to their corresponding activity IDs
export const activityTypeToActivityId: Record<string, string> = {
  // Food activities
  restaurant: 'restaurant',
  cafe: 'cafe',
  bakery: 'bakery',

  // Service activities
  plumbing: 'plumbing',
  electrical: 'electrical',
  carpentry: 'carpentry',
  cleaning: 'cleaning',
  painting: 'painting',
  construction: 'construction',

  // Retail activities
  clothing: 'clothing',
  electronics: 'electronics',
  supermarket: 'supermarket',
  books: 'books',
  gifts: 'gifts',
  hardware: 'hardware',

  // Health activities
  clinic: 'clinic',
  pharmacy: 'pharmacy',
  lab: 'lab',
  salon: 'salon',
  gym: 'gym',
  spa: 'spa',

  // Real estate
  realestate: 'realestate',

  // Automotive
  dealership: 'dealership',
  carwash: 'carwash',
  maintenance: 'maintenance',
  rental: 'rental',

  // Entertainment
  cinema: 'cinema',
  themepark: 'themepark',
  training: 'training',
  event: 'event',
};

// All supported activity IDs (30 total)
export const ALL_ACTIVITY_IDS = Object.values(activityTypeToActivityId);

// Get the appropriate dashboard component for an activity
export const getDashboardComponent = (activityId: string): React.LazyExoticComponent<any> | null => {
  // Map activity ID to group
  const activity = require('../../types/activities').ACTIVITIES[activityId];
  if (!activity) return null;

  const groupId = activity.groupId as ActivityGroupType;
  const componentName = activityGroupDashboardMap[groupId];
  return dashboardComponents[componentName] || null;
};

// Group activities by their category for UI
export const groupedActivities = {
  food: ['restaurant', 'cafe', 'bakery'],
  services: ['plumbing', 'electrical', 'carpentry', 'cleaning', 'painting', 'construction'],
  retail: ['clothing', 'electronics', 'supermarket', 'books', 'gifts', 'hardware'],
  health: ['clinic', 'pharmacy', 'lab', 'salon', 'gym', 'spa'],
  realestate: ['realestate'],
  automotive: ['dealership', 'carwash', 'maintenance', 'rental'],
  entertainment: ['cinema', 'themepark', 'training', 'event'],
};
