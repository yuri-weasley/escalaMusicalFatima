<script setup>
import { ref } from 'vue' // Importa 'ref' para criar variáveis reativas
import { callAppsScript } from './services/api'; // Importa a função de API

// Variáveis reativas para o formulário (poderíamos ter um formulário real depois)
const nomeMusico = ref('Músico Teste');
const emailMusico = ref('teste@exemplo.com');
const telefoneMusico = ref('11999998888');
const funcaoMusico = ref('Violão');
const mensagemStatus = ref(''); // Para exibir mensagens ao usuário

// Função para testar a adição de um músico
async function testAddMusico() {
  mensagemStatus.value = 'Adicionando músico...';
  try {
    const musicoData = {
      nome: nomeMusico.value,
      email: emailMusico.value,
      telefone: telefoneMusico.value,
      funcao: funcaoMusico.value,
    };

    // Chama a função do Apps Script para adicionar o músico
    const response = await callAppsScript('addMusico', musicoData);

    if (response.success) {
      mensagemStatus.value = `Músico adicionado com sucesso! ID: ${response.id || 'N/A'}`;
      console.log('Resposta do backend (addMusico):', response);
      // Opcional: Limpar campos após sucesso
      nomeMusico.value = '';
      emailMusico.value = '';
      telefoneMusico.value = '';
      funcaoMusico.value = '';
    } else {
      mensagemStatus.value = `Erro ao adicionar músico: ${response.message}`;
      console.error('Erro do backend (addMusico):', response.message);
    }
  } catch (error) {
    mensagemStatus.value = `Erro na comunicação: ${error.message}`;
    console.error('Erro ao tentar adicionar músico:', error);
  }
}
</script>

<template>
  <header>
    <h1>Gerenciador de Escalas</h1>
  </header>

  <main>
    <h2>Testar Adicionar Músico</h2>
    <div>
      <label for="nome">Nome:</label>
      <input id="nome" v-model="nomeMusico" type="text" placeholder="Nome do Músico" />
    </div>
    <div>
      <label for="email">Email:</label>
      <input id="email" v-model="emailMusico" type="email" placeholder="Email do Músico" />
    </div>
    <div>
      <label for="telefone">Telefone:</label>
      <input id="telefone" v-model="telefoneMusico" type="tel" placeholder="Telefone" />
    </div>
    <div>
      <label for="funcao">Função:</label>
      <input id="funcao" v-model="funcaoMusico" type="text" placeholder="Voz ou Instrumento" />
    </div>
    <button @click="testAddMusico">Adicionar Músico de Teste</button>
    <p>{{ mensagemStatus }}</p>

    </main>
</template>

<style>
  /* Adicione um pouco de estilo básico para o teste */
  body {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  div {
    margin-bottom: 10px;
  }
  input[type="text"],
  input[type="email"],
  input[type="tel"] {
    padding: 8px;
    margin-left: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  p {
    margin-top: 15px;
    font-weight: bold;
    color: #333;
  }
  </style>