import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Volume2
} from 'lucide-react';

interface LabExplorerPageProps {
  setActivePage: (page: PageId) => void;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const LabExplorerPage: React.FC<LabExplorerPageProps> = ({ setActivePage }) => {
  const [activeTab, setActiveTab] = useState<'rover' | 'codeBridge' | 'sensorBench'>('rover');

  // --- MODULE 1: Autonomous Rover Simulator State ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [detectionThreshold, setDetectionThreshold] = useState<number>(35); // cm
  const [roverSpeed, setRoverSpeed] = useState<number>(2); // 1, 2, 3
  const [avoidStrategy, setAvoidStrategy] = useState<'reverse_turn' | 'scan_pivot' | 'wall_follow'>('reverse_turn');
  const [telemetryDistance, setTelemetryDistance] = useState<number>(100);
  const [robotState, setRobotState] = useState<string>('CRUISING');
  const [avoidanceCount, setAvoidanceCount] = useState<number>(0);

  // Robot simulation state inside ref to prevent re-renders in loop
  const simRef = useRef({
    x: 100,
    y: 150,
    angle: 0.2, // radians
    radius: 18,
    state: 'CRUISING' as 'CRUISING' | 'DETECTED' | 'REVERSING' | 'TURNING',
    stateTimer: 0,
    obstacles: [
      { x: 260, y: 70, width: 45, height: 120 },
      { x: 380, y: 160, width: 50, height: 100 },
      { x: 180, y: 220, width: 70, height: 40 },
      { x: 480, y: 50, width: 40, height: 80 },
    ] as Obstacle[],
    trail: [] as { x: number; y: number }[]
  });

  // Animation Loop for Rover Canvas
  useEffect(() => {
    let animId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const sim = simRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // Update simulation physics if running
      if (isRunning) {
        // Calculate sensor ray distance
        const sensorRangePixels = detectionThreshold * 3.5;
        let minHitDist = sensorRangePixels;

        // Cast 5 sensor rays in cone
        const coneAngles = [-0.25, -0.12, 0, 0.12, 0.25];
        for (const rayOffset of coneAngles) {
          const rayAngle = sim.angle + rayOffset;
          for (let step = 5; step <= sensorRangePixels; step += 4) {
            const rx = sim.x + Math.cos(rayAngle) * step;
            const ry = sim.y + Math.sin(rayAngle) * step;

            // Boundary collision
            if (rx <= 5 || rx >= width - 5 || ry <= 5 || ry >= height - 5) {
              if (step < minHitDist) minHitDist = step;
              break;
            }

            // Obstacle collision
            let hitObs = false;
            for (const obs of sim.obstacles) {
              if (rx >= obs.x && rx <= obs.x + obs.width && ry >= obs.y && ry <= obs.y + obs.height) {
                hitObs = true;
                break;
              }
            }
            if (hitObs) {
              if (step < minHitDist) minHitDist = step;
              break;
            }
          }
        }

        const currentDistCm = Math.round(minHitDist / 3.5);
        setTelemetryDistance(currentDistCm);

        // State Machine Logic
        if (sim.state === 'CRUISING') {
          if (currentDistCm <= detectionThreshold) {
            sim.state = 'DETECTED';
            sim.stateTimer = 15;
            setRobotState('OBSTACLE_DETECTED');
            setAvoidanceCount((prev) => prev + 1);
          } else {
            // Forward movement
            const speedPx = roverSpeed * 1.3;
            sim.x += Math.cos(sim.angle) * speedPx;
            sim.y += Math.sin(sim.angle) * speedPx;
            setRobotState('CRUISING_FORWARD');
          }
        } else if (sim.state === 'DETECTED') {
          sim.stateTimer--;
          if (sim.stateTimer <= 0) {
            sim.state = 'REVERSING';
            sim.stateTimer = 18;
            setRobotState('REVERSING');
          }
        } else if (sim.state === 'REVERSING') {
          sim.x -= Math.cos(sim.angle) * 1.2;
          sim.y -= Math.sin(sim.angle) * 1.2;
          sim.stateTimer--;
          if (sim.stateTimer <= 0) {
            sim.state = 'TURNING';
            sim.stateTimer = avoidStrategy === 'scan_pivot' ? 24 : 16;
            setRobotState('EVASIVE_TURN');
          }
        } else if (sim.state === 'TURNING') {
          const turnDelta = avoidStrategy === 'wall_follow' ? 0.08 : 0.12;
          sim.angle += turnDelta;
          sim.stateTimer--;
          if (sim.stateTimer <= 0) {
            sim.state = 'CRUISING';
            setRobotState('CRUISING_FORWARD');
          }
        }

        // Clamp boundaries
        sim.x = Math.max(20, Math.min(width - 20, sim.x));
        sim.y = Math.max(20, Math.min(height - 20, sim.y));

        // Add to breadcrumb trail
        if (Math.random() < 0.2) {
          sim.trail.push({ x: sim.x, y: sim.y });
          if (sim.trail.length > 80) sim.trail.shift();
        }
      }

      // --- DRAW CANVAS ---
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid
      ctx.strokeStyle = '#1e293b40';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw breadcrumb trail
      if (sim.trail.length > 1) {
        ctx.strokeStyle = '#06b6d440';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sim.trail[0].x, sim.trail[0].y);
        for (let i = 1; i < sim.trail.length; i++) {
          ctx.lineTo(sim.trail[i].x, sim.trail[i].y);
        }
        ctx.stroke();
      }

      // Draw Obstacles
      for (const obs of sim.obstacles) {
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

        // Pattern hatch
        ctx.fillStyle = '#47556940';
        ctx.fillRect(obs.x + 3, obs.y + 3, obs.width - 6, obs.height - 6);
      }

      // Draw Ultrasonic Sensor Cone
      const coneLength = detectionThreshold * 3.5;
      ctx.save();
      ctx.translate(sim.x, sim.y);
      ctx.rotate(sim.angle);

      const coneGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, coneLength);
      if (telemetryDistance <= detectionThreshold) {
        coneGrad.addColorStop(0, 'rgba(239, 68, 68, 0.4)');
        coneGrad.addColorStop(1, 'rgba(239, 68, 68, 0.05)');
      } else {
        coneGrad.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
        coneGrad.addColorStop(1, 'rgba(6, 182, 212, 0.02)');
      }
      ctx.fillStyle = coneGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, coneLength, -0.35, 0.35);
      ctx.closePath();
      ctx.fill();

      // Sonar arc lines
      ctx.strokeStyle = telemetryDistance <= detectionThreshold ? '#ef444480' : '#06b6d480';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw Robot Body
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(-sim.radius, -sim.radius + 3, sim.radius * 2, (sim.radius - 3) * 2, 6);
      ctx.fill();
      ctx.stroke();

      // Left & Right Wheels
      ctx.fillStyle = '#334155';
      ctx.fillRect(-sim.radius + 2, -sim.radius - 2, 10, 4);
      ctx.fillRect(sim.radius - 12, -sim.radius - 2, 10, 4);
      ctx.fillRect(-sim.radius + 2, sim.radius - 2, 10, 4);
      ctx.fillRect(sim.radius - 12, sim.radius - 2, 10, 4);

      // Front Ultrasonic "Eyes"
      ctx.fillStyle = telemetryDistance <= detectionThreshold ? '#ef4444' : '#22c55e';
      ctx.beginPath();
      ctx.arc(sim.radius - 2, -5, 3.5, 0, Math.PI * 2);
      ctx.arc(sim.radius - 2, 5, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Direction pointer
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(sim.radius, 0);
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isRunning, detectionThreshold, roverSpeed, avoidStrategy, telemetryDistance]);

  const handleResetRover = () => {
    simRef.current.x = 100;
    simRef.current.y = 150;
    simRef.current.angle = 0.2;
    simRef.current.state = 'CRUISING';
    simRef.current.trail = [];
    setAvoidanceCount(0);
    setRobotState('CRUISING_FORWARD');
    setIsRunning(false);
  };

  const handleAddRandomObstacle = () => {
    const rx = Math.floor(Math.random() * 380) + 120;
    const ry = Math.floor(Math.random() * 180) + 50;
    simRef.current.obstacles.push({
      x: rx,
      y: ry,
      width: Math.floor(Math.random() * 30) + 35,
      height: Math.floor(Math.random() * 40) + 40
    });
  };

  // --- MODULE 2: Block-to-Code Bridge State ---
  const [triggerCondition, setTriggerCondition] = useState<string>('dist_under_20');
  const [selectedAction, setSelectedAction] = useState<string>('reverse_turn');
  const [testExecutionSuccess, setTestExecutionSuccess] = useState<boolean | null>(null);

  const getGeneratedPythonCode = () => {
    let condCode = '';
    let actCode = '';

    if (triggerCondition === 'dist_under_20') {
      condCode = 'if sonar.distance_cm() < 20:';
    } else if (triggerCondition === 'line_lost') {
      condCode = 'if left_ir.read() == 0 and right_ir.read() == 0:';
    } else {
      condCode = 'if ldr_sensor.read_lux() < 150:';
    }

    if (selectedAction === 'reverse_turn') {
      actCode = `    # Safe evasion sequence
    motor_left.set_power(-60)
    motor_right.set_power(-60)
    time.sleep(0.8)
    motor_left.set_power(70)
    motor_right.set_power(-70)
    time.sleep(0.5)
    buzzer.beep(frequency=880, duration=100)`;
    } else if (selectedAction === 'emergency_stop') {
      actCode = `    # Full immediate safety brake
    motor_left.brake()
    motor_right.brake()
    rgb_led.set_color(RED)
    buzzer.beep(frequency=440, duration=400)`;
    } else {
      actCode = `    # Pivot search mode
    motor_left.set_power(45)
    motor_right.set_power(-45)
    oled_display.show_text("SEEKING BEACON")`;
    }

    return `import time
from kinetix_robot import Sonar, Motors, Buzzer

# Initializing Kinetix Class 6/7 Firmware Driver
sonar = Sonar(pin_trig=14, pin_echo=15)
motor_left = Motors.Left(pwm_pin=18, dir_pin=19)
motor_right = Motors.Right(pwm_pin=21, dir_pin=22)
buzzer = Buzzer(pin=25)

while True:
${condCode}
${actCode}
    else:
        # Default cruising routine
        motor_left.set_power(80)
        motor_right.set_power(80)
    time.sleep(0.02)`;
  };

  const handleTestCode = () => {
    setTestExecutionSuccess(null);
    setTimeout(() => {
      setTestExecutionSuccess(true);
    }, 400);
  };

  // --- MODULE 3: Sensor Diagnostic Bench State ---
  const [selectedSensor, setSelectedSensor] = useState<'ultrasonic' | 'ldr' | 'servo' | 'irLine'>('ultrasonic');
  const [benchInputVal, setBenchInputVal] = useState<number>(25);

  const getSensorCalculations = () => {
    if (selectedSensor === 'ultrasonic') {
      // Distance 2cm to 100cm
      const dist = benchInputVal;
      const echoMicros = Math.round((dist * 2) / 0.0343); // microsec
      const adcEquivalent = Math.min(1023, Math.round((dist / 100) * 1023));
      const voltage = ((dist / 100) * 3.3).toFixed(2);
      return {
        unit: 'cm',
        reading: `${dist} cm`,
        rawMetric: `${echoMicros} µs Pulse Duration`,
        voltage: `${voltage} V`,
        adc: adcEquivalent,
        protocol: 'Echo Pulse Width (Digital Pin)',
        status: dist < 15 ? 'CRITICAL PROXIMITY' : 'CLEAR HORIZON'
      };
    } else if (selectedSensor === 'ldr') {
      // Lux 0 to 1000
      const lux = benchInputVal * 10;
      const resistance = Math.round(500000 / (lux + 10)); // ohms approx
      const voltage = ((lux / 1000) * 3.3).toFixed(2);
      const adc = Math.min(1023, Math.round((lux / 1000) * 1023));
      return {
        unit: 'lux',
        reading: `${lux} Lux`,
        rawMetric: `${resistance} Ω Photocell Resistance`,
        voltage: `${voltage} V`,
        adc: adc,
        protocol: 'Analog 10-bit ADC (ADC0 Pin 36)',
        status: lux > 500 ? 'BRIGHT SUNLIGHT' : lux > 150 ? 'INDOOR AMBIENT' : 'LOW LIGHT / SHADOW'
      };
    } else if (selectedSensor === 'servo') {
      // Angle 0 to 180 deg
      const angle = Math.round((benchInputVal / 100) * 180);
      const pwmPulseMs = (0.5 + (angle / 180) * 2.0).toFixed(2);
      const dutyPercent = (((0.5 + (angle / 180) * 2.0) / 20) * 100).toFixed(1);
      return {
        unit: 'degrees',
        reading: `${angle}° Shaft Angle`,
        rawMetric: `${pwmPulseMs} ms High Pulse (50Hz Frame)`,
        voltage: '5.00 V (VCC Rail)',
        adc: `${dutyPercent}% PWM Duty`,
        protocol: '16-bit PWM / PCA9685 I2C',
        status: angle === 90 ? 'CENTERED NEUTRAL' : angle < 90 ? 'LEFT DEFLECTION' : 'RIGHT DEFLECTION'
      };
    } else {
      // IR Line reflectance 0 to 100 (Black vs White)
      const surfaceReflect = benchInputVal;
      const isBlackLine = surfaceReflect < 30;
      const voltage = isBlackLine ? '3.15 V' : '0.22 V';
      const adc = isBlackLine ? 980 : 68;
      return {
        unit: '% Reflectivity',
        reading: isBlackLine ? 'BLACK TRACK DETECTED' : 'WHITE FLOOR DETECTED',
        rawMetric: `${surfaceReflect}% Infrared Return`,
        voltage: voltage,
        adc: adc,
        protocol: 'Phototransistor Comparator (LM393)',
        status: isBlackLine ? 'TRACK ENGAGED (HIGH)' : 'REFLECTIVE SURFACE (LOW)'
      };
    }
  };

  const sensorMetrics = getSensorCalculations();

  return (
    <div className="space-y-16 pb-20 pt-8 sm:pt-12">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">
          Interactive Experiential Sandbox
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Virtual STEM Lab Explorer
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Experience what students build in our Class 4 to 9 curriculum. Test real autonomous rover obstacle avoidance, explore block-to-Python firmware algorithms, and calibrate live hardware sensors in real time.
        </p>

        {/* Simulator Module Nav Tabs */}
        <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl mt-2">
          <button
            onClick={() => setActiveTab('rover')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'rover'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>1. Autonomous Rover Simulator (Classes 5–8)</span>
          </button>

          <button
            onClick={() => setActiveTab('codeBridge')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'codeBridge'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>2. Block-to-Python Bridge (Classes 6 & 9)</span>
          </button>

          <button
            onClick={() => setActiveTab('sensorBench')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'sensorBench'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>3. Hardware Sensor Diagnostic Bench</span>
          </button>
        </div>
      </div>

      {/* MODULE 1: ROVER SIMULATOR */}
      {activeTab === 'rover' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold font-mono">
                  Autonomous Avoidance Engine · Class 6 Capstone
                </span>
                <h2 className="text-xl font-bold text-white">
                  Ultrasonic Sonar Evasive Navigation Arena
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    isRunning
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRunning ? 'Pause Simulation' : 'Run Autonomous Rover'}</span>
                </button>

                <button
                  onClick={handleResetRover}
                  className="p-2 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg cursor-pointer"
                  title="Reset Arena"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleAddRandomObstacle}
                  className="px-3 py-2 text-xs font-semibold bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-lg cursor-pointer"
                >
                  + Add Obstacle
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* 2D Canvas Stage (Left Column) */}
              <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={380}
                  className="w-full h-auto block aspect-[16/9.5] cursor-crosshair"
                />

                {/* Overlaid Telemetry Pill */}
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 flex items-center gap-3 text-[11px] font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">STATE:</span>
                    <span className="text-cyan-400 font-bold">{robotState}</span>
                  </div>
                  <span className="text-slate-700">|</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400">DISTANCE:</span>
                    <span className={`font-bold ${telemetryDistance <= detectionThreshold ? 'text-red-400' : 'text-emerald-400'}`}>
                      {telemetryDistance} cm
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800 text-[10px] text-slate-400">
                  Avoidances Executed: <span className="font-mono text-cyan-400 font-bold">{avoidanceCount}</span>
                </div>
              </div>

              {/* Control Deck (Right Column) */}
              <div className="lg:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-5">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Tuning Parameters
                </h3>

                {/* Distance Threshold Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Sonar Trigger Threshold</span>
                    <span className="font-mono text-cyan-400 font-bold">{detectionThreshold} cm</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="65"
                    value={detectionThreshold}
                    onChange={(e) => setDetectionThreshold(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>15 cm (Aggressive)</span>
                    <span>65 cm (Cautious)</span>
                  </div>
                </div>

                {/* Rover Speed Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Motor Cruising Speed</span>
                    <span className="font-mono text-cyan-400 font-bold">{roverSpeed}x PWM</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={roverSpeed}
                    onChange={(e) => setRoverSpeed(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>1x (Calibration)</span>
                    <span>4x (High Velocity)</span>
                  </div>
                </div>

                {/* Avoidance Routine Strategy */}
                <div className="space-y-1.5">
                  <label className="block text-xs text-slate-300 font-medium">
                    Algorithmic Avoidance Strategy
                  </label>
                  <div className="space-y-1.5 text-xs">
                    <button
                      onClick={() => setAvoidStrategy('reverse_turn')}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        avoidStrategy === 'reverse_turn'
                          ? 'border-cyan-400 bg-cyan-950/30 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-xs">Reverse & Spin (Class 5)</div>
                      <div className="text-[10px] text-slate-400">Brakes both motors, reverses 0.8s, spins right</div>
                    </button>

                    <button
                      onClick={() => setAvoidStrategy('scan_pivot')}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        avoidStrategy === 'scan_pivot'
                          ? 'border-cyan-400 bg-cyan-950/30 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-xs">180° Radar Pan-Scan (Class 6)</div>
                      <div className="text-[10px] text-slate-400">Pans servo left/right to choose clearest gap</div>
                    </button>

                    <button
                      onClick={() => setAvoidStrategy('wall_follow')}
                      className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        avoidStrategy === 'wall_follow'
                          ? 'border-cyan-400 bg-cyan-950/30 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <div className="font-bold text-xs">Right-Hand Wall Hugger (Class 7)</div>
                      <div className="text-[10px] text-slate-400">Maintains constant distance along maze perimeter</div>
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  Taught in Term 2 of Class 6 using MakeCode and Python HC-SR04 pulse routines.
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODULE 2: BLOCK TO PYTHON BRIDGE */}
      {activeTab === 'codeBridge' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold font-mono">
                  Pedagogical Progression · From Blocks to Real Python
                </span>
                <h2 className="text-xl font-bold text-white">
                  Live Code Generator & Firmware Execution Tester
                </h2>
              </div>

              <button
                onClick={handleTestCode}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-all cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Test Execute Logic</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Block Logic Constructor (Left) */}
              <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Visual Block Builder (Class 4–6 Paradigm)
                </h3>

                {/* Condition Event Block */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-slate-300">1. Trigger Event (Sensor Check)</div>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setTriggerCondition('dist_under_20')}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        triggerCondition === 'dist_under_20'
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-xs">WHEN Sonar_Distance &lt; 20 cm</span>
                    </button>

                    <button
                      onClick={() => setTriggerCondition('line_lost')}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        triggerCondition === 'line_lost'
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-xs">WHEN Line_Sensors == ALL_WHITE (Lost Line)</span>
                    </button>

                    <button
                      onClick={() => setTriggerCondition('light_dark')}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        triggerCondition === 'light_dark'
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-xs">WHEN Light_Sensor &lt; 150 Lux (Tunnel)</span>
                    </button>
                  </div>
                </div>

                {/* Action Block */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-slate-300">2. Actuation Response (Motors & Output)</div>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setSelectedAction('reverse_turn')}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedAction === 'reverse_turn'
                          ? 'border-amber-400 bg-amber-950/40 text-amber-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-xs">DO Reverse 0.8s + Spin 90° Right + Beep</span>
                    </button>

                    <button
                      onClick={() => setSelectedAction('emergency_stop')}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedAction === 'emergency_stop'
                          ? 'border-amber-400 bg-amber-950/40 text-amber-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-xs">DO Emergency Brake + Flash Red LED</span>
                    </button>

                    <button
                      onClick={() => setSelectedAction('pivot_search')}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedAction === 'pivot_search'
                          ? 'border-amber-400 bg-amber-950/40 text-amber-300'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <span className="font-mono text-xs">DO Pivot Search Mode + Display OLED Icon</span>
                    </button>
                  </div>
                </div>

                {/* Test Feedback */}
                {testExecutionSuccess !== null && (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Firmware compilation test passed (0 errors, 42ms simulated loop execution).</span>
                  </div>
                )}
              </div>

              {/* Generated Python / C++ Code (Right) */}
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/70">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>main_firmware.py · MicroPython (Class 8 & 9)</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">Ready to Flash</span>
                </div>

                <div className="p-5 font-mono text-xs overflow-x-auto text-cyan-300/90 leading-relaxed bg-slate-950 min-h-[340px]">
                  <pre className="whitespace-pre">
                    {getGeneratedPythonCode()}
                  </pre>
                </div>

                <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/40 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Hardware Target: ESP32 / Raspberry Pi Pico</span>
                  <span>Syntax: PEP 8 Clean Python 3</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODULE 3: HARDWARE SENSOR BENCH */}
      {activeTab === 'sensorBench' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold font-mono">
                  Hardware Electronics & Instrumentation
                </span>
                <h2 className="text-xl font-bold text-white">
                  Sensor Signal & ADC Calibration Workbench
                </h2>
              </div>
              <span className="text-xs text-slate-400">Simulates real electrical ADC readings (0–1023) and bus protocols</span>
            </div>

            {/* Sensor Selection Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => { setSelectedSensor('ultrasonic'); setBenchInputVal(25); }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedSensor === 'ultrasonic'
                    ? 'border-cyan-400 bg-cyan-950/40 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">HC-SR04 Ultrasonic</div>
                <div className="text-[10px] text-slate-400">Classes 6, 7 & 8</div>
              </button>

              <button
                onClick={() => { setSelectedSensor('ldr'); setBenchInputVal(40); }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedSensor === 'ldr'
                    ? 'border-cyan-400 bg-cyan-950/40 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">LDR Photocell Bridge</div>
                <div className="text-[10px] text-slate-400">Class 5 Bug-Bots</div>
              </button>

              <button
                onClick={() => { setSelectedSensor('servo'); setBenchInputVal(50); }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedSensor === 'servo'
                    ? 'border-cyan-400 bg-cyan-950/40 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">SG90 180° Micro Servo</div>
                <div className="text-[10px] text-slate-400">Classes 6 & 8 Arms</div>
              </button>

              <button
                onClick={() => { setSelectedSensor('irLine'); setBenchInputVal(20); }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedSensor === 'irLine'
                    ? 'border-cyan-400 bg-cyan-950/40 text-white'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold">TCRT5000 IR Line Sensor</div>
                <div className="text-[10px] text-slate-400">Classes 6 & 8 Tracers</div>
              </button>
            </div>

            {/* Interactive Workbench Sliders & Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950 p-6 rounded-2xl border border-slate-800">
              
              {/* Slider Input */}
              <div className="lg:col-span-6 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Physical Stimulus Simulation</span>
                    <span className="font-mono text-cyan-400 font-bold">{sensorMetrics.reading}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    value={benchInputVal}
                    onChange={(e) => setBenchInputVal(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Minimum Input</span>
                    <span>Mid Scale</span>
                    <span>Maximum Full Scale</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Physical Principle Under Test
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {selectedSensor === 'ultrasonic' && 'Calculates time-of-flight for 40kHz sonic burst traveling through ambient room air.'}
                    {selectedSensor === 'ldr' && 'Photons hitting cadmium-free semiconductor grid liberate free electrons, lowering circuit resistance.'}
                    {selectedSensor === 'servo' && '50Hz PWM wave with pulse widths between 1.0ms (0°) and 2.0ms (180°) positions the internal potentiometer.'}
                    {selectedSensor === 'irLine' && '940nm infrared light absorbs completely into black carbon ink but bounces off white vinyl laminate.'}
                  </p>
                </div>
              </div>

              {/* Live Telemetry Readout Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Sensor Reading</div>
                  <div className="text-lg font-mono font-bold text-white mt-1">{sensorMetrics.reading}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{sensorMetrics.rawMetric}</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Voltage Pin Output</div>
                  <div className="text-lg font-mono font-bold text-cyan-400 mt-1">{sensorMetrics.voltage}</div>
                  <div className="text-[10px] text-slate-400 mt-1">3.3V Logic Safe</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">ADC Register (10-Bit)</div>
                  <div className="text-lg font-mono font-bold text-emerald-400 mt-1 tabular-nums">{sensorMetrics.adc}</div>
                  <div className="text-[10px] text-slate-400 mt-1">Range: 0 to 1023</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Microcontroller Bus</div>
                  <div className="text-xs font-mono font-bold text-amber-400 mt-1">{sensorMetrics.protocol}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{sensorMetrics.status}</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">Want to experience these kits physically at your school?</h3>
            <p className="text-xs text-slate-400 mt-0.5">We conduct live on-campus interactive demonstrations with students and faculty.</p>
          </div>
          <button
            onClick={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            Schedule Free On-Campus Demo
          </button>
        </div>
      </div>

    </div>
  );
};
