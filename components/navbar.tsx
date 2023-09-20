"use client";

import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import Link from "next/link";
import MobileSidebar from "@/components/mobile-sidebar";
import { LayoutList, LayoutDashboard, MessageSquare, ListChecks, Settings } from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-boost-100",
  },
  {
    label: 'Question Generator',
    icon: MessageSquare,
    color: "text-boost-100",
    href: '/question',
  },
  {
    label: 'Test Builder',
    icon: LayoutList,
    color: "text-boost-100",
    href: '/test',
  },
  {
    label: 'Test Review',
    icon: ListChecks,
    href: '/conversation',
    color: "text-boost-100",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="h-full flex items-center px-6">
        <div className="w-full flex flex-row">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}

              className={cn(
                "text-sm flex flex-row px-6 justify-start font-medium cursor-pointer hover:text-boost-500 transition", pathname === route.href ? "text-boost-500" : "text-zinc-400"
              )}
            >
              <div className="flex items-center">
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        <div className="w-1/4">
          <UserButton afterSignOutUrl="/" />
        </div>
    </div>
  );
}

export default Navbar;