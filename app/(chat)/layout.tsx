import { cookies } from 'next/headers';
// CORRECTED: Removed '/font' from the import path
import { GeistSans } from 'geist/sans'; 
import { GeistMono } from 'geist/mono';

import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '../(auth)/auth';
import { DataStreamProvider } from '@/components/data-stream-provider';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <DataStreamProvider>
          <SidebarProvider defaultOpen={!isCollapsed}>
            <AppSidebar user={session?.user} />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </DataStreamProvider>
      </body>
    </html>
  );
}