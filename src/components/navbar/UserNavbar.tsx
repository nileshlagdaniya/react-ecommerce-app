import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../theme/ThemeToggle";

export default function UserHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50
        bg-card
        text-foreground
      "
    >
      <div
        className="
          max-w-7xl mx-auto flex items-center justify-between 
          px-4 py-3 border-b
          border-border
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
            text-2xl font-bold 
            text-primary
          "
        >
          NexaStore
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="
              transition 
              text-muted-foreground
              hover:text-foreground
            "
          >
            Home
          </Link>

          <Link
            to="/products"
            className="
              text-muted-foreground
              hover:text-foreground
            "
          >
            Products
          </Link>

          <Link
            to="/contact"
            className="
              text-muted-foreground
              hover:text-foreground
            "
          >
            Contact
          </Link>
        </nav>

        {/* Search + Cart + Profile */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="
                pl-10 pr-4 py-2 
                rounded-full 
                bg-muted
                text-foreground
              "
            />
            <Search
              className="
                absolute left-3 top-2.5 h-5 w-5
                text-muted-foreground
              "
            />
          </div>

          <ShoppingCart
            className="
              h-6 w-6 
              text-muted-foreground
            "
          />

          <Link to="/profile">
            <User
              className="
                h-6 w-6 
                text-muted-foreground
              "
            />
          </Link>

          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? (
            <X className="text-foreground" />
          ) : (
            <Menu className="text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div
          className="
            md:hidden p-4 space-y-3 
            bg-card
            border-b border-border
          "
        >
          <Link className="block text-muted-foreground" to="/">
            Home
          </Link>
          <Link className="block text-muted-foreground" to="/products">
            Products
          </Link>
          <Link className="block text-muted-foreground" to="/contact">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
