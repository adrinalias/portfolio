import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'brake-dyno',
    title: 'Brake Dyno - Custom DAQ System',
    shortDescription: 'Development of custom data acquisition system with hardware, firmware, and GUI for Formula SAE brake testing.',
    coverImage: '/placeholder.svg',
    tags: ['electronics', 'automation', 'cad', 'prototyping'],
    date: '2025-05-01',
    featured: true,
    longDescription: 'Developed a custom DAQ system for the Formula SAE team to measure the coefficient of friction for brake components. The rig uses a motor to spin a brake assembly while measuring torque, speed, and temperature to enable data-driven design decisions for improved lap times.',
    category: 'Sensors & Data Acquisition',
    links: {
      github: 'https://github.com',
    },
    media: [
      {
        type: 'text',
        content: 'As part of a 6-person Formula SAE team, I developed the complete data acquisition system from scratch. The goal was to measure brake performance characteristics and validate manufacturer claims about coefficient of friction at various temperatures.',
      },
      {
        type: 'text',
        content: '**Hardware & Electronics Development:** The system is built around an SAME51 microcontroller. I designed custom signal conditioning circuits including voltage dividers and RC filters to process analog sensor signals. The hardware interfaces with an IR sensor for rotational speed, load cells for torque measurement, and thermocouples for temperature monitoring.',
      },
      {
        type: 'code',
        language: 'cpp',
        code: `// C++ Firmware for SAME51 MCU
// Real-time data processing at 20 Hz
void loop() {
  // Read sensor inputs
  float torque = readLoadCell();
  float speed = readIRSensor();
  float temp = readThermocouple();
  
  // Calculate coefficient of friction
  float mu = calculateCoF(torque, speed, temp);
  
  // Transmit via Serial for GUI
  sendData(torque, speed, temp, mu);
}`,
        caption: 'Simplified C++ firmware for sensor processing and CAN communication',
      },
      {
        type: 'text',
        content: '**Software Development:** Created a Python GUI for real-time data visualization and logging. The interface displays live graphs of thermocouple temperature, pad temperature average, torque, and calculated coefficient of friction. All data is logged for post-processing analysis.',
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        alt: 'Brake dyno test rig',
        caption: 'Complete test rig showing motor controller, brake caliper, load cell, and rotor assembly',
      },
      {
        type: 'text',
        content: '**Results & Impact:** The system achieves 20 Hz real-time processing and logging, successfully producing coefficient of friction vs. temperature graphs that validated manufacturer claims. By focusing on core requirements rather than over-engineering, we reduced the system cost by 94% (from $8,200 for a commercial NI DAQ to just $500). This project was awarded 2nd Place at UTA Innovation Day 2025.',
      },
    ],
  },
  {
    slug: 'iot-smart-blinds',
    title: 'IoT Smart Blinds',
    shortDescription: 'Autonomous electromechanical device to automate window blinds based on alarm times and sunset, improving sleep quality.',
    coverImage: '/placeholder.svg',
    tags: ['electronics', 'automation', '3d-printing', 'prototyping'],
    date: '2024-08-01',
    featured: true,
    longDescription: 'Personal project creating an IoT-enabled automated blind controller that syncs with wake-up alarms and sunset times to optimize natural light for better sleep quality. The system achieved 100% reliability over 30 days of continuous testing.',
    category: 'IoT & Home Automation',
    links: {
      github: 'https://github.com',
    },
    media: [
      {
        type: 'text',
        content: 'Goal: Improve sleep quality by automatically opening blinds at wake-up time and closing them at dusk. This personal project tackles a real problem I experienced with light disrupting my sleep schedule.',
      },
      {
        type: 'text',
        content: '**Electronics & Hardware:** The system uses an ESP32 microcontroller paired with an off-the-shelf stepper motor driver. I designed and 3D-printed a custom enclosure to mount the stepper motor to the blind mechanism, utilizing rapid prototyping to iterate through multiple design revisions.',
      },
      {
        type: 'code',
        language: 'cpp',
        code: `// C++ (Arduino) Firmware
void setup() {
  // Connect to WiFi
  WiFi.begin(ssid, password);
  
  // Sync time with NTP server
  configTime(gmtOffset, daylightOffset, ntpServer);
  
  // Fetch sunset time from Weather API
  sunsetTime = fetchSunsetTime();
}

void loop() {
  // Check SmartThings for morning alarm trigger
  if (alarmTriggered()) {
    openBlinds();
  }
  
  // Close blinds at sunset
  if (currentTime >= sunsetTime) {
    closeBlinds();
  }
}`,
        caption: 'Arduino firmware handling WiFi connectivity and automation logic',
      },
      {
        type: 'text',
        content: '**Connectivity & Integration:** The firmware connects via Wi-Fi to fetch real-time sunset times from a Weather API and syncs time with an NTP server. Integration with Samsung SmartThings enables the system to detect my morning alarms. The control scheme follows: Online Database → IFTTT → SmartThings → ESP32.',
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        alt: 'Smart blinds controller assembly',
        caption: '3D-printed enclosure housing ESP32 and stepper motor driver',
      },
      {
        type: 'text',
        content: '**Results:** Completed 30-day continuous testing with 100% reliability. Achieved 85% lower hardware cost than market alternatives ($70 → $10). The system operates fully autonomously based on user alarm settings and local sunset times. Future improvements include upgrading to an H-bridge motor driver and car power window motor to handle larger, heavier blinds.',
      },
    ],
  },
  {
    slug: 'air-heaters',
    title: 'High-Temperature Air Heaters',
    shortDescription: 'Custom SS 304 enclosures and control systems for 8.4 kW air heater module simulating jet engine turbine conditions.',
    coverImage: '/placeholder.svg',
    tags: ['mechanical', 'cad', 'fabrication'],
    date: '2024-10-01',
    longDescription: 'Designed and manufactured stainless steel enclosures for four air heater modules as part of a high-temperature test rig at TESLAB. The system achieves temperatures up to 1500°F with 85 SCFM air flow at 60 psi.',
    category: 'Thermal Systems',
    media: [
      {
        type: 'text',
        content: 'Part of a research project at TESLAB (Turbomachinery & Energy Systems Lab) at UT Arlington to create a high-temperature test rig simulating jet engine turbine state conditions. The system requirements were demanding: temperatures up to 1500°F, net air flow rate of 85 SCFM, and pressure up to 60 psi. No commercial off-the-shelf solution existed for these specifications.',
      },
      {
        type: 'text',
        content: '**Design & Engineering:** Using SolidWorks, I designed custom SS 304 (stainless steel) enclosures applying DFMA (Design for Manufacturing and Assembly) principles. The design prioritized ease of fabrication and assembly while meeting the extreme thermal and pressure requirements. I created detailed technical drawings and a digital twin for validation before manufacturing.',
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        alt: 'SolidWorks CAD model of heater enclosure',
        caption: 'Sheet metal design with welded joints and mounting provisions',
      },
      {
        type: 'text',
        content: '**Manufacturing & Assembly:** Collaborated closely with the university machine shop for sheet metal fabrication, bending, and welding operations. I personally handled all electrical wiring, assembled the four heater modules, and integrated them with an off-the-shelf PID controller for precise temperature management.',
      },
      {
        type: 'text',
        content: '**Results & Cost Optimization:** Successfully implemented an 8.4 kW air heater system distributed across 4 heater modules. The system achieved target temperatures and flow rates required for turbine testing. By outsourcing sheet metal fabrication to the university shop rather than expensive external vendors, I reduced manufacturing costs by 30% without compromising quality or performance.',
      },
    ],
  },
  {
    slug: 'turbine-blade-modeling',
    title: 'Turbine Blade Generation & Modelling',
    shortDescription: 'Parametric blade design tool for multistage helium turbine using MATLAB and SolidWorks with FEA validation.',
    coverImage: '/placeholder.svg',
    tags: ['cad', 'simulation', 'research'],
    date: '2024-07-01',
    longDescription: 'Developed MATLAB code to transform T6 turbine airfoil cross-sections into curved airfoils for rotors and stators, then automated SolidWorks import for a complete multistage turbine assembly.',
    category: 'Turbomachinery',
    media: [
      {
        type: 'text',
        content: 'As a Research Assistant at TESLAB, I worked on blade designs for a multistage Helium Turbine. The challenge was to transform standard T6 turbine airfoil cross-sections into properly curved airfoils suitable for both rotors and stators in the turbine stages.',
      },
      {
        type: 'code',
        language: 'matlab',
        code: `% MATLAB - Blade Profile Bending Algorithm
function curved_profile = bendAirfoil(t6_points, entry_angle, exit_angle, radius)
    % Calculate curvature parameters
    theta_total = exit_angle - entry_angle;
    num_points = size(t6_points, 1);
    
    % Apply bending transformation
    for i = 1:num_points
        theta = entry_angle + (i/num_points) * theta_total;
        x = t6_points(i,1);
        y = t6_points(i,2);
        
        % Polar transformation
        r = radius + y;
        curved_profile(i,:) = [r*cos(theta), r*sin(theta)];
    end
end`,
        caption: 'MATLAB code for bending T6 airfoil profiles using entry/exit angles',
      },
      {
        type: 'text',
        content: '**Calculation & Transformation:** Used entry/exit angles and curvature radii to mathematically bend T6 profiles in MATLAB. The algorithm handles the geometric transformation while maintaining airfoil characteristics critical for aerodynamic performance.',
      },
      {
        type: 'text',
        content: '**CAD Integration:** Exported the calculated profile points and imported them into SolidWorks to create 3D models of rotors and stators. Developed a custom macro to automate the point import workflow, dramatically speeding up the design iteration process.',
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        alt: 'Turbine assembly in SolidWorks',
        caption: 'Complete multistage turbine and compressor assembly',
      },
      {
        type: 'text',
        content: '**Analysis & Validation:** Conducted preliminary Finite Element Analysis (FEA) in Ansys to check for stress concentrations and ensure structural integrity under operating conditions. This analysis identified potential failure points early in the design phase.',
      },
      {
        type: 'text',
        content: '**Outcomes:** Developed easily modifiable MATLAB code that can bend any turbine blade profile with different geometric parameters. Created a complete assembly of the turbine and compressor in SolidWorks for research proposal submission. The parametric approach enables rapid design exploration for different operating conditions.',
      },
    ],
  },
  {
    slug: 'trebuchet-design',
    title: 'Trebuchet Design Project',
    shortDescription: 'Precision trebuchet designed in SolidWorks and manufactured using laser cutting and 3D printing to launch a penny exactly 6 feet.',
    coverImage: '/placeholder.svg',
    tags: ['cad', 'prototyping', '3d-printing', 'fabrication'],
    date: '2022-05-01',
    longDescription: 'Academic project designing and building a trebuchet using computer-controlled manufacturing. Achieved the target of launching a penny exactly 6 feet using only interference fits for assembly.',
    category: 'Mechanical Design',
    media: [
      {
        type: 'text',
        content: 'Course project: Design and build a trebuchet using computer-controlled manufacturing techniques. The objective was precise: launch a penny (projectile) using quarters (counterweight) exactly 6 feet.',
      },
      {
        type: 'text',
        content: '**Design & CAD:** Designed the complete trebuchet in SolidWorks for manufacture using laser-cut wood components and 3D printed/COTS (Commercial Off-The-Shelf) parts. Applied GD&T (Geometric Dimensioning and Tolerancing) principles to ensure proper fit and function.',
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        alt: 'Trebuchet CAD model',
        caption: 'SolidWorks assembly showing laser-cut frame and 3D printed components',
      },
      {
        type: 'text',
        content: '**Manufacturing & Assembly:** All structural components were laser cut from wood based on precise CAD drawings. The unique constraint: assembly using only interference fits—no fasteners allowed. This required extensive tolerancing studies to determine the exact interference values needed for secure joints without adhesives or mechanical fasteners.',
      },
      {
        type: 'text',
        content: '**Testing & Validation:** Built an initial prototype to test the design and validate simulation data. Used test results to correct and refine the final design, ensuring the penny would land at exactly 6 feet.',
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        alt: 'Technical drawing',
        caption: 'Engineering drawing of counterweight holder with GD&T callouts',
      },
      {
        type: 'text',
        content: '**Results:** The final trebuchet successfully launched the penny to the target distance without breaking any design requirements. The project demonstrated effective use of DFMA principles, simulation validation, and precision manufacturing techniques.',
      },
    ],
  },
  {
    slug: 'mobius-racing',
    title: 'Mobius Racing - F1 in Schools',
    shortDescription: 'Team lead for F1 in Schools competition—designed, manufactured, and raced miniature CO2-powered racecars to national finals.',
    coverImage: '/placeholder.svg',
    tags: ['cad', 'prototyping', '3d-printing', 'simulation'],
    date: '2021-01-01',
    longDescription: 'Led a high school team in the F1 in Schools competition, serving as team lead and handling vehicle manufacturing, assembly, and wheel design. The team progressed to National Finals and was selected for World Finals.',
    category: 'Racing & Competition',
    media: [
      {
        type: 'text',
        content: 'F1 in Schools is an international STEM competition where teams design, manufacture, and race miniature racecars powered by CO2 canisters. Our team, Mobius Racing, represented our high school at the National Finals.',
      },
      {
        type: 'text',
        content: '**Role & Responsibilities:** Served as Team Lead with primary focus on vehicle manufacturing, assembly, and wheel design. Coordinated team efforts across CAD modeling, aerodynamics, manufacturing, and business planning.',
      },
      {
        type: 'text',
        content: '**Design & Engineering:** Used Fusion360 for wheel configuration design and elementary FEA (Finite Element Analysis) to validate structural integrity. Applied first principles engineering to optimize the car for maximum speed while staying within competition regulations.',
      },
      {
        type: 'image',
        url: '/placeholder.svg',
        alt: 'F1 in Schools racecar',
        caption: 'Final CO2-powered racecar with optimized aerodynamics',
      },
      {
        type: 'text',
        content: '**Manufacturing Optimization:** Conducted Design of Experiments (DOE) to control 3D printing variables and maximize layer adhesion and strength. Designed custom fixtures to ensure precise alignment of components during assembly. Verified dimensional accuracy to achieve correct interference levels for bearing installation.',
      },
      {
        type: 'text',
        content: '**Testing & Validation:** Performed iterative testing to validate CFD (Computational Fluid Dynamics) predictions and structural analysis. Fine-tuned the design based on test results to minimize drag and maximize straight-line speed.',
      },
      {
        type: 'text',
        content: '**Competition Results:** Achieved fastest car time in the competition. Selected to represent the nation at World Finals. Received Judge\'s Pick award for Best Engineered Car, recognizing the technical excellence and engineering rigor behind the design.',
      },
    ],
  },
];

// Helper functions for filtering and searching
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(p => p.featured);
};

export const filterProjectsByTags = (selectedTags: string[]): Project[] => {
  if (selectedTags.length === 0) return projects;
  
  // Strict match: project must have ALL selected tags
  return projects.filter(project => 
    selectedTags.every(tag => project.tags.includes(tag))
  );
};

export const getAllProjectTags = (): string[] => {
  const tagSet = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
};

// Sort projects by date (newest first)
export const sortProjectsByDate = (projectList: Project[]): Project[] => {
  return [...projectList].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
