import { useState } from "react";
import { useUserSignup } from "../hooks/useUserSignup";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useUserSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await signup(email, password);
  };

  return (
    <div className="login-signup-container">

      <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <input
        placeholder="Enter email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />

      <input
        placeholder="Enter password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
        
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
      </form>
      
    </div>
  )
}

export default Signup