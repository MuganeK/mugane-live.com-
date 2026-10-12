import React, { useState } from 'react';
import { SERVICE_SCHEDULE } from '../data/churchData';
import { NextServiceCountdown } from './NextServiceCountdown';
import { Clock, MapPin, Users, BookOpen, ChevronDown, ChevronUp, Church, Heart } from 'lucide-react';

export const ServiceSchedule: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What should I expect during a Sunday service at St. Mary's?",
      a: "Our Sunday service blends reverent Anglican liturgy with vibrant African choral worship. We begin with Morning Prayer and praise, followed by the scripture readings, children's sermon, main exposition of the Word, intercessory prayers, and Holy Communion (on 1st & 3rd Sundays). Services are conducted warmly in English and Kikuyu."
    },
    {
      q: "Where do my children go during the service?",
      a: "Children ages 3 to 14 have their dedicated Sunday School classes in the adjacent Parish Hall starting from 8:30 AM with certified teachers. They rejoin parents in the main sanctuary for the closing blessing and family thanksgiving."
    },
    {
      q: "What is the dress code?",
      a: "Modest, smart-casual or Sunday best attire is standard. Many members wear traditional African wear, suits, or church departmental uniforms (KAMA blue, Mothers' Union white and blue, KAYO). Everyone is warmly embraced."
    },
    {
      q: "How can I meet the Vicar or request pastoral counseling?",
      a: "The Vicar and pastoral team are available immediately after the service at the church courtyard for fellowship and welcoming visitors. You can also visit the church office Tuesday to Friday 9:00 AM to 4:00 PM, or submit an online pastoral request anytime."
    }
  ];

  return (
    <section id="services" className="py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-900 block mb-2">
            Worship With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Service Times & Liturgy
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Whether you have lived in Ngariama your whole life or are visiting Gichugu for the weekend, you have a warm seat in God's house.
          </p>
        </div>

        {/* Live Service Countdown */}
        <div className="mb-14">
          <NextServiceCountdown />
        </div>

        {/* Service Schedule Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Card 1: Sunday Main Service */}
          <div className="bg-white rounded-xl p-7 shadow-xs border border-stone-200/80 border-t-4 border-t-purple-900 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-900 mb-4">
              <Church className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-purple-800 uppercase tracking-wide">
              Primary Gathering
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">
              Sunday Main Liturgy
            </h3>
            <div className="text-2xl font-bold font-mono text-purple-950 tabular-nums mb-3">
              9:00 AM – 12:00 PM
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Expository sermon, choir anthems, prayers of intercession, and Holy Communion. Bilingual service (English & Kikuyu).
            </p>
            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Main Sanctuary</span>
            </div>
          </div>

          {/* Card 2: Sunday School */}
          <div className="bg-white rounded-xl p-7 shadow-xs border border-stone-200/80 border-t-4 border-t-emerald-700 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">
              Children's Department
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">
              Sunday School & Brigade
            </h3>
            <div className="text-2xl font-bold font-mono text-purple-950 tabular-nums mb-3">
              8:30 AM – 10:30 AM
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Nurturing age-graded Bible lessons, action songs, memory verses, and craft activities for ages 3 through 14.
            </p>
            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Parish Hall & Classrooms</span>
            </div>
          </div>

          {/* Card 3: Midweek Fellowship */}
          <div className="bg-white rounded-xl p-7 shadow-xs border border-stone-200/80 border-t-4 border-t-amber-500 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
              Spiritual Nourishment
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">
              Midweek Bible Fellowship
            </h3>
            <div className="text-2xl font-bold font-mono text-purple-950 tabular-nums mb-3">
              Wednesday 5:00 PM
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Intimate verse-by-verse scripture discussion, sharing testimonies, and dedicated intercession for families.
            </p>
            <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-xs text-stone-500">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Sanctuary & Cell Groups</span>
            </div>
          </div>
        </div>

        {/* First Time Visitor FAQ Accordion */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-xs max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">First-Time Visitors Guide</span>
            <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
              Frequently Asked Questions About Visiting
            </h3>
          </div>

          <div className="divide-y divide-stone-200">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="font-semibold text-stone-800 group-hover:text-purple-900 transition text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <span className="text-stone-400 group-hover:text-purple-900 transition ml-4 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 text-stone-600 text-xs sm:text-sm leading-relaxed pr-6 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
