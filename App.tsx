import React, { useState, useEffect } from 'react';
import { Language, Page, STRINGS } from './types';
import { ChatWidget } from './components/ChatWidget';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Tracking } from './pages/Tracking';

export default function App() {
  const [language, setLanguage] = useState<Language>(Language.ZH);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Simple page title update
  useEffect(() => {
    const t = STRINGS[language];
    let title = "Apony Inc";
    switch(currentPage) {
      case 'services': title = `${t.navServices} | Apony Inc`; break;
      case 'about': title = `${t.navAbout} | Apony Inc`; break;
      case 'contact': title = `${t.navContact} | Apony Inc`; break;
      case 'tracking': title = `${t.navTracking} | Apony Inc`; break;
      default: title = t.heroTitle;
    }
    document.title = title;
  }, [currentPage, language]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 flex flex-col">
      
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
      </main>

      <Footer language={language} setPage={setCurrentPage} />

      {/* AI Chat Widget - Persists across pages */}
      <ChatWidget language={language} />
    </div>
  );
}