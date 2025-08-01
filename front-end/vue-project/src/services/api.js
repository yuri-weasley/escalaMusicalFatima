// src/services/api.js

// Obtém o URL do Apps Script da variável de ambiente.
// O `import.meta.env` é como o Vite expõe variáveis de ambiente.
const APPS_SCRIPT_URL = import.meta.env.VITE_APP_APPS_SCRIPT_URL;

/**
 * Envia uma requisição POST para o Google Apps Script.
 * @param {string} action A ação a ser executada no backend (ex: 'addMusico', 'registrarDisponibilidade').
 * @param {object} data Os dados a serem enviados para a ação.
 * @returns {Promise<object>} Uma Promessa que resolve com a resposta JSON do backend.
 */
export async function callAppsScript(action, data) {
  if (!APPS_SCRIPT_URL) {
    console.error('URL do Google Apps Script não configurada! Verifique seu arquivo .env.local');
    alert('Erro de configuração: URL do backend ausente.');
    throw new Error('URL do Google Apps Script não configurada.');
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // O Google Apps Script não exige um header 'Accept' específico, mas é boa prática
        'Accept': 'application/json',
      },
      // Converte os dados e a ação em uma string JSON para envio
      body: JSON.stringify({ action, data }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro na requisição HTTP: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result; // Retorna o objeto { success: boolean, message: string, ... } do Apps Script

  } catch (error) {
    console.error('Erro ao chamar o Google Apps Script:', error);
    // Relança o erro para que o componente que chamou possa lidar com ele
    throw error;
  }
}