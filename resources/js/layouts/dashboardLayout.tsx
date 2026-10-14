import { AppSidebar } from "@/components/app-sidebar";
import NavDash from "@/components/NavDash";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="w-full">
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full overflow-hidden bg-slate-100">
                    <NavDash />
                    <div className="p-6">{children}</div>
                </main>
            </SidebarProvider>
        </div>
    );
};

export default DashboardLayout;
