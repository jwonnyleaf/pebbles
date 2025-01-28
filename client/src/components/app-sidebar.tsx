import * as React from 'react';
import {
  BookOpen,
  PiggyBank,
  Settings2,
  Store,
  SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import Logo from '@/assets/logo.svg';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMain = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: SquareTerminal,
    },
    {
      title: 'Budget',
      url: '/budget',
      icon: PiggyBank,
    },
    {
      title: 'Transactions',
      url: '/transactions',
      icon: BookOpen,
    },
    {
      title: 'Store',
      icon: Store,
      url: '',
      isActive: true,
      items: [
        {
          title: 'Shop',
          url: '/shop',
        },
        {
          title: 'Inventory',
          url: '/inventory',
        },
      ],
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings2,
    },
  ];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <img src={Logo} alt="Pebbles." />
                </div>
                <div className="grid flex-1 text-left text-xl leading-tight">
                  <span className="truncate font-semibold">Pebbles.</span>
                  <span className="truncate text-sm">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
