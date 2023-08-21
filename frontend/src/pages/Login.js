import { useState } from "react";
import { useUserLogin } from "../hooks/useUserLogin";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useUserLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-signup-container">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>

        <input
          placeholder="Enter email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          placeholder="Enter password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Log In</button>
        {error && <div className="error">{error}</div>}

      </form>
    </div>

  )
}

export default Login