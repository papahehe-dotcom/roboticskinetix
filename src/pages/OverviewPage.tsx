import React, { useState } from 'react';
import { PageId } from '../types';
import { GRADE_ROADMAPS } from '../data/roadmapData';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  School,
  Building2,
  Cpu,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Wrench,
  Bot
} from 'lucide-react';

interface OverviewPageProps {
  setActivePage: (page: PageId) => void;
  setSelectedGradeId?: (gradeId: string) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ setActivePage, setSelectedGradeId }) => {
  const [partnerTab, setPartnerTab] = useState<'school' | 'center'>('school');
  const [quickCalcStudents, setQuickCalcStudents] = useState<number>(120);

  const handleGradeClick = (gradeId: string) => {
    if (setSelectedGradeId) {
      setSelectedGradeId(gradeId);
    }
    setActivePage('roadmap');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick estimator calculations
  const workstationsNeeded = Math.ceil(quickCalcStudents / 6);
  const estimatedKits = Math.ceil(quickCalcStudents / 2);
  const hoursPerYear = 48;

  return (
    <div className="space-y-20 lg:space-y-28 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            
            {/* Audience Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-3.5 py-1.5 rounded-full">
              <Bot className="w-3.5 h-3.5" />
              <span>Dedicated Robotics Curriculum & Labs for Classes 4 through 9</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight text-balance">
              Turnkey Robotics Infrastructure for Schools & Learning Centers
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance max-w-2xl mx-auto">
              We empower middle school students (Classes 4–9) to build real autonomous rovers, IoT telemetry nodes, and Edge-AI manipulators through a structured 6-year engineering roadmap.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setActivePage('roadmap');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <span>View Full Grade 4–9 Roadmap</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActivePage('partnerships');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-white rounded-xl transition-all cursor-pointer"
              >
                <span>School & Center Collaboration</span>
              </button>
            </div>

            {/* Fast Compliance Micro-Strip */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                RoHS Low-Voltage Child-Safe
              </span>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-cyan-400" />
                NEP 2020 & CBSE 404 Aligned
              </span>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-400" />
                Turnkey Hardware + Trained Mentors
              </span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Visual Showcase: 6-Grade Visual Spectrum */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Curriculum Architecture</span>
                <h2 className="text-lg font-bold text-white">The 6-Grade Progressive Robotics Pathway</h2>
              </div>
              <div className="text-xs text-slate-400">
                Ages 9 to 15 · Mechanics $\to$ Electronics $\to$ Microcontrollers $\to$ IoT $\to$ Kinematics $\to$ Edge AI
              </div>
            </div>

            {/* 6 Grade Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {GRADE_ROADMAPS.map((g) => (
                <div
                  key={g.id}
                  onClick={() => handleGradeClick(g.id)}
                  className="group bg-slate-950/80 hover:bg-slate-850 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {g.gradeLabel}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">{g.ageRange}</span>
                    </div>
                    <div className="h-1 w-full bg-slate-800 rounded-full mb-3 overflow-hidden">
                      <div
                        className="h-full bg-cyan-400"
                        style={{ width: `${(g.gradeNumber - 3) * 16.6}%` }}
                      />
                    </div>
                    <h3 className="text-xs font-semibold text-slate-200 line-clamp-2 mb-1.5 leading-snug">
                      {g.theme}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2">
                      {g.capstoneProject.title}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-850 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                    <span>View Plan</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Proof Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">84+</div>
            <div className="text-xs font-medium text-slate-400 mt-1">K-12 Partner Schools</div>
            <p className="text-[11px] text-slate-400 mt-0.5">CBSE, ICSE, Cambridge & IB</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono tabular-nums">42</div>
            <div className="text-xs font-medium text-slate-400 mt-1">STEM Enrichment Centers</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Franchise & weekend batches</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">38,500+</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Students Trained</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Hands-on projects completed</p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums">98.4%</div>
            <div className="text-xs font-medium text-slate-400 mt-1">Annual School Retention</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Multi-year lab renewals</p>
          </div>
        </div>
      </section>

      {/* Dual Partnership Track: Schools vs STEM Centers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Institutional Collaboration</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Tailored Collaboration Models for Institutional Growth
          </h2>
          <p className="text-sm text-slate-400">
            Whether integrating a mandatory weekly robotics period into your school timetable or launching profitable weekend STEM cohorts at your enrichment center.
          </p>

          {/* Interactive Switcher */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl mt-4">
            <button
              onClick={() => setPartnerTab('school')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                partnerTab === 'school'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <School className="w-3.5 h-3.5" />
              <span>For K-12 Schools</span>
            </button>
            <button
              onClick={() => setPartnerTab('center')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                partnerTab === 'center'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>For STEM & Tuition Centers</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {partnerTab === 'school' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Turnkey Hardware & Lab Setup</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We supply heavy-duty workbenches, component organizer bins, safety test arena rings, and class-wise kits for Classes 4 through 9 with 100% spares replenishment warranty.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>2:1 student-to-kit ratio for maximum touch time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Safe 5V/6V low voltage architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Rapid replacement within 48 hours for damaged parts</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                Includes annual hardware calibration
              </div>
            </div>

            <div className="bg-slate-900/70 p-6 rounded-2xl border border-cyan-500/30 flex flex-col justify-between space-y-6 relative">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Resident or Visiting STEM Mentors</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Qualified robotics engineers deployed directly to your campus to handle all weekly class sessions, lab maintenance, and student assessments.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Zero recruitment overhead or teacher burden for the school</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Background-verified engineers with pedagogy certification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Continuous faculty upskilling & co-teaching options</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800 text-xs text-cyan-400 font-semibold">
                Most Popular Institutional Model
              </div>
            </div>

            <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Board Alignment & Olympiad Prep</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Curriculum tightly mapped to CBSE Skill Subject 404/417, ICSE AI standards, and coaching for World Robot Olympiad (WRO) and FIRST LEGO League.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Grading rubrics and report card competency indicators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Inter-school hackathon and annual robotics science expo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Official certificate credentials for student portfolios</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                14 National competition qualifiers in 2025
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Center Franchise Kit Bundles</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Launch high-demand weekend robotics cohorts without massive capital expenditure. Wholesale modular kit packs customized for Class 4–9 weekend batches.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Turnkey 30-hour and 60-hour student progression tracks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>High gross margins for learning center operators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Marketing toolkit, parent demo kits, and branding assets</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                Breakeven achievable in 6–8 enrolled students
              </div>
            </div>

            <div className="bg-slate-900/70 p-6 rounded-2xl border border-amber-500/30 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Trainer Certification & LMS</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We certify your existing center instructors in our pedagogical framework through intensive 3-day bootcamps and provide full step-by-step digital lesson slides.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Teacher certification badge & credentials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Animated slide decks, video solutions & code files</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Student project grading rubrics & completion certificates</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800 text-xs text-amber-400 font-semibold">
                Fast 2-Week Launch Program
              </div>
            </div>

            <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Parent Engagement & Showcase Days</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Host high-conversion Parent STEM Showcase Days where students demonstrate autonomous rovers built with their own hands, driving 90%+ course re-enrollment.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Take-home mini-projects & interactive challenge arenas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Quarterly student robotics show-and-tell scripts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Referral growth and high parent retention</span>
                  </li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
                Proven across 42 active learning centers
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Interactive Quick Capacity Estimator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-10 rounded-2xl border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Institutional Planning Tool</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Estimate Your Campus Robotics Lab Feasibility
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Adjust your anticipated student batch size across Classes 4 to 9 to see recommended workstation counts, student-to-kit allocation, and lab session hours.
              </p>

              {/* Slider */}
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Student Enrollment (Classes 4–9)</span>
                  <span className="font-mono text-cyan-400 font-bold">{quickCalcStudents} Students</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="400"
                  step="20"
                  value={quickCalcStudents}
                  onChange={(e) => setQuickCalcStudents(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>40 Students (Single Section)</span>
                  <span>200 Students</span>
                  <span>400 Students (Multi-Section Campus)</span>
                </div>
              </div>
            </div>

            {/* Calculated Results Box */}
            <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-xl border border-slate-800 space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Recommended Deployment</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">{workstationsNeeded}</div>
                  <div className="text-[11px] text-slate-400">Lab Workstations</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-2xl font-bold text-cyan-400 font-mono tabular-nums">{estimatedKits}</div>
                  <div className="text-[11px] text-slate-400">Modular Kits (2:1 Ratio)</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">{hoursPerYear} hrs</div>
                  <div className="text-[11px] text-slate-400">Annual Timetable Hours</div>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                  <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">1–2</div>
                  <div className="text-[11px] text-slate-400">Certified Mentors</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setActivePage('partnerships');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Launch Full Proposal Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Attributable Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Institutional Proof</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Endorsed by Principals & Center Directors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &ldquo;Integrating Smart Banana into our Classes 4–8 timetable transformed science education from rote theory into tangible excitement. We saw a +34% uptick in student enrollment for senior STEM streams within two years.&rdquo;
            </p>
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-white">Dr. Meenakshi Sundaram</div>
              <div className="text-[11px] text-slate-400">Principal · Greenwood International Academy</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &ldquo;As a private learning center owner, scaling used to mean buying expensive Lego kits that broke easily. Kinetix modular breadboard and micro:bit kits gave us robust hardware, full lesson plans, and 140+ enthusiastic weekend learners.&rdquo;
            </p>
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-white">Rajesh Khanna</div>
              <div className="text-[11px] text-slate-400">Director & Founder · Nexus STEM Learning Hub, Gurugram</div>
            </div>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              &ldquo;The biggest relief for our faculty was the grading rubrics and pre-engineered troubleshooting guides. Even non-specialist teachers can co-teach the Class 6 and 7 modules with high confidence.&rdquo;
            </p>
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-white">Ananya Sen</div>
              <div className="text-[11px] text-slate-400">Head of Computer Applications & Robotics · St. Augustine School</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 p-8 sm:p-12 rounded-3xl border border-cyan-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Upgrade Your School or Center STEM Lab?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule a free on-campus demonstration with our mobile STEM van or order an evaluation hardware kit for your academic committee.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                setActivePage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer whitespace-nowrap"
            >
              Book School Demo Visit
            </button>
            <button
              onClick={() => {
                setActivePage('simulator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Try Virtual Lab Simulator
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
