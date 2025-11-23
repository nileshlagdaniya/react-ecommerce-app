import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { ScrollArea } from "../ui/scroll-area";
import { adminMenu } from "./AdminMenu";

import { ThemeToggle } from "../theme/ThemeToggle";

const Sidebar = () => {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 border-r bg-background text-foreground",
        "transition-all duration-300"
      )}
    >
      {/* LOGO */}
      <div className="h-16 border-b flex gap-3 items-center px-4">
        <h1 className="text-xl font-bold text-primary">AdminPanel</h1>
        <ThemeToggle />
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-3 flex flex-col gap-1">
          {adminMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
                  "transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
