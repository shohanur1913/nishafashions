"use client"

import * as React from "react"
import {
  IconDashboard,
  IconDatabase,
  IconFileDescription,
  IconFlame,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Nisha Fashions Admin",
    email: "admin@nishafashions.com",
    avatar: "/favicon.ico",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Pages",
      url: "/admin/pages",
      icon: IconFileDescription,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: IconListDetails,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: IconFolder,
    },
    {
      title: "Hot Deals",
      url: "/admin/hot-deals",
      icon: IconFlame,
    },
    {
      title: "Buyer Inquiries",
      url: "/admin/enquiries",
      icon: IconUsers,
    },
    {
      title: "Media Library",
      url: "/admin/media",
      icon: IconDatabase,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/admin/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/admin/support",
      icon: IconHelp,
    },
    {
      title: "View Website",
      url: "/",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/70 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="h-auto p-0 hover:bg-transparent active:bg-transparent focus-visible:ring-0"
            >
              <a href="/admin" className="flex items-center justify-center w-full">
                <div className="flex w-full items-center justify-center rounded-xl bg-white p-1 shadow-2xs border border-border/60 hover:border-border transition-all">
                  <img
                    src="/images/logo.jpg"
                    alt="Nisha Fashions Wear"
                    className="w-full h-12 sm:h-14 object-contain"
                  />
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/70 p-2 space-y-1.5">
        <NavUser user={data.user} />
        <div className="pt-1.5 border-t border-sidebar-border/60 text-[11px] text-muted-foreground text-center leading-normal pb-0.5 px-2">
          <p className="flex items-center justify-center flex-wrap gap-1">
            <span>Powered by</span>
            <a 
              href="https://bangladeshhost.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Bangladesh Host
            </a>
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
