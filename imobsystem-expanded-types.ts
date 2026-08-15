/**
 * ImobSystem ERP & CRM - Expanded Type Definitions for B2B SaaS
 * 
 * This file contains the complete type definitions for the next evolution of the ImobSystem.
 * It expands the core models to include support for full-scale user roles, relational links,
 * automated contracts, property inspections, condominium management (Buildings), and system-wide settings.
 * 
 * These types serve as a definitive schema for frontend development (React + TypeScript)
 * and can be used directly as a blueprint by AI agents (e.g., Google Antigravity Code Assistants)
 * to design the corresponding PostgreSQL database schemas, NestJS/FastAPI REST entities, and validation schemas.
 */

// ==========================================
// 1. ENUMS, LITERALS & BASE SCHEMAS
// ==========================================

export type PropertyType = 'Apartamento' | 'Casa' | 'Sobrado' | 'Terreno' | 'Comercial' | 'Cobertura' | 'Chácara';
export type PropertyPurpose = 'Venda' | 'Locação' | 'Ambos';
export type PropertyStatus = 'Disponível' | 'Reservado' | 'Vendido' | 'Alugado' | 'Suspenso';
export type LeadStatus = 'Novo Lead' | '1º Atendimento' | 'Visita Agendada' | 'Proposta Recebida' | 'Fechamento';
export type UserRole = 'Administrador' | 'Gerente' | 'Corretor' | 'Inquilino' | 'Proprietário';
export type GuarantorType = 'Fiador' | 'Caução' | 'Seguro Fiança' | 'Sem Garantia';
export type AdjustmentIndex = 'IGP-M' | 'IPCA' | 'Sem Reajuste';
export type PaymentStatus = 'Pago' | 'Pendente' | 'Atrasado';
export type SignatureStatus = 'Assinado' | 'Aguardando' | 'Recusado' | 'Rascunho';
export type InspectionStatus = 'Agendada' | 'Em Andamento' | 'Aprovada' | 'Aprovada com Ressalvas' | 'Reprovada';
export type InspectionItemCondition = 'Excelente' | 'Bom' | 'Precisa de Reparo' | 'Danificado';
export type MaintenanceRequestStatus = 'Aberto' | 'Em Análise' | 'Profissional Designado' | 'Concluído' | 'Cancelado';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string; // UF (ex: SP, RJ, MG)
  zipCode: string; // CEP (ex: 01000-000)
}

// ==========================================
// 2. USER, BROKER & CLIENT REGISTRATION
// ==========================================

/**
 * Core User profile for system authentication and Role-Based Access Control (RBAC).
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Extension of the User model specific to Brokers (Corretores)
 */
export interface Broker extends User {
  role: 'Corretor';
  creci: string; // Professional broker license registry code
  commissionRate: number; // Default commission percentage of agency's cut (ex: 30)
  status: 'Disponível' | 'Em Atendimento' | 'Inativo';
  currentLeadCount: number;
  totalDealsClosed: number;
}

/**
 * Unified Client registration for external stakeholders (Owners, Tenants, Buyers, Investors).
 */
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  documentType: 'CPF' | 'CNPJ';
  documentNumber: string; // Formatted taxpayer registration number
  clientType: 'Proprietário' | 'Inquilino' | 'Comprador' | 'Investidor';
  status: 'Ativo' | 'Inativo' | 'Bloqueado';
  address?: Address;
  financialInfo?: {
    declaredIncome: number;
    profession?: string;
    bankAccount?: {
      bankCode: string; // Code (ex: 341, 001)
      agency: string;
      accountNumber: string;
      accountType: 'Corrente' | 'Poupança';
      pixKey?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 3. CONDOMINIUMS & BUILDINGS MANAGEMENT
// ==========================================

/**
 * Building entity to group multiple commercial or residential rental properties under one management.
 */
export interface Building {
  id: string;
  name: string;
  address: Address;
  floorsCount: number;
  unitsCount: number;
  defaultCondoFee: number;
  amenities: string[]; // ex: ['Piscina', 'Academia', 'Portaria 24h', 'Garagem']
  associatedPropertyIds: string[]; // Linked physical units (Property IDs)
  ownerId?: string; // Optional (if the entire building belongs to a single landlord/investor)
  totalRevenueProjected: number; // Reconstructive sum of active rental values in the building
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 4. PROPERTY (IMÓVEL)
// ==========================================

export interface Property {
  id: string;
  code: string; // ex: IMO-101
  title: string;
  description?: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  price?: number; // Selling price (Venda)
  rentPrice?: number; // Monthly rental price (Locação)
  condoFee?: number; // Condo management fee
  iptu?: number; // Annual/Monthly city tax
  area: number; // in m²
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  features: string[]; // ex: ['Ar condicionado', 'Churrasqueira', 'Varanda Gourmet', 'Mobiliado']
  address: Address;
  status: PropertyStatus;
  isExclusive: boolean;
  exclusivityEndDate?: string;
  portalSync: {
    zap: boolean;
    vivaReal: boolean;
    olx: boolean;
    imovelWeb: boolean;
  };
  ownerId: string; // Linked Client (clientType: 'Proprietário')
  buildingId?: string; // Linked Building (if inside a condominium)
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 5. CRM & LEADS MANAGEMENT
// ==========================================

export interface LeadTimelineEvent {
  id: string;
  timestamp: string;
  type: 'status_change' | 'whatsapp' | 'email' | 'call' | 'visit' | 'proposal' | 'system_log';
  author: string; // ex: Name of the Broker or "Sistema / IA"
  description: string;
  metadata?: {
    prevStatus?: LeadStatus;
    newStatus?: LeadStatus;
    propertyId?: string;
    whatsappMessageId?: string;
    callDurationSeconds?: number;
    notes?: string;
  };
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string; // ex: 'Site', 'ZAP', 'VivaReal', 'Instagram', 'Indicação'
  status: LeadStatus;
  assignedBrokerId?: string; // Linked Broker ID
  interestProfile: {
    purpose: 'Venda' | 'Locação';
    budgetMin: number;
    budgetMax: number;
    preferredTypes: PropertyType[];
    preferredNeighborhoods: string[];
    minBedrooms?: number;
    minParkingSpots?: number;
  };
  timeline: LeadTimelineEvent[];
  associatedPropertyId?: string; // Property ID the client initially contacted about
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 6. PROPERTY INSPECTIONS (VISTORIAS)
// ==========================================

export interface InspectionItem {
  id: string;
  room: string; // ex: 'Sala', 'Cozinha', 'Suíte Principal', 'Varanda'
  itemName: string; // ex: 'Pintura da Parede', 'Tomadas', 'Vidros e Janelas', 'Piso e Rodapés'
  condition: InspectionItemCondition;
  notes?: string;
  photoUrls: string[];
}

export interface PropertyInspection {
  id: string;
  propertyId: string; // Linked Property
  leaseContractId?: string; // Linked LeaseContract (null if done before tenancy starts)
  inspectorId: string; // Inspector User/Broker ID
  inspectionDate: string;
  type: 'Entrada' | 'Saída' | 'Periódica';
  status: InspectionStatus;
  items: InspectionItem[];
  generalObservations?: string;
  signatureTenantUrl?: string; // Electronic signature anchor
  signatureOwnerUrl?: string; // Electronic signature anchor
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 7. CONTRACTS & FINANCIAL TRANSFERS
// ==========================================

export interface LeaseContract {
  id: string;
  contractNumber: string; // ex: CONTRATO-2026-0042
  propertyId: string; // Linked Property
  tenantId: string; // Linked Client (clientType: 'Inquilino')
  ownerId: string; // Linked Client (clientType: 'Proprietário')
  monthlyRent: number;
  adminFeePercentage: number; // Commission percentage of the rent kept by the agency (ex: 10)
  condoFee: number;
  iptuPrice: number;
  guarantorType: GuarantorType;
  guarantorDetails?: {
    name?: string;
    document?: string;
    phone?: string;
    email?: string;
    insurancePolicyNumber?: string; // Mandatory for Credit Insurance / Seguro Fiança
    caucionAmount?: number; // Mandatory for Cash Bond / Caução
  };
  startDate: string;
  endDate: string;
  adjustmentIndex: AdjustmentIndex;
  paymentStatus: PaymentStatus;
  signatureStatus: SignatureStatus;
  contractDraftText?: string; // Dynamic contract document compiled by IA / template engine (Markdown / HTML)
  createdAt: string;
  updatedAt: string;
}

/**
 * Represents a monthly billing event. Used to manage the real-world rent collections
 * and coordinate automated cash splits.
 */
export interface BillingTransaction {
  id: string;
  contractId: string; // Linked LeaseContract
  tenantId: string; // Linked Tenant Client ID
  ownerId: string; // Linked Owner Client ID
  dueDate: string;
  paidDate?: string;
  amount: number; // Total invoiced amount (Rent + Condo + IPTU + Fees)
  status: 'Pago' | 'Pendente' | 'Atrasado' | 'Cancelado';
  splitDetails: {
    agencyCommission: number; // (monthlyRent * adminFeePercentage) / 100
    ownerPayout: number; // monthlyRent - agencyCommission + iptu
    condoAmount?: number; // Directly routed if landlord is responsible for building payout
    iptuAmount?: number;
  };
  paymentMethod?: 'Pix' | 'Boleto' | 'Cartão';
  invoicePdfUrl?: string; // Compiled printable invoice for tenant
  barCode?: string; // Generated bank barcode string
  pixCopyPaste?: string; // Generated Pix string
}

// ==========================================
// 8. CUSTOMER PORTAL VIEWS (Broker / Tenant)
// ==========================================

/**
 * Consolidated dashboard stats for the Broker portal.
 */
export interface BrokerPortalDashboard {
  brokerId: string;
  activeLeads: number;
  completedVisitsThisMonth: number;
  estimatedCommissionsEarned: number;
  conversionRatePercent: number;
  dailyAgenda: {
    time: string;
    type: 'Visita' | 'Reunião' | 'Telefonema';
    leadName: string;
    propertyName?: string;
    notes?: string;
  }[];
}

/**
 * Consolidated view of a Tenant (Inquilino) accessing their personal panel.
 */
export interface MaintenanceRequest {
  id: string;
  contractId: string;
  propertyId: string;
  tenantId: string;
  title: string;
  description: string;
  photos: string[];
  status: MaintenanceRequestStatus;
  assignedProvider?: {
    name: string;
    phone: string;
    scheduledDate?: string;
    cost?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TenantPortalDashboard {
  tenantId: string;
  activeContract: LeaseContract & { propertyAddress: Address };
  currentInvoice: BillingTransaction;
  pastTransactions: BillingTransaction[];
  maintenanceHistory: MaintenanceRequest[];
}

// ==========================================
// 9. SYSTEM-WIDE PLATFORM SETTINGS
// ==========================================

export interface CompanyProfile {
  corporateName: string; // Razão Social
  tradeName: string; // Nome Fantasia
  cnpj: string;
  creciJuridico: string; // Juridical Broker Board CRECI
  phone: string;
  email: string;
  address: Address;
  logoUrl?: string;
}

export interface ThemeConfig {
  primaryColor: string; // Hex color code (ex: '#0D9488')
  secondaryColor: string; // Hex color code
  density: 'comfortable' | 'compact';
}

export interface APICredentials {
  whatsappEnabled: boolean;
  whatsappApiKey?: string;
  clicksignEnabled: boolean;
  clicksignAccessToken?: string;
  paymentGatewayEnabled: boolean;
  paymentGatewayApiKey?: string;
  paymentGatewayWebhookSecret?: string;
}

export interface AppSettings {
  companyProfile: CompanyProfile;
  themeConfig: ThemeConfig;
  apiCredentials: APICredentials;
  automations: {
    autoMatchLeads: boolean; // Automatically triggers bi-directional matching engine
    sendBilletByWhatsApp: boolean; // Automatically triggers notification API on new billing invoice
    autoAssignLeadsMethod: 'round_robin' | 'manual' | 'fastest_response';
  };
}
