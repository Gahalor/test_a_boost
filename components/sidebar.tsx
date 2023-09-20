"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils";
import { Code, LayoutList, ImageIcon, LayoutDashboard, MessageSquare, ListChecks, Settings } from "lucide-react";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"]});

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
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 flex flex-col h-full text-white px-6">
        <div className="flex-1">
          <div className="h-24 py-6">
            <Link href="/dashboard" className="flex items-center mb-14 h-full">
              <div className="relative w-44 h-6 mr-4">
                <Image fill alt="Logo" src="/logo-b.svg" />
              </div>
            </Link>

          </div>
          <div className="space-y-2 border p-4">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href} 

              className={cn(
                "text-sm group flex px-6 py-5 w-full justify-start font-medium cursor-pointer hover:text-boost-500 hover:bg-boost-500/10 rounded-lg transition", pathname === route.href ? "text-white bg-boost-500" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        </div>
    </div>
  )
}

export default Sidebar;