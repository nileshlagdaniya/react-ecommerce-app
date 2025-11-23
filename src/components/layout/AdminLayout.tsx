import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full min-h-screen bg-background text-foreground flex">
      <Sidebar />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="md:hidden" />
        <SheetContent side="left" className="m-0 w-64">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={() => setOpen(true)} />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
