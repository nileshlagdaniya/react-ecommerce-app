import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";

const NormalNavbar = () => {
  return (
    <header className="w-full border-b bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-center">
        <h1 className="text-xl font-semibold">ECommerce</h1>

        <div className="flex items-center gap-3">
          <Button onClick={() => <Navigate to={"/login"} />}>Login</Button>
          <Button onClick={() => <Navigate to={"/register"} />}>
            Regsiter
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NormalNavbar;
