# Arquitetura do Banco de Dados (Firebase Firestore)

Este documento descreve a arquitetura do banco de dados NoSQL que será utilizada no Firebase Firestore para a aplicação de performance de estudos.

## Coleções Principais

A estrutura será baseada em coleções de nível raiz para cada entidade principal do sistema.

### 1. `users`

Esta coleção armazenará os dados brutos de autenticação de cada usuário, fornecidos pelo Firebase Authentication.

-   **Documento ID:** `uid` do usuário (fornecido pelo Firebase Auth).
-   **Campos:**
    -   `email`: (String) O email de login do usuário.
    -   `createdAt`: (Timestamp) A data de criação da conta.

### 2. `profiles`

Esta coleção armazenará os dados de perfil do usuário, que podem ser atualizados por ele.

-   **Documento ID:** `uid` do usuário (mapeamento 1:1 com `users`).
-   **Campos:**
    -   `name`: (String) Nome completo do usuário.
    -   `nickname`: (String) Apelido do usuário.
    -   `birthDate`: (Timestamp) Data de nascimento do usuário.
    -   `userId`: (String) Referência ao `uid` do documento na coleção `users`.

### 3. `questions`

Esta coleção funcionará como o "Banco de Questões" global.

-   **Documento ID:** ID único gerado automaticamente.
-   **Campos:**
    -   `statement`: (String) O enunciado da questão.
    -   `options`: (Array de Strings) As alternativas da questão.
    -   `correctOptionIndex`: (Number) O índice da alternativa correta.
    -   `difficulty`: (String) Nível de dificuldade (ex: "Fácil", "Médio", "Difícil").
    -   **`banca`**: (String) A instituição responsável pela questão (ex: "FUVEST", "ENEM").
    -   **`ano`**: (Number) O ano em que a questão foi aplicada.
    -   **`materia`**: (String) A matéria principal da questão (ex: "Matemática", "Português").
    -   **`tema`**: (String) O tópico específico dentro da matéria (ex: "Análise Combinatória", "Interpretação de Texto").

#### Exemplo de Documento:

```json
/questions/{auto-id}
{
  "statement": "De quantas maneiras 3 pessoas podem se sentar em 5 cadeiras em fila?",
  "options": ["60", "120", "15", "30"],
  "correctOptionIndex": 0,
  "difficulty": "Médio",
  "banca": "FUVEST",
  "ano": 2023,
  "materia": "Matemática",
  "tema": "Análise Combinatória"
}
```

### 4. `userAnswers`

Esta coleção registrará cada resposta de um usuário a uma questão.

-   **Documento ID:** ID único gerado automaticamente.
-   **Campos:**
    -   `userId`: (String) O `uid` do usuário que respondeu.
    -   `questionId`: (String) A referência ao ID do documento na coleção `questions`.
    -   `selectedOptionIndex`: (Number) O índice da alternativa que o usuário selecionou.
    -   `isCorrect`: (Boolean) `true` se a resposta foi correta.
    -   `answeredAt`: (Timestamp) A data e hora em que a questão foi respondida.
