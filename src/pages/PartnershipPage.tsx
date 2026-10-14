import React, { useState } from 'react';
import { PageId } from '../types';
import {
  School,
  Building2,
  Calculator,
  CheckCircle2,
  Download,
  Calendar,
  Layers,
  Award,
  ArrowRight,
  ShieldCheck,
  Zap,
  Wrench,
  FileText
} from 'lucide-react';

interface PartnershipPageProps {
  setActivePage: (page: PageId) => void;
}

export const PartnershipPage: React.FC<PartnershipPageProps> = ({ setActivePage }) => {
  const [partnerType, setPartnerType] = useState<'school' | 'center'>('school');
  const [studentCount, setStudentCount] = useState<number>(180);
  const [workstations, setWorkstations] = useState<number>(12);
  const [mentorModel, setMentorModel] = useState<'fulltime' | 'visiting' | 'faculty_cert'>('visiting');
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);

  // Dynamic calculations
  const kitsNeeded = Math.ceil(workstations * 1.5);
  const batchesPerWeek = Math.ceil(studentCount / (workstations * 2));
  const annualLabHours = batchesPerWeek * 32;

  // Estimated budget logic (illustrative institutional pricing in INR/USD equivalent)
  const baseHardwareCost = workstations * 28000;
  const kitsCost = kitsNeeded * 14000;
  const mentorCost = mentorModel === 'fulltime' ? 360000 : mentorModel === 'visiting' ? 180000 : 75000;
  const totalAnnualEstimate = baseHardwareCost + kitsCost + mentorCost;
  const perStudentPerMonth = Math.round(totalAnnualEstimate / (studentCount * 10));

  return (
    <div className="space-y-16 lg:space-y-24 pb-20 pt-8 sm:pt-12">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
          Institutional Collaboration
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          School & Center Partnership Models
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          From turnkey on-campus labs with resident robotics engineers for K-12 schools, to high-margin weekend franchise kits for STEM centers. We manage hardware, syllabus, and faculty certification.
        </p>
      </div>

      {/* 3 Partnership Models Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Model 1 */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <School className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400">Model 01</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Turnkey School Robotics Lab</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Full integrated lab setup inside the school for Classes 4 through 9.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Full set of Class 4–9 modular kits & storage rack</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Resident robotics mentor takes all scheduled periods</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>CBSE / ICSE mapped report card grading rubrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Annual on-campus Science & Robotics Expo</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Setup: 14 Days</span>
              <span className="text-cyan-400 font-semibold">Most Popular for K-12</span>
            </div>
          </div>

          {/* Model 2 */}
          <div className="bg-slate-900/80 rounded-2xl border border-amber-500/30 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400">Model 02</span>
                <h3 className="text-lg font-bold text-white mt-0.5">STEM Center & Tuition Franchise</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Empowering private enrichment centers to run lucrative weekend batches.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Class 4–9 hardware bundle at wholesale institutional rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>3-day certified train-the-trainer bootcamp for your staff</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>LMS access with animated student slides & code files</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Parent Demo Day scripts to maximize batch conversions</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Setup: 7 Days</span>
              <span className="text-amber-400 font-semibold">High Margin Model</span>
            </div>
          </div>

          {/* Model 3 */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400">Model 03</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Competition Squad Incubator</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Intensive coaching for World Robot Olympiad (WRO) & FIRST LEGO League.
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Specialized regulation arena mats & challenge bricks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>National judge & mentor guidance on arena strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Engineering design notebook documentation mentorship</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Mock regional scrimmages with partner school network</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Year-round Squad</span>
              <span className="text-cyan-400 font-semibold">Prestigious Brand Value</span>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Institutional Proposal & Capacity Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold mb-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Institutional Planning Deck</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Institutional Capacity & Investment Calculator
              </h2>
            </div>

            {/* Type Toggle */}
            <div className="inline-flex p-1 bg-slate-950 border border-slate-800 rounded-xl">
              <button
                onClick={() => setPartnerType('school')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  partnerType === 'school'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                K-12 School
              </button>
              <button
                onClick={() => setPartnerType('center')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  partnerType === 'center'
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                STEM Center
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Students */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-medium">Total Student Strength (Classes 4–9)</span>
                  <span className="font-mono text-cyan-400 font-bold">{studentCount} Students</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="600"
                  step="20"
                  value={studentCount}
                  onChange={(e) => setStudentCount(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>40 (Pilot Cohort)</span>
                  <span>300 (Standard School)</span>
                  <span>600 (Large Campus)</span>
                </div>
              </div>

              {/* Slider 2: Workstations */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-medium">Designated Lab Workstations (Dual-Seat)</span>
                  <span className="font-mono text-cyan-400 font-bold">{workstations} Workstations</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="24"
                  step="2"
                  value={workstations}
                  onChange={(e) => setWorkstations(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>6 Workstations (12 students/batch)</span>
                  <span>12 Workstations (24/batch)</span>
                  <span>24 Workstations (48/batch)</span>
                </div>
              </div>

              {/* Mentor Model Radio Buttons */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">
                  Faculty & Trainer Delivery Model
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setMentorModel('fulltime')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      mentorModel === 'fulltime'
                        ? 'border-cyan-400 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">Resident Mentor</div>
                    <div className="text-[10px] mt-0.5 text-slate-400">Full-time on campus 5 days/wk</div>
                  </button>

                  <button
                    onClick={() => setMentorModel('visiting')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      mentorModel === 'visiting'
                        ? 'border-cyan-400 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">Visiting Mentor</div>
                    <div className="text-[10px] mt-0.5 text-slate-400">2–3 scheduled days per week</div>
                  </button>

                  <button
                    onClick={() => setMentorModel('faculty_cert')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      mentorModel === 'faculty_cert'
                        ? 'border-cyan-400 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">Train-the-Trainer</div>
                    <div className="text-[10px] mt-0.5 text-slate-400">We train your school teachers</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Live Calculation Output Card (Right Column) */}
            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Lab Output Specifications
                </span>
                <span className="text-[11px] font-mono text-emerald-400">Classes 4 to 9</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Hardware Kits Required:</span>
                  <span className="font-mono text-white font-bold">{kitsNeeded} Kits + 2 Spare Sets</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Student-to-Kit Ratio:</span>
                  <span className="font-mono text-cyan-400 font-bold">2 : 1 Optimal Touch</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Weekly Batches Handled:</span>
                  <span className="font-mono text-white font-bold">{batchesPerWeek} Batches / Week</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-400">Annual Scheduled Lab Hours:</span>
                  <span className="font-mono text-emerald-400 font-bold">{annualLabHours} Hours / Year</span>
                </div>
              </div>

              {/* Budget Breakdown */}
              <div className="pt-3 border-t border-slate-800 bg-slate-900/50 p-3.5 rounded-xl space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-300">Estimated Annual Investment:</span>
                  <span className="text-lg font-mono font-bold text-white">
                    ₹{totalAnnualEstimate.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-[11px] text-cyan-400">
                  <span>Approx. Per Student / Month:</span>
                  <span className="font-mono font-bold">~₹{perStudentPerMonth} / month</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  *Includes turnkey hardware, component warranty replacement, curriculum licensing, student booklets, and LMS access.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowProposalModal(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Detailed Institutional Proposal</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Lab Blueprint & Physical Infrastructure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Physical Infrastructure</span>
          <h2 className="text-2xl font-bold text-white">Lab Blueprint & Safety Standards</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            We adapt to your existing classroom dimensions (minimum recommended: 400–600 sq ft).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400">Zone A</div>
            <h3 className="text-sm font-bold text-white">Dual-Seat Workbenches</h3>
            <p className="text-xs text-slate-400">
              ESD-safe rubberized mats, 24V isolated safety power strips, and clamp-on articulated task lights.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400">Zone B</div>
            <h3 className="text-sm font-bold text-white">Arena Testing Ring</h3>
            <p className="text-xs text-slate-400">
              2.4m x 1.2m bounded robotics testing arena with matte black vinyl floor, obstacle blocks, and line tracks.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400">Zone C</div>
            <h3 className="text-sm font-bold text-white">Rapid Prototyping Bay</h3>
            <p className="text-xs text-slate-400">
              Enclosed educational 3D printer (PLA non-toxic filament) for printing custom robot chassis brackets and arms.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-cyan-400">Zone D</div>
            <h3 className="text-sm font-bold text-white">Inventory & Spares Rack</h3>
            <p className="text-xs text-slate-400">
              Modular transparent organizer drawers for gears, motors, screws, sensors, and rechargeable power packs.
            </p>
          </div>
        </div>
      </div>

      {/* 4-Week Rapid Deployment Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white">4-Week Turnkey Onboarding Roadmap</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono text-cyan-400">Week 01</span>
              <h3 className="text-xs font-bold text-white">Site Audit & Plan</h3>
              <p className="text-[11px] text-slate-400">Inspection of classroom dimensions, power points, safety grounding, and timetable sync.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono text-cyan-400">Week 02</span>
              <h3 className="text-xs font-bold text-white">Hardware Delivery</h3>
              <p className="text-[11px] text-slate-400">Deployment of Class 4–9 kit bundles, test arena, storage racks, and safety certifications.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono text-cyan-400">Week 03</span>
              <h3 className="text-xs font-bold text-white">Faculty Bootcamp</h3>
              <p className="text-[11px] text-slate-400">3-day intensive mentor induction, troubleshooting drill, and lesson plan walkthroughs.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
              <span className="text-[11px] font-mono text-emerald-400">Week 04</span>
              <h3 className="text-xs font-bold text-white">Campus Launch</h3>
              <p className="text-[11px] text-slate-400">Inaugural student assembly, live robotics rover demo, and first hands-on build period!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Proposal Summary Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400">Kinetix Institutional Deck</span>
                <h3 className="text-lg font-bold text-white">
                  Institutional Lab Proposal Summary
                </h3>
              </div>
              <button
                onClick={() => setShowProposalModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Institution Category:</span>
                  <span className="font-bold text-white capitalize">{partnerType === 'school' ? 'K-12 School' : 'STEM Center'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Cohort:</span>
                  <span className="font-bold text-white">Classes 4 to 9 ({studentCount} Students)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Workstation Capacity:</span>
                  <span className="font-bold text-white">{workstations} Workstations ({kitsNeeded} Kits)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Trainer Model:</span>
                  <span className="font-bold text-cyan-400 capitalize">{mentorModel.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 font-mono">
                  <span className="text-slate-200 font-bold">Annual Investment Estimate:</span>
                  <span className="font-bold text-emerald-400">₹{totalAnnualEstimate.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                A formal branded proposal PDF with exact equipment schedules, mentor credentials, and SLA guarantees can be booked for your board committee.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowProposalModal(false);
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer"
              >
                Schedule Board Committee Presentation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
