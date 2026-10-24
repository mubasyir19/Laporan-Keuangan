import { Book, BookOpen, FileChartColumn, Gauge, Notebook } from "lucide-react";
import { useState } from "react";
// import { NavLink, useLocation } from "react-router";
import { Foundation } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { FoundationSwitcher } from "./FoundationSwitcher";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "./ui/sidebar";

const sampleFoundations: Foundation[] = [
    { id: "1", name: "Yayasan Pendidikan Jaya", code: "YPJ-001" },
    { id: "2", name: "Yayasan Peduli Bangsa", code: "YPB-002" },
    { id: "3", name: "Yayasan Masa Depan Cerah", code: "YMDC-003" },
];

function isPathActive(pathname: string, url: string) {
    return pathname === url || pathname.startsWith(`${url}/`);
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    // const { pathname } = useLocation();
    const { url } = usePage();
    const pathname = url.split("?")[0];
    const [educationOpen, setEducationOpen] = useState(() =>
        pathname.startsWith("/education"),
    );

    const [activeFoundation, setActiveFoundation] = useState<Foundation>(
        sampleFoundations[0],
    );

    return (
        <Sidebar
            {...props}
            className="border-r border-sidebar-border bg-sidebar"
        >
            <SidebarHeader className="border-b border-sidebar-border px-5 py-5">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-background">
                        <BookOpen className="size-4.5" aria-hidden="true" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm font-semibold tracking-tight text-foreground">
                            WargaHub
                        </span>
                        <span className="mt-0.5 text-xs text-muted-foreground">
                            Administrasi komunitas
                        </span>
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-3 py-4">
                <SidebarMenu className="gap-1">
                    <FoundationSwitcher
                        foundations={sampleFoundations}
                        activeFoundation={activeFoundation}
                        onSwitchFoundation={(selected) =>
                            setActiveFoundation(selected)
                        }
                    />
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={isPathActive(pathname, "/dashboard")}
                            //   render={<NavLink to='/dashboard' />}
                            className="h-10 gap-3 px-3 text-sm"
                            asChild
                        >
                            <Link href="/dashboard">
                                <Gauge aria-hidden="true" />
                                <span>Dashboard</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={isPathActive(
                                pathname,
                                "/dashboard/jurnalUmum",
                            )}
                            className="h-10 gap-3 px-3 text-sm"
                            asChild
                        >
                            <Link href="/dashboard/jurnalUmum">
                                <Notebook aria-hidden="true" />
                                <span>Input Jurnal Umum</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={isPathActive(pathname, "/member")}
                            //   render={<NavLink to='/dashboard/member' />}
                            className="h-10 gap-3 px-3 text-sm"
                            asChild
                        >
                            <Link href="/dashboard/member">
                                <Book aria-hidden="true" />
                                <span>Buku Besar (GL)</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={isPathActive(pathname, "/dashboard/coa")}
                            //   render={<NavLink to='/dashboard/member' />}
                            className="h-10 gap-3 px-3 text-sm"
                            asChild
                        >
                            <Link href="/dashboard/coa">
                                <FileChartColumn aria-hidden="true" />
                                <span>Chart of Accounts (CoA)</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={isPathActive(pathname, "/member")}
                            //   render={<NavLink to='/dashboard/member' />}
                            className="h-10 gap-3 px-3 text-sm"
                            asChild
                        >
                            <Link href="/dashboard/member">
                                <FileChartColumn aria-hidden="true" />
                                <span>Neraca Lajur</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={isPathActive(pathname, "/member")}
                            //   render={<NavLink to='/dashboard/member' />}
                            className="h-10 gap-3 px-3 text-sm"
                            asChild
                        >
                            <Link href="/dashboard/member">
                                <FileChartColumn aria-hidden="true" />
                                <span>Laporan</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
