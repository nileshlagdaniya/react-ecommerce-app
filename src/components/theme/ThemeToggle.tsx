import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"outline"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="size-10 rounded-full bg-muted cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="text-muted-foreground" />
      ) : (
        <Moon className="text-muted-foreground" />
      )}
    </Button>
  );
}
