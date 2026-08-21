# ⚓ Grand Line Finance

<div align="center">

**Trace sua rota financeira e navegue rumo aos seus objetivos.** 🗺️ 💰

Uma experiencia web leve e intuitiva para transformar sonhos em planos praticos de economia.

[![Status](https://img.shields.io/badge/status-concluido-16a34a?style=for-the-badge)](https://github.com/Dyonatas-Menegatti/OnePiece)
[![React](https://img.shields.io/badge/React-19.2.8-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2.0-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

[🚀 Acessar repositorio](https://github.com/Dyonatas-Menegatti/OnePiece) · [⬇️ Baixar projeto](https://github.com/Dyonatas-Menegatti/OnePiece/archive/refs/heads/main.zip)

</div>

> **A ideia:** reunir os seus berries, escolher um destino e deixar o Log Pose indicar o caminho ate o seu tesouro. ✨

## 📚 Indice

- [Status](#-status)
- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Demonstracao visual](#-demonstracao-visual)
- [Acesso ao projeto](#-acesso-ao-projeto)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Como executar](#-como-executar)
- [Scripts disponiveis](#-scripts-disponiveis)

## ✅ Status

**Concluido para demonstracao e testes locais.** O fluxo principal esta pronto para ser explorado: simulacao, calculo, historico e resultados com insights financeiros por IA.

## 🌊 Sobre o projeto

O Grand Line Finance foi criado para tornar o planejamento financeiro mais simples e visual. Em poucos passos, voce registra sua realidade atual, define uma meta e recebe uma estimativa objetiva da reserva mensal necessaria.

### 🧭 Como funciona

`1. Informe sua renda` → `2. Registre custos e dividas` → `3. Defina seu tesouro` → `4. Analise sua rota`

## 🧩 Funcionalidades

- 📝 Formulario guiado em seis etapas para registrar uma simulacao.
- 🧮 Calculo da reserva mensal necessaria para atingir o objetivo.
- 🗺️ Tela de resultados com resumo da meta, prazo, renda, custos e parcelas.
- 🤖 Insights e perguntas ao navegador financeiro por meio da API Gemini.
- 📖 Historico salvo no `localStorage`, com consulta e exclusao.
- 🌓 Alternancia entre tema claro e escuro.
- 📱 Layout responsivo para desktop e dispositivos moveis.

## 🖼️ Demonstracao Visual

Uma pequena amostra da jornada dentro do projeto:

| 🚢 Trace sua rota                                                          | 📖 Consulte seu historico                                          |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| ![Tela inicial do Grand Line Finance](public/screenshots/tela-inicial.png) | ![Historico de simulacoes](public/screenshots/historico-vazio.png) |

### 💎 Resultado de uma simulacao

![Resultado de uma simulacao](public/screenshots/resultado-simulacao.png)

## 🚀 Acesso ao Projeto

**Repositorio:** [github.com/Dyonatas-Menegatti/OnePiece](https://github.com/Dyonatas-Menegatti/OnePiece)

**Download direto:** [baixar o projeto pelo GitHub](https://github.com/Dyonatas-Menegatti/OnePiece/archive/refs/heads/main.zip)

Para baixar via Git:

```bash
git clone https://github.com/Dyonatas-Menegatti/OnePiece.git
cd OnePiece
```

## 🛠️ Tecnologias Utilizadas

| Tecnologia ou biblioteca | Versao declarada |
| ------------------------ | ---------------- |
| React                    | `^19.2.8`        |
| React DOM                | `^19.2.8`        |
| TypeScript               | `~6.0.2`         |
| Vite                     | `^8.2.0`         |
| Tailwind CSS             | `^4.3.3`         |
| React Router DOM         | `^7.18.2`        |
| Lucide React             | `^1.31.0`        |
| React Loading Skeleton   | `^3.5.0`         |
| ESLint                   | `^9.7.0`         |
| Prettier                 | `^3.0.0`         |

As demais versoes de desenvolvimento estao disponiveis no arquivo [package.json](package.json).

## 💻 Como Executar

### 📋 Pre-requisitos

- Node.js 20 ou superior.
- npm 10 ou superior.

### ⚡ Comecando rapidamente

Depois de clonar ou baixar o projeto, instale as dependencias na raiz:

```bash
npm install
```

### 🤖 Ativando os recursos de IA (opcional)

Para habilitar os insights e o chat financeiro, crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua_chave_da_api_gemini
```

Sem essa chave, as telas de simulacao, calculo, historico e resultado continuam disponiveis, mas os recursos de IA nao funcionarao. A chave deve permanecer apenas no arquivo local e nunca ser publicada no repositorio.

### ▶️ Rodar em desenvolvimento

```bash
npm run dev
```

Abra no navegador o endereco exibido pelo Vite, normalmente `http://localhost:5173`.

## 🧰 Scripts Disponiveis

| Comando            | Finalidade                                                       |
| ------------------ | ---------------------------------------------------------------- |
| `npm run dev`      | Inicia o servidor de desenvolvimento com atualizacao automatica. |
| `npm run build`    | Executa a verificacao TypeScript e gera a versao de producao.    |
| `npm run preview`  | Serve localmente o build de producao.                            |
| `npm run lint`     | Verifica problemas de lint no projeto.                           |
| `npm run lint:fix` | Corrige automaticamente problemas de lint aplicaveis.            |
| `npm run format`   | Formata os arquivos com Prettier.                                |
