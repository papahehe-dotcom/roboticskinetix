import React, { useState } from 'react';
import { GRADE_ROADMAPS } from '../data/roadmapData';
import { PageId } from '../types';
import {
  Cpu,
  Layers,
  Wrench,
  Code2,
  Calendar,
  CheckCircle,
  Download,
  BookOpen,
  Sparkles,
  Printer,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface RoadmapPageProps {
  setActivePage: (page: PageId) => void;
  selectedGradeId?: string;
  setSelectedGradeId?: (gradeId: string) => void;
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({
  setActivePage,
  selectedGradeId = 'class-6',
  setSelectedGradeId
}) => {
  const [activeGradeId, setActiveGradeId] = useState<string>(selectedGradeId || 'class-6');
  const [activeCodeTab, setActiveCodeTab] = useState<'block' | 'code'>('code');
  const [selectedBoard, setSelectedBoard] = useState<string>('CBSE');
  const [selectedPacing, setSelectedPacing] = useState<string>('60-Hour Comprehensive');
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const currentGrade = GRADE_ROADMAPS.find((g) => g.id === activeGradeId) || GRADE_ROADMAPS[2];

  const handleSelectGrade = (id: string) => {
    setActiveGradeId(id);
    if (setSelectedGradeId) {
      setSelectedGradeId(id);
    }
  };

  return (
    <div className="space-y-16 lg:space-y-20 pb-20 pt-8 sm:pt-12">
      
      {/* Header & Grade Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
            Progressive Engineering Curriculum
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Class 4 to 9 Robotics Roadmap
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A continuous, age-appropriate trajectory from mechanical advantages in Class 4 up to Edge AI computer vision in Class 9. Designed for CBSE, ICSE, Cambridge, and IB frameworks.
          </p>
        </div>

        {/* Grade Selector Tabs (Interactive Buttons) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
          {GRADE_ROADMAPS.map((grade) => {
            const isSelected = grade.id === activeGradeId;
            return (
              <button
                key={grade.id}
                onClick={() => handleSelectGrade(grade.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-semibold">
                  {grade.gradeLabel}
                </span>
                <span className="text-[11px] opacity-80 mt-0.5">{grade.ageRange}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grade Deep-Dive Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Grade Banner */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="text-cyan-400 font-semibold font-mono">{currentGrade.gradeLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{currentGrade.ageRange}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400 font-medium">NEP 2020 Level {currentGrade.gradeNumber - 3}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentGrade.theme}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {currentGrade.tagline}
              </p>
            </div>

            {/* Hardware Kit Highlight Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 shrink-0 max-w-sm">
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
                <Wrench className="w-3.5 h-3.5" />
                <span>Dedicated Kit: {currentGrade.kitName}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {currentGrade.kitDescription}
              </p>
            </div>
          </div>

          {/* Quick Hardware Component Tags */}
          <div className="pt-6">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Core Hardware Provided In This Grade&apos;s Lab Kit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {currentGrade.hardwareComponents.map((comp, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="text-[11px] font-mono text-cyan-400">{comp.type}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{comp.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{comp.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Term Progression Timeline */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Academic Schedule</span>
              <h3 className="text-xl font-bold text-white">Full Year 4-Term Milestone Progression</h3>
            </div>
            <span className="text-xs text-slate-400">Total: 32 Weeks · 64 Hands-on Lab Hours</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentGrade.terms.map((term, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-cyan-400">{term.term}</span>
                    <span className="text-slate-400 text-[11px]">{term.duration}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">{term.title}</h4>
                  
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {term.topics.map((t, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-800 bg-slate-950/40 p-2.5 rounded-lg">
                  <div className="text-[10px] uppercase font-semibold text-slate-400">Term Milestone Project</div>
                  <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                    {term.milestoneProject}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capstone Project & Interactive Code Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Capstone Info */}
          <div className="lg:col-span-5 bg-slate-900/70 p-6 rounded-2xl border border-slate-800 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Annual Capstone Innovation Showcase</span>
              </div>
              <h3 className="text-xl font-bold text-white">{currentGrade.capstoneProject.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {currentGrade.capstoneProject.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Circuit & Wiring Overview</h4>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono">
                {currentGrade.capstoneProject.wiringSummary}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Key Skills Mastered</h4>
              <div className="flex flex-wrap gap-1.5">
                {currentGrade.capstoneProject.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-200 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setActivePage('simulator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer"
              >
                <span>Launch in STEM Lab Simulator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Code / Logic Display */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>{currentGrade.capstoneProject.codeLanguage}</span>
              </div>
              <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveCodeTab('code')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    activeCodeTab === 'code'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Code Script
                </button>
                <button
                  onClick={() => setActiveCodeTab('block')}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    activeCodeTab === 'block'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Logic Explainer
                </button>
              </div>
            </div>

            <div className="p-5 flex-1 font-mono text-xs overflow-x-auto text-slate-200 leading-relaxed bg-slate-950">
              {activeCodeTab === 'code' ? (
                <pre className="text-cyan-300/90 whitespace-pre">
                  {currentGrade.capstoneProject.sampleCode}
                </pre>
              ) : (
                <div className="space-y-4 font-sans text-xs text-slate-300">
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-cyan-400 font-bold font-mono">1. Sensor Acquisition Loop</span>
                    <p className="text-slate-400">The microcontroller triggers ultrasonic and infrared bursts every 20ms to evaluate situational safety.</p>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-cyan-400 font-bold font-mono">2. State Transition</span>
                    <p className="text-slate-400">If distance metric &lt; threshold, motor driver switches from Forward cruise into Reverse-Pivot avoid sequence.</p>
                  </div>
                  <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-cyan-400 font-bold font-mono">3. Output Actuation</span>
                    <p className="text-slate-400">Pulse Width Modulation (PWM) dynamically modulates motor current to prevent skidding or gear stripping.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/40 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Verified for {currentGrade.kitName}</span>
              <span className="text-emerald-400 font-medium">Build Tested: 100% Solderless</span>
            </div>
          </div>

        </div>

        {/* Learning Outcomes & Board Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Assessed Student Competencies</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {currentGrade.learningOutcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Academic Curriculum Alignment</span>
            </h3>
            <div className="space-y-3">
              {currentGrade.boardAlignment.map((align, idx) => (
                <div key={idx} className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-xs">
                  <div className="flex items-center justify-between font-bold text-white mb-0.5">
                    <span>{align.board}</span>
                    <span className="font-mono text-cyan-400 text-[11px]">{align.moduleCode}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">{align.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Custom Syllabus Generator */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border border-cyan-800/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Teacher & Parent Tool</span>
              <h3 className="text-xl font-bold text-white">Generate Tailored School Syllabus Document</h3>
              <p className="text-xs text-slate-400 mt-1">
                Customize by academic board and course pacing to generate a structured syllabus summary.
              </p>
            </div>
            <button
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Preview & Export Syllabus</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Selected Grade</label>
              <select
                value={activeGradeId}
                onChange={(e) => handleSelectGrade(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {GRADE_ROADMAPS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.gradeLabel} ({g.ageRange})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Curriculum Board</label>
              <select
                value={selectedBoard}
                onChange={(e) => setSelectedBoard(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="CBSE">CBSE (Skill Subject 404 / 417 AI & Robotics)</option>
                <option value="ICSE">ICSE (Robotics & Artificial Intelligence)</option>
                <option value="Cambridge">Cambridge Lower Secondary / IGCSE</option>
                <option value="IB">IB MYP Design & Sciences Framework</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Pacing & Duration</label>
              <select
                value={selectedPacing}
                onChange={(e) => setSelectedPacing(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="30-Hour Foundation">30-Hour Foundation (1 period / week)</option>
                <option value="60-Hour Comprehensive">60-Hour Comprehensive (2 periods / week)</option>
                <option value="90-Hour Squad">90-Hour Advanced Squad & Olympiad Track</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      {/* Export / Printable Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono text-cyan-400">Kinetix Robotics Curriculum Spec</span>
                <h3 className="text-lg font-bold text-white">
                  {currentGrade.gradeLabel} Syllabus · {selectedBoard}
                </h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Grade Level</div>
                  <div className="font-bold text-white mt-0.5">{currentGrade.gradeLabel}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Target Age</div>
                  <div className="font-bold text-white mt-0.5">{currentGrade.ageRange}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Board</div>
                  <div className="font-bold text-cyan-400 mt-0.5">{selectedBoard}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Track</div>
                  <div className="font-bold text-emerald-400 mt-0.5">{selectedPacing}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Hardware Kit Required:</h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                  <div className="font-bold text-cyan-400">{currentGrade.kitName}</div>
                  <div className="text-slate-400 mt-1">{currentGrade.kitDescription}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">4-Term Modules:</h4>
                <div className="space-y-2">
                  {currentGrade.terms.map((t, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-850 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-mono text-cyan-400 mr-2">{t.term}</span>
                        <span className="text-white font-medium">{t.title}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">{t.milestoneProject}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">Capstone Challenge:</h4>
                <p className="text-slate-400">{currentGrade.capstoneProject.title}: {currentGrade.capstoneProject.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
              <button
                onClick={() => {
                  setShowExportModal(false);
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg transition-colors cursor-pointer"
              >
                Request Lab Kit for This Grade
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
