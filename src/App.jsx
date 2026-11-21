import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Rankings from './pages/Rankings';
import Catalog from './pages/Catalog';
import DrinkTracker from './pages/DrinkTracker';
import Library from './pages/Library';

import {
  getStoredBrands,
  saveStoredBrands,
  getStoredProducts,
  saveStoredProducts,
  getStoredProjects,
  saveStoredProjects,
  getStoredStandaloneTier,
  saveStoredStandaloneTier,
  getStoredRatings,
  saveStoredRatings,
  getStoredDrinkLogs,
  saveStoredDrinkLogs
} from './storage/localStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'rankings' | 'catalog' | 'tracker' | 'library'

  // Central Application Data State
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [standaloneTiers, setStandaloneTiers] = useState({ brands: null, drinks: null });
  const [ratings, setRatings] = useState({});
  const [drinkLogs, setDrinkLogs] = useState({});

  // Reload data from LocalStorage
  const loadAllData = () => {
    setBrands(getStoredBrands());
    setProducts(getStoredProducts());
    setProjects(getStoredProjects());
    setStandaloneTiers({
      brands: getStoredStandaloneTier('brands'),
      drinks: getStoredStandaloneTier('drinks')
    });
    setRatings(getStoredRatings());
    setDrinkLogs(getStoredDrinkLogs());
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Update Handlers
  const handleAddProduct = (newProd) => {
    const updated = [newProd, ...products];
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const handleSaveProjects = (newProjects) => {
    setProjects(newProjects);
    saveStoredProjects(newProjects);
  };

  const handleSaveStandaloneTiers = (category, tierData) => {
    setStandaloneTiers((prev) => ({
      ...prev,
      [category]: tierData
    }));
    saveStoredStandaloneTier(category, tierData);
  };

  const handleSaveRatings = (newRatings) => {
    setRatings(newRatings);
    saveStoredRatings(newRatings);
  };

  const handleSaveDrinkLogs = (newLogs) => {
    setDrinkLogs(newLogs);
    saveStoredDrinkLogs(newLogs);
  };

  const handleNavigateToCatalogProduct = (searchOrId) => {
    setActiveTab('catalog');
  };

  return (
    <div className="app-container">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <div className="main-content">
        <Header 
          activeTab={activeTab} 
          onDataReload={loadAllData} 
        />

        <main style={{ flex: 1, paddingBottom: '40px' }}>
          {activeTab === 'home' && (
            <Home 
              onNavigate={setActiveTab} 
              stats={{
                brandCount: brands.length,
                productCount: products.length,
                projectCount: projects.length
              }}
            />
          )}

          {activeTab === 'rankings' && (
            <Rankings
              products={products}
              brands={brands}
              projects={projects}
              onSaveProjects={handleSaveProjects}
              standaloneTiers={standaloneTiers}
              onSaveStandaloneTiers={handleSaveStandaloneTiers}
              ratings={ratings}
              onSaveRatings={handleSaveRatings}
            />
          )}

          {activeTab === 'catalog' && (
            <Catalog
              products={products}
              brands={brands}
              onAddProduct={handleAddProduct}
              onSelectProductForDetail={(p) => {}}
            />
          )}

          {activeTab === 'tracker' && (
            <DrinkTracker
              products={products}
              drinkLogs={drinkLogs}
              onSaveLogs={handleSaveDrinkLogs}
            />
          )}

          {activeTab === 'library' && (
            <Library
              onNavigateToCatalogProduct={handleNavigateToCatalogProduct}
            />
          )}
        </main>
      </div>
    </div>
  );
}
