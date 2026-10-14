import DashboardLayout from "@/layouts/dashboardLayout";
import React from "react";

const Dashboard = () => {
    return (
        <div>
            <p>Dashboard Home</p>
        </div>
    );
};

export default Dashboard;

Dashboard.layout = (page: React.ReactNode) => (
    <DashboardLayout>{page}</DashboardLayout>
);
