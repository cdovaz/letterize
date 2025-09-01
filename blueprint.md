
# Blueprint do Projeto: App de Performance de Estudos

## Visão Geral

Este é um aplicativo web construído com Next.js, projetado para ajudar os usuários a acompanhar seu progresso de estudos. A aplicação permite que os usuários façam login, visualizem um dashboard de desempenho, gerenciem um banco de questões com um sistema de filtros avançado e atualizem seus dados de perfil. O design segue uma paleta de cores moderna, com elementos de gamificação como uma barra de XP e feedback instantâneo nas questões.

---

## Funcionalidades e Design Implementados

### Identidade Visual
- **Paleta de Cores Primária:** Roxo e Amarelo.
- **Tipografia:** Padrão do sistema, com tamanhos responsivos.
- **Estilo Global:** Consistente em todas as páginas.

### Estrutura das Páginas
- **`src/pages/login/index.tsx`**: Página de Login.
- **`src/pages/profile/index.tsx`**: Página de Perfil do Usuário com barra de XP.
- **`src/pages/dashboard/index.tsx`**: Painel de Desempenho.
- **`src/pages/update-profile/index.tsx`**: Formulário de atualização de dados.

- **`src/pages/question-bank/index.tsx`**: Banco de Questões
  - **Sistema de Filtros:** Campos de seleção para Banca, Ano, Matéria e Tema.
  - **Template Estático de Questão com Feedback Instantâneo:**
    - Um protótipo visual completo de uma questão.
    - **Tags de Informação:** Exibe "Ano", "Banca" e "Matéria".
    - **Conteúdo da Questão:** Inclui texto, imagem e o comando da questão.
    - **Alternativas Interativas:** 5 botões de múltipla escolha.
    - **Lógica de Resposta:**
      - Ao clicar em "Responder Questão", o botão muda para "Correto" (verde) ou "Errado" (vermelho).
      - A alternativa correta é destacada em verde e a incorreta (se selecionada) em vermelho.
      - As opções são desabilitadas após a resposta.
    - **Exibição da Solução:** Uma seção com a solução detalhada (`lorem ipsum`) aparece abaixo do botão após a resposta.

### Componentes
- **`src/components/QuestionsPerformanceChart.tsx`**: Componente de gráfico.

### Configuração do Backend (Firebase)
- **SDK Instalado:** `firebase` no `package.json`.
- **Estrutura de Código:** `src/lib/firebase` com `config.ts` e `firestore.ts`.
- **Modelo de Credenciais:** `.env.local.example`.
- **Arquitetura do Banco (`database_schema.md`):** Coleção `questions` atualizada.

---

## Plano de Ação da Última Solicitação

**Data:** 17 de Julho de 2024

**Solicitação do Usuário:** "Faça com que após tenha marcado uma alternativa e apertar o botão responder questão o texto do botão vire "Correto" ou "Errado" e coloque logo abaixo do botão um texto de "Solução" que por enquanto pode ser um lorem ipsum sem problemas"

**Etapas Executadas:**

1.  **Implementar a Lógica de Estado (`src/pages/question-bank/index.tsx`):**
    -   [X] Adicionar novos estados com `useState`: `isAnswered` (para controlar se a questão foi respondida) e `isCorrect` (para armazenar se a resposta foi correta).
    -   [X] Definir uma constante `correctAnswerIndex` para simular a resposta correta no template estático.

2.  **Criar a Função de Resposta (`handleAnswer`):**
    -   [X] Implementar uma função que é chamada ao clicar em "Responder Questão".
    -   [X] A função atualiza os estados `isAnswered` e `isCorrect` com base na alternativa selecionada pelo usuário.

3.  **Atualizar a Interface para Feedback Visual:**
    -   [X] Modificar o botão "Responder Questão" para que seu texto e cor mudem dinamicamente com base nos estados `isAnswered` e `isCorrect`.
    -   [X] Adicionar lógica aos botões de alternativa para que, após a resposta, a alternativa correta seja destacada em verde e a errada (se selecionada) em vermelho.
    -   [X] Desabilitar os botões de alternativa e o botão de resposta após a interação para evitar múltiplas submissões.
    -   [X] Criar um novo `div` que só é renderizado quando `isAnswered` for `true`, exibindo o título "Solução" e um texto `lorem ipsum`.

4.  **Atualizar a Documentação (`blueprint.md`):**
    -   [X] Adicionar a descrição do novo mecanismo de feedback instantâneo na seção de funcionalidades.
    -   [X] Criar esta nova entrada no plano de ação para registrar a solicitação e as etapas de implementação.
