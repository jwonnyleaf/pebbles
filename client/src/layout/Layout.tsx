import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full"> {/* Flex container */}
        <AppSidebar className="w-64 flex-shrink-0" /> {/* Sidebar with fixed width */}
        <main className="flex-grow p-4"> {/* Main content area */}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}