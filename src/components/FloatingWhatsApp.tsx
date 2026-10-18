import React, { useState } from 'react';
import { MessageCircle, X, Users, BookOpen, Clock, Calendar } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface FloatingWhatsAppProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onNavigateSection }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  // Clean phone number: remove leading 0 and add 254
  const intlPhone = `254${CHURCH_INFO.phone.substring(1)}`;
  const defaultMessage = encodeURIComponent(
    "Praise the Lord Vicar, I am reaching out from the ACK St. Mary's Ngariama Church website for pastoral assistance / inquiry."
  );
  const whatsappUrl = `https://wa.me/${intlPhone}?text=${defaultMessage}`;

  const handleScrollTo = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${id}`;
    }
  };

  return (
    <aside 
      aria-label="Quick Access & Pastoral Helpline"
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none"
    >
      {/* Quick-action buttons row immediately above WhatsApp button */}
      <nav 
        aria-label="Quick Accessibility Shortcuts"
        className="flex items-center gap-2 pointer-events-auto animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        <button
          type="button"
          onClick={() => handleScrollTo('ministries')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-purple-950 border border-stone-200/90 hover:border-purple-300 shadow-md text-xs font-semibold backdrop-blur-md transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-800"
          title="Jump directly to Parish Ministries"
          aria-label="View Ministries"
        >
          <Users className="w-3.5 h-3.5 text-purple-900 shrink-0" aria-hidden="true" />
          <span>View Ministries</span>
        </button>

        <button
          type="button"
          onClick={() => handleScrollTo('sermons')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-purple-950 border border-stone-200/90 hover:border-amber-300 shadow-md text-xs font-semibold backdrop-blur-md transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-800"
          title="Listen and read recent Sunday Sermons"
          aria-label="Read Sermons"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0" aria-hidden="true" />
          <span>Read Sermons</span>
        </button>

        <button
          type="button"
          onClick={() => handleScrollTo('services')}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-stone-800 hover:text-purple-950 border border-stone-200/90 hover:border-emerald-300 shadow-md text-xs font-semibold backdrop-blur-md transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-purple-800"
          title="View Sunday Liturgy & Service Schedule"
          aria-label="View Service Times"
        >
          <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
          <span>Service Times</span>
        </button>
      </nav>

      {/* WhatsApp Helpline Row */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* Tooltip bubble on first arrival */}
        {showTooltip && (
          <div className="hidden sm:flex items-center gap-2 bg-stone-900 text-white text-xs px-3.5 py-2 rounded-xl shadow-lg border border-stone-800 animate-in fade-in slide-in-from-right-4 duration-300">
            <span>Need pastoral care or guidance? <strong>Chat with us</strong></span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-white p-0.5"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Floating WhatsApp Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with ACK St. Mary's Ngariama Church on WhatsApp"
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center transform transition duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="30" 
            height="30" 
            fill="currentColor" 
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.929 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.629.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.479 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </a>
      </div>
    </aside>
  );
};

