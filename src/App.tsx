import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { LiveChatConcierge } from './components/LiveChatConcierge';
import { EmailModal } from './components/EmailModal';
import { ErrorBoundary } from './components/ErrorBoundary';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EstimatorPage } from './pages/EstimatorPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTop } from './components/BackToTop';
import { useScrollReveal } from './hooks/useScrollReveal';

const WA_URL = `https://wa.me/919677708535?text=${encodeURIComponent('Hi TruPaintz and Interiors! I would like to schedule a consultation.')}`;

function ScrollRevealManager() {
  useScrollReveal();
  return null;
}

function WhatsAppFloat() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-5 sm:bottom-22 sm:right-6 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] shadow-xl transition-all duration-300 animate-halo-wa hover:scale-110 hover:shadow-2xl"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.49.648 4.83 1.782 6.86L2 30l7.34-1.754A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 0 1-5.83-1.594l-.418-.248-4.354 1.04 1.072-4.24-.272-.434A11.46 11.46 0 0 1 4.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.61c-.344-.172-2.036-1.004-2.352-1.118-.316-.114-.546-.172-.776.172-.23.344-.89 1.118-1.09 1.348-.2.23-.4.258-.744.086-.344-.172-1.452-.536-2.766-1.708-1.022-.912-1.712-2.038-1.912-2.382-.2-.344-.022-.53.15-.702.154-.154.344-.4.516-.6.172-.2.23-.344.344-.574.114-.23.058-.43-.028-.602-.086-.172-.776-1.872-1.064-2.562-.28-.672-.564-.58-.776-.59l-.66-.012c-.23 0-.602.086-.918.43-.316.344-1.204 1.176-1.204 2.868s1.232 3.326 1.404 3.556c.172.23 2.426 3.706 5.878 5.196.822.354 1.464.566 1.964.724.824.262 1.574.224 2.168.136.66-.098 2.036-.832 2.322-1.636.286-.804.286-1.492.2-1.636-.084-.144-.314-.23-.658-.4z"/>
      </svg>
    </a>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ReviewsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <ScrollProgressBar />
            <ScrollRevealManager />
            <div className="min-h-screen flex flex-col interior-plaster-bg interior-stucco-texture text-neutral-900 bg-[#F8F5EE] w-full">
              {/* Dynamic Global Header (Fixed & Stable on Scroll) */}
              <Header />

              {/* Dynamic Page Router */}
              <main className="flex-1 w-full pt-16 sm:pt-20">
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/portfolio" element={<Navigate to="/projects" replace />} />
                    <Route path="/gallery" element={<Navigate to="/projects" replace />} />
                    <Route path="/visualizer" element={<Navigate to="/projects" replace />} />
                    <Route path="/estimator" element={<EstimatorPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/journal" element={<Navigate to="/about" replace />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </ErrorBoundary>
              </main>

              {/* Dynamic Global Footer */}
              <Footer />

              {/* Dribbble Floating Back to Top Widget */}
              <BackToTop />

              {/* Global WhatsApp Float */}
              <WhatsAppFloat />

              {/* Real-time Live Chat Concierge */}
              <LiveChatConcierge />

              {/* Confirmation / Receipt Modals */}
              <EmailModal />
            </div>
          </BrowserRouter>
        </ReviewsProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}
