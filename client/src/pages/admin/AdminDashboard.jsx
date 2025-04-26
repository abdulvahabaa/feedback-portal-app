import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Card from "../../components/ui/Card";
import { PiChartLineUp } from "react-icons/pi";
import SimpleFeedbackTable from "../../components/admin/SimpleFeedbackTable";


const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Today's Feedbacks */}
        <Card className="p-5 shadow-md rounded-lg bg-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Feedbacks Today</p>
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition">
              <PiChartLineUp />
              <span>Details</span>
            </button>
          </div>
          <div className="text-2xl font-bold text-gray-900">4</div>
          <p className="text-sm font-semibold text-green-600 mt-2">
            New feedbacks submitted today
          </p>
          <p className="text-xs text-gray-500">Updated a few minutes ago</p>
        </Card>

        {/* Total Feedbacks */}
        <Card className="p-5 shadow-md rounded-lg bg-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Feedbacks</p>
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition">
              <PiChartLineUp />
              <span>Details</span>
            </button>
          </div>
          <div className="text-2xl font-bold text-gray-900">15</div>
          <p className="text-sm font-semibold text-green-600 mt-2">
            Feedbacks received this week
          </p>
          <p className="text-xs text-gray-500">Updated a few minutes ago</p>
        </Card>

        {/* New Registered Users */}
        <Card className="p-5 shadow-md rounded-lg bg-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">New Users</p>
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition">
              <PiChartLineUp />
              <span>Details</span>
            </button>
          </div>
          <div className="text-2xl font-bold text-gray-900">15</div>
          <p className="text-sm font-semibold text-green-600 mt-2">
            Users joined in the last 30 days
          </p>
          <p className="text-xs text-gray-500">Updated a few minutes ago</p>
        </Card>

        {/* Unresolved Feedbacks */}
        <Card className="p-5 shadow-md rounded-lg bg-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">
              Pending Feedbacks
            </p>
            <button className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition">
              <PiChartLineUp />
              <span>Details</span>
            </button>
          </div>
          <div className="text-2xl font-bold text-gray-900">15</div>
          <p className="text-sm font-semibold text-green-600 mt-2">
            Feedbacks not yet addressed
          </p>
          <p className="text-xs text-gray-500">Updated a few minutes ago</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 rounded-lg shadow-md overflow-hidden">
        <SimpleFeedbackTable />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
