"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  IconLogout,
  IconExternalLink,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react"

export function SiteHeader() {
  const user = {
    name: "Nisha Fashions Admin",
    email: "admin@nishafashions.com",
    avatar: "/favicon.ico",
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-background/95 backdrop-blur-xs sticky top-0 z-20">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-3 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-sm font-semibold tracking-tight text-foreground truncate">
          Control Center
        </h1>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" asChild size="sm" className="hidden md:flex text-xs h-8">
            <a
              href="/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5"
            >
              <span>View Website</span>
              <IconExternalLink className="size-3.5 opacity-60" />
            </a>
          </Button>

          <Button variant="outline" asChild size="sm" className="hidden sm:flex text-xs h-8">
            <Link
              href="/admin/support"
              className="font-medium"
            >
              Support
            </Link>
          </Button>

          {/* Profile Dropdown in Navbar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 p-1 rounded-full hover:bg-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                title="Account Menu"
              >
                <Avatar className="h-8 w-8 rounded-full border border-border">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                    NF
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-xl p-1.5 shadow-xl border border-border"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuLabel className="p-2 font-normal">
                <div className="flex items-center gap-2.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-full border border-border">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                      NF
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-xs leading-tight">
                    <span className="truncate font-semibold text-foreground">{user.name}</span>
                    <span className="truncate text-[11px] text-muted-foreground font-mono">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg cursor-pointer">
                    <IconSettings className="size-4 text-muted-foreground" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/support" className="flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg cursor-pointer">
                    <IconHelp className="size-4 text-muted-foreground" />
                    <span>Support</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <a 
                  href="/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg cursor-pointer"
                >
                  <IconExternalLink className="size-4 text-muted-foreground" />
                  <span>View Website</span>
                </a>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <a 
                  href="/api/auth/logout" 
                  className="flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                >
                  <IconLogout className="size-4 text-red-500" />
                  <span className="font-medium">Log out</span>
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  )
}
