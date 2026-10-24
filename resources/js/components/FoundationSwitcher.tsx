import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Foundation } from "@/types";
import { Check, ChevronDown } from "lucide-react";

interface FoundationSwitcherProps {
    foundations: Foundation[];
    activeFoundation: Foundation;
    onSwitchFoundation: (foundation: Foundation) => void;
}

export function FoundationSwitcher({
    foundations,
    activeFoundation,
    onSwitchFoundation,
}: FoundationSwitcherProps) {
    return (
        <div className="p-2.5 my-3 bg-white rounded-xl border border-gray-300/60 shadow-lg">
            {/* Header Info */}
            <div className="flex justify-between items-center mb-1">
                <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                    Yayasan Aktif
                </p>
                <span className="text-[9px] bg-emerald-300/50 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-medium">
                    Active Tenant
                </span>
            </div>

            {/* Dropdown Menu Utama dari Shadcn UI */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-between text-left bg-white text-black border-gray-300/60 h-auto p-2.5 mt-1"
                    >
                        <div className="truncate pr-2">
                            <p className="text-xs font-bold text-black truncate">
                                {activeFoundation.name}
                            </p>
                            <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                                ID: {activeFoundation.code}
                            </p>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    </Button>
                </DropdownMenuTrigger>

                {/* Konten Dropdown */}
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] bg-white border-gray-300/60 text-black">
                    <DropdownMenuLabel className="text-[10px] text-black font-semibold">
                        Ganti Kelolaan Yayasan:
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white" />

                    <DropdownMenuGroup>
                        {foundations.map((foundation) => {
                            const isActive =
                                activeFoundation.id === foundation.id;
                            return (
                                <DropdownMenuItem
                                    key={foundation.id}
                                    onClick={() =>
                                        onSwitchFoundation(foundation)
                                    }
                                    className={`flex items-center justify-between p-2.5 cursor-pointer  focus:text-black ${
                                        isActive
                                            ? "bg-gray-200/60 border-l-2 border-blue-500/70"
                                            : ""
                                    }`}
                                >
                                    <div>
                                        <p className="font-bold text-black">
                                            {foundation.name}
                                        </p>
                                        <p className="text-[10px] text-gray-400 font-mono">
                                            {foundation.code}
                                        </p>
                                    </div>
                                    {isActive && (
                                        <Check className="w-3.5 h-3.5 text-blue-400" />
                                    )}
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
