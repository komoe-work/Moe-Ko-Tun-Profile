// Structured data for U Moe Ko Tun's Professional Portfolio

export interface CourseProject {
  id: string;
  title: string;
  myanmarTitle: string;
  subject: "Mathematics" | "Physics" | "STEM & Robotics";
  level: string;
  syllabusCode: string;
  description: string;
  myanmarDescription: string;
  keyTopics: string[];
  toolsUsed: string[];
  successMetric: string;
  recommendedBooks: string[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  roleMM: string;
  institution: string;
  institutionMM: string;
  description: string;
  highlights: string[];
}

export interface CertItem {
  id: string;
  title: string;
  titleMM: string;
  issuer: string;
  date: string;
  description: string;
  badgeLevel?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  degreeMM: string;
  institution: string;
  year: string;
  specialNote?: string;
  details: string;
}

export const PERSONAL_INFO = {
  name: "U Moe Ko Tun",
  nameMM: "ဦးမိုးကိုထွန်း",
  fatherName: "U Maw Maw Htun",
  fatherNameMM: "ဦးမော်မော်ထွန်း",
  dob: "27 March 1988",
  dobMM: "၂၇ မတ် ၁၉၈၈",
  nationality: "Burmese / Buddhist",
  nationalityMM: "မြန်မာ (ဗုဒ္ဓဘာသာ)",
  nrc: "12/TAKANA(N)070317",
  nrcMM: "၁၂/သကန(နိုင်)၀၇၀၃၁၇",
  phones: ["09774370769", "09443173459"],
  emails: ["moekotun88@gmail.com"],
  address: "Address (1) 3/5 Pan Ni Ta Street, Shin Saw Pu Block, Sanchaung, Yangon. (2) 23, 5th Floor, Myaung Mya Street, Middle Tune Taw Block, Sanchaung, Yangon.",
  addressMM: "လိပ်စာ (၁) ၃/၅၊ ပဏ္ဍိတလမ်း၊ ရှင်စောပုရပ်ကွက်၊ စမ်းချောင်းမြို့နယ်၊ ရန်ကုန်။ (၂) အမှတ် (၂၃)၊ ၅ လွှာ၊ မြောင်းမြလမ်း၊ ကျွန်းတောအလယ်ရပ်ကွက်၊ စမ်းချောင်းမြို့နယ်၊ ရန်ကုန်။",
  titleMM: "သင်္ချာ နှင့် ရူပဗေဒ အဆင့်မြင့်ပညာရေး အထူးကုဆရာကြီး",
  titleEN: "Mathematics & Physics Education Specialist (GCE A-Level & IGCSE)",
  experienceYears: 16
};

export const EXECUTIVE_SUMMARY = {
  en: "A highly dedicated and certified STEM Educator with more than 16 years of teaching excellence since 2008. Specializing in advanced Mathematics and Physics for international curricula including Cambridge IGCSE, GCE A-Level, IB Diploma, Digital SAT, and Canadian OSSD under academic rules. Possesses official Ministry of Education Private Teacher Registration alongside active MTF membership and official Cambridge marking workshops credentials.",
  mm: "ဦးမိုးကိုထွန်း (Moe Ko Tun) သည် နိုင်ငံတကာအဆင့်မီ သင်္ချာ (Mathematics) နှင့် ရူပဗေဒ (Physics) ဘာသာရပ်များကို ဆယ်စုနှစ်တစ်ခုကျော် (၁၆ နှစ်ကျော်၊ ၂၀၀၈ ခုနှစ်မှစ၍) ပြည်တွင်း၊ ပြည်ပ နိုင်ငံတကာကျောင်းများနှင့် တက္ကသိုလ်များတွင် အောင်မြင်စွာ သင်ကြားပြသပေးနေသော ဝါရင့် ပညာရေးပညာရှင်တစ်ဦး ဖြစ်ပါသည်။ ၎င်းသည် ယူကေနိုင်ငံ ကိန်းဘရစ်ချ် (Cambridge Assessment International Education) မှ တရားဝင်အသိအမှတ်ပြု IGCSE Additional Mathematics Marking အလုပ်ရုံဆွေးနွေးပွဲနှင့် Physics သင်ရိုးညွှန်းတမ်းပြောင်းလဲမှု အဆင့်မြင့်သင်တန်းများကို တက်ရောက်အောင်မြင်ထားသူ ဖြစ်သည့်အပြင်၊ ပညာရေးဝန်ကြီးဌာန၏ တရားဝင်အသိအမှတ်ပြု ကိုယ်ပိုင်ကျောင်းဆရာ မှတ်ပုံတင်ရရှိထားသော အရည်အချင်းပြည့်ဝသည့် ဆရာတစ်ဦး ဖြစ်ပါသည်။"
};

export const EDUCATIONS: EducationItem[] = [
  {
    id: "edu-1",
    degree: "B.Sc. Mathematics",
    degreeMM: "သိပ္ပံဘွဲ့ (သင်္ချာအထူးပြု)",
    institution: "Yangon University of Distance Education",
    year: "2007",
    details: "Acquired deep mathematical foundation in algebra, analysis, geometry, and numerical methods."
  },
  {
    id: "edu-2",
    degree: "Post Graduate Diploma in English",
    degreeMM: "အင်္ဂလိပ်ဘာသာစကား ဒီပလိုမာ (PG-Dip. English)",
    institution: "Yangon University of Foreign Languages (YUFL)",
    year: "2014",
    specialNote: "Na Ba Ta-7761. Officially recommended for direct admission to M.A. (English) by academic registrar in 2019.",
    details: "Reinforced academic writing, instructional delivery in English, phonetics, and advanced communication standard."
  },
  {
    id: "edu-3",
    degree: "Post Graduate Diploma in International Relations",
    degreeMM: "အပြည်ပြည်ဆိုင်ရာ ဆက်ဆံရေးပညာ ဒီပလိုမာ (DIR)",
    institution: "Center for Human Resource Development (CHRD), University of Yangon",
    year: "2015",
    specialNote: "Course No. 11, Roll No. DIR-36. Graduated with a perfect GPA 4.0 / 4.0.",
    details: "Explored international policy, strategic administration, research methodologies, and global organization structures."
  }
];

export const CERTIFICATIONS: CertItem[] = [
  {
    id: "cert-1",
    title: "Cambridge IGCSE Additional Mathematics (0606) Marking Workshop Certificate",
    titleMM: "IGCSE Add-Math (0606) စာမေးပွဲအမှတ်ပေးစည်းမျဉ်းဆိုင်ရာ အဆင့်မြင့်ဆွေးနွေးပွဲ",
    issuer: "Cambridge Assessment International Education",
    date: "November 2021",
    badgeLevel: "official-marking",
    description: "Deep training on official mark allocation schemes, grading criteria, and exam success strategies."
  },
  {
    id: "cert-2",
    title: "Cambridge IGCSE Physics (0625/0972) Extension Course Certification",
    titleMM: "IGCSE ရူပဗေဒ (0625) သင်ရိုးသစ် တိုးချဲ့အဆင့်မြင့်ဆရာဖြစ်သင်တန်း",
    issuer: "Cambridge Assessment International Education",
    date: "February 2022",
    badgeLevel: "syllabus-update",
    description: "In-depth comprehension of scientific practices, practical test assessments, and physics pedagogy updates."
  },
  {
    id: "cert-3",
    title: "Master Teacher of Training (TOT) in Robotics & Coding",
    titleMM: "STEM စက်ရုပ်နည်းပညာနှင့် Coding သင်ကြားမှုဆိုင်ရာ မာစတာဆရာဖြစ်လက်မှှတ်",
    issuer: "Myanmar Robotics and Coding School",
    date: "August 2020",
    badgeLevel: "stem-master",
    description: "60 hours intensive curriculum on scratch programming, C++ for microcontrollers, and engineering integration guides."
  },
  {
    id: "cert-4",
    title: "Official Private High School Teacher Registration Certificate",
    titleMM: "အဆင့်မြင့်ပညာဦးစီးဌာန ကိုယ်ပိုင်ကျောင်းဆရာ မှတ်ပုံတင်လိုင်စင်",
    issuer: "Ministry of Education, Government of the Republic of the Union of Myanmar",
    date: "Registration No. 005960",
    badgeLevel: "government-license",
    description: "Licensed high-school high educator specializing in Mathematics & Physics. Credentialed by the Ministry of Education."
  },
  {
    id: "cert-5",
    title: "Active Member of Myanmar Teachers' Federation",
    titleMM: "မြန်မာနိုင်ငံလုံးဆိုင်ရာ ဆရာ၊ ဆရာမများအဖွဲ့ချုပ်ဝင် ကတ်ပြား",
    issuer: "Myanmar Teachers' Federation (MTF)",
    date: "Yangon HQ",
    badgeLevel: "professional-union",
    description: "Maintains active alignment with national academic networks and professional educators code."
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2023 - Present",
    role: "A-Level & IGCSE Mathematics Tutor",
    roleMM: "A-Level နှင့် IGCSE သင်္ချာဘာသာရပ် လမ်းညွှန်နည်းပြဆရာ",
    institution: "Auston University, Yangon Campus",
    institutionMM: "ဩစတွန်တက္ကသိုလ် (ရန်ကုန်နယ်မြေ)",
    description: "Conducting rigorous math mentorship for students transitioning from High School modules into advanced degree paths.",
    highlights: [
      "Mentored GCE A-Level candidates through complex Pure Mathematics 1-4 sequences.",
      "Consistently boosted students passing margins with custom structural worksheets.",
      "Maintained interactive modern digital board presentations."
    ]
  },
  {
    id: "exp-2",
    period: "2020 - Present",
    role: "Senior Advanced Mathematics Master",
    roleMM: "အဆင့်မြင့်သင်္ချာဘာသာရပ် ဌာနမှူး / နည်းပြဆရာ",
    institution: "Peti Academy",
    institutionMM: "ပေတိ အကယ်ဒမီ",
    description: "Offering premium global mathematics guidance covering multiple prestigious international curricula.",
    highlights: [
      "Specialized in SAT Math Prep, yielding top-tier scores through computerized practice guidelines.",
      "Taught IB Diploma Program Mathematics (Analysis both SL and HL).",
      "Delivered Canadian OSSD Math modules with interactive continuous assessments."
    ]
  },
  {
    id: "exp-3",
    period: "July 2021 - March 2023",
    role: "Physics Educator (Secondary Year 1 - Year 4)",
    roleMM: "အထက်တန်းအဆင့် ရူပဗေဒအထူးပြုဆရာကြီး",
    institution: "Nelson International Education Centre (NIEC), Tachileik",
    institutionMM: "နယ်လ်ဆင် နိုင်ငံတကာပညာရေးကျောင်း (တာချီလိတ်)",
    description: "Spearheaded the physics division, organizing modern lab reports and scientific demonstrations.",
    highlights: [
      "Honored with an exemplary recommendation from Principal Mr. Gyaltsen Lama.",
      "Introduced simulated video experiments for physics conceptualization.",
      "Achieved 100% curriculum coverage and top-quartile test performance results."
    ]
  },
  {
    id: "exp-4",
    period: "2018 - 2020",
    role: "Founder & Head of Academics",
    roleMM: "ကျောင်းတည်ထောင်သူ နှင့် ပညာရေးဦးစီးမှူး",
    institution: "New Endeavour Private & Boarding School, Kyauk Phyu",
    institutionMM: "New Endeavour ကိုယ်ပိုင်အထက်တန်းနှင့် ဘော်ဒါကျောင်း (ကျောက်ဖြူမြို့)",
    description: "Designed, established and administered a local boarding school focused on premium secondary education.",
    highlights: [
      "Administered institutional standard rules, daily scheduling, and teacher development programs.",
      "Delivered high-tier science classes that doubled matriculation benchmarks.",
      "Directly counseled students on university path selections and bursary prospects."
    ]
  }
];

// This is the "Project Gallery" requested by the user, showcasing his specialized course curriculum projects!
export const PROJECTS_GALLERY: CourseProject[] = [
  {
    id: "proj-1",
    title: "Cambridge IGCSE Additional Mathematics Programme (0606)",
    myanmarTitle: "IGCSE အဆင့်မြင့်အပိုဆောင်းသင်္ချာစနစ်တကျသင်ရိုး (0606)",
    subject: "Mathematics",
    level: "High School (A-Grade Focused)",
    syllabusCode: "0606 (Cambridge)",
    description: "An intensive mathematical program preparing high-caliber students for senior college mathematical rigors.",
    myanmarDescription: "အဆင့်မြင့်တက္ကသိုလ် သင်္ချာအဆင့်များကို အောင်မြင်စွာ တက်လှမ်းနိုင်ရန် စုဖွဲ့ထားသော ကိန်းဘရစ်ချ်အသိအမှတ်ပြု Add-Math သင်တန်းဖြစ်သည်။ စာမေးပွဲ အမှတ်ပေး ညွှန်ကြားချက်များနှင့်အညီ စနစ်တကျ ပြင်ဆင်ပေးသည်။",
    keyTopics: ["Quadratic Functions", "Equations & Inequalities", "Circular Measure (Trig)", "Vectors & Matrices", "Differentiation & Integration (Calculus)"],
    toolsUsed: ["Cambridge Past Papers 2018-2025", "Desmos Graphic Canvas", "Concept-building worksheets"],
    successMetric: "Over 90% of dedicated students achieved Grade A or A*",
    recommendedBooks: ["Cambridge IGCSE Additional Mathematics Coursebook by Sue Pemberton"]
  },
  {
    id: "proj-2",
    title: "A-Level Pure Mathematics Masterclass (P1, P2, P3, P4)",
    myanmarTitle: "GCE A-Level အဆင့်မြင့်သန့်စင်သင်္ချာအထူးပြုသင်ခန်းစာစု",
    subject: "Mathematics",
    level: "Pre-University College",
    syllabusCode: "9709 (GCE A-Level)",
    description: "Advanced pre-engineering standard algebra, trigonometry, complex analysis, and series representations.",
    myanmarDescription: "အင်ဂျင်နီယာနှင့် နည်းပညာတက္ကသိုလ်များသို့ တက်လှမ်းမည့် ကျောင်းသားများအတွက် မရှိမဖြစ်လိုအပ်သည့် GCE A-Level Pure Mathematics ပိုင်းကို သဘောတရားအခြေခံမှစ၍ အတွင်းကျကျ သင်ကြားပေးသော ပရိုဂရမ် ဖြစ်သည်။",
    keyTopics: ["Algebraic Proofs", "Coordinate Geometry", "Calculus (Advanced Derivatives & Integration by Parts)", "Vectors in 3D Space", "Logarithmic & Exponential Functions"],
    toolsUsed: ["Visual calculus graphers", "Modular timed test papers", "Weekly peer assessments"],
    successMetric: "High-tier university entrance rate of 88%",
    recommendedBooks: ["Cambridge International AS & A Level Mathematics: Pure Mathematics 1, 2 & 3 Coursebook"]
  },
  {
    id: "proj-3",
    title: "Standard Digital SAT Math Score-Booster Scheme",
    myanmarTitle: "Digital SAT သင်္ချာရမှတ်အမြင့်ဆုံးရရှိရေး အထူးသင်တန်း",
    subject: "Mathematics",
    level: "Global University Entrance Prep",
    syllabusCode: "Digital SAT (College Board USA)",
    description: "Accelerated tips, trick metrics, and concepts designed for the modern computer-based adaptive SAT.",
    myanmarDescription: "အမေရိကန်နှင့် နိုင်ငံတကာတက္ကသိုလ်များသို့ ဝင်ခွင့်အတွက် အလွန်အရေးကြီးသော SAT Math ကဏ္ဍကို စက္ကန့်ပိုင်းအတွင်း မှန်ကန်စွာ တွက်ချက်နိုင်အောင် နည်းဗျူဟာအစုံဖြင့် ပံ့ပိုးသင်ကြားပေးသော သင်တန်းဖြစ်သည်။",
    keyTopics: ["Heart of Algebra", "Advanced Math & Non-Linear Functions", "Problem Solving & Data Analysis", "Geometry & Trigonometry"],
    toolsUsed: ["Bluebook SAT Practice Engine", "Desmos Integrated Graph Calculator Shortcut Strategy", "Speed-drill booklets"],
    successMetric: "Average students' improvement rate of +120 points",
    recommendedBooks: ["The College Board Official SAT Study Guide", "College Hill Prep Materials"]
  },
  {
    id: "proj-4",
    title: "Cambridge IGCSE Physics Conceptual Program (0625)",
    myanmarTitle: "IGCSE ရူပဗေဒ သဘောတရားအခြေပြု အဆင့်မြင့်သင်တန်း (0625)",
    subject: "Physics",
    level: "Middle to High School Exam Prep",
    syllabusCode: "0625 & 0972 (Cambridge)",
    description: "Translating classical formulas into intuitive daily physical interactions with absolute concept clarity.",
    myanmarDescription: "ရူပဗေဒ ဘာသာရပ်ကို အလွတ်ကျက်စနစ်ထက် နေ့စဉ်ဘဝဖြစ်စဉ်များနှင့် နှိုင်းယှဉ်ကာ လက်တွေ့ကျကျသဘောပေါက်စေပြီး စာမေးပွဲကြီးတွင် အမှတ်အပြည့်ရနိုင်အောင် ပုံစံထုတ်ထားသော စနစ်ပရိုဂရမ်ဖြစ်သည်။",
    keyTopics: ["Thermal Physics & Mechanics", "Wave Mechanics (Light & Sound)", "Electricity and Magnetism", "Nuclear & Space Physics"],
    toolsUsed: ["PhET Interactive Physics Lab Simulators", "3D Video Demonstrations", "Interactive Formula Memory Framework"],
    successMetric: "100% pass rates with average Grade A in Tachileik region",
    recommendedBooks: ["Cambridge IGCSE Physics Coursebook by David Sang"]
  },
  {
    id: "proj-5",
    title: "STEM Robotics & Interactive Block Coding Bootcamp",
    myanmarTitle: "လူငယ်များအတွက် STEM စက်ရုပ်နည်းပညာနှင့် ကွန်ပျူတာပရိုဂရမ်မင်း",
    subject: "STEM & Robotics",
    level: "Middle & Junior High Schools",
    syllabusCode: "Robotics Certified TOT Program",
    description: "Nurturing logical thinking, procedural loops, and mechanical layouts for tomorrow's technology pioneers.",
    myanmarDescription: "စက်ရုပ်တည်ဆောက်ပုံနှင့် ကွန်ပျူတာကုဒ်ရေးသားခြင်းကို STEM ပညာရေးစနစ်နှင့်အညီ လက်တွေ့ကျကျ တည်ဆောက်သင်ကြားပေးသည့် နိုင်ငံတကာစံနှုန်းမီ သင်တန်းဖြစ်သည်။",
    keyTopics: ["Introductory Block Coding (Scratch)", "C++ Programming Basic Loops", "Arduino Microcontroller Layouts", "Sensors and Movement Logic"],
    toolsUsed: ["Arduino Starter Kits", "mBlock 5 Canvas", "Logical thinking algorithmic flowcharts"],
    successMetric: "Students successfully built prototype automatic cars & obstacle sensors",
    recommendedBooks: ["Super Easy Scratch and Arduino Robotics Kit Handbook"]
  }
];

export const EDUCATOR_PHILOSOPHY = {
  quoteMM: "ကျွန်ုပ်သည် သင်္ချာနှင့် ရူပဗေဒကို အလွတ်ကျက်မှတ်သော စနစ်ထက် ဘာသာရပ်တစ်ခုချင်းစီ၏ သဘောတရား (Concepts) များကို နားလည်ပြီး လက်တွေ့အသုံးချနိုင်သည်အထိ သိမြင်လာအောင် ဆွဲဆောင်သင်ကြားပေးသည့် စနစ်ကို ကျင့်သုံးပါသည်။ ၁၆ နှစ်တာသင်ကြားမှုအတွင်း ရရှိခဲ့သော ပြည်တွင်း၊ ပြည်ပမှ အတွေ့အကြုံကောင်းများနှင့် ကိန်းဘရစ်ချ်အသိအမှတ်ပြု လေ့ကျင့်မှုများကို အခြေခံကာ ကျောင်းသားတိုင်းအား ၎င်းတို့၏ စွမ်းဆောင်ရည် အမြင့်ဆုံးအဆင့်သို့ ရောက်ရှိစေရန် အပြည့်အဝ ပံ့ပိုးကူညီပေးလျက် ရှိပါသည်။",
  quoteEN: "I hold a firm conviction that Mathematics and Physics should not be studied by mere memorization but by deep intuitive comprehension of their architectural principles. Drawing upon my 16+ years of international teaching exposure, and specialized Cambridge training, my mission is to elevate every student's cognitive capabilities to achieve absolute academic distinction.",
  pillarsMM: [
    {
      title: "အပေါ်ယံအလွတ်ကျက်ခြင်းမှ သဘောတရားနားလည်ခြင်းသို့",
      description: "စာမေးပွဲကြီးကို ကြောက်စရာမလိုဘဲ အမှတ်အပြည့်ရရန်အတွက် ပုစ္ဆာတစ်ခု၏ နက်ရှိုင်းသော အတွေးအခေါ်နှင့် သဘောတရားတည်ဆောက်ပုံကို အရင်သိမြင်စေရမည်။"
    },
    {
      title: "နည်းပညာဖော်ထုတ်သင်ကြားခြင်း",
      description: "စခရင်မျှဝေမှု၊ Desmos မျဉ်းကွေးပုံဖော်ကိရိယာများနှင့် PhET ရူပဗေဒစမ်းသပ်ခန်း အပြန်အလှန်တုံ့ပြန်မှုများဖြင့် သင်ကြားမှု၏ အဆင့်အတန်းကို တိုးမြှင့်ထားသည်။"
    },
    {
      title: "တစ်ဦးချင်းစီအလိုက် စနစ်တကျစောင့်ကြည့်မှု",
      description: "ကျောင်းသားတစ်ယောက်စီ၏ အားသာချက်၊ အားနည်းချက်ကို ဆန်းစစ်ကာ ၎င်း၏နားလည်နိုင်စွမ်းပေါ် မူတည်ပြီး ဘာသာရပ်ကို စိတ်ဝင်တစားဖြစ်လာအောင် ဆွဲဆောင်သည်။"
    }
  ]
};

// Simple standard math/physics formulas dataset for the interactive widgets
export interface FormulaCard {
  id: string;
  name: string;
  expression: string;
  meaning: string;
  meaningMM: string;
  category: "Math" | "Physics";
  interactiveVariable: string; // The variable that users can slider-manipulate
  variableUnit: string;
  baseFormulaEx: string; // JavaScript evaluation template
}

export const FORMULA_CATALOGUE: FormulaCard[] = [
  {
    id: "form-1",
    name: "Quadratic Formula (Roots of Polynomial)",
    expression: "x = (-b ± √(b² - 4ac)) / 2a",
    meaning: "Determines the intersections where a parabola strikes the x-axis for standard form ax² + bx + c = 0.",
    meaningMM: "ax² + bx + c = 0 ဒုတိယထပ်ကိန်းညီမျှခြင်းများ၏ အဖြေရှာဖော်မြူလာဖြစ်သည်။",
    category: "Math",
    interactiveVariable: "a",
    variableUnit: "coefficient",
    baseFormulaEx: "roots"
  },
  {
    id: "form-2",
    name: "Newton's Second Law of Motion",
    expression: "F = m · a",
    meaning: "The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass.",
    meaningMM: "သက်ရောက်အား (F) သည် ဒြပ်ထု (m) နှင့် အရှိန်မြှင့်နှုန်း (a) တို့မြှောက်လဒ်နှင့် တိုက်ရိုက်အချိုးကျကြောင်း ဖော်ထုတ်သည့် နယူတန်၏ဒုတိယနိယာမဖြစ်သည်။",
    category: "Physics",
    interactiveVariable: "m",
    variableUnit: "kg",
    baseFormulaEx: "force"
  },
  {
    id: "form-3",
    name: "Euler's Identity (Most Beautiful Formula)",
    expression: "e^(i·π) + 1 = 0",
    meaning: "Brilliantly connects five of the most fundamental mathematical constants in one single equation.",
    meaningMM: "သင်္ချာလောက၏ အခြေခံအကျဆုံးနှင့် အလှပဆုံးသော ကိန်းသေ ၅ လုံးကို ရိုးရှင်းသော ဆက်သွယ်ချက်တစ်ခုတည်းဖြင့် ပေါင်းစည်းထားသော ညီမျှခြင်း ဖြစ်သည်။",
    category: "Math",
    interactiveVariable: "rad",
    variableUnit: "radians",
    baseFormulaEx: "euler"
  },
  {
    id: "form-4",
    name: "Einstein's Mass-Energy Equivalence",
    expression: "E = m · c²",
    meaning: "Asserts that mass and energy are the same physical entity and can be changed into each other.",
    meaningMM: "ဒြပ်ထု (m) နှင့် စွမ်းအင် (E) တို့သည် အပြန်အလှန်ပြောင်းလဲနိုင်သော ရုပ်ပိုင်းဆိုင်ရာတန်ဖိုးများဖြစ်ကြောင်း အလင်းအရှိန် (c) ကိုသုံး၍ ဖော်ထုတ်ခဲ့သော အိုင်းစတိုင်း၏ နာမည်ကျော်ညီမျှခြင်းဖြစ်သည်။",
    category: "Physics",
    interactiveVariable: "m_energy",
    variableUnit: "grams",
    baseFormulaEx: "massenergy"
  }
];
