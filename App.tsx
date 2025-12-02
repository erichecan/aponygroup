import React, { useState, useEffect } from 'react';
import { Language, Page, STRINGS } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Tracking } from './pages/Tracking';
import { Login } from './pages/Login';

export default function App() {
  const [language, setLanguage] = useState<Language>(Language.ZH);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Simple page title update
  useEffect(() => {
    const t = STRINGS[language];
    let title = "AponyGroup";
    switch(currentPage) {
      case 'services': title = `${t.navServices} | AponyGroup`; break;
      case 'about': title = `${t.navAbout} | AponyGroup`; break;
      case 'contact': title = `${t.navContact} | AponyGroup`; break;
      case 'tracking': title = `${t.navTracking} | AponyGroup`; break;
      case 'login': title = `${t.navLogin} | AponyGroup`; break;
      default: title = t.heroTitle;
    }
    document.title = title;
  }, [currentPage, language]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-[#FF6B35] flex flex-col">
      
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        currentPage={currentPage}
        setPage={setCurrentPage}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentPage === 'home' && <Home language={language} setPage={setCurrentPage} />}
        {currentPage === 'services' && <Services language={language} />}
        {currentPage === 'about' && <About language={language} />}
        {currentPage === 'contact' && <Contact language={language} />}
        {currentPage === 'tracking' && <Tracking language={language} />}
        {currentPage === 'login' && <Login language={language} />}
      </main>

      <Footer language={language} setPage={setCurrentPage} />
    </div>
  );
}