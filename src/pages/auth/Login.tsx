import { loginUser } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { getUserRole, setRoleClass } from "@/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      toast.success("Login Successful!", {
        description: "Welcome back!",
      });
      const role = user.role; // "admin" | "user" — Firebase se aayega

      setRoleClass(role);
      if (user) {
        const role = await getUserRole(user.uid);

        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.message);
      toast.error("Login Failed", {
        description: err.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Enter your credentials to access your dashboard"
    >
      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-primary hover:underline"
            >
              Forgot?
            </button>
          </div>

          <Input
            id="password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12"
          />
        </div>
        {error}

        {/* Login Button */}
        <Button
          disabled={loading}
          type="submit"
          className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:opacity-90"
        >
          Continue
        </Button>

        {/* Register Link */}
        <p className="text-center text-sm pt-2">
          <span className="text-muted-foreground">New here? </span>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-primary font-medium hover:underline"
          >
            Create an account
          </button>
        </p>
      </form>
    </AuthCard>
  );
}
