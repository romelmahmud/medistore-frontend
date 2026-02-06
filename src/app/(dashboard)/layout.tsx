import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  admin,
  seller,
}: Readonly<{
  admin: React.ReactNode;
  seller: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {admin}
          {seller}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
