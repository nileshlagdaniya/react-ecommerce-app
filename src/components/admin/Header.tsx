import { Bell, Menu, User } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-16 border-b bg-background flex items-center px-4 justify-between">
      {/* Left: Mobile Menu Toggle */}
      <Button variant="ghost" className="md:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      {/* Center: Title (can be dynamic per-page) */}
      <h2 className="text-lg font-semibold text-foreground">Admin Dashboard</h2>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Button variant="ghost">
          <Bell className="h-5 w-5" />
        </Button>

        <Avatar className="h-8 w-8 border">
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
