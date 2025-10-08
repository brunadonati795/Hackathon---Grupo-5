import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/Api';
import '../App.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Verifica se o email já está cadastrado
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find(user => user.email === email);
      
      if (userExists) {
        alert('Este email já está cadastrado.');
        setLoading(false);
        return;
      }
      
      // Cria o novo usuário
      const newUser = {
        id: Date.now(),
        email,
        password, // Em produção, isso deveria ser criptografado
        createdAt: new Date().toISOString()
      };
      
      // Salva no localStorage
      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Notifica o usuário e redireciona para o login
      alert('Usuário registrado com sucesso! Faça o login.');
      navigate('/login');
      
    } catch (error) {
      alert('Erro ao registrar. Tente novamente.');
      console.error('Erro no registro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registro de Usuário</h2>
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
          
          <div className="form-group">
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              placeholder="Confirmar Senha" 
              required 
              className="form-input"
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        
        <p className="auth-link">
          Já tem conta? <Link to="/login">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
