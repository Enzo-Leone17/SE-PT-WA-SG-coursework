import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

// Types for dashboard configuration
export interface Category {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  component:
    | React.ComponentType<any>
    | React.FC<any>
    | React.ReactNode
    | Promise<React.ReactNode>;
  props?: Record<string, any>;
  filterButton?: React.ReactNode | Promise<React.ReactNode> | null;
  sortButton?: React.ReactNode | Promise<React.ReactNode> | null;
  searchInput?: React.ReactNode | Promise<React.ReactNode> | null;
}

export interface DashboardProps {
  categories: Category[];
  defaultCategory?: string;
  sidebarWidth?: string;
  collapsible?: boolean;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
  title?: string;
}

// Main Dashboard Component
export const Dashboard: React.FC<DashboardProps> = ({
  categories,
  defaultCategory,
  sidebarWidth = "w-64",
  collapsible = true,
  className = "",
  sidebarClassName = "",
  contentClassName = "",
  title = "Dashboard",
}) => {
  const [activeCategory, setActiveCategory] = useState(
    defaultCategory || (categories.length > 0 ? categories[0].id : "")
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const currentCategory = categories.find((cat) => cat.id === activeCategory);
  const CurrentComponent = currentCategory?.component;

  return (
    <div className={`flex h-screen bg-gray-100 ${className}`}>
      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? "w-16" : sidebarWidth
        } bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col ${sidebarClassName}`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {!sidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {title}
            </h1>
          )}
          {collapsible && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              aria-label={
                sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {sidebarCollapsed ? (
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {categories.map((category) => {
            const Icon = category.icon || HomeIcon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-900 border border-blue-200 dark:border-blue-500 dark:bg-blue-500 dark:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title={sidebarCollapsed ? category.label : undefined}
              >
                <Icon
                  className={`${
                    sidebarCollapsed ? "h-6 w-6" : "h-5 w-5"
                  } flex-shrink-0`}
                />
                {!sidebarCollapsed && (
                  <span className="ml-3 truncate">{category.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden ${contentClassName}`}
      >
        {/* Content Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentCategory?.label || "Dashboard"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Welcome to your dashboard management panel
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {typeof currentCategory?.filterButton === "function"
                ? currentCategory?.filterButton
                : React.isValidElement(currentCategory?.filterButton)
                ? currentCategory?.filterButton
                : null}
              {typeof currentCategory?.sortButton === "function"
                ? currentCategory?.sortButton
                : React.isValidElement(currentCategory?.sortButton)
                ? currentCategory?.sortButton
                : null}
              {typeof currentCategory?.searchInput === "function"
                ? currentCategory?.searchInput
                : React.isValidElement(currentCategory?.searchInput)
                ? currentCategory?.searchInput
                : null}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {typeof CurrentComponent === "function" ? (
            <CurrentComponent {...(currentCategory?.props || {})} />
          ) : React.isValidElement(CurrentComponent) ? (
            CurrentComponent
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">
                No component found for this category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Example implementation
// const ExampleDashboard = () => {
//   const dashboardCategories: Category[] = [
//     {
//       id: 'users',
//       label: 'Users',
//       icon: Users,
//       component: UsersTable,
//     },
//     {
//       id: 'orders',
//       label: 'Orders',
//       icon: ShoppingCart,
//       component: OrdersTable,
//     },
//     {
//       id: 'products',
//       label: 'Products',
//       icon: Package,
//       component: ProductsTable,
//     },
//     {
//       id: 'analytics',
//       label: 'Analytics',
//       icon: BarChart3,
//       component: AnalyticsTable,
//     },
//     {
//       id: 'settings',
//       label: 'Settings',
//       icon: Settings,
//       component: SettingsTable,
//     },
//   ];

//   return (
//     <Dashboard
//       categories={dashboardCategories}
//       defaultCategory="users"
//       title="Admin Panel"
//       collapsible={true}
//     />
//   );
// };

export default Dashboard;
