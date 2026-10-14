import {
    Book,
    BookOpen,
    ChevronDown,
    FileChartColumn,
    Gauge,
    GraduationCap,
    Notebook,
    Users,
} from "lucide-react";
import { useState } from "react";
// import { NavLink, useLocation } from "react-router";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "./ui/sidebar";
import { Link, usePage } from "@inertiajs/react";

const educationItems = [
    { title: "Universitas", url: "/dashboard/education/universitas" },
    { title: "Fakultas", url: "/dashboard/education/fakultas" },
    { title: "Jurusan", url: "/dashboard/education/jurusan" },
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
                            isActive={isPathActive(pathname, "/member")}
                            //   render={<NavLink to='/dashboard/member' />}
                            className="h-10 gap-3 px-3 text-sm"
                            asChild
                        >
                            <Link href="/dashboard/member">
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
                <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="h-8 px-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        Data utama
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={isPathActive(
                                        pathname,
                                        "/education",
                                    )}
                                    onClick={() =>
                                        setEducationOpen(
                                            (open: boolean) => !open,
                                        )
                                    }
                                    aria-expanded={educationOpen}
                                    className="h-10 gap-3 px-3 text-sm"
                                >
                                    <GraduationCap aria-hidden="true" />
                                    <span>Pendidikan</span>
                                    <ChevronDown
                                        className={`ml-auto size-4 text-muted-foreground transition-transform ${educationOpen ? "rotate-180" : ""}`}
                                        aria-hidden="true"
                                    />
                                </SidebarMenuButton>
                                {educationOpen && (
                                    <SidebarMenuSub className="ml-5 mt-1 border-sidebar-border pl-3">
                                        {educationItems.map((item) => (
                                            <SidebarMenuSubItem key={item.url}>
                                                <SidebarMenuSubButton
                                                    isActive={isPathActive(
                                                        pathname,
                                                        item.url,
                                                    )}
                                                    // render={
                                                    //     <NavLink
                                                    //         to={item.url}
                                                    //     />
                                                    // }
                                                    className="text-muted-foreground"
                                                    asChild
                                                >
                                                    <Link href={item.url}>
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    );
}
