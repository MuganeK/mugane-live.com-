import React from 'react';
import { CHURCH_INFO } from '../data/churchData';
import { MapPin, Phone, Mail, Clock, Compass, Navigation, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-900 block mb-2">
            Visit & Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Finding ACK St. Mary's Ngariama
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Located in Ngariama, Gichugu Sub-County, amidst the scenic tea and coffee slopes of Kirinyaga County.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Left: Contact Info & Office Hours */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200">
              <h3 className="font-serif text-2xl font-bold text-purple-950 mb-6">
                Parish Secretariat & Contacts
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-900 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-purple-900" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Physical Location</strong>
                    <span className="text-stone-600 leading-relaxed block">
                      Ngariama Location, Gichugu Division, Kirinyaga County, Kenya (Off Kianyaga–Ngariama Road)
                    </span>
                    <span className="text-xs text-amber-700 font-medium mt-0.5 block">
                      Diocese of Kirinyaga · ACK
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Parish Office & Vicar Helpline</strong>
                    <a
                      href={`tel:${CHURCH_INFO.phone}`}
                      className="text-purple-900 hover:underline font-mono text-base font-bold"
                    >
                      {CHURCH_INFO.phone}
                    </a>
                    <span className="text-xs text-stone-500 block">Available for pastoral emergencies 24/7</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-amber-800" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Email & Postal Address</strong>
                    <a
                      href={`mailto:${CHURCH_INFO.email}`}
                      className="text-purple-900 hover:underline block"
                    >
                      {CHURCH_INFO.email}
                    </a>
                    <span className="text-xs text-stone-500 font-mono block mt-0.5">
                      {CHURCH_INFO.postalAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-stone-200 flex items-center justify-center text-stone-800 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-stone-800" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 font-semibold">Parish Office Working Hours</strong>
                    <span className="text-stone-600 block text-xs sm:text-sm">
                      Tuesday – Friday: 9:00 AM – 4:00 PM
                    </span>
                    <span className="text-stone-600 block text-xs sm:text-sm">
                      Saturday: By appointment (Couples & Youth)
                    </span>
                    <span className="text-purple-950 font-medium block text-xs sm:text-sm mt-0.5">
                      Sunday: 8:00 AM – 2:00 PM (Services & Parish Meetings)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Directions Note */}
            <div className="bg-purple-950 text-white p-6 rounded-2xl border border-purple-900">
              <h4 className="font-serif font-bold text-lg mb-2 flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>Directions from Major Hubs</span>
              </h4>
              <ul className="text-xs text-purple-200 space-y-2">
                <li>
                  <strong className="text-white">From Kerugoya Town:</strong> Board a matatu heading to Kianyaga, alight at Kianyaga stage and take the Ngariama route (approx. 20 mins drive).
                </li>
                <li>
                  <strong className="text-white">From Embu:</strong> Travel via Kutus or through Mururi-Kianyaga link road into Ngariama.
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Map Representation & Google Maps Action */}
          <div className="bg-stone-100 rounded-2xl overflow-hidden border border-stone-200 flex flex-col justify-between shadow-xs">
            {/* Visual Map Representation */}
            <div className="relative h-72 sm:h-96 bg-stone-200 overflow-hidden flex items-center justify-center">
              {/* Styled Map Background Grid */}
              <div 
                className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b185f_1px,transparent_1px)] [background-size:16px_16px]"
              />
              
              {/* Stylized terrain lines */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="#3b185f" strokeWidth="0.8">
                  <circle cx="50" cy="50" r="45" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="30" />
                  <circle cx="50" cy="50" r="15" />
                  <line x1="0" y1="50" x2="100" y2="50" />
                  <line x1="50" y1="0" x2="50" y2="100" />
                </svg>
              </div>

              {/* Pin Centerpiece */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-purple-900 text-white shadow-xl flex items-center justify-center border-4 border-amber-400 animate-pulse">
                  <MapPin className="w-7 h-7 text-amber-300" />
                </div>
                <div className="mt-3 bg-white/95 px-4 py-2 rounded-xl shadow-lg border border-stone-200 text-center">
                  <span className="font-serif font-bold text-sm text-purple-950 block">ACK St. Mary's Ngariama</span>
                  <span className="text-[11px] text-stone-500">Ngariama, Gichugu Division</span>
                </div>
              </div>

              {/* Coordinates Badge */}
              <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded font-mono backdrop-blur-xs">
                Kirinyaga County · 0°30'S, 37°21'E
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="p-6 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  Visiting for the first time?
                </h4>
                <p className="text-xs text-stone-500">
                  Our church hospitality stewards will gladly welcome and assist you.
                </p>
              </div>
              <a
                href="https://www.google.com/maps/search/ACK+St+Marys+Ngariama+Kirinyaga"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition shrink-0"
              >
                <Navigation className="w-4 h-4 text-amber-300" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
