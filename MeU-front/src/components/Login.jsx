import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/Api';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Busca os usuários cadastrados no localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Cria um token simples (em produção, isso deveria ser um JWT real)
        const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Notifica o usuário e redireciona para a página protegida
        alert('Login realizado com sucesso!');
        navigate('/disciplinas');
      } else {
        alert('Email ou senha incorretos.');
      }
      
    } catch (error) {
      alert('Erro ao fazer login. Tente novamente.');
      console.error('Erro no login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required 
              className="form-input"
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        
        <p className="auth-link">
          Não tem conta? <Link to="/register">Registre-se aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
