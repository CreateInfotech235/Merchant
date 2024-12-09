import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('admin@gmail.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Check if user is already logged in
  useEffect(() => {
    const accessToken = localStorage.getItem('accessTokenForAdmin');
    if (accessToken) {
    
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await fetch('http://localhost:8001/admin/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });
  
      const data = await response.json();
      console.log(data);
      
  
      if (response.ok && data.status === 'SUCCESS') {
        const { accessToken, refreshToken } = data.data.adminAuthData;
  
        // Ensure the refresh token is being logged to console
        // console.log('Access Token:', accessToken);
        // console.log('Refresh Token:', refreshToken);
  
        // Save the tokens in local storage
        localStorage.setItem('accessTokenForAdmin', accessToken);
        localStorage.setItem('refreshTokenForAdmin', refreshToken);
        console.log(accessToken);
        navigate('/dashboard')
  
        // Call the onLogin callback to handle successful login and redirection
        
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="login-container" style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default Login;
