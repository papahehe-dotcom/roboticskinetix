import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface BookingRecord {
  id: string;
  referenceId: string;
  fullName: string;
  role: string;
  institutionName: string;
  email: string;
  phone: string;
  city: string;
  intentType: string;
  selectedGrades: number[];
  preferredDate: string;
  notes?: string;
  status: 'PENDING_CONFIRMATION' | 'COORDINATOR_ASSIGNED' | 'SCHEDULED' | 'COMPLETED';
  createdAt: string;
}

// In-memory demo store for bookings
const bookingsStore: BookingRecord[] = [
  {
    id: 'demo-1',
    referenceId: 'KTX-2026-8192',
    fullName: 'Dr. Arundhati Ghosh',
    role: 'Principal',
    institutionName: 'Delhi Public International School',
    email: 'principal@dpis-campus.edu.in',
    phone: '+91 98450 11223',
    city: 'Bengaluru, Karnataka',
    intentType: 'school_demo',
    selectedGrades: [4, 5, 6, 7, 8],
    preferredDate: '2026-11-12',
    notes: 'Interested in integrated weekly timetable for Classes 5 to 8.',
    status: 'COORDINATOR_ASSIGNED',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'demo-2',
    referenceId: 'KTX-2026-4421',
    fullName: 'Sanjay Deshmukh',
    role: 'Center Owner',
    institutionName: 'RoboSpark STEM Center',
    email: 'sanjay@robosparkacademy.com',
    phone: '+91 97660 33441',
    city: 'Pune, Maharashtra',
    intentType: 'center_franchise',
    selectedGrades: [6, 7, 8, 9],
    preferredDate: '2026-11-15',
    notes: 'Looking for 20 weekend kits and faculty certification.',
    status: 'PENDING_CONFIRMATION',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // 1. Health Endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'Kinetix Robotics Full-Stack Backend',
      version: '1.2.0',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  });

  // 2. Bookings List API
  app.get('/api/bookings', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: bookingsStore.length,
      bookings: bookingsStore
    });
  });

  // 3. New Booking Submission API
  app.post('/api/bookings', (req: Request, res: Response) => {
    const {
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
    } = req.body;

    if (!fullName || !email || !phone || !institutionName) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, phone, and institutionName are required.'
      });
      return;
    }

    const referenceId = `KTX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: BookingRecord = {
      id: `booking-${Date.now()}`,
      referenceId,
      fullName: String(fullName).trim(),
      role: String(role || 'STEM Coordinator'),
      institutionName: String(institutionName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      city: String(city || 'Not Specified'),
      intentType: String(intentType || 'school_demo'),
      selectedGrades: Array.isArray(selectedGrades) && selectedGrades.length > 0 ? selectedGrades : [4, 5, 6, 7, 8, 9],
      preferredDate: String(preferredDate || new Date().toISOString().split('T')[0]),
      notes: notes ? String(notes) : '',
      status: 'PENDING_CONFIRMATION',
      createdAt: new Date().toISOString()
    };

    bookingsStore.unshift(newRecord);

    res.status(201).json({
      success: true,
      message: 'Demo and consultation request logged successfully.',
      booking: newRecord
    });
  });

  // 4. Institutional Proposal Calculator API
  app.post('/api/proposals/calculate', (req: Request, res: Response) => {
    const {
      partnerType = 'school',
      studentCount = 120,
      workstations = 10,
      mentorModel = 'visiting'
    } = req.body;

    const students = Math.max(20, Math.min(1000, Number(studentCount) || 120));
    const stations = Math.max(4, Math.min(40, Number(workstations) || 10));

    const kitsNeeded = Math.ceil(stations * 1.5);
    const spareKits = 2;
    const totalKitsDelivered = kitsNeeded + spareKits;
    const batchesPerWeek = Math.ceil(students / (stations * 2));
    const annualHours = batchesPerWeek * 32;

    const baseHardwareCost = stations * 28000; // Workbenches & power tracks
    const kitsHardwareCost = totalKitsDelivered * 14000;
    const mentorAnnualCost = mentorModel === 'fulltime' ? 360000 : mentorModel === 'visiting' ? 180000 : 75000;
    const lmsAndCurriculumLicense = students * 450;

    const totalEstimateINR = baseHardwareCost + kitsHardwareCost + mentorAnnualCost + lmsAndCurriculumLicense;
    const perStudentPerMonth = Math.round(totalEstimateINR / (students * 10));

    res.json({
      success: true,
      parameters: {
        partnerType,
        studentCount: students,
        workstations: stations,
        mentorModel
      },
      capacityMetrics: {
        hardwareKits: kitsNeeded,
        spareKits,
        totalKitsDelivered,
        studentToKitRatio: '2:1 Optimal Touch',
        batchesPerWeek,
        annualLabHours: annualHours
      },
      financialEstimate: {
        currency: 'INR',
        baseHardwareCost,
        kitsHardwareCost,
        mentorAnnualCost,
        lmsAndCurriculumLicense,
        totalEstimateAnnual: totalEstimateINR,
        perStudentMonthly: perStudentPerMonth
      },
      slaCommitments: [
        '48-Hour Courier Spares Replenishment Guarantee',
        'Annual Hardware Recalibration & Safety Audit',
        'CBSE / ICSE / IB Mapping Documentation Included'
      ]
    });
  });

  // 5. Diagnostic Readiness Assessment API
  app.post('/api/diagnostic/evaluate', (req: Request, res: Response) => {
    const { grade = 6, experience = 'lego_toys', persistence = 'likes_testing', goal = 'hands_on_screentime' } = req.body;
    const gradeNum = Math.max(4, Math.min(9, Number(grade) || 6));

    const gradeMap: Record<number, { title: string; kit: string; capstone: string }> = {
      4: { title: 'Class 4 · Kinetic Mechanics', kit: 'Kinetix Discovery Spark (K-4)', capstone: 'High-Torque Solar Crane' },
      5: { title: 'Class 5 · Bug-Bots & Sensors', kit: 'Kinetix Sensor-Rover Core (K-5)', capstone: 'Phototropic Bug-Bot' },
      6: { title: 'Class 6 · Micro:bit & Sonar Radar', kit: 'Kinetix Micro:Track Explorer (K-6)', capstone: 'Autonomous Warehouse AGV' },
      7: { title: 'Class 7 · IoT Telemetry & ESP32', kit: 'Kinetix IoT Node & Rover (K-7)', capstone: 'Disaster Survey Web Rover' },
      8: { title: 'Class 8 · Inverse Kinematics & Mecanum', kit: 'Kinetix 4-DOF Arm & Omni-Rover (K-8)', capstone: 'Holonomic Mecanum Sorting Bot' },
      9: { title: 'Class 9 · Edge AI & Computer Vision', kit: 'Kinetix Vision-AI Quad Core (K-9)', capstone: 'Edge AI Road-Sign Rover' },
    };

    const targetInfo = gradeMap[gradeNum] || gradeMap[6];

    res.json({
      success: true,
      recommendedGrade: gradeNum,
      curriculumTier: targetInfo.title,
      kitAssigned: targetInfo.kit,
      capstoneProject: targetInfo.capstone,
      screenTimeRatio: '80% Physical Hardware Construction · 20% Algorithmic Code',
      recommendationSummary: `Based on prior experience with ${experience} and primary goal of ${goal}, student is primed for ${targetInfo.title}.`
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Kinetix Robotics Server] Full-Stack server running on port ${PORT}`);
  });
}

startServer();
