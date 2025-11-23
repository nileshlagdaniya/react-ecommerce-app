import { useState } from "react";
import { registerUser } from "@/firebase";
import { useNavigate } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(name, email, password);
      toast.success("Registration Successful!", {
        description: "Your account has been created 🎉",
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      toast.error("Registration Failed", {
        description: err.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Create an account"
      description="Join us today — it only takes a moment"
    >
      <form onSubmit={handleRegister} className="space-y-6">
        {/* Full Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-foreground">
            Full Name
          </Label>

          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="
              h-12 bg-card text-foreground 
              border border-border
              focus:ring-2 focus:ring-primary
            "
          />
        </div>
        {error}

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-foreground">
            Email Address
          </Label>

          <Input
            id="email"
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              h-12 bg-card text-foreground
              border border-border
              focus:ring-2 focus:ring-primary
            "
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              h-12 bg-card text-foreground
              border border-border
              focus:ring-2 focus:ring-primary
            "
          />
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          disabled={loading}
          className="
            w-full h-12 text-base font-semibold
            bg-primary text-primary-foreground
            rounded-(--radius)
            hover:opacity-90
          "
        >
          Create Account
        </Button>

        {/* Login Link */}
        <p className="text-center text-sm pt-2">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-primary font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </AuthCard>
  );
}
