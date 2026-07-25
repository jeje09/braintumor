import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';

import { HealthStory } from './pages/HealthStory';
import { FoodCalories } from './pages/FoodCalories';
import { HealingTravel } from './pages/HealingTravel';
import { PerfumeStory } from './pages/PerfumeStory';
import { Shopping } from './pages/Shopping';
import { Admin } from './pages/Admin';

const MainContent = () => {
  const { activeTab } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {activeTab === 'health' && <HealthStory />}
      {activeTab === 'calories' && <FoodCalories />}
      {activeTab === 'travel' && <HealingTravel />}
      {activeTab === 'perfume' && <PerfumeStory />}
      {activeTab === 'shopping' && <Shopping />}
      {activeTab === 'admin' && <Admin />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <MainContent />
        </div>
        <Footer />
        <CheckoutModal />
      </div>
    </AppProvider>
  );
}
