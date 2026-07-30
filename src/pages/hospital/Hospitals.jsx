import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Hospital, MapPin, Phone, ExternalLink, UserCheck, Star, ShieldCheck, Info } from 'lucide-react';

export const Hospitals = () => {
  const { hospitals } = useApp();
  const [selectedHospital, setSelectedHospital] = useState(null);

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold">
          <Hospital className="w-3.5 h-3.5" />
          <span>다학제 뇌종양 센터</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          전국 뇌종양 전문 병원 & 명의 프로필
        </h1>
        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
          교모세포종 및 뇌종양은 신경외과, 방사선종양학과, 종양내과, 영상의학과, 병리과의 다학제 협진(MDT)이 필수적입니다. 국내 대표 8대 다학제 전문 병원 안내입니다.
        </p>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hospitals.map((hosp) => (
          <article
            key={hosp.id}
            onClick={() => setSelectedHospital(hosp)}
            className="glass-card rounded-3xl overflow-hidden group cursor-pointer hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between border border-slate-200 dark:border-slate-800"
          >
            <div>
              {/* Image Header */}
              <div className="relative h-40 overflow-hidden bg-slate-900">
                <img
                  src={hosp.img}
                  alt={hosp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <span className={`absolute top-3 right-3 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-white ${hosp.badgeColor}`}>
                  {hosp.badge}
                </span>

                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-extrabold text-base drop-shadow-md">{hosp.name}</h3>
                  <p className="text-[11px] text-slate-200">{hosp.dept}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <span className="line-clamp-1">{hosp.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <span>{hosp.phone}</span>
                  </div>
                </div>

                {/* Main Doctors */}
                <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                  <strong className="text-[11px] font-extrabold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>주요 전문의</span>
                  </strong>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {hosp.doctors.map((doc, idx) => (
                      <li key={idx}>• {doc}</li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {hosp.features.map((feat, idx) => (
                    <span key={idx} className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      #{feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0">
              <a
                href={hosp.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                <span>공식 예약 사이트 방문</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};
