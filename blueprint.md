
# Blueprint do Projeto de Estudos

## Visão Geral

Este é um aplicativo Next.js projetado para auxiliar estudantes em sua jornada de preparação. O projeto integra-se com o Firebase para fornecer funcionalidades de autenticação, gerenciamento de perfis de usuário e, futuramente, outras ferramentas de estudo.

---

## Funcionalidades e Design Implementados

Esta seção documenta todas as características e decisões de design da aplicação desde o seu início até a versão atual.

### Autenticação e Gerenciamento de Usuário

*   **Firebase Authentication:** O sistema utiliza o Firebase para gerenciar a autenticação de usuários.
*   **Fluxo de Login e Cadastro:**
    *   **Página de Login (`/login`):** Permite que usuários existentes acessem suas contas usando e-mail e senha. A página inclui um link para a criação de conta.
    *   **Página de Criação de Conta (`/create-account`):** Um formulário solicita nome de usuário, e-mail, senha e data de nascimento. No momento da criação, o sistema executa duas ações cruciais:
        1.  Cria o usuário no Firebase Authentication.
        2.  **Atualiza o perfil de autenticação** do usuário com o nome fornecido (`displayName`) usando a função `updateProfile`.
        3.  Salva informações adicionais (nome de usuário, data de nascimento) em um documento separado na coleção `profiles` do Firestore, usando o `uid` do usuário como chave.
*   **Hook de Autenticação (`useAuth`):**
    *   Localizado em `src/hooks/useAuth.ts`.
    *   Este hook customizado do React "ouve" o estado de autenticação do Firebase em tempo real (`onAuthStateChanged`).
    *   Ele fornece o objeto do usuário atual e um estado de `loading` para qualquer componente que o utilize, permitindo renderização condicional e proteção de rotas.

### Perfil do Usuário

*   **Página de Perfil (`/profile`):**
    *   É uma rota protegida. Se um usuário não logado tentar acessá-la, ele é automaticamente redirecionado para a página de login.
    *   Exibe uma mensagem de "Carregando..." enquanto o estado de autenticação é verificado, melhorando a experiência do usuário.
    *   **Personalização Dinâmica:** A página exibe uma mensagem de boas-vindas personalizada (`Bem-vindo, {nome do usuário}!`) e usa a primeira letra do nome do usuário para o avatar. Esses dados são obtidos dinamicamente do `displayName` disponível no hook `useAuth`.
    *   Inclui navegação para outras seções da aplicação, como Dashboards, Banco de Questões, Cronograma e Redação.

### Configuração do Projeto

*   **Desativação do ESLint em Builds:**
    *   Para acelerar o processo de desenvolvimento e evitar bloqueios por erros de lint durante a compilação de produção, o ESLint foi configurado para ser ignorado durante o build.
    *   Essa configuração foi adicionada ao arquivo `next.config.js`.

### Design e Estilo

*   **Paleta de Cores:** A interface utiliza um esquema de cores roxo e amarelo, com os códigos `#300345` (roxo escuro), `#4c0e71` (roxo médio), e `#f8cb46` (amarelo), criando um visual vibrante e moderno.
*   **Componentes:** As páginas utilizam um layout centralizado com cartões que possuem sombras (`boxShadow`) para criar um efeito de profundidade.
*   **Interatividade:** Botões possuem efeitos de `hover` que alteram a cor de fundo, a cor do texto e aplicam uma leve translação e sombra, proporcionando feedback visual claro para o usuário.

---

## Plano de Ação Atual

Esta seção descreve as tarefas realizadas nesta sessão de desenvolvimento.

*   **Objetivo:** Desativar o ESLint durante o processo de build para acelerar o desenvolvimento.

*   **Passos Executados:**
    1.  **[COMPLETO]** Criado o arquivo `next.config.js` na raiz do projeto.
    2.  **[COMPLETO]** Adicionada a configuração `eslint: { ignoreDuringBuilds: true }` ao arquivo `next.config.js`.
    3.  **[COMPLETO]** Atualizado o `blueprint.md` para documentar a nova configuração do projeto.
