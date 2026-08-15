import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardModule } from './components/modules/DashboardModule';
import { PropertiesModule } from './components/modules/PropertiesModule';
import { PropertyDetailModal } from './components/modules/PropertyDetailModal';
import { NewPropertyModal } from './components/modules/NewPropertyModal';
import { CRMModule } from './components/modules/CRMModule';
import { LeadDetailModal } from './components/modules/LeadDetailModal';
import { PortalsModule } from './components/modules/PortalsModule';
import { FinancialModule } from './components/modules/FinancialModule';
import { WhitelabelSiteModule } from './components/modules/WhitelabelSiteModule';
import { AISuiteModule } from './components/modules/AISuiteModule';
import { BuildingsModule } from './components/modules/BuildingsModule';
import { InspectionsModule } from './components/modules/InspectionsModule';
import { ClientsModule } from './components/modules/ClientsModule';
import { TenantPortalModule } from './components/modules/TenantPortalModule';
import { BrokerPortalModule } from './components/modules/BrokerPortalModule';
import { SettingsModule } from './components/modules/SettingsModule';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 overflow-y-auto bg-slate-950 min-h-screen">
      {activeTab === 'dashboard' && <DashboardModule />}
      {activeTab === 'properties' && <PropertiesModule />}
      {activeTab === 'crm' && <CRMModule />}
      {activeTab === 'buildings' && <BuildingsModule />}
      {activeTab === 'inspections' && <InspectionsModule />}
      {activeTab === 'portals' && <PortalsModule />}
      {activeTab === 'financial' && <FinancialModule />}
      {activeTab === 'clients' && <ClientsModule />}
      {activeTab === 'tenant-portal' && <TenantPortalModule />}
      {activeTab === 'broker-portal' && <BrokerPortalModule />}
      {activeTab === 'whitelabel' && <WhitelabelSiteModule />}
      {activeTab === 'ai-suite' && <AISuiteModule />}
      {activeTab === 'settings' && <SettingsModule />}

      {/* Global Modals */}
      <PropertyDetailModal />
      <NewPropertyModal />
      <LeadDetailModal />
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="flex h-screen overflow-hidden bg-slate-950">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <MainContent />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
