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

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { VisualizerPage } from './pages/VisualizerPage';
import { EstimatorPage } from './pages/EstimatorPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GalleryPage } from './pages/GalleryPage';

export default function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ReviewsProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col interior-plaster-bg interior-stucco-texture text-neutral-900 bg-[#F8F5EE] w-full">
              {/* Dynamic Global Header (Fixed & Stable on Scroll) */}
              <Header />

              {/* Dynamic Page Router */}
              <main className="flex-1 w-full pt-16 sm:pt-20">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/portfolio" element={<Navigate to="/projects" replace />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/visualizer" element={<VisualizerPage />} />
                  <Route path="/estimator" element={<EstimatorPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/journal" element={<Navigate to="/about" replace />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Dynamic Global Footer */}
              <Footer />

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
