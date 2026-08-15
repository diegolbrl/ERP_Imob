# Documentação Técnica: ImobSystem ERP & CRM (SaaS B2B Complete)

## 1. Visão Geral do Projeto
O **ImobSystem** é um sistema de Gestão Imobiliária (ERP) e CRM Comercial completo focado no modelo SaaS B2B para imobiliárias. O projeto foi construído com base em pesquisas de mercado dos principais softwares brasileiros (Kenlo, Universal Software, Vista CRM) e nas definições de tipo avançadas de `imobsystem-expanded-types.ts`.

**Status Atual:** Frontend 100% completo, funcional e interativo. É constituído por 12 módulos operacionais em uma *Single Page Application (SPA)* com React 18, TypeScript, Tailwind CSS e Context API, suportando persistência local via `localStorage`.

---

## 2. Arquitetura Técnica e Stack
*   **Core / Engine:** React 18 + TypeScript + Vite.
*   **Estilização (UI/UX):** Tailwind CSS v3 (com tema escuro customizado e glassmorphism). Ícones via `lucide-react`.
*   **Gerenciamento de Estado:** React Context API (`AppContext.tsx`) para controle global dos 12 módulos.
*   **Persistência (Local):** `localStorage` para persistência das edições, condomínios, vistorias, chamados e configurações no navegador.

---

## 3. Estrutura dos 12 Módulos do Frontend

```text
src/
├── types/
│   └── index.ts                         # Schemas de dados completos (imobsystem-expanded-types.ts)
├── mock/
│   └── mockData.ts                      # Massa de dados rica (Imóveis, Leads, Condomínios, Vistorias, Clientes, Faturas, Chamados)
├── context/
│   └── AppContext.tsx                   # Estado global e funções CRUD de todos os módulos
└── components/
    ├── layout/
    │   ├── Header.tsx                   # Busca global e atalhos de ação rápida
    │   └── Sidebar.tsx                  # Navegação com 12 módulos e badges em tempo real
    └── modules/
        ├── DashboardModule.tsx          # 1. KPIs (VGV, Receita Adm, Leads Quentes, Exclusividade)
        ├── PropertiesModule.tsx         # 2. Carteira de Imóveis (Grid/Tabela, Filtros)
        ├── CRMModule.tsx                # 3. Pipeline Comercial Kanban & Rodízio de Corretores
        ├── BuildingsModule.tsx          # 4. Condomínios & Edifícios (Gestão de Unidades e Receita)
        ├── InspectionsModule.tsx        # 5. Vistorias Digitais (Entrada, Saída, Periódica e Checklists)
        ├── PortalsModule.tsx            # 6. Portais & Multi-posting (Sincronização ZAP, VivaReal, XML)
        ├── FinancialModule.tsx          # 7. Locação & Split ERP (Calculadora e Gestão de Contratos)
        ├── ClientsModule.tsx            # 8. Clientes & Payouts Pix (Proprietários, Inquilinos, Dados Bancários)
        ├── TenantPortalModule.tsx       # 9. Portal do Inquilino & Chamados de Manutenção
        ├── BrokerPortalModule.tsx       # 10. Portal do Corretor & Agenda Diária
        ├── WhitelabelSiteModule.tsx     # 11. Site do Cliente (Portal Público & Captação Direta CRM)
        ├── AISuiteModule.tsx            # 12. Antigravity AI Suite (Copywriter, Valuation, Chatbot)
        └── SettingsModule.tsx           # Configurações da Plataforma & Credenciais de APIs
```

---

## 4. Modelagem de Dados Expandida (`src/types/index.ts`)

1.  **Imóvel (`Property`):** Código, especificações físicas, proprietário vinculado (`ownerId`), edifício vinculado (`buildingId`), exclusividade e sincronização com portais (`portalSync`).
2.  **Lead & Timeline (`Lead`):** Dados de contato, origem, posição no funil Kanban, perfil de busca desejado e linha do tempo (`timeline`) unificada com eventos de mensagens, ligações e visitas.
3.  **Edifício / Condomínio (`Building`):** Nome, endereço, quantidade de andares/unidades, taxa de condomínio padrão, infraestrutura (`amenities`) e previsão de receita.
4.  **Vistoria Digital (`PropertyInspection`):** Tipo (Entrada, Saída, Periódica), vistoriador, itens por cômodo (`InspectionItem`) com estado (Excelente, Bom, Precisa de Reparo, Danificado), observações e assinatura eletrônica.
5.  **Cliente & Payouts (`Client`):** CPF/CNPJ, tipo (Proprietário, Inquilino, Investidor), declaração de renda e dados bancários com chave Pix para repasse automatizado de aluguéis.
6.  **Fatura / Transação (`BillingTransaction`):** Vencimento, valor bruto, divisão do split (Taxa Adm imobiliária vs Repasse Líquido ao proprietário) e Pix Copia e Cola.
7.  **Manutenção / Chamado (`MaintenanceRequest`):** Inquilino solicitante, categoria (Hidráulica, Elétrica, Pintura), status de atendimento e profissional designado.
8.  **Configurações (`AppSettings`):** Perfil corporativo (CNPJ, CRECI Jurídico), chaves de API (WhatsApp Bot, Clicksign, Gateway) e regras de automação.

---

## 5. Atualização do Walkthrough

- **Compilação TypeScript:** `npm run build` testado e aprovado com 0 erros.
- **Servidor Dev:** Ativo em [http://localhost:5173/](http://localhost:5173/).
