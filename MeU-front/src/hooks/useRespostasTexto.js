import { useState, useEffect } from 'react';

export const useRespostasTexto = () => {
  const [respostas, setRespostas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Salvar resposta no banco de dados
  const salvarResposta = async (disciplina, modulo, resposta_texto) => {
    setLoading(true);
    try {
      // Obter email do usuário logado
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const usuario_email = currentUser.email || 'anônimo';

      const response = await fetch('http://localhost:3000/api/respostas/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          disciplina,
          modulo,
          resposta_texto,
          usuario_email
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Atualizar lista local de respostas
        setRespostas(prev => [...prev, {
          id_resposta: data.data.id_resposta,
          modulo: data.data.modulo,
          resposta_texto,
          data_resposta: data.data.data_resposta
        }]);
        return data.data;
      } else {
        throw new Error(data.message || 'Erro ao salvar resposta');
      }
    } catch (error) {
      console.error('Erro ao salvar resposta:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Buscar respostas por disciplina
  const buscarRespostasPorDisciplina = async (disciplina) => {
    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const usuario_email = currentUser.email || 'anônimo';

      const response = await fetch(`http://localhost:3000/api/respostas/disciplina/${disciplina}?usuario_email=${usuario_email}`);

      const data = await response.json();
      
      if (data.success) {
        setRespostas(data.data);
        return data.data;
      } else {
        throw new Error(data.message || 'Erro ao buscar respostas');
      }
    } catch (error) {
      console.error('Erro ao buscar respostas:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Buscar todas as respostas do usuário
  const buscarTodasRespostas = async () => {
    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const usuario_email = currentUser.email || 'anônimo';

      const response = await fetch(`http://localhost:3000/api/respostas/todas?usuario_email=${usuario_email}`);

      const data = await response.json();
      
      if (data.success) {
        setRespostas(data.data);
        return data.data;
      } else {
        throw new Error(data.message || 'Erro ao buscar respostas');
      }
    } catch (error) {
      console.error('Erro ao buscar todas as respostas:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Obter estatísticas das respostas
  const obterEstatisticas = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/respostas/estatisticas');
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Erro ao buscar estatísticas');
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  };

  return {
    respostas,
    loading,
    salvarResposta,
    buscarRespostasPorDisciplina,
    buscarTodasRespostas,
    obterEstatisticas
  };
};