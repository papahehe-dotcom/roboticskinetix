import { GradeRoadmap, LessonPlan } from '../types';

export const GRADE_ROADMAPS: GradeRoadmap[] = [
  {
    id: 'class-4',
    gradeNumber: 4,
    gradeLabel: 'Class 4',
    ageRange: 'Ages 9–10',
    tagline: 'Simple Machines, Gearing & Kinetic Mechanics',
    theme: 'Mechanical Advantage & Foundation Circuits',
    kitName: 'Kinetix Discovery Spark Kit (K-4)',
    kitDescription: 'Tactile, solderless mechanical robotics kit with heavy-duty interlocking gears, low-RPM DC motors, battery cradles, and magnetic snap switches.',
    colorAccent: 'amber',
    hardwareComponents: [
      { name: 'Dual Bevel & Spur Gear Set', type: 'Mechanics', description: 'Compound 3:1 and 9:1 reduction gearboxes for torque studies.' },
      { name: 'Low-RPM Safe DC Motors (3-6V)', type: 'Actuator', description: 'Enclosed child-safe geared motors with quick-clip terminals.' },
      { name: 'Magnetic Reed & Snap Switches', type: 'Sensors', description: 'Tactile limit switches for learning binary on/off circuit states.' },
      { name: 'Modular Acrylic Chassis Beams', type: 'Structural', description: 'Reconfigurable beams and axles for friction-free rigging.' },
      { name: 'Solar Cell 2.5V 200mA', type: 'Energy', description: 'Mini photovoltaic module demonstrating clean kinetic power.' }
    ],
    terms: [
      {
        term: 'Term 1',
        title: 'Mechanisms & Kinetic Transmission',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Levers of the 1st, 2nd, and 3rd order in crane arms', 'Gear ratios and torque vs speed trade-offs', 'Pulley systems & belt drives', 'Friction reduction using nylon bushings'],
        milestoneProject: 'High-Torque Tower Crane with Double-Sheave Pulley'
      },
      {
        term: 'Term 2',
        title: 'Circuits, Switches & Polarity',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Closed loops and series vs parallel lamp circuits', 'Motor reversal via DPDT toggle switch polarity flip', 'Conductive vs insulating materials exploration', 'Fuse safety basics and current limiting'],
        milestoneProject: 'Dual-Direction Cable Car with Automatic Stop Bumper'
      },
      {
        term: 'Term 3',
        title: 'Kinematic Linkages & Walking Bots',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Four-bar mechanical linkages (Chebyshev & Grashof)', 'Translating rotary motion into reciprocal walking strides', 'Center of gravity balance and anti-tip stabilization', 'Eccentric cam vibratory crawlers'],
        milestoneProject: 'Quad-Legged Klann Linkage Walking Walker'
      },
      {
        term: 'Term 4',
        title: 'Clean Energy & Capstone Arena',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Solar angle of incidence & power harvest', 'Mechanical clutch protection against gear strip', 'Peer team challenge: Payload hauling trial', 'Design documentation and project sketching'],
        milestoneProject: 'Solar-Assisted Heavy Payload Hauler (1.2 kg capacity)'
      }
    ],
    capstoneProject: {
      title: 'Solar-Powered Kinetic Drawbridge & Docking Crane',
      description: 'A dual-motor motorized drawbridge that raises when a ship passes a contact trigger, complete with mechanical safety counterweights and warning indicators.',
      skills: ['Gear Ratio Calculation', 'Counterweight Equilibrium', 'Reversible DPDT Wiring', 'Friction Optimization'],
      wiringSummary: 'Motor 1 wired through DPDT switch to 4.5V pack with magnetic limit stop. Solar booster wired in parallel across smoothing capacitor.',
      sampleCode: `// Visual Block Logic:
WHEN Button_Pressed DO
  Motor_Crane.Direction = FORWARD
  Motor_Crane.Speed = 60%
  WAIT UNTIL LimitSwitch_Top == TRUE
  Motor_Crane.Stop()
END`,
      codeLanguage: 'Block Logic / Schematic'
    },
    learningOutcomes: [
      'Calculate gear ratios (1:3, 1:9) and predict mechanical advantage',
      'Construct closed DC circuits and reverse polarity safely',
      'Explain kinetic energy transfer and equilibrium in structural linkages',
      'Document design iterations through engineering graph sketches'
    ],
    boardAlignment: [
      { board: 'CBSE Skill', moduleCode: 'Subject 404 (Intro)', description: 'Direct alignment with Class 4-5 early STEM exploration units' },
      { board: 'ICSE', moduleCode: 'Robotics & AI Stage 1', description: 'Simple machines and kinetic energy foundation units' },
      { board: 'Cambridge / IB', moduleCode: 'PYP STEAM Inquiry', description: 'Transdisciplinary theme: How the World Works (Forces & Mechanisms)' }
    ]
  },
  {
    id: 'class-5',
    gradeNumber: 5,
    gradeLabel: 'Class 5',
    ageRange: 'Ages 10–11',
    tagline: 'Sensory Automation, Bug-Bots & Condition Logic',
    theme: 'Sensors, Transistor Gates & Reactive Systems',
    kitName: 'Kinetix Sensor-Rover Core (K-5)',
    kitDescription: 'Introduction to electronic sensing without complex code syntax: light sensors, infrared obstacle detectors, transistor driver switches, and breadboard logic.',
    colorAccent: 'cyan',
    hardwareComponents: [
      { name: 'Cadmium-Free LDR Light Sensors', type: 'Sensors', description: 'Photocell modules for differential light tracking.' },
      { name: 'Infrared Proximity Reflex Sensors', type: 'Sensors', description: '38kHz modulated emitter-receiver pair for obstacle detection.' },
      { name: 'TIP120 Transistor & MOSFET Modules', type: 'Electronics', description: 'Allows tiny sensor signals to control high-current motors.' },
      { name: 'Solderless Half-Size Breadboards', type: 'Prototyping', description: 'Color-coded terminal strips for breadboard circuit design.' },
      { name: 'Twin High-Torque Gearmotors (6V)', type: 'Actuators', description: 'Independent differential drive for responsive tank steering.' }
    ],
    terms: [
      {
        term: 'Term 1',
        title: 'Light Detection & Differential Steering',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Resistance variation in photocells with ambient lux', 'Voltage divider circuits with pull-down resistors', 'Differential light tracking without microcontrollers', 'Tuning potentiometer sensitivity thresholds'],
        milestoneProject: 'Phototropic "Sunflower" Light-Seeking Bug Bot'
      },
      {
        term: 'Term 2',
        title: 'Infrared Reflection & Collision Avoidance',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Infrared light reflection off dark vs light surfaces', 'Triangulation and threshold distance tuning', 'Automatic reverse-on-impact bumper switches', 'Logic AND/OR behavior using transistor switches'],
        milestoneProject: 'Whisker-and-IR Reflexive Wall-Bouncing Rover'
      },
      {
        term: 'Term 3',
        title: 'Acoustic & Vibration Sensing',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Electret condenser microphone sound modules', 'Piezoelectric vibration triggers', 'Debouncing sensor inputs and false trigger suppression', 'Latching relays and motor hold circuits'],
        milestoneProject: 'Clap-Activated Security Rover with Auto-Alarm'
      },
      {
        term: 'Term 4',
        title: 'Autonomous Maze Navigation Trials',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Right-hand wall following rule mechanics', 'Analog sensor calibration under varying indoor light', 'Speed regulation via series resistor taps', 'Cap-stone robot race on custom maze grid'],
        milestoneProject: 'Analog Reflex Maze-Runner with Bumper Reflex'
      }
    ],
    capstoneProject: {
      title: 'Autonomous Dual-Sensor Heliotropic Rover',
      description: 'A differential-drive robotic vehicle equipped with twin LDR photocells and IR proximity beams that navigates toward light beacons while gracefully steering around obstacles.',
      skills: ['Voltage Divider Calculation', 'Differential Motor Balancing', 'Threshold Calibration', 'Fault Isolation'],
      wiringSummary: 'Twin LDRs in bridge circuit feed base of dual NPN drivers powering Left and Right gearmotors. Front IR sensor triggers reverse relay.',
      sampleCode: `// Visual Logic Flow:
IF (Left_Light > Right_Light) THEN
  Right_Motor = ON
  Left_Motor = OFF (Pivot Left)
ELSE IF (Front_Obstacle_Detected == TRUE) THEN
  Both_Motors = REVERSE (1.0 sec)
  Left_Motor = SPIN_RIGHT (0.5 sec)
END IF`,
      codeLanguage: 'Block / State Logic'
    },
    learningOutcomes: [
      'Assemble circuits on breadboards using proper schematic conventions',
      'Explain how analog sensors modulate electrical resistance',
      'Configure differential drive to produce forward, reverse, and pivot motions',
      'Calibrate analog threshold sensitivity for dynamic lighting conditions'
    ],
    boardAlignment: [
      { board: 'CBSE Skill', moduleCode: 'Subject 404 (Sensors)', description: 'Hands-on electronic modules and environmental sensing' },
      { board: 'ICSE', moduleCode: 'Robotics & AI Stage 2', description: 'Sensory feedback loops and analog-to-digital transition' },
      { board: 'Cambridge / IB', moduleCode: 'MYP Design Year 1', description: 'Inquiring and analyzing automated systems' }
    ]
  },
  {
    id: 'class-6',
    gradeNumber: 6,
    gradeLabel: 'Class 6',
    ageRange: 'Ages 11–12',
    tagline: 'Microcontrollers, Block Code & Precision Line Tracking',
    theme: 'Microcontroller Architecture & Algorithmic Control',
    kitName: 'Kinetix Micro:Track Explorer (K-6)',
    kitDescription: 'Step into programmable robotics with BBC micro:bit v2 / Arduino Nano, dual H-bridge motor shields, multi-channel TCRT5000 line sensors, and 5x5 LED matrix displays.',
    colorAccent: 'emerald',
    hardwareComponents: [
      { name: 'BBC micro:bit v2 + Expansion Shield', type: 'Compute', description: 'ARM Cortex-M4 with built-in compass, mic, speaker, and Bluetooth.' },
      { name: 'Dual L298N / TB6612FNG H-Bridge Driver', type: 'Driver', description: 'PWM speed regulation and bidirectional motor drive up to 1.2A.' },
      { name: '5-Channel TCRT5000 IR Sensor Array', type: 'Sensors', description: 'Precision reflectance sensor bar for black/white line tracking.' },
      { name: 'HC-SR04 Ultrasonic Sonar Module', type: 'Sensors', description: '2cm - 400cm acoustic echolocation sensor with 3mm resolution.' },
      { name: 'SG90 9g Micro Servo Motor', type: 'Actuator', description: '180-degree position-controlled servo for sensor panning.' }
    ],
    terms: [
      {
        term: 'Term 1',
        title: 'Microcontroller Architecture & Block Code',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Microcontroller CPU, RAM, Flash and GPIO pin theory', 'Digital vs Analog I/O and PWM pulse width modulation', 'Variables, condition logic (if/else), and while loops', 'Using built-in accelerometer for tilt-controlled steering'],
        milestoneProject: 'Gesture-Controlled Wireless Tilt Steering Bot'
      },
      {
        term: 'Term 2',
        title: 'Ultrasonic Echolocation & Radar Sweeps',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Speed of sound math: Distance = (Time × 343m/s) ÷ 2', 'Trigger pulses and Echo pulse width measurement', 'Servo-mounted radar sweeps (0° to 180° scan cycles)', 'Dead-end detection and reverse escape routines'],
        milestoneProject: 'Sonar Radar Rover with 180° Pan-Sweep Avoidance'
      },
      {
        term: 'Term 3',
        title: 'Line Following Algorithms & Closed-Loop Control',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Black line detection over white surfaces (IR absorption)', 'Two-sensor bang-bang control vs 5-sensor weighted average', 'Proportional steering response (P-controller fundamentals)', 'Crossing 90-degree intersections and T-junctions'],
        milestoneProject: 'High-Speed Precision 5-Sensor Line Follower'
      },
      {
        term: 'Term 4',
        title: 'Arena Challenge: Automated Warehouse Bot',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Grid map navigation and station docking stops', 'Magnetic RFID/Reed checkpoint tallying', 'State machine programming for pickup and drop cycles', 'Inter-team delivery speed competition'],
        milestoneProject: 'Autonomous Warehouse AGV with Cargo Docking'
      }
    ],
    capstoneProject: {
      title: 'Intelligent Warehouse AGV with Ultrasonic Safety Interlock',
      description: 'An autonomous guided vehicle that follows warehouse line tracks, pauses automatically when human or cargo obstacles enter its safety perimeter, and docks at destination bays.',
      skills: ['Closed-Loop Feedback', 'PWM Motor Tuning', 'Finite State Machine', 'Echolocation Math'],
      wiringSummary: 'Micro:bit connected to TB6612 driver via shield pins P0/P1/P8/P12. HC-SR04 on P14/P15. 5-Channel IR array on analog P2/P3/P4.',
      sampleCode: `def on_forever():
    distance = sonar.ping(DigitalPin.P14, DigitalPin.P15, PingUnit.CENTIMETERS)
    if distance < 15 and distance > 0:
        robot.stop_all()
        basic.show_icon(IconNames.NO)
        sound_buzzer()
    else:
        line_status = read_line_sensors()
        if line_status == "CENTER":
            robot.drive(speed=75)
        elif line_status == "LEFT":
            robot.steer_left(speed=50)
        elif line_status == "RIGHT":
            robot.steer_right(speed=50)
basic.forever(on_forever)`,
      codeLanguage: 'Block / MakeCode Python'
    },
    learningOutcomes: [
      'Write structured conditional and loop algorithms in MakeCode & MicroPython',
      'Explain how PWM duty cycles control DC motor rotational velocity',
      'Implement closed-loop sensor feedback to keep rovers centered on track',
      'Calculate distances using speed of sound ultrasonic time-of-flight'
    ],
    boardAlignment: [
      { board: 'CBSE Skill', moduleCode: 'Subject 404 (Class 6 AI)', description: 'Introduction to algorithmic thinking and smart control' },
      { board: 'ICSE', moduleCode: 'Robotics & AI Stage 3', description: 'Microcontrollers, sensors, and actuator integration' },
      { board: 'Cambridge / IB', moduleCode: 'Lower Secondary Science & Design', description: 'Forces, electrical systems, and programmable logic' }
    ]
  },
  {
    id: 'class-7',
    gradeNumber: 7,
    gradeLabel: 'Class 7',
    ageRange: 'Ages 12–13',
    tagline: 'IoT Environmental Telemetry, Wireless Mesh & Arduino C++',
    theme: 'Internet of Things (IoT) & Embedded C++ Foundations',
    kitName: 'Kinetix IoT Node & Telemetry Rover (K-7)',
    kitDescription: 'Powered by ESP32 Dual-Core SoC with Wi-Fi and BLE, environmental sensor shield (BME280, MQ Gas, Soil Moisture), and browser-based telemetry dashboards.',
    colorAccent: 'blue',
    hardwareComponents: [
      { name: 'ESP32 Wi-Fi & Bluetooth Dual-Core 240MHz', type: 'Compute', description: 'Industrial IoT microcontroller with 36 GPIOs and capacitive touch.' },
      { name: 'BME280 Temp, Humidity & Pressure Sensor', type: 'Sensors', description: 'I2C digital precision sensor for micro-climate profiling.' },
      { name: 'MQ-135 Air Quality & Hazardous Gas Module', type: 'Sensors', description: 'Detects CO2, benzene, and smoke particulates.' },
      { name: '0.96-inch OLED I2C Display (128x64)', type: 'Display', description: 'Monochrome graphics screen for real-time sensor graphing.' },
      { name: 'Dual 18650 Li-Ion Smart Power Pack', type: 'Power', description: 'Protected 7.4V rechargeable battery with USB-C BMS module.' }
    ],
    terms: [
      {
        term: 'Term 1',
        title: 'C++ Syntax & Register Basics on ESP32',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Transition from block code to typed C++ structure', 'Functions, parameters, scope, and pointer concepts', 'Serial monitor debugging and baud rate transmission', 'I2C communication protocol (SDA/SCL addressing)'],
        milestoneProject: 'Multi-Sensor Desktop Weather Station with OLED'
      },
      {
        term: 'Term 2',
        title: 'Wi-Fi Web Server & Telemetry Dashboards',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['TCP/IP networking basics, IP addresses, and HTTP methods', 'Hosting an asynchronous HTML/CSS dashboard on ESP32', 'Real-time WebSocket streaming of sensor telemetry', 'Client-side gauges and Chart.js telemetry plotting'],
        milestoneProject: 'Self-Hosted Web-Controlled Surveillance Rover'
      },
      {
        term: 'Term 3',
        title: 'Cloud MQTT & Alert Triggers',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Publish/Subscribe paradigm using MQTT broker', 'Publishing telemetry payloads to cloud databases', 'Threshold breach push notifications and webhooks', 'Automated motor fan exhaust triggered by gas threshold'],
        milestoneProject: 'Smart Agriculture & Soil Moisture Irrigation Bot'
      },
      {
        term: 'Term 4',
        title: 'Search & Rescue Rover Mission',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Remote telemetry transmission through walls (ESP-NOW mesh)', 'Two-way remote control via custom mobile browser UI', 'Environmental gas survey mission in mock disaster arena', 'Battery power budget and current draw optimization'],
        milestoneProject: 'Hazardous Environment Disaster Survey Rover'
      }
    ],
    capstoneProject: {
      title: 'Disaster-Response Telemetry Rover with Real-Time Web Dashboard',
      description: 'An all-terrain rover equipped with ESP32 that transmits air quality, temperature, and live distance readings over Wi-Fi to a tablet dashboard operated by parents or teachers.',
      skills: ['Asynchronous C++', 'HTTP/WebSocket Protocol', 'I2C Bus Communication', 'Lithium BMS Safety'],
      wiringSummary: 'ESP32 drives TB6612 motor shield on GPIO 18, 19, 21, 22. BME280 & OLED shared on I2C bus (GPIO 21 SDA, GPIO 22 SCL). MQ-135 on ADC GPIO 34.',
      sampleCode: `#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <Wire.h>
#include <Adafruit_BME280.h>

AsyncWebServer server(80);
Adafruit_BME280 bme;

void setup() {
  Serial.begin(115200);
  WiFi.softAP("Kinetix-Rover-07", "stem2026");
  bme.begin(0x76);
  
  server.on("/telemetry", HTTP_GET, [](AsyncWebServerRequest *request){
    float temp = bme.readTemperature();
    float humidity = bme.readHumidity();
    String json = "{\\"temp\\":" + String(temp, 1) + 
                  ",\\"humidity\\":" + String(humidity, 1) + "}";
    request->send(200, "application/json", json);
  });
  server.begin();
}`,
      codeLanguage: 'Embedded C++ (Arduino ESP32)'
    },
    learningOutcomes: [
      'Write clean, structured Arduino C++ with functions and libraries',
      'Explain I2C and SPI multi-device bus communication',
      'Host real-time web servers on microcontrollers and parse JSON telemetry',
      'Calculate power consumption and design safe rechargeable battery circuits'
    ],
    boardAlignment: [
      { board: 'CBSE Skill', moduleCode: 'Subject 404 (Class 7 IoT)', description: 'Smart devices, networking, and real-world sensors' },
      { board: 'ICSE', moduleCode: 'Robotics & AI Stage 4', description: 'Wireless protocols, data logging, and microcontroller networks' },
      { board: 'Cambridge / IB', moduleCode: 'MYP Design Year 3', description: 'Developing ideas and technical fabrication plans' }
    ]
  },
  {
    id: 'class-8',
    gradeNumber: 8,
    gradeLabel: 'Class 8',
    ageRange: 'Ages 13–14',
    tagline: 'Inverse Kinematics, Robotic Arms & Mecanum Omnidrive',
    theme: 'Multiaxis Kinematics, State Machines & Precision Manipulation',
    kitName: 'Kinetix 4-DOF Robotic Arm & Omni-Rover (K-8)',
    kitDescription: 'Advanced robotics engineering featuring 4-Degrees-of-Freedom articulated robotic arm, PCA9685 16-channel PWM servo controller, and 4-wheel Mecanum omnidirectional chassis.',
    colorAccent: 'indigo',
    hardwareComponents: [
      { name: '4-DOF Laser-Cut Metal/Acrylic Arm & Gripper', type: 'Mechanics', description: 'Base rotation, shoulder, elbow, and parallel-jaw claw.' },
      { name: '4x High-Torque Metal Gear Servos (MG996R)', type: 'Actuators', description: '10 kg-cm stall torque with dual ball bearings.' },
      { name: 'PCA9685 16-Channel 12-Bit I2C PWM Driver', type: 'Driver', description: 'Offloads high-precision servo PWM timing from microcontroller.' },
      { name: '4x Mecanum 60mm Omnidirectional Wheels', type: 'Mechanics', description: 'Allows instantaneous vector movement in all 360-degree headings.' },
      { name: 'Raspberry Pi Pico / Arduino Mega Core', type: 'Compute', description: 'High pin-count microcontroller with dual-core ARM M0+ processor.' }
    ],
    terms: [
      {
        term: 'Term 1',
        title: 'Mecanum Vector Kinematics & Holonomic Drive',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['45-degree angled rollers and vector force decomposition', 'Holonomic drive math: translating without turning', 'Diagonal strafing, rotating while driving, and drift compensation', 'PID wheel velocity balancing via optical rotary encoders'],
        milestoneProject: '360° Holonomic Mecanum Vector Exploration Platform'
      },
      {
        term: 'Term 2',
        title: 'Robotic Arm Forward & Inverse Kinematics',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Trigonometry of 2-link and 3-link kinematic chains', 'Calculating end-effector $(X, Y, Z)$ coordinates from joint angles', 'Inverse kinematics: deriving servo angles from target position', 'Singularities, reachable workspace envelopes, and collision bounds'],
        milestoneProject: 'Pick-and-Place Robotic Arm with Teach-and-Repeat Mode'
      },
      {
        term: 'Term 3',
        title: 'Sensor-Assisted Automated Sorting',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['TCS34725 RGB color sensor calibration', 'Color space conversions (RGB to HSV for invariant sorting)', 'Conveyor belt integration and timing synchronization', 'Error handling and misfire rejection loops'],
        milestoneProject: 'Automated Factory Conveyor & Color Sorting Cell'
      },
      {
        term: 'Term 4',
        title: 'RoboCup Junior & WRO Rescue Simulation',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Mock competition arena rules and scoring strategies', 'Integrating Mecanum base with articulated gripper payload', 'Autonomous search, victim payload pickup, and hazard deposit', 'Stress testing, cycle repeatability, and hardware hardening'],
        milestoneProject: 'Autonomous WRO-Style Search, Grab & Rescue Bot'
      }
    ],
    capstoneProject: {
      title: 'Holonomic Mecanum Rover with 4-DOF Precision Gripper',
      description: 'An omnidirectional platform equipped with a 4-axis robotic arm that navigates warehouse grid mats, strafes sideways to align with colored target cubes, and stacks them automatically.',
      skills: ['Inverse Kinematics Trigonometry', 'Vector Force Decomposition', '12-bit PWM Control', 'Encoder Closed-Loop Tuning'],
      wiringSummary: 'Raspberry Pi Pico connects to PCA9685 via I2C (GP4/GP5). PCA9685 powers 4x MG996R servos from dedicated 6V 5A regulator. 4x DC motors driven by dual L298 drivers.',
      sampleCode: `import math

def calculate_inverse_kinematics(x, y, z, L1=120.0, L2=120.0):
    # Base rotation angle
    base_theta = math.degrees(math.atan2(y, x))
    r = math.sqrt(x**2 + y**2)
    # 2D Planar arm reach
    d = math.sqrt(r**2 + z**2)
    if d > (L1 + L2):
        raise ValueError("Target coordinate out of reach!")
    # Law of Cosines for Elbow and Shoulder
    alpha = math.acos((L1**2 + d**2 - L2**2) / (2 * L1 * d))
    beta = math.atan2(z, r)
    shoulder_theta = math.degrees(beta + alpha)
    gamma = math.acos((L1**2 + L2**2 - d**2) / (2 * L1 * L2))
    elbow_theta = 180.0 - math.degrees(gamma)
    return base_theta, shoulder_theta, elbow_theta`,
      codeLanguage: 'Python 3 (MicroPython / Raspberry Pi Pico)'
    },
    learningOutcomes: [
      'Apply high school trigonometry (Sine/Cosine rules) to mechanical kinematics',
      'Program 12-bit PWM servo controllers over I2C architecture',
      'Explain holonomic motion principles and program Mecanum vector algorithms',
      'Design modular robotic attachments with standardized mounting brackets'
    ],
    boardAlignment: [
      { board: 'CBSE Skill', moduleCode: 'Subject 404 (Class 8 Robotics)', description: 'Kinematics, actuators, and advanced automation' },
      { board: 'ICSE', moduleCode: 'Robotics & AI Stage 5', description: 'Robotic manipulators, degrees of freedom, and precision drive' },
      { board: 'Cambridge / IB', moduleCode: 'MYP Design Year 4', description: 'Creating solutions and evaluating engineered prototypes' }
    ]
  },
  {
    id: 'class-9',
    gradeNumber: 9,
    gradeLabel: 'Class 9',
    ageRange: 'Ages 14–15',
    tagline: 'Edge AI, Computer Vision & Autonomous Mobile Robotics',
    theme: 'Embedded Artificial Intelligence & MicroPython Edge Processing',
    kitName: 'Kinetix Vision-AI Quad Core Rover (K-9)',
    kitDescription: 'Pre-engineering flagship kit with ESP32-CAM / Raspberry Pi Pico Vision module, OpenCV edge detection, neural gesture recognition, and ROS-lite architecture.',
    colorAccent: 'rose',
    hardwareComponents: [
      { name: 'ESP32-CAM 2MP OV2640 + 8MB PSRAM', type: 'Compute & Vision', description: 'Integrated edge vision module capable of onboard face and color tracking.' },
      { name: 'Raspberry Pi Pico W Dual Cortex M0+', type: 'Compute', description: 'MicroPython realtime motion and motor control co-processor.' },
      { name: 'MPU-6050 6-Axis Gyroscope & Accelerometer', type: 'Sensors', description: 'Inertial Measurement Unit (IMU) with digital motion processor.' },
      { name: 'Dual Hall-Effect Magnetic Rotary Encoders', type: 'Sensors', description: '330 pulses-per-revolution encoder for millimeter odometry.' },
      { name: 'Heavy-Duty Aluminum Extrusion Chassis (2020)', type: 'Structural', description: 'Rigid industrial profile chassis with shock absorption suspension.' }
    ],
    terms: [
      {
        term: 'Term 1',
        title: 'MicroPython & Threaded Co-Processing',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['MicroPython architecture, byte-code compilation, and garbage collection', 'Dual-core asynchronous programming using uasyncio', 'UART serial communication between Vision Camera and Motion Pico', 'Kalman filter basics for IMU drift compensation'],
        milestoneProject: 'Self-Balancing 2-Wheel Inverted Pendulum Robot'
      },
      {
        term: 'Term 2',
        title: 'Computer Vision & Edge Color Tracking',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Image matrix representation, pixels, RGB and HSV filtering', 'Contour detection, centroid calculation, and bounding boxes', 'Visual servoing: steering towards tracking target centroid', 'Handling varying shadows, glare, and ambient noise'],
        milestoneProject: 'Vision-Guided Autonomous Ball-Chasing & Interceptor Rover'
      },
      {
        term: 'Term 3',
        title: 'Edge AI: Neural Gesture & Sign Recognition',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Introduction to TinyML and lightweight quantized neural networks', 'Collecting training images of road signs (Stop, Turn Left, Forward)', 'Running onboard inference model on edge camera without internet', 'Action dispatch based on confidence scores (>85%)'],
        milestoneProject: 'Autonomous Traffic Sign & Pedestrian Stop Rover'
      },
      {
        term: 'Term 4',
        title: 'National Robotics Olympiad Capstone Incubator',
        duration: '8 Weeks · 16 Lab Hours',
        topics: ['Full-stack autonomous system integration (Vision + IMU + Odometry)', 'Dead reckoning localization and landmark correction', 'Competition strategy, speed optimization, and fail-safe recovery', 'Peer defense, engineering portfolio creation, and certification'],
        milestoneProject: 'Full-Autonomous Vision-Navigated Arena Champion Rover'
      }
    ],
    capstoneProject: {
      title: 'Edge-AI Autonomous Road-Sign & Pedestrian Rover',
      description: 'A camera-equipped rover that recognizes traffic signs (Stop, Speed Limit, Crosswalk) in real time using onboard machine learning, adjusts its trajectory smoothly, and logs telemetry.',
      skills: ['Edge TinyML Inference', 'Contour Tracking & Centroids', 'Kalman Filter Sensor Fusion', 'Odometry Localization'],
      wiringSummary: 'ESP32-CAM captures 160x120 video frames, runs neural classifier, and sends high-level commands over UART to Raspberry Pi Pico running closed-loop PID motor loops.',
      sampleCode: `import time
from machine import UART, Pin

uart = UART(0, baudrate=115200, tx=Pin(0), rx=Pin(1))

def process_vision_frame():
    while uart.any():
        line = uart.readline().decode('utf-8').strip()
        if line.startswith("DETECT:"):
            _, sign_type, confidence = line.split(",")
            conf_val = float(confidence)
            if conf_val > 0.82:
                if sign_type == "STOP":
                    execute_emergency_stop()
                elif sign_type == "TURN_RIGHT":
                    execute_90_degree_turn(direction="RIGHT")
                elif sign_type == "CLEAR":
                    resume_cruise_speed()`,
      codeLanguage: 'MicroPython & Edge TinyML'
    },
    learningOutcomes: [
      'Implement real-time computer vision filtering and centroid tracking in Python',
      'Deploy quantized TinyML neural models to microcontrollers for gesture/sign classification',
      'Fuse IMU and optical encoder data using filter algorithms for accurate odometry',
      'Present a comprehensive engineering portfolio aligned with international robotics standards'
    ],
    boardAlignment: [
      { board: 'CBSE Skill', moduleCode: 'Subject 417 / 404 (AI & Robotics)', description: 'Artificial Intelligence, Computer Vision, and Ethical Robotics' },
      { board: 'ICSE', moduleCode: 'Computer Applications & Robotics AI', description: 'Advanced object-oriented programming, algorithms, and AI models' },
      { board: 'Cambridge / IB', moduleCode: 'IGCSE Computer Science & IB MYP 5', description: 'Automated and emerging technologies and algorithmic problem solving' }
    ]
  }
];

export const SAMPLE_LESSON_PLANS: LessonPlan[] = [
  {
    id: 'lp-class-4',
    grade: 'Class 4',
    title: 'Gears in Action: Maximizing Torque with Compound Trains',
    duration: '45 Minutes',
    objective: 'Students will construct a 9:1 compound gear reduction system and measure how rotational speed decreases while lifting force increases.',
    materials: ['Kinetix Discovery Spark Kit', 'Spur Gears (12T, 36T)', 'DC Motor 3V', 'Spring dynamometer', '500g weights'],
    hookActivity: 'Show students a small toy motor trying to lift a water bottle and stalling. Ask: "Can we use plastic gears to give this tiny motor superhuman strength?" (5 mins)',
    handsOnTask: 'Students work in pairs to assemble a 2-stage gear train (Motor -> 12T to 36T -> 12T to 36T). Connect to spool and lift the 500g weight successfully. (25 mins)',
    troubleshootingTips: 'Check axle alignment if gears grind. Ensure nylon spacers prevent gears from rubbing against the acrylic frame.',
    plenaryAssessment: 'Peer Demonstration: Each pair explains why the final axle rotates 9 times slower than the motor shaft, verifying the 9:1 gear ratio. (15 mins)'
  },
  {
    id: 'lp-class-6',
    grade: 'Class 6',
    title: 'Sonar Echolocation: Coding Distance Thresholds in MicroPython',
    duration: '45 Minutes',
    objective: 'Students will interface an HC-SR04 ultrasonic sensor with BBC micro:bit and program an automated safety stop at 20 cm.',
    materials: ['Kinetix Micro:Track Explorer', 'BBC micro:bit v2', 'HC-SR04 sensor', 'Jumper wires', 'Measuring tape'],
    hookActivity: 'Discuss how bats fly in pitch darkness without colliding with cave walls. Explain acoustic time-of-flight. (7 mins)',
    handsOnTask: 'Connect Trigger to Pin P14, Echo to Pin P15. Write condition loop: If ping < 20cm, brake motors and display red X on 5x5 LED matrix. (25 mins)',
    troubleshootingTips: 'Ensure 5V power to sensor VCC is stable. Keep obstacle perpendicular to sensor face for clean acoustic reflection.',
    plenaryAssessment: 'Arena obstacle run: Place surprise cardboard box in rover path to verify autonomous braking before impact. (13 mins)'
  },
  {
    id: 'lp-class-8',
    grade: 'Class 8',
    title: 'Kinematic Workspace: Calculating 2-Link Robotic Arm Reach',
    duration: '45 Minutes',
    objective: 'Students will apply trigonometric Law of Cosines to calculate joint angles for a target coordinate $(X=140mm, Y=80mm)$.',
    materials: ['Kinetix 4-DOF Robotic Arm', 'PCA9685 PWM driver', 'Raspberry Pi Pico', 'Protractor grid mat', 'Grid worksheet'],
    hookActivity: 'Demonstrate human arm kinematics: touching a specific point on the table requires conscious elbow and shoulder angle coordination. (8 mins)',
    handsOnTask: 'Code the inverse kinematics function in Python. Input test coordinates and observe servo arm moving accurately to target puck. (24 mins)',
    troubleshootingTips: 'Ensure servo horn is zeroed at 90 degrees before attaching acrylic arm links. Verify PCA9685 external 5V supply is plugged in.',
    plenaryAssessment: 'Target Challenge: Command arm to hover exactly 5mm above a 50mm calibration square without touching the edges. (13 mins)'
  }
];
