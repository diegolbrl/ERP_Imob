# ERP Imobiliário (ERP_Imob)

Sistema moderno de gestão imobiliária e CRM, desenvolvido em React com TypeScript, TailwindCSS e Vite.

## 🚀 Tecnologias

- **React 18** + **TypeScript**
- **Vite** (Build tool rápida)
- **TailwindCSS** + **Lucide React** (Ícones)

## 📋 Pré-requisitos

- **Node.js** (versão 18 ou superior recomendada)
- **npm** ou **yarn** / **pnpm**

## 🔧 Instalação e Execução Local

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd ERP_Imob
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. (Opcional) Configure as variáveis de ambiente locais:
   ```bash
   cp .env.example .env
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse no navegador em: `http://localhost:5173`

## 🔒 Diretrizes de Segurança e Boas Práticas

- **Segurança de Dados**: Arquivos com credenciais (`.env`), dados locais e pastas temporárias estão no `.gitignore` e **nunca** devem ser commitados.
- **Ambiente Local**: Qualquer alteração de dados de teste deve utilizar dados fictícios (mock), em conformidade com as regras de privacidade (LGPD).
- **Branches**: Crie branches de feature para novas implementações (`git checkout -b feature/nome-da-feature`) antes de enviar pull requests.
