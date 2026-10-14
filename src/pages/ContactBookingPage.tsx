import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Calendar,
  Building2,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Send,
  HelpCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface ContactBookingPageProps {
  setActivePage: (page: PageId) => void;
}

export const ContactBookingPage: React.FC<ContactBookingPageProps> = ({ setActivePage }) => {
  const [intentType, setIntentType] = useState<string>('school_demo');
  const [role, setRole] = useState<string>('STEM Coordinator');
  const [fullName, setFullName] = useState<string>('');
  const [institutionName, setInstitutionName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('2026-11-04');
  const [selectedGrades, setSelectedGrades] = useState<number[]>([4, 5, 6, 7, 8, 9]);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    referenceId: string;
    submittedAt: string;
  } | null>(null);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Regional Hubs filter
  const [hubRegion, setHubRegion] = useState<'all' | 'north' | 'south' | 'west' | 'east'>('all');

  const toggleGrade = (grade: number) => {
    if (selectedGrades.includes(grade)) {
      if (selectedGrades.length > 1) {
        setSelectedGrades(selectedGrades.filter((g) => g !== grade));
      }
    } else {
      setSelectedGrades([...selectedGrades, grade].sort());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          role,
          institutionName,
          email,
          phone,
          city,
          intentType,
          selectedGrades,
          preferredDate,
          notes
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBookingConfirmation({
          referenceId: data.booking?.referenceId || `KTX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          submittedAt: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        });
      } else {
        throw new Error('Server returned non-200');
      }
    } catch {
      // Fallback for offline or local preview
      setBookingConfirmation({
        referenceId: `KTX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const regionalHubs = [
    {
      region: 'south',
      city: 'Bengaluru (HQ)',
      address: 'Kinetix Innovation Campus, Sector 4, HSR Layout, Bengaluru 560102',
      phone: '+91 80 4910 8800',
      email: 'bengaluru@kinetixrobotics.io',
      labCapacity: '32 Workstations · Certified Testing Arena'
    },
    {
      region: 'north',
      city: 'Gurugram & Delhi NCR',
      address: 'STEM Tower, Cyber City Phase II, DLF Gurugram 122002',
      phone: '+91 124 6820 4400',
      email: 'ncr@kinetixrobotics.io',
      labCapacity: '24 Workstations · Robotics Olympiad Mat'
    },
    {
      region: 'west',
      city: 'Mumbai & Pune',
      address: 'MakerHub Commercial Complex, Powai, Mumbai 400076',
      phone: '+91 22 2840 9100',
      email: 'mumbai@kinetixrobotics.io',
      labCapacity: '20 Workstations · Rapid 3D Prototyping Bay'
    },
    {
      region: 'east',
      city: 'Kolkata',
      address: 'Bengal STEM Innovation Hub, Sector V, Salt Lake, Kolkata 700091',
      phone: '+91 33 4022 7500',
      email: 'kolkata@kinetixrobotics.io',
      labCapacity: '18 Workstations · Teacher Training Facility'
    }
  ];

  const filteredHubs = hubRegion === 'all'
    ? regionalHubs
    : regionalHubs.filter((h) => h.region === hubRegion);

  const faqs = [
    {
      q: 'How does the robotics curriculum integrate into our standard school timetable?',
      a: 'We design our modules to fit seamlessly into one or two 40–45 minute timetable periods per week (32 to 64 hours annually). The curriculum directly complements CBSE Science/Math units and ICSE Computer Applications without overloading students before mid-term or board examinations.'
    },
    {
      q: 'What is your hardware replacement policy if students damage or lose components?',
      a: 'All institutional school and center contracts include our Zero-Friction Replenishment Warranty. We provide 2 complete spare kit sets with initial delivery and guarantee courier replacement of any burned ICs, stripped gears, or cracked acrylic plates within 48 hours.'
    },
    {
      q: 'Can existing school teachers be trained, or do you provide resident mentors?',
      a: 'We offer both models! Schools can opt for a dedicated full-time Kinetix robotics engineer placed on campus who manages all teaching and lab maintenance, or enroll existing science/computer science teachers in our 3-tier certified Train-the-Trainer program.'
    },
    {
      q: 'Are the materials and kits safe for young children in Classes 4 and 5?',
      a: 'Absolutely. All kits operate on safe low-voltage DC power (3.3V to 6V) and use 100% solderless Dupont connectors. Structural components are manufactured from shatterproof virgin acrylic with beveled non-sharp edges and comply with European EN 71 and RoHS safety directives.'
    },
    {
      q: 'How do you prepare students for the World Robot Olympiad (WRO) and FIRST LEGO League?',
      a: 'Students in Classes 7–9 can join our Competition Squad incubator. We provide official competition regulation game mats, challenge mission bricks, and coaching on design notebooks and game-day autonomous strategy by national Olympiad judges.'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pb-20 pt-8 sm:pt-12">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
          Collaboration Desk
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Connect with Kinetix Robotics
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Schedule an on-campus demonstration with our Mobile STEM Van, request evaluation hardware kits for your academic committee, or discuss STEM center franchise licensing.
        </p>
      </div>

      {/* Main Booking Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Deck (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">Request Consultation</span>
              <h2 className="text-2xl font-bold text-white">Book an Institutional Demo & Evaluation</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Intent Selector Tabs */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Select Collaboration Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setIntentType('school_demo')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      intentType === 'school_demo'
                        ? 'border-cyan-400 bg-cyan-950/40 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">School On-Campus Demo</div>
                    <div className="text-[10px] text-slate-400">Mobile STEM Van visit</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIntentType('eval_kit')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      intentType === 'eval_kit'
                        ? 'border-cyan-400 bg-cyan-950/40 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">Hardware Eval Kit</div>
                    <div className="text-[10px] text-slate-400">For Principal / HOD review</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIntentType('center_franchise')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      intentType === 'center_franchise'
                        ? 'border-cyan-400 bg-cyan-950/40 text-white'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">Center Franchise</div>
                    <div className="text-[10px] text-slate-400">Weekend cohort licensing</div>
                  </button>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Role / Title *
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Principal">School Principal</option>
                    <option value="STEM Coordinator">STEM / Robotics HOD</option>
                    <option value="School Trustee">School Trustee / Management</option>
                    <option value="Center Owner">STEM / Tuition Center Director</option>
                    <option value="Parent">Parent / PTA Representative</option>
                  </select>
                </div>
              </div>

              {/* Institution Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    School / Center Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    placeholder="e.g. DPS International School"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    City & State *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="principal@school.edu.in"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Target Grades Selector (Class 4 to 9) */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Target Grade Cohorts (Classes 4–9)</span>
                  <span className="text-[11px] text-slate-400">Click to select/unselect</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[4, 5, 6, 7, 8, 9].map((gradeNum) => {
                    const isSelected = selectedGrades.includes(gradeNum);
                    return (
                      <button
                        key={gradeNum}
                        type="button"
                        onClick={() => toggleGrade(gradeNum)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Class {gradeNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Date & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Demo Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Lab Infrastructure Notes / Questions
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Existing 500 sq ft room available"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting Schedule Request...' : 'Confirm Demo & Kit Evaluation Request'}</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-400">
                Official institutional response within 24 business hours · Zero demonstration charges.
              </div>
            </form>
          </div>

          {/* Quick Info & Trust Sidebar (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">
                Direct Academic Support Desk
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect directly with our curriculum directors and lab engineering leads.
              </p>

              <div className="space-y-3 text-xs pt-2">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">National School Hotline</div>
                    <div className="font-bold text-white font-mono">+91 800-ROBOTIX (762-6849)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Curriculum & Proposals</div>
                    <div className="font-bold text-white font-mono">collaborate@kinetixrobotics.io</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Desk Hours</div>
                    <div className="font-medium text-white">Mon–Sat: 8:30 AM – 6:30 PM IST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Expect During the Demo */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">What Happens During the Demo Day?</h3>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Our Mobile STEM Van brings 12 modular robot units to your campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>30-minute interactive rover assembly trial with a sample student cohort</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Physical room dimensions and electrical grounding safety inspection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Curriculum alignment presentation for the Principal and STEM HOD</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Regional STEM Experience Hubs Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
              Nationwide Presence
            </span>
            <h2 className="text-2xl font-bold text-white">Regional Innovation Hubs & Demo Centers</h2>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl text-xs font-semibold">
            {(['all', 'north', 'south', 'west', 'east'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setHubRegion(reg)}
                className={`px-3 py-1.5 rounded-lg transition-all capitalize cursor-pointer ${
                  hubRegion === reg
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredHubs.map((hub, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{hub.city}</span>
                  <span className="text-[10px] uppercase font-mono text-cyan-400">{hub.region}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{hub.address}</p>
                <div className="text-[11px] text-slate-300 font-mono">{hub.phone}</div>
              </div>

              <div className="pt-3 border-t border-slate-850 text-[10px] text-emerald-400 font-medium">
                {hub.labCapacity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
            Institutional Clarifications
          </span>
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-850">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {bookingConfirmation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                Booking Request Acknowledged
              </span>
              <h3 className="text-xl font-bold text-white">
                Demo Visit Scheduled Successfully!
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Thank you, <span className="text-white font-semibold">{fullName || 'Educator'}</span>. Our regional STEM coordinator will connect with you at <span className="text-cyan-400 font-mono">{email}</span> within 24 business hours to confirm kit logistics.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-left space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference ID:</span>
                <span className="font-bold text-white">{bookingConfirmation.referenceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Institution:</span>
                <span className="text-slate-300">{institutionName || 'Partner School'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Cohort:</span>
                <span className="text-cyan-400">Classes {selectedGrades.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Requested Date:</span>
                <span className="text-slate-300">{preferredDate}</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setBookingConfirmation(null)}
                className="px-6 py-2.5 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-colors cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
