import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { HomePage } from './pages/home/HomePage';
import { TumorDeepPage } from './pages/tumors/TumorDeepPage';
import { BrainTumors } from './pages/tumors/BrainTumors';
import { Research } from './pages/research/Research';
import { Nutrition } from './pages/nutrition/Nutrition';
import { YouTubeHub } from './pages/youtube/YouTubeHub';
import { Hospitals } from './pages/hospital/Hospitals';
import { CancerShopping } from './pages/shopping/CancerShopping';
import { Stories } from './pages/stories/Stories';
import { Admin } from './pages/admin/Admin';
import { Support } from './pages/support/Support';
import { PatientRights } from './pages/patient-rights/PatientRights';

import { RoleSetupModal } from './components/RoleSetupModal';

const MainContent = () => {
  const { activeTab } = useApp();
  
  if (activeTab === 'home') {
    return (
      <main className="w-full">
        <HomePage />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      {activeTab === 'tumor-deep' && <TumorDeepPage />}
      {activeTab === 'tumors'    && <BrainTumors />}
      {activeTab === 'research'  && <Research />}
      {activeTab === 'nutrition' && <Nutrition />}
      {activeTab === 'youtube'   && <YouTubeHub />}
      {activeTab === 'hospital'  && <Hospitals />}
      {activeTab === 'shopping'  && <CancerShopping />}
      {activeTab === 'stories'   && <Stories />}
      {activeTab === 'support'   && <Support />}
      {activeTab === 'patient-rights' && <PatientRights />}
      {activeTab === 'admin'     && <Admin />}
    </main>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
          <Navbar />
          <RoleSetupModal />
          <div className="flex-1">
            <MainContent />
          </div>
          <Footer />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}
