export type PropertyType = 'Apartamento' | 'Casa' | 'Sobrado' | 'Terreno' | 'Comercial' | 'Cobertura' | 'Chácara';
export type PropertyPurpose = 'Venda' | 'Locação' | 'Venda e Locação' | 'Ambos';
export type PropertyStatus = 'Disponível' | 'Reservado' | 'Vendido' | 'Alugado' | 'Suspenso';
export type LeadStatus = 'Novo Lead' | 'Primeiro Atendimento' | '1º Atendimento' | 'Visita Agendada' | 'Proposta Recebida' | 'Fechamento';
export type UserRole = 'Administrador' | 'Gerente' | 'Corretor' | 'Inquilino' | 'Proprietário';
export type GuarantorType = 'Fiador' | 'Caução' | 'Seguro Fiança' | 'Sem Garantia';
export type AdjustmentIndex = 'IGP-M' | 'IPCA' | 'INPC' | 'Sem Reajuste';
export type PaymentStatus = 'Pago' | 'Pendente' | 'Atrasado';
export type SignatureStatus = 'Assinado' | 'Aguardando' | 'Aguardando Assinatura' | 'Recusado' | 'Rascunho';
export type InspectionStatus = 'Agendada' | 'Em Andamento' | 'Aprovada' | 'Aprovada com Ressalvas' | 'Reprovada';
export type InspectionItemCondition = 'Excelente' | 'Bom' | 'Precisa de Reparo' | 'Danificado';
export type MaintenanceRequestStatus = 'Aberto' | 'Em Análise' | 'Profissional Designado' | 'Concluído' | 'Cancelado';
export type LeadSource = 'Portais (ZAP/VivaReal)' | 'WhatsApp' | 'Site Próprio' | 'Instagram' | 'Indicação';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

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

export interface Broker extends User {
  role: 'Corretor';
  creci: string;
  commissionRate: number;
  status: 'Disponível' | 'Em Atendimento' | 'Inativo';
  currentLeadCount: number;
  totalDealsClosed: number;
  activeLeadsCount?: number;
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  documentType: 'CPF' | 'CNPJ';
  documentNumber: string;
  clientType: 'Proprietário' | 'Inquilino' | 'Comprador' | 'Investidor';
  status: 'Ativo' | 'Inativo' | 'Bloqueado';
  address?: Address;
  financialInfo?: {
    declaredIncome: number;
    profession?: string;
    bankAccount?: {
      bankCode: string;
      bankName?: string;
      agency: string;
      accountNumber: string;
      accountType: 'Corrente' | 'Poupança';
      pixKey?: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface Building {
  id: string;
  name: string;
  address: Address;
  floorsCount: number;
  unitsCount: number;
  defaultCondoFee: number;
  amenities: string[];
  associatedPropertyIds: string[];
  ownerId?: string;
  totalRevenueProjected: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyOwner {
  name: string;
  phone: string;
  email: string;
  document: string;
}

export interface Property {
  id: string;
  code: string;
  title: string;
  description: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  price: number;
  rentPrice?: number;
  condoFee?: number;
  iptu?: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parkingSpots: number;
  features: string[];
  address: Address;
  status: PropertyStatus;
  isExclusive: boolean;
  exclusivityEndDate?: string;
  portalSync: {
    zap: boolean;
    vivareal: boolean;
    olx: boolean;
    imovelweb: boolean;
  };
  owner: PropertyOwner;
  ownerId?: string;
  buildingId?: string;
  images: string[];
  aiMatchScore?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface LeadTimelineEvent {
  id: string;
  date: string;
  timestamp?: string;
  type: 'message' | 'visit' | 'proposal' | 'call' | 'status_change' | 'whatsapp' | 'email' | 'system_log';
  title: string;
  description: string;
  author: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  assignedBroker: string;
  assignedBrokerId?: string;
  budgetMin: number;
  budgetMax: number;
  preferredType: PropertyType;
  preferredNeighborhoods: string[];
  bedroomsNeeded?: number;
  interestedPropertyIds: string[];
  notes: string;
  timeline: LeadTimelineEvent[];
  createdAt: string;
  lastContact: string;
  updatedAt?: string;
}

export interface InspectionItem {
  id: string;
  room: string;
  itemName: string;
  condition: InspectionItemCondition;
  notes?: string;
  photoUrls: string[];
}

export interface PropertyInspection {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCode: string;
  leaseContractId?: string;
  inspectorName: string;
  inspectionDate: string;
  type: 'Entrada' | 'Saída' | 'Periódica';
  status: InspectionStatus;
  items: InspectionItem[];
  generalObservations?: string;
  createdAt: string;
}

export interface LeaseContract {
  id: string;
  contractNumber: string;
  propertyId: string;
  propertyTitle: string;
  tenantName: string;
  tenantPhone: string;
  tenantId?: string;
  ownerName: string;
  ownerId?: string;
  monthlyRent: number;
  condoFee: number;
  adminFeePercentage: number;
  startDate: string;
  endDate: string;
  adjustmentIndex: AdjustmentIndex;
  lastAdjustmentDate?: string;
  paymentStatus: PaymentStatus;
  signatureStatus: SignatureStatus;
  guarantorType: GuarantorType;
}

export interface BillingTransaction {
  id: string;
  contractId: string;
  tenantName: string;
  ownerName: string;
  propertyCode: string;
  dueDate: string;
  paidDate?: string;
  amount: number;
  status: 'Pago' | 'Pendente' | 'Atrasado' | 'Cancelado';
  splitDetails: {
    agencyCommission: number;
    ownerPayout: number;
    condoAmount?: number;
    iptuAmount?: number;
  };
  paymentMethod?: 'Pix' | 'Boleto' | 'Cartão';
  barCode?: string;
  pixCopyPaste?: string;
}

export interface MaintenanceRequest {
  id: string;
  contractId: string;
  propertyTitle: string;
  tenantName: string;
  title: string;
  description: string;
  category: 'Hidráulica' | 'Elétrica' | 'Pintura' | 'Estrutural' | 'Outros';
  status: MaintenanceRequestStatus;
  assignedProvider?: {
    name: string;
    phone: string;
    scheduledDate?: string;
    cost?: number;
  };
  createdAt: string;
}

export interface CompanyProfile {
  corporateName: string;
  tradeName: string;
  cnpj: string;
  creciJuridico: string;
  phone: string;
  email: string;
  address: Address;
}

export interface AppSettings {
  companyProfile: CompanyProfile;
  themeConfig: {
    primaryColor: string;
    density: 'comfortable' | 'compact';
  };
  apiCredentials: {
    whatsappEnabled: boolean;
    whatsappApiKey?: string;
    clicksignEnabled: boolean;
    clicksignAccessToken?: string;
    paymentGatewayEnabled: boolean;
    paymentGatewayApiKey?: string;
  };
  automations: {
    autoMatchLeads: boolean;
    sendBilletByWhatsApp: boolean;
    autoAssignLeadsMethod: 'round_robin' | 'manual' | 'fastest_response';
  };
}
