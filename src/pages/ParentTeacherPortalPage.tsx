import React, { useState } from 'react';
import { PageId } from '../types';
import { SAMPLE_LESSON_PLANS, GRADE_ROADMAPS } from '../data/roadmapData';
import {
  Heart,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  HelpCircle,
  ArrowRight,
  FileText
} from 'lucide-react';

interface ParentTeacherPortalPageProps {
  setActivePage: (page: PageId) => void;
  setSelectedGradeId?: (gradeId: string) => void;
}

export const ParentTeacherPortalPage: React.FC<ParentTeacherPortalPageProps> = ({
  setActivePage,
  setSelectedGradeId
}) => {
  const [activePersona, setActivePersona] = useState<'parents' | 'teachers'>('parents');

  // --- Parent Diagnostic Quiz State ---
  const [quizGrade, setQuizGrade] = useState<number>(6);
  const [quizExperience, setQuizExperience] = useState<string>('lego_toys');
  const [quizPersistence, setQuizPersistence] = useState<string>('likes_testing');
  const [quizGoal, setQuizGoal] = useState<string>('hands_on_screentime');
  const [diagnosticGenerated, setDiagnosticGenerated] = useState<boolean>(false);

  // --- Teacher Lesson Plan Viewer State ---
  const [selectedLpIndex, setSelectedLpIndex] = useState<number>(0);
  const currentLp = SAMPLE_LESSON_PLANS[selectedLpIndex] || SAMPLE_LESSON_PLANS[0];

  // --- Teacher Rubric Matrix State ---
  const [selectedRubricGrade, setSelectedRubricGrade] = useState<string>('Class 6');
  const [selectedRubricLevel, setSelectedRubricLevel] = useState<number>(3); // 1, 2, 3, 4

  const handleRunDiagnostic = (e: React.FormEvent) => {
    e.preventDefault();
    setDiagnosticGenerated(true);
  };

  const getRecommendedGradePath = () => {
    const targetGrade = GRADE_ROADMAPS.find((g) => g.gradeNumber === quizGrade) || GRADE_ROADMAPS[2];
    let focusNote = '';
    if (quizExperience === 'no_code') {
      focusNote = 'We recommend beginning with foundational kinetic mechanisms before introducing code.';
    } else if (quizGoal === 'olympiad') {
      focusNote = 'High competition readiness potential. We recommend our intensive WRO squad track.';
    } else {
      focusNote = 'Optimal balance: 80% physical assembly on breadboards and chassis, 20% algorithm testing.';
    }
    return { targetGrade, focusNote };
  };

  const { targetGrade, focusNote } = getRecommendedGradePath();

  return (
    <div className="space-y-16 lg:space-y-24 pb-20 pt-8 sm:pt-12">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
            Institutional & Family Resource Hub
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Parent & Teacher Toolkit
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Everything parents need to gauge their child&apos;s robotics readiness and safety, and everything educators need to deliver NEP 2020 competency-aligned robotics lessons with ease.
          </p>
        </div>

        {/* Persona Switcher Tabs */}
        <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setActivePersona('parents')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePersona === 'parents'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>For Parents & Guardians</span>
          </button>

          <button
            onClick={() => setActivePersona('teachers')}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePersona === 'teachers'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>For Teachers & School Leaders</span>
          </button>
        </div>
      </div>

      {/* PARENT SECTION */}
      {activePersona === 'parents' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Interactive Diagnostic Quiz */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold font-mono">
                Interactive Diagnostic Assessment
              </span>
              <h2 className="text-2xl font-bold text-white">
                Child Robotics Readiness & Grade Recommendation Tool
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Answer 4 quick questions about your child&apos;s current grade, building habits, and interests to receive an instant personalized curriculum roadmap recommendation.
              </p>
            </div>

            <form onSubmit={handleRunDiagnostic} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Question 1 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  1. Current Grade
                </label>
                <select
                  value={quizGrade}
                  onChange={(e) => { setQuizGrade(Number(e.target.value)); setDiagnosticGenerated(false); }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value={4}>Class 4 (Ages 9–10)</option>
                  <option value={5}>Class 5 (Ages 10–11)</option>
                  <option value={6}>Class 6 (Ages 11–12)</option>
                  <option value={7}>Class 7 (Ages 12–13)</option>
                  <option value={8}>Class 8 (Ages 13–14)</option>
                  <option value={9}>Class 9 (Ages 14–15)</option>
                </select>
                <p className="text-[10px] text-slate-400">Class 4 to 9 target range.</p>
              </div>

              {/* Question 2 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  2. Prior Building Experience
                </label>
                <select
                  value={quizExperience}
                  onChange={(e) => { setQuizExperience(e.target.value); setDiagnosticGenerated(false); }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="lego_toys">Lego / Mechanical Construction Toys</option>
                  <option value="scratch_code">Some Block / Scratch Coding at School</option>
                  <option value="diy_science">Enjoys Hands-On Science Fair Kits</option>
                  <option value="no_code">Complete Beginner (No Prior Kits)</option>
                </select>
                <p className="text-[10px] text-slate-400">Helps calibrate kit starting tier.</p>
              </div>

              {/* Question 3 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  3. Response to Debugging
                </label>
                <select
                  value={quizPersistence}
                  onChange={(e) => { setQuizPersistence(e.target.value); setDiagnosticGenerated(false); }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="likes_testing">Loves tinkering and trying again</option>
                  <option value="needs_hints">Enjoys it with visual step-by-step guides</option>
                  <option value="quick_results">Prefers quick wins before tough challenges</option>
                </select>
                <p className="text-[10px] text-slate-400">Paces hands-on difficulty curve.</p>
              </div>

              {/* Question 4 */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  4. Primary Parent Goal
                </label>
                <select
                  value={quizGoal}
                  onChange={(e) => { setQuizGoal(e.target.value); setDiagnosticGenerated(false); }}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="hands_on_screentime">Reduce passive screen time with real building</option>
                  <option value="logic_math">Strengthen spatial & applied math intuition</option>
                  <option value="olympiad">Prepare for National Science & WRO Olympiads</option>
                  <option value="future_ai">Foundations for high school coding & AI</option>
                </select>
                <p className="text-[10px] text-slate-400">Customizes milestone recommendations.</p>
              </div>

              <div className="md:col-span-2 lg:col-span-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Recommended Pathway</span>
                </button>
              </div>
            </form>

            {/* Generated Diagnostic Output Card */}
            {diagnosticGenerated && (
              <div className="mt-6 bg-slate-950 p-6 rounded-2xl border border-cyan-500/40 space-y-5 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400">Custom Parent Assessment Output</span>
                    <h3 className="text-xl font-bold text-white">
                      Recommended Curriculum Track: {targetGrade.gradeLabel} ({targetGrade.theme})
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      if (setSelectedGradeId) setSelectedGradeId(targetGrade.id);
                      setActivePage('roadmap');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>View Grade Syllabus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] uppercase font-semibold">Recommended Kit</span>
                    <div className="font-bold text-white text-sm">{targetGrade.kitName}</div>
                    <p className="text-slate-400 text-[11px] mt-1">{targetGrade.kitDescription}</p>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] uppercase font-semibold">Screen-Time Balance</span>
                    <div className="font-bold text-emerald-400 text-sm">80% Hands-On Assembly · 20% Logic</div>
                    <p className="text-slate-400 text-[11px] mt-1">
                      Zero mindless video consumption. Students work with real physical gears, chassis, and sensors.
                    </p>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] uppercase font-semibold">Capstone Goal</span>
                    <div className="font-bold text-amber-400 text-sm">{targetGrade.capstoneProject.title}</div>
                    <p className="text-slate-400 text-[11px] mt-1">{focusNote}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Child Safety & Materials Standards */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Strict Parental Peace of Mind</span>
              <h3 className="text-xl font-bold text-white">Laboratory Safety Standards & Materials Quality</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Solderless Architecture</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Zero hot soldering irons, toxic lead fumes, or burns. All connections use high-retention Dupont jumper pins, magnetic snap switches, and spring-loaded terminal clips.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Safe Low-Voltage DC Rails</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Kits run exclusively on regulated 3.3V, 5V, or 6V battery packs (AA / protected Li-Ion with short-circuit thermal cutoff). Completely shock-free for young learners.
                </p>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>RoHS & CE Certified Polymers</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Laser-cut shatterproof virgin acrylic with beveled smooth edges. All motors, gears, and structural brackets adhere to European toy safety standards (EN 71).
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TEACHER SECTION */}
      {activePersona === 'teachers' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Interactive Lesson Plan Explorer */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold font-mono">
                  Educator Curriculum Library
                </span>
                <h2 className="text-2xl font-bold text-white">
                  Sample 45-Minute Structured Lesson Plans
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pre-engineered classroom lesson plans with Learning Hooks, hands-on tasks, troubleshooting guides, and plenary assessments.
                </p>
              </div>

              {/* Lesson Plan Grade Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl">
                {SAMPLE_LESSON_PLANS.map((lp, idx) => (
                  <button
                    key={lp.id}
                    onClick={() => setSelectedLpIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedLpIndex === idx
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lp.grade}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Lesson Plan Breakdown Card */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-850 gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <span className="text-cyan-400 font-bold font-mono">{currentLp.grade}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {currentLp.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{currentLp.title}</h3>
                </div>

                <div className="text-xs text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                  NEP 2020 Experiential Lab Unit
                </div>
              </div>

              {/* Objectives & Materials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-slate-400">
                    Core Pedagogical Objective
                  </h4>
                  <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {currentLp.objective}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white uppercase text-[11px] tracking-wider text-slate-400">
                    Bench Materials Required (Per Dual-Seat Station)
                  </h4>
                  <div className="flex flex-wrap gap-1.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    {currentLp.materials.map((mat, mIdx) => (
                      <span key={mIdx} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[11px]">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4-Phase Delivery Flow */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider text-slate-400">
                  45-Minute Lesson Timeline Breakdown
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-mono text-amber-400 font-bold">1. Starter Hook (5–8 Mins)</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentLp.hookActivity}</p>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-cyan-500/30 space-y-1.5">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">2. Hands-on Challenge (25 Mins)</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentLp.handsOnTask}</p>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">3. Plenary Assessment (12 Mins)</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentLp.plenaryAssessment}</p>
                  </div>
                </div>
              </div>

              {/* Troubleshooting Box */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-amber-400 text-[11px] uppercase tracking-wider">
                  Teacher Troubleshooting Tips
                </span>
                <p className="text-slate-300 leading-relaxed">{currentLp.troubleshootingTips}</p>
              </div>
            </div>
          </div>

          {/* Competency-Based Assessment Rubric Matrix */}
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
                  Assessment Framework
                </span>
                <h3 className="text-xl font-bold text-white">Competency-Based Grading Rubrics</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Aligned with CBSE Continuous and Comprehensive Evaluation (CCE) and NEP 2020 skill standards.
                </p>
              </div>

              {/* Rubric Level Selector */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl">
                {[1, 2, 3, 4].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedRubricLevel(lvl)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedRubricLevel === lvl
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Level {lvl} {lvl === 1 ? '(Novice)' : lvl === 2 ? '(Developing)' : lvl === 3 ? '(Proficient)' : '(Exemplary)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix Criteria Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 font-bold">1. Mechanical Rigor</div>
                <h4 className="font-bold text-white">Chassis & Gear Assembly</h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedRubricLevel === 1 && 'Struggles with gear alignment; excessive gear teeth slipping and friction.'}
                  {selectedRubricLevel === 2 && 'Builds functional chassis but requires mentor guidance for shaft bushing spacers.'}
                  {selectedRubricLevel === 3 && 'Calculates gear ratios independently and builds low-friction structural linkages.'}
                  {selectedRubricLevel === 4 && 'Optimizes center of gravity, incorporates anti-backlash gears, and handles high torque.'}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 font-bold">2. Circuitry & Sensors</div>
                <h4 className="font-bold text-white">Wiring & Signal Accuracy</h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedRubricLevel === 1 && 'Requires schematic assistance to identify VCC/GND polarity pins.'}
                  {selectedRubricLevel === 2 && 'Wires circuits reliably on breadboard; occasional false trigger sensor threshold errors.'}
                  {selectedRubricLevel === 3 && 'Calibrates analog pull-down resistors and diagnoses wiring short circuits independently.'}
                  {selectedRubricLevel === 4 && 'Designs multi-device I2C bus wiring with pullups and optimizes battery power budgets.'}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 font-bold">3. Algorithmic Logic</div>
                <h4 className="font-bold text-white">Firmware & State Control</h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedRubricLevel === 1 && 'Understands basic sequential block actions; struggles with infinite while loops.'}
                  {selectedRubricLevel === 2 && 'Programs simple if/else threshold logic; occasional sensor jitter timing bugs.'}
                  {selectedRubricLevel === 3 && 'Implements clean state machines (Cruising, Evading, Docking) with debouncing.'}
                  {selectedRubricLevel === 4 && 'Writes modular typed Python / C++ functions with non-blocking async loops and odometry.'}
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-cyan-400 font-bold">4. Team Collaboration</div>
                <h4 className="font-bold text-white">Engineering Notebook</h4>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {selectedRubricLevel === 1 && 'Infrequent documentation; unequal distribution of build and coding tasks.'}
                  {selectedRubricLevel === 2 && 'Documents final build photos; shares testing turns equitably.'}
                  {selectedRubricLevel === 3 && 'Maintains structured engineering notebook with test data tables and failure logs.'}
                  {selectedRubricLevel === 4 && 'Presents clear design defense to peers, citing mathematical trade-offs and iterations.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Faculty Upskilling Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">RoboVanguard Certified Mentor Program</h3>
            <p className="text-xs text-slate-300">
              We certify school science and computer teachers through our 3-tier professional development accreditation.
            </p>
          </div>
          <button
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            Inquire About Faculty Training
          </button>
        </div>
      </div>

    </div>
  );
};
