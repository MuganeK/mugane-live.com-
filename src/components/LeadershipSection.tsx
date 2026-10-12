import React, { useState } from 'react';
import { LEADERS, CHURCH_INFO } from '../data/churchData';
import { ChurchLeader } from '../types/church';
import { Phone, Mail, Award, Shield, UserCheck } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  return (
    <section id="leadership" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-900 block mb-2">
            Shepherds & Stewards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-4">
            Parish Leadership Team
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4 rounded-full"></div>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Ordained clergy and parish wardens dedicated to guiding ACK St. Mary's Ngariama with prayer, wisdom, transparency, and servant leadership.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERS.map((leader, index) => {
            const borderColors = [
              'border-t-purple-900',
              'border-t-emerald-700',
              'border-t-amber-500',
              'border-t-purple-900',
              'border-t-emerald-700',
              'border-t-amber-500'
            ];

            return (
              <div
                key={leader.id}
                className={`bg-stone-50 rounded-xl p-6 border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border-t-4 ${borderColors[index % borderColors.length]}`}
              >
                <div>
                  {/* Avatar / Clerical Badge */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-900 to-indigo-950 text-white flex items-center justify-center font-serif text-xl font-bold mb-4 shadow-sm">
                    {leader.name.split(' ').map(n => n[0]).filter(Boolean).slice(-2).join('')}
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-900 block">
                    {leader.role}
                  </span>
                  
                  <h3 className="font-serif text-lg font-bold text-stone-900 mt-0.5 mb-1">
                    {leader.name}
                  </h3>

                  <p className="text-xs font-medium text-emerald-800 mb-3">
                    {leader.title}
                  </p>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/70 text-xs text-stone-500 flex items-center justify-between">
                  <span className="font-medium text-stone-600">{leader.department}</span>
                  {leader.phone && (
                    <a
                      href={`tel:${leader.phone}`}
                      className="text-purple-900 hover:text-purple-700 font-semibold inline-flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-amber-600" />
                      <span>{leader.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Diocesan Bishop Affiliation Strip */}
        <div className="mt-12 bg-purple-950 text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-purple-800">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                Episcopal Oversight
              </p>
              <h4 className="font-serif text-lg font-bold">
                {CHURCH_INFO.bishop}
              </h4>
              <p className="text-xs text-purple-200">
                Anglican Diocese of Kirinyaga · Diocesan Headquarters: St. Thomas Cathedral, Kerugoya
              </p>
            </div>
          </div>

          <a
            href="#services"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium border border-white/20 whitespace-nowrap transition"
          >
            Visit Our Parish
          </a>
        </div>

      </div>
    </section>
  );
};
