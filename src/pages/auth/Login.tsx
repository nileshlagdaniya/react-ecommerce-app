import { useState } from "react";
import { TextField, Button, Card, Typography } from "@mui/material";
import { useAppDispatch } from "../../hooks/hooks";
import { authService } from "../../services/authService";
import { signInSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await authService.login(email, password);
      dispatch(signInSuccess(user));
      alert(`Login success!, ${user.email}, ${user.role}`);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4">
      <Card className="max-w-md w-full p-6 rounded-2xl shadow-lg">
        <Typography variant="h5" className="mb-4 text-center">
          Login
        </Typography>

        {error && (
          <p className="text-red-500 text-center mb-2 text-sm">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
