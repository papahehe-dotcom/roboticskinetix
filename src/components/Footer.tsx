import React from 'react';
import { PageId } from '../types';
import { Cpu, ShieldCheck, Award, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const handleNav = (id: PageId) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">Kinetix Robotics</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Purpose-built robotics and experiential STEM infrastructure for Classes 4 through 9.
              Partnering with K-12 schools and learning centers to incubate tomorrow&apos;s roboticists and embedded engineers.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>RoHS & CE Child-Safe Kits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>NEP 2020 & CBSE 404 Aligned</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Curriculum</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('roadmap')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Class 4 · Kinetic Mechanics
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('roadmap')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Class 5 · Bug-Bots & Sensors
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('roadmap')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Class 6 · Micro:bit & Sonar
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('roadmap')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Class 7 · IoT Telemetry & ESP32
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('roadmap')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Class 8 · Kinematics & Mecanum
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('roadmap')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Class 9 · Edge AI & Vision
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional Models */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Partnerships</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNav('partnerships')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Turnkey School Innovation Lab
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partnerships')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  STEM Center Franchise Model
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partnerships')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Faculty Upskilling & Certification
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('partnerships')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  National Olympiad Squad (WRO)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('toolkit')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Teacher Lesson Plan Library
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('toolkit')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                  Parent Diagnostic Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Institutional Desk</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Innovation Hub, Tech Park Phase II, Bengaluru & Gurugram</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>partnerships@kinetixrobotics.io</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+91 800-ROBOTIX (Direct School Desk)</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => handleNav('contact')}
                  className="w-full py-2 px-3 text-xs font-semibold bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  Request Lab Site Audit
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Kinetix Robotics Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Designed for Classes 4–9</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Solder Child-Safe Architecture</span>
            <span aria-hidden="true">·</span>
            <span>ISO 9001:2015 Educational Kits</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
