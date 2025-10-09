import { useState, useEffect } from 'react';

export const useUserPreferences = () => {
  const [userPreferences, setUserPreferences] = useState(null);

  useEffect(() => {
    // Carregar preferências do usuário do localStorage
    const preferences = localStorage.getItem('userPreferences');
    if (preferences) {
      setUserPreferences(JSON.parse(preferences));
    }
  }, []);

  // Funções para verificar quais tipos de conteúdo mostrar
  const shouldShowVideo = () => {
    return userPreferences?.metodologias?.includes('audio-visual') || 
           userPreferences?.metodologias?.includes('visual');
  };

  const shouldShowExperiment = () => {
    return userPreferences?.metodologias?.includes('pratica');
  };

  const shouldShowMindMap = () => {
    return userPreferences?.metodologias?.includes('visual') || 
           userPreferences?.metodologias?.includes('escrita-leitura');
  };

  const shouldShowSummary = () => {
    return userPreferences?.metodologias?.includes('escrita-leitura');
  };

  const shouldShowQuestions = () => {
    return userPreferences?.metodologias?.includes('questoes');
  };

  const shouldShowExplanation = () => {
    return userPreferences?.metodologias?.includes('explicando');
  };

  return {
    userPreferences,
    shouldShowVideo,
    shouldShowExperiment,
    shouldShowMindMap,
    shouldShowSummary,
    shouldShowQuestions,
    shouldShowExplanation
  };
};
