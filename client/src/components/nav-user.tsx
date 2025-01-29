'use client';

import { ChevronsUpDown, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PebblesSVG from '@/assets/pebbles.svg';
import socket from '@/utils/socket';
import { useEffect, useState } from 'react';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, logout } = useAuth();
  const [balance, setBalance] = useState<number>(user!.balance);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.emit('join', user.id);
      socket.on('balance-update', (balance: number) => {
        console.log('Balance updated:', balance);
        setBalance(balance);
      });

      return () => {
        socket.disconnect();
        socket.off('balance-update');
      };
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="bg-green-dark rounded-3xl data-[state=open]:bg-green-dark data-[state=open]:text-sidebar-accent-foreground px-2 py-8 gap-4"
            >
              <Avatar className="h-10 w-10 rounded-3xl">
                <AvatarImage src={user!.avatar} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                <span className="truncate font-semibold">{user!.name}</span>
                <span className="truncate text-sm flex gap-2 items-center">
                  <img
                    src={PebblesSVG}
                    alt="Pebbles."
                    className="w-4 h-4 invert"
                  />
                  {balance}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user!.avatar} alt={user!.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user!.name}</span>
                  <span className="truncate text-xs">{user!.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
