import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Property,
  Lead,
  LeaseContract,
  Broker,
  Building,
  Client,
  PropertyInspection,
  BillingTransaction,
  MaintenanceRequest,
  AppSettings,
  LeadStatus,
} from '../types';
import {
  mockProperties,
  mockLeads,
  mockContracts,
  mockBrokers,
  mockBuildings,
  mockClients,
  mockInspections,
  mockBillingTransactions,
  mockMaintenanceRequests,
  mockAppSettings,
} from '../mock/mockData';

interface AppContextType {
  properties: Property[];
  leads: Lead[];
  contracts: LeaseContract[];
  brokers: Broker[];
  buildings: Building[];
  clients: Client[];
  inspections: PropertyInspection[];
  billingTransactions: BillingTransaction[];
  maintenanceRequests: MaintenanceRequest[];
  appSettings: AppSettings;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  addProperty: (property: Omit<Property, 'id' | 'code' | 'createdAt'>) => void;
  updateProperty: (id: string, updated: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  togglePortalSync: (propertyId: string, portal: 'zap' | 'vivareal' | 'olx' | 'imovelweb') => void;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'lastContact' | 'timeline'>) => void;
  updateLeadStatus: (leadId: string, newStatus: LeadStatus) => void;
  addLeadTimelineEvent: (leadId: string, eventTitle: string, description: string, type: 'message' | 'visit' | 'proposal' | 'call' | 'status_change') => void;
  addBuilding: (building: Omit<Building, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addInspection: (inspection: Omit<PropertyInspection, 'id' | 'createdAt'>) => void;
  addMaintenanceRequest: (req: Omit<MaintenanceRequest, 'id' | 'createdAt'>) => void;
  updateAppSettings: (settings: Partial<AppSettings>) => void;
  getMatchingLeadsForProperty: (property: Property) => Lead[];
  getMatchingPropertiesForLead: (lead: Lead) => Property[];
  selectedPropertyForDetail: Property | null;
  setSelectedPropertyForDetail: (property: Property | null) => void;
  selectedLeadForDetail: Lead | null;
  setSelectedLeadForDetail: (lead: Lead | null) => void;
  isNewPropertyModalOpen: boolean;
  setIsNewPropertyModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('imob_properties');
    return saved ? JSON.parse(saved) : mockProperties;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('imob_leads');
    return saved ? JSON.parse(saved) : mockLeads;
  });

  const [contracts] = useState<LeaseContract[]>(mockContracts);
  const [brokers] = useState<Broker[]>(mockBrokers);

  const [buildings, setBuildings] = useState<Building[]>(() => {
    const saved = localStorage.getItem('imob_buildings');
    return saved ? JSON.parse(saved) : mockBuildings;
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('imob_clients');
    return saved ? JSON.parse(saved) : mockClients;
  });

  const [inspections, setInspections] = useState<PropertyInspection[]>(() => {
    const saved = localStorage.getItem('imob_inspections');
    return saved ? JSON.parse(saved) : mockInspections;
  });

  const [billingTransactions] = useState<BillingTransaction[]>(mockBillingTransactions);

  const [maintenanceRequests, setMaintenanceRequests] = useState<MaintenanceRequest[]>(() => {
    const saved = localStorage.getItem('imob_maintenance');
    return saved ? JSON.parse(saved) : mockMaintenanceRequests;
  });

  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('imob_settings');
    return saved ? JSON.parse(saved) : mockAppSettings;
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedPropertyForDetail, setSelectedPropertyForDetail] = useState<Property | null>(null);
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);
  const [isNewPropertyModalOpen, setIsNewPropertyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('imob_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('imob_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('imob_buildings', JSON.stringify(buildings));
  }, [buildings]);

  useEffect(() => {
    localStorage.setItem('imob_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('imob_inspections', JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem('imob_maintenance', JSON.stringify(maintenanceRequests));
  }, [maintenanceRequests]);

  useEffect(() => {
    localStorage.setItem('imob_settings', JSON.stringify(appSettings));
  }, [appSettings]);

  const addProperty = (newPropData: Omit<Property, 'id' | 'code' | 'createdAt'>) => {
    const id = `prop-${Date.now()}`;
    const code = `IMO-${Math.floor(100 + Math.random() * 900)}`;
    const createdAt = new Date().toISOString().split('T')[0];
    const newProp: Property = {
      ...newPropData,
      id,
      code,
      createdAt,
    };
    setProperties((prev) => [newProp, ...prev]);
  };

  const updateProperty = (id: string, updated: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePortalSync = (propertyId: string, portal: 'zap' | 'vivareal' | 'olx' | 'imovelweb') => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === propertyId) {
          return {
            ...p,
            portalSync: {
              ...p.portalSync,
              [portal]: !p.portalSync[portal],
            },
          };
        }
        return p;
      })
    );
  };

  const addLead = (newLeadData: Omit<Lead, 'id' | 'createdAt' | 'lastContact' | 'timeline'>) => {
    const id = `lead-${Date.now()}`;
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    const newLead: Lead = {
      ...newLeadData,
      id,
      createdAt: now.toISOString().split('T')[0],
      lastContact: now.toISOString().split('T')[0],
      timeline: [
        {
          id: `evt-${Date.now()}`,
          date: formattedDate,
          type: 'message',
          title: 'Lead Cadastrado',
          description: 'Lead registrado no sistema.',
          author: 'Sistema',
        },
      ],
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          const oldStatus = l.status;
          return {
            ...l,
            status: newStatus,
            lastContact: now.toISOString().split('T')[0],
            timeline: [
              ...l.timeline,
              {
                id: `evt-${Date.now()}`,
                date: formattedDate,
                type: 'status_change',
                title: `Status alterado de "${oldStatus}" para "${newStatus}"`,
                description: `Movido no funil de vendas.`,
                author: 'Usuário',
              },
            ],
          };
        }
        return l;
      })
    );
  };

  const addLeadTimelineEvent = (
    leadId: string,
    eventTitle: string,
    description: string,
    type: 'message' | 'visit' | 'proposal' | 'call' | 'status_change'
  ) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === leadId) {
          return {
            ...l,
            lastContact: now.toISOString().split('T')[0],
            timeline: [
              ...l.timeline,
              {
                id: `evt-${Date.now()}`,
                date: formattedDate,
                type,
                title: eventTitle,
                description,
                author: 'Usuário Logado',
              },
            ],
          };
        }
        return l;
      })
    );
  };

  const addBuilding = (data: Omit<Building, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = `bldg-${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];
    const newBldg: Building = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };
    setBuildings((prev) => [newBldg, ...prev]);
  };

  const addClient = (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    const id = `cli-${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];
    const newCli: Client = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };
    setClients((prev) => [newCli, ...prev]);
  };

  const addInspection = (data: Omit<PropertyInspection, 'id' | 'createdAt'>) => {
    const id = `insp-${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];
    const newInsp: PropertyInspection = {
      ...data,
      id,
      createdAt: now,
    };
    setInspections((prev) => [newInsp, ...prev]);
  };

  const addMaintenanceRequest = (data: Omit<MaintenanceRequest, 'id' | 'createdAt'>) => {
    const id = `maint-${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];
    const newReq: MaintenanceRequest = {
      ...data,
      id,
      createdAt: now,
    };
    setMaintenanceRequests((prev) => [newReq, ...prev]);
  };

  const updateAppSettings = (settings: Partial<AppSettings>) => {
    setAppSettings((prev) => ({
      ...prev,
      ...settings,
    }));
  };

  const getMatchingLeadsForProperty = (property: Property): Lead[] => {
    return leads.filter((lead) => {
      const typeMatch = !lead.preferredType || lead.preferredType === property.type;
      const budgetMatch =
        (property.price >= lead.budgetMin && property.price <= lead.budgetMax) ||
        (property.rentPrice && property.rentPrice >= lead.budgetMin && property.rentPrice <= lead.budgetMax);
      const neighborhoodMatch =
        lead.preferredNeighborhoods.length === 0 ||
        lead.preferredNeighborhoods.some((n) =>
          property.address.neighborhood.toLowerCase().includes(n.toLowerCase())
        );
      return typeMatch && (budgetMatch || neighborhoodMatch);
    });
  };

  const getMatchingPropertiesForLead = (lead: Lead): Property[] => {
    return properties.filter((property) => {
      const typeMatch = !lead.preferredType || lead.preferredType === property.type;
      const budgetMatch =
        (property.price >= lead.budgetMin && property.price <= lead.budgetMax) ||
        (property.rentPrice && property.rentPrice >= lead.budgetMin && property.rentPrice <= lead.budgetMax);
      const neighborhoodMatch =
        lead.preferredNeighborhoods.length === 0 ||
        lead.preferredNeighborhoods.some((n) =>
          property.address.neighborhood.toLowerCase().includes(n.toLowerCase())
        );
      return typeMatch && (budgetMatch || neighborhoodMatch);
    });
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        leads,
        contracts,
        brokers,
        buildings,
        clients,
        inspections,
        billingTransactions,
        maintenanceRequests,
        appSettings,
        activeTab,
        setActiveTab,
        addProperty,
        updateProperty,
        deleteProperty,
        togglePortalSync,
        addLead,
        updateLeadStatus,
        addLeadTimelineEvent,
        addBuilding,
        addClient,
        addInspection,
        addMaintenanceRequest,
        updateAppSettings,
        getMatchingLeadsForProperty,
        getMatchingPropertiesForLead,
        selectedPropertyForDetail,
        setSelectedPropertyForDetail,
        selectedLeadForDetail,
        setSelectedLeadForDetail,
        isNewPropertyModalOpen,
        setIsNewPropertyModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};
