export const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Education", "Order", "Contact"];

// ─────────────────────────────────────────────────────────────────────────────
//  PROFILE  — update these with your real details
// ─────────────────────────────────────────────────────────────────────────────
export const PROFILE = {
  name:       "Nadeera Shasika",
  photo:      "/mypic.png",                              // ← "/photo.jpg" or image URL
  roles:      ["3rd Year Undergraduate", "Full Stack Developer", "ML Enthusiast", "Graphic Designer"],
  university: "University of Colombo",
  year:       "3rd Year",
  degree:     "B.Sc. Computer Science",
  cvUrl:      "/H.G.N.S.Kumara.pdf",              // ← place CV in frontend/public/
  github:     "https://github.com/nadeera365", // ← your GitHub profile URL
  linkedin:   "https://linkedin.com/in/nadeera-shasika",
  behance:    "https://behance.net/yourname", // ← your Behance profile URL
  email:      "hello@nadeera.dev",
};

// ─────────────────────────────────────────────────────────────────────────────
//  SKILLS  — add/remove/rename categories and tools freely
//  Find devicon URLs at: https://devicon.dev
// ─────────────────────────────────────────────────────────────────────────────
export const SKILLS = {
  "Frontend Development": [
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "#e34f26"
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      color: "#1572b6"
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#f7df1e"
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61dafb"
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      color: "#38bdf8"
    }
  ],

  "Backend Development": [
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "#3c873a"
    },
    {
      name: "PHP",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      color: "#777bb4"
    },
    {
      name: "REST API",
      icon: "https://cdn-icons-png.flaticon.com/512/1006/1006363.png",
      color: "#3c873a"
    },
    {
      name: "Postman",
      icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
      color: "#ff6c37"
    }
  ],

  "Databases": [
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "#00758f"
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "#47a248"
    },
    {
      name: "SQL Server",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
      color: "#cc2927"
    }
  ],

  "Programming Languages": [
    {
      name: "C#",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      color: "#68217a"
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "#3776ab"
    }
  ],

  "Data Science & ML": [
    {
      name: "Pandas",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
      color: "#150458"
    },
    {
      name: "Scikit-learn",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
      color: "#f89939"
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
//  PROJECTS  — isBehance: true  → Behance badge + link
//            — isBehance: false → GitHub badge + link
// ─────────────────────────────────────────────────────────────────────────────
export const PROJECT_CATEGORIES = ["All", "Full Stack", "ML", "Design"];

export const PROJECTS = [
  {
    title:    "Portfolio",
    category: "Full Stack",
    year:     "2026",
    desc:     "Built a responsive personal portfolio website using modern web technologies to present projects, technical skills, and achievements with a clean and user-friendly interface.",
    tech:     ["React", "MongoDB", "NodeJS","RESTAPI"],
    color:    "#acb276",
    img:      "/project5.png",
    link:     "https://github.com/nadeera365/", 
    isBehance: false,
  },  
  {
    title:    "Fertilizer Predictor",
    category: "ML",
    year:     "2026",
    desc:     "A machine learning web application that recommends the most suitable fertilizer based on soil conditions, crop type, and environmental factors.",
    tech:     ["Python", "Pandas", "Scikit-learn","Flask","joblib"],
    color:    "#7a9e7d",
    img:      "/project3.png",
    link:     "https://github.com/nadeera365/Fertilizer-Recommendation-System.git", 
    isBehance: false,
  },  
  {
    title:    "Inventa ",
    category: "Full Stack",
    year:     "2025",
    desc:     "A desktop app to help small businesses manage products, sellers, and sales in one place.Features a dashboard, full CRUD operations, and a sales panel linking seller activity to product quantities.",
    tech:     ["C#", "SQL Server",],
    color:    "#92c1d8",
    img:      "/project4.png",
    link:     "https://github.com/nadeera365/Inventa.git", 
    isBehance: false,
  },
  {
    title:    "Movie Discovery App",
    category: "Full Stack",
    year:     "2025",
    desc:     "A sleek and responsive Movie Discovery App connects to The Movie Database (TMDB) API to help users explore trending movies and search for their favorites in real time.",
    tech:     ["React", "Tailwind CSS", "TMDB API"],
    color:    "#7a859e",
    img:      "/project2.png",
    link:     "https://github.com/nadeera365/Movie-Discovery-App.git", 
    isBehance: false,
  },
  {
    title:    "Dream Homes",
    category: "Full Stack",
    year:     "2024",
    desc:     "Developed a secure Dream Home Real Estate Platform with admin controls, property management, user authentication, responsive design, and full CRUD functionality",
    tech:     ["HTML", "CSS", "PHP", "MySQL"],
    color:    "#c8a96e",
    img:      "/project1.png",
    link:     "https://github.com/nadeera365/Dream-Home-Real-Estate-Platform-.git", 
  },  
  // ── Graphic Design — link to your Behance project pages ───────────────────
  {
    title:    "Event Poster Series",
    category: "Design",
    year:     "2024",
    desc:     "Bold event posters for university tech events — strong typography, gradient lighting, and clear visual hierarchy.",
    tech:     ["Photoshop", "Illustrator", "Typography"],
    color:    "#e85d8a",
    img:      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    link:     "https://behance.net/yourname/event-poster-series", // ← Behance project URL
    isBehance: true,
  }, 
];

// ─────────────────────────────────────────────────────────────────────────────
//  EXPERIENCE  — update with your real work history
// ─────────────────────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    role:    "Freelance Graphic Designer",
    company: "Self-Employed",
    period:  "2026 — Present",
    desc:    "Worked independently with clients on branding, social media designs, and digital artwork. Delivered creative visual solutions for multiple freelance projects.",
  },
  
  
];

// ─────────────────────────────────────────────────────────────────────────────
//  EDUCATION  — type must be "Degree", "Certification", or "Course"
// ─────────────────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    degree: "B.Sc. Computer Science and Technology",
    school: "Sabaragamuwa University of Sri Lanka",
    period: "2023 — Present",
    detail: "3rd Year undergraduate specialising in Software Engineering and Distributed Systems.",
    type:   "Degree",
  },
  {
    degree: "G.C.E. Advanced Level (A/L)",
    school: "St Mary's College",
    period: "2019 — 2021",
    detail: "Achieved 3 C passes in Physics, Chemistry, and Combined Mathematics.",
    type: "School", 
  },
  {
    degree: "G.C.E. Ordinary Level (O/L)",
    school: "St Mary's College",
    period: "2018",
    detail: "Achieved 6A passes including Mathematics and Science.",
    type: "School", 
  },
  {
    degree: "Postman API Fundamentals Student Expert",
    school: "Postman",
    period: "2025",
    detail: "Certified Postman API Fundamentals Student Expert with hands-on experience in API testing, request handling, and building efficient API workflows. ",
    type:   "Certification",
    credentialUrl: "https://badges.parchment.com/public/assertions/8LydG0xuTkW2AV7qS7rkFw?identity__email=nadeerakumara140@gmail.com",
  },
  {
    degree: "Web Design for Beginners",
    school: "University of Moratuwa",
    period: "2025",
    detail: "Completed a Web Design for Beginners course at University of Moratuwa, covering the fundamentals of HTML, CSS, and responsive web design. Credential ID JTINAF3IGM8D",
    type:   "Certification",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/JTINAF3IGM8D",
  },
  {
    degree: "Programming with JavaScript",
    school: "Meta",
    period: "2025",
    detail: "Completed Programming with JavaScript by Meta, covering core JavaScript concepts, functions, objects, and DOM manipulation.",
    type:   "Certification",
    credentialUrl: "https://badges.parchment.com/public/assertions/8LydG0xuTkW2AV7qS7rkFw?identity__email=nadeerakumara140@gmail.com",
  },
  {
    degree: "Programming in Python - 1.Python for Beginners",
    school: "University of Moratuwa",
    period: "2024",
    detail: "Completed Python for Beginners at University of Moratuwa, covering core Python concepts including data types, control structures, and basic problem solving. Credential ID qRp18ScaG6",
    type:   "Certification",
    credentialUrl: "https://open.uom.lk/lms/mod/customcert/verify_certificate.php",
  },
  
];

// ─────────────────────────────────────────────────────────────────────────────
//  ORDER SERVICES  — update prices and durations to match your real rates
// ─────────────────────────────────────────────────────────────────────────────
export const ORDER_SERVICES = [
  
  {
    id:           "poster",
    icon:         "🖼️",
    title:        "Poster & Print Design",
    desc:         "Bold, high-impact posters for events, promotions, or campaigns — print ready.",
    price:        "From Rs.1000.00",
    color:        "#e85d8a",
    deliverables: ["2 design concepts", "High-res print file (PDF/PNG)", "Social media size", "2 revisions"],
    duration:     "1–3 days",
  },
  {
    id:           "social",
    icon:         "📱",
    title:        "Social Media Graphics",
    desc:         "Consistent, on-brand graphics for Instagram, Facebook, LinkedIn, or any platform.",
    price:        "From Rs.800.00",
    color:        "#f4a261",
    deliverables: ["10 post designs", "Brand color kit", "Editable Canva templates", "Story sizes included"],
    duration:     "1-2 days",
  },
  {
    id:           "brand",
    icon:         "✦",
    title:        "Brand Identity",
    desc:         "Logo, color palette, typography, and brand guidelines for your business or startup.",
    price:        "From Rs.1500.00",
    color:        "#a78bfa",
    deliverables: ["Logo (3 concepts)", "Color & font system", "Brand guideline PDF", "All source files"],
    duration:     "1–2 weeks",
  },
];
