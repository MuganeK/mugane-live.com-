import React, { useState } from 'react';
import { ChurchCrest } from './ChurchCrest';
import { CHURCH_INFO } from '../data/churchData';
import { CheckCircle2, Award, Users, BookOpen, Compass, Shield } from 'lucide-react';

export const AboutParish: React.FC = () => {
  const [photoError, setPhotoError] = useState(false);
  const churchPhotoUrl = "https://z-cdn-media.chatglm.cn/files/ee47dfa2-d4b7-4007-9995-73ee949e1387.jpg?auth_key=1883882766-f3d96f7536104261849591129155b629-0-708dd0377892df4e0dcd3da84478a015";

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Church Architecture Image & Heritage Badge */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 h-[420px] sm:h-[480px]">
              {!photoError ? (
                <img
                  src={churchPhotoUrl}
                  alt="ACK St. Mary's Ngariama Church Sanctuary"
                  className="w-full h-full object-cover object-center"
                  onError={() => setPhotoError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-950 flex flex-col items-center justify-center p-8 text-center text-white">
                  <ChurchCrest size="lg" className="mb-4" />
                  <h4 className="font-serif text-2xl font-bold">ACK St. Mary's Ngariama</h4>
                  <p className="text-purple-200 text-sm mt-2">Diocese of Kirinyaga · Gichugu Division</p>
                </div>
              )}
            </div>

            {/* Heritage Badge */}
            <div className="absolute -bottom-6 -left-2 sm:left-6 bg-purple-950 text-white p-5 rounded-xl border-t-4 border-amber-500 shadow-xl max-w-[280px]">
              <div className="flex items-center gap-3">
                <ChurchCrest size="sm" />
                <div>
                  <p className="font-serif font-bold text-base leading-tight">50+ Years of Grace</p>
                  <p className="text-xs text-amber-300 font-medium">Est. 1974 · Ngariama Parish</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Parish Narrative & Pillars */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-900 mb-2">
              <span>Our Heritage & Calling</span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-6 leading-tight">
              A Living Sanctuary of Faith in the Hills of Kirinyaga
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
              <strong>ACK St. Mary's Ngariama Church</strong> is a parish under the <strong>Anglican Church of Kenya (ACK), Diocese of Kirinyaga</strong>. Nestled on the fertile agricultural slopes of Gichugu Division, our parish has stood for over five decades as a beacon of biblical truth, community fellowship, and spiritual restoration.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-8">
              We hold firmly to the historic Anglican tradition of biblical authority, sacramental worship, pastoral care, and active Christian social responsibility. From early childhood discipleship to elder care, our church is one family united in Christ.
            </p>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 text-center">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 border-t-2 border-t-amber-500">
                <span className="block text-2xl sm:text-3xl font-bold font-mono text-purple-950 tabular-nums">50+</span>
                <span className="text-xs text-stone-500 font-medium mt-1 block">Years of Ministry</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 border-t-2 border-t-emerald-700">
                <span className="block text-2xl sm:text-3xl font-bold font-mono text-purple-950 tabular-nums">500+</span>
                <span className="text-xs text-stone-500 font-medium mt-1 block">Parish Families</span>
              </div>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 border-t-2 border-t-purple-900">
                <span className="block text-2xl sm:text-3xl font-bold font-mono text-purple-950 tabular-nums">6</span>
                <span className="text-xs text-stone-500 font-medium mt-1 block">Active Ministries</span>
              </div>
            </div>

            {/* Core Mission Bullet Points */}
            <ul className="space-y-3 text-stone-700 text-xs sm:text-sm mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Scriptural Teaching:</strong> Rooting every believer in the uncompromised Word of God.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Pastoral Care:</strong> Walking with families during joy, bereavement, illness, and milestones.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Community Compassion:</strong> Extending Christ's hands to the elderly, orphans, and needy in Ngariama.</span>
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <a
                href="#leadership"
                className="px-5 py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs sm:text-sm transition shadow-xs"
              >
                Meet Our Leadership Team
              </a>
              <a
                href="#services"
                className="px-5 py-2.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-800 font-medium text-xs sm:text-sm transition"
              >
                View Sunday Liturgy
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
