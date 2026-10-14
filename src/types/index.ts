export type PageId = 'overview' | 'roadmap' | 'partnerships' | 'simulator' | 'toolkit' | 'contact';

export interface GradeRoadmap {
  id: string;
  gradeNumber: number;
  gradeLabel: string;
  ageRange: string;
  tagline: string;
  theme: string;
  kitName: string;
  kitDescription: string;
  colorAccent: string;
  hardwareComponents: {
    name: string;
    type: string;
    description: string;
  }[];
  terms: {
    term: string;
    title: string;
    duration: string;
    topics: string[];
    milestoneProject: string;
  }[];
  capstoneProject: {
    title: string;
    description: string;
    skills: string[];
    wiringSummary: string;
    sampleCode: string;
    codeLanguage: string;
  };
  learningOutcomes: string[];
  boardAlignment: {
    board: string;
    moduleCode: string;
    description: string;
  }[];
}

export interface PartnershipModel {
  id: string;
  title: string;
  subheading: string;
  targetAudience: string;
  idealFor: string;
  deliverables: string[];
  timeline: string;
  popularBadge?: boolean;
}

export interface LessonPlan {
  id: string;
  grade: string;
  title: string;
  duration: string;
  objective: string;
  materials: string[];
  hookActivity: string;
  handsOnTask: string;
  troubleshootingTips: string;
  plenaryAssessment: string;
}

export interface BookingSubmission {
  id: string;
  role: string;
  institutionName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  interestType: string;
  selectedGrades: number[];
  studentCountRange: string;
  notes: string;
  submittedAt: string;
}
