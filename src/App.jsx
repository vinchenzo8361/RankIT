import React, { useState, useEffect } from 'react';
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
  saveStoredDrinkLogs,
  getStoredFavorites,
  saveStoredFavorites
} from './storage/localStorage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Central Application Data State
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [standaloneTiers, setStandaloneTiers] = useState({ brands: null, drinks: null });
  const [ratings, setRatings] = useState({});
  const [drinkLogs, setDrinkLogs] = useState({});
  const [favorites, setFavorites] = useState([]);

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
    setFavorites(getStoredFavorites());
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

  const handleToggleFavorite = (productId) => {
    let updated;
    if (favorites.includes(productId)) {
      updated = favorites.filter((id) => id !== productId);
    } else {
      updated = [productId, ...favorites];
    }
    setFavorites(updated);
    saveStoredFavorites(updated);
  };

  const handleNavigateToCatalogProduct = (searchOrId) => {
    setActiveTab('catalog');
  };

  return (
    <div className="app-container">
      {/* Top Left-to-Right Header Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onDataReload={loadAllData} 
      />

      <div className="main-content">
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
            />
          )}

          {activeTab === 'tracker' && (
            <DrinkTracker
              products={products}
              brands={brands}
              drinkLogs={drinkLogs}
              onSaveLogs={handleSaveDrinkLogs}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
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
