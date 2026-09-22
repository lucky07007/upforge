export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  correctAnswer?: number;
  answer?: number | string;
  correctOption?: number;
  explanation?: string;
}

export interface CommentItem {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: string;
  timeAgo: string;
  text: string;
}

export interface QuizItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  category: string;
  duration: string;
  time: string;
  image: string;
  baseParticipants: number;
  publishedAt?: string;
  description?: string;
  summary?: string;
  subtitle?: string;
  metrics: {
    scenariosCount: string;
    avgCompletionTime: string;
    passingStandard: string;
    credentialTier: string;
  };
  questions: Question[];
}

export const OPERATOR_DISCUSSIONS: CommentItem[] = [
  {
    id: "op_1",
    name: "Arjun Nambiar",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces",
    role: "Founder, Fintech Sandbox",
    location: "Bengaluru, IN",
    timeAgo: "18m ago",
    text: "The runway math is brutally realistic. Most early founders underestimate net burn."
  },
  {
    id: "op_2",
    name: "Sarah Chen (陈思)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=faces",
    role: "Growth Lead",
    location: "Singapore",
    timeAgo: "42m ago",
    text: "Scored 9/10. Scenario 6 on retention vs acquisition should be mandatory reading."
  },
  {
    id: "op_3",
    name: "David K. Miller",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces",
    role: "Angel Investor",
    location: "San Francisco, US",
    timeAgo: "1h ago",
    text: "Clean, direct, zero academic fluff. This is how practical operator knowledge looks."
  },
  {
    id: "op_4",
    name: "Priyanka Deshmukh",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces",
    role: "Product Strategist",
    location: "Pune, IN",
    timeAgo: "2h ago",
    text: "Certificate design looks exceptionally sharp on LinkedIn. Downloaded seamlessly."
  },
  {
    id: "op_5",
    name: "Wei Zhang (张伟)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces",
    role: "E-Commerce Operator",
    location: "Shenzhen, CN",
    timeAgo: "3h ago",
    text: "Validating customer demand prior to capital deployment was emphasized perfectly."
  },
  {
    id: "op_6",
    name: "Oliver Wright",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=faces",
    role: "Venture Scout",
    location: "London, UK",
    timeAgo: "4h ago",
    text: "10 scenarios, 3 minutes, verified credential. Standardizing startup acumen well."
  },
  {
    id: "op_7",
    name: "Kabir Mehta",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces",
    role: "Fullstack Builder",
    location: "Gurugram, IN",
    timeAgo: "5h ago",
    text: "Machine learning churn prediction question reflects modern B2B SaaS workflows accurately."
  },
  {
    id: "op_8",
    name: "Jessica Taylor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces",
    role: "Brand Strategist",
    location: "Austin, US",
    timeAgo: "6h ago",
    text: "Target audience precision over mass marketing was framed crisply."
  },
  {
    id: "op_9",
    name: "Li Na (李娜)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces",
    role: "Tech Director",
    location: "Shanghai, CN",
    timeAgo: "7h ago",
    text: "Zero page lag, smooth mobile touch interaction, high practical signal."
  },
  {
    id: "op_10",
    name: "Aditya Roy",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces",
    role: "Pre-seed Operator",
    location: "Hyderabad, IN",
    timeAgo: "8h ago",
    text: "The conversion rate vs traffic spike scenario caught 2 of our team members off guard. Good test."
  }
];

export const QUIZ_REGISTRY: QuizItem[] = [
  {
    id: "startup-iq-2026",
    slug: "startup-iq-challenge-2026",
    title: "How Startup-Smart Are You? | UpForge Startup IQ Challenge 2026",
    tagline: "Think like a founder. Decide like a builder. Test your Startup IQ.",
    description: "Think like a founder. Decide like a builder. Test your Startup IQ across 10 real-world scenarios.",
    summary: "Think like a founder. Decide like a builder. Test your Startup IQ.",
    badge: "Official Benchmark",
    category: "Startup Intelligence",
    duration: "3–5 Minutes",
    time: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/UpForge%2020Startup%2020IQ%2020Challenge%20202026.webp",
    baseParticipants: 18450,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.4 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Founder Level"
    },
    questions: [
      {
        id: 1,
        question: "A startup gets 10,000 website visitors, but only 500 sign up. What should the team calculate first to understand this?",
        options: ["Burn Rate", "Conversion Rate", "Customer Lifetime Value", "Runway"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 2,
        question: "A startup has thousands of website visitors, but very few complete the signup process. What should the founder investigate first?",
        options: [
          "Hire more salespeople",
          "Identify where users are dropping off and improve the signup experience",
          "Increase the office budget",
          "Launch a new product"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 3,
        question: "A software startup charges customers ₹999 every month to continue using its platform. What business model is this?",
        options: ["One-time purchase", "Subscription", "Marketplace", "Commission-only"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 4,
        question: "A company spends ₹50,000 on marketing and acquires 100 new customers. What is its approximate CAC?",
        options: ["₹50", "₹500", "₹5,000", "₹50,000"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 5,
        question: "A startup has ₹30 lakh in cash and spends ₹5 lakh every month. Approximately how much runway does it have?",
        options: ["3 months", "5 months", "6 months", "12 months"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 6,
        question: "A startup's user count is growing rapidly, but most new users stop using the product after one week. What should concern the founder most?",
        options: ["Retention", "Logo design", "Office size", "Number of employees"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 7,
        question: "A startup uses historical customer data to predict which users are likely to cancel their subscription. What technology is primarily being used?",
        options: ["Machine Learning", "Word Processing", "Cloud Storage", "UI Design"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 8,
        question: "Your first 100 customers repeatedly complain about the same feature. What's the smartest next step?",
        options: [
          "Ignore them because the product is already launched",
          "Identify the pattern, understand the underlying problem and improve the product",
          "Immediately increase advertising",
          "Remove all customer reviews"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 9,
        question: "Startup A operates in a market worth ₹10 crore. Startup B operates in a similar market worth ₹1,000 crore. Assuming other factors are comparable, which has the larger addressable market?",
        options: ["Startup B", "Startup A", "Both are equal", "Cannot be compared"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 10,
        question: "You have a startup idea but aren't sure whether people actually want it. What should you do before investing heavily in building it?",
        options: [
          "Build the complete product first",
          "Validate the problem and customer demand",
          "Hire a large team",
          "Spend heavily on advertising"
        ],
        correctIndex: 1,
        correctAnswer: 1
      }
    ]
  },
  {
    id: "marketing-iq-2026",
    slug: "marketing-iq-challenge-2026",
    title: "UpForge Marketing IQ Challenge 2026",
    tagline: "Think like a marketer. Understand what makes people act.",
    description: "Think like a marketer. Understand what makes people act and master growth metrics.",
    summary: "Think like a marketer. Understand what makes people act.",
    badge: "Growth Benchmark",
    category: "Marketing & Growth",
    duration: "3–5 Minutes",
    time: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/UpForge%2020Marketing%2020IQ%2020Challenge%20202026.webp",
    baseParticipants: 14210,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.2 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Growth Operator"
    },
    questions: [
      {
        id: 1,
        question: "A website gets 10,000 visitors but only 200 purchases. What should you examine first?",
        options: ["Logo", "Conversion rate", "Office size", "Employee count"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 2,
        question: "A company wants to understand why customers are buying its product. What is most useful?",
        options: ["Customer interviews", "More advertisements", "New logo", "More followers"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 3,
        question: "Which is the strongest example of a target audience?",
        options: ["Everyone", "People who use the internet", "College students looking for internships", "All Indians"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 4,
        question: "An Instagram post gets 1,000 views and 100 people interact with it. What does this primarily indicate?",
        options: ["Engagement", "Revenue", "Profit", "Market size"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 5,
        question: "A startup spends ₹20,000 on ads and gets 40 customers. What is its CAC?",
        options: ["₹200", "₹400", "₹500", "₹800"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 6,
        question: "A customer sees an ad, visits the website, compares alternatives and then purchases. This is part of the:",
        options: ["Customer journey", "Balance sheet", "Hiring funnel", "Supply chain"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 7,
        question: "Which headline is most likely to attract a founder looking for networking?",
        options: ["“We are a company.”", "“Join our platform.”", "“Meet founders building what comes next.”", "“Our website is live.”"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 8,
        question: "A campaign receives lots of clicks but almost no sign-ups. What should the marketer investigate?",
        options: ["Landing page and user experience", "Office location", "Company logo size", "Number of employees"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 9,
        question: "A brand consistently publishes useful content that attracts potential customers without directly selling every time. This is:",
        options: ["Content marketing", "Cold calling", "Accounting", "Inventory management"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 10,
        question: "You have ₹10,000 to promote a new product, but don't know which audience responds best. What's the smartest approach?",
        options: ["Spend everything immediately", "Test small campaigns with different audiences and measure results", "Target everyone", "Stop marketing"],
        correctIndex: 1,
        correctAnswer: 1
      }
    ]
  },
  {
    id: "career-iq-2026",
    slug: "career-iq-challenge-2026",
    title: "UpForge Career IQ Challenge 2026",
    tagline: "Think like a professional. Make career moves that actually compound.",
    description: "Think like a professional. Make career moves that actually compound over your professional journey.",
    summary: "Think like a professional. Make career moves that actually compound.",
    badge: "Career Benchmark",
    category: "Career & Leadership",
    duration: "3–5 Minutes",
    time: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/Upforge%20career-iq-2026.webp",
    baseParticipants: 16230,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.3 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Career Ready"
    },
    questions: [
      {
        id: 1,
        question: "You're applying for your first internship and have zero work experience. What should your resume emphasize most?",
        options: [
          "Projects, coursework and initiatives that show applied skills",
          "A long objective statement about your dreams",
          "Every subject you've ever studied",
          "Your school's name in bold across the page"
        ],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 2,
        question: "An interviewer asks, 'Tell me about yourself.' What's the smartest way to answer?",
        options: [
          "Recite your entire life story chronologically",
          "Give a short, relevant summary connecting your background to the role",
          "Ask them to skip the question",
          "List your hobbies only"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 3,
        question: "You have two job offers: one with a higher salary but no learning curve, another with a lower salary but strong mentorship and skill growth. Early in your career, what usually matters more?",
        options: ["Immediate salary only", "Company logo prestige only", "Learning, mentorship and skill compounding", "Office location only"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 4,
        question: "You want to build a professional network but don't personally know many senior people. What's the smartest first step?",
        options: [
          "Wait until someone reaches out to you",
          "Engage genuinely with people's work and start real conversations",
          "Mass-message 500 strangers with the same copy-paste text",
          "Avoid networking until you have a job title"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 5,
        question: "A recruiter reviews your LinkedIn profile before an interview. Which of these matters most for a strong first impression?",
        options: [
          "A profile photo, clear headline and evidence of real work",
          "Number of connections only",
          "A generic headline like 'Student'",
          "A cover photo with a meme"
        ],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 6,
        question: "You've been offered a starting salary lower than the market rate. What's the smartest approach?",
        options: [
          "Accept immediately without discussion",
          "Politely negotiate using market data and your value",
          "Reject the offer without any conversation",
          "Complain publicly on social media"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 7,
        question: "You notice your industry is shifting fast due to new tools and automation. What's the smartest long-term career move?",
        options: [
          "Ignore it and hope your role stays the same",
          "Continuously upskill and adapt to stay relevant",
          "Switch industries randomly without research",
          "Wait for your employer to decide for you"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 8,
        question: "You're choosing between two internships: one at a well-known brand with limited real responsibility, and one at a smaller company where you'll own real projects. What typically builds a stronger portfolio?",
        options: [
          "The well-known brand, regardless of the work",
          "Real ownership and outcomes you can actually show",
          "Whichever pays for lunch",
          "Whichever has a nicer office"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 9,
        question: "During a group project, a teammate isn't contributing. What's the most professional way to handle it?",
        options: [
          "Silently do all the work yourself and say nothing",
          "Publicly call them out in front of others",
          "Have a direct, respectful conversation and set clear expectations",
          "Report them without ever speaking to them first"
        ],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 10,
        question: "You're unsure which career path fits you best. What's the smartest way to figure it out?",
        options: [
          "Guess randomly and commit for life",
          "Try internships, projects and real conversations with professionals to gather evidence",
          "Pick whatever pays the most without any research",
          "Avoid making a decision indefinitely"
        ],
        correctIndex: 1,
        correctAnswer: 1
      }
    ]
  },
  {
    id: "fundraising-iq-2026",
    slug: "fundraising-iq-challenge-2026",
    title: "UpForge Fundraising IQ Challenge 2026",
    tagline: "Think like an investor. Raise capital without giving away the store.",
    description: "Think like an investor. Raise capital without giving away the store.",
    summary: "Think like an investor. Raise capital without giving away the store.",
    badge: "Investor Benchmark",
    category: "Fundraising",
    duration: "3–5 Minutes",
    time: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/Upforge%20fundraising-iq-2026.png",
    baseParticipants: 12870,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.5 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Fundraising Pro"
    },
    questions: [
      {
        id: 1,
        question: "A founder gives away 40% equity to an early investor for a small cheque. What's the biggest long-term risk?",
        options: [
          "The founder loses meaningful control and future negotiating leverage",
          "There is no risk at all",
          "The company automatically fails",
          "The investor must return the equity later"
        ],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 2,
        question: "A company is valued at ₹8 crore before funding and raises ₹2 crore. What is its approximate post-money valuation?",
        options: ["₹6 crore", "₹8 crore", "₹10 crore", "₹2 crore"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 3,
        question: "An early-stage startup wants to raise a small amount quickly without fixing a valuation yet. What's a common instrument for this?",
        options: ["A convertible note or SAFE", "A bank loan", "An IPO", "A franchise agreement"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 4,
        question: "A founder is preparing a pitch deck for investors. What should it primarily communicate?",
        options: [
          "The problem, solution, market size, traction and team",
          "Only the founder's personal achievements",
          "A detailed 40-page technical manual",
          "Just the logo and tagline"
        ],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 5,
        question: "An investor asks to see the startup's cap table. What are they trying to understand?",
        options: [
          "Who owns what percentage of the company",
          "The company's office furniture list",
          "The founder's personal expenses",
          "The number of employees on leave"
        ],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 6,
        question: "A startup raises multiple funding rounds over several years, issuing new shares each time. What effect does this typically have on early shareholders?",
        options: [
          "Their percentage ownership dilutes unless they invest more",
          "Their ownership percentage automatically increases",
          "Nothing changes for anyone",
          "Only the founder is affected"
        ],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 7,
        question: "Before writing a cheque, a serious investor typically conducts a deep review of the company's financials, legal standing and team. This process is called:",
        options: ["Due diligence", "Market research", "Product testing", "Customer onboarding"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 8,
        question: "A founder is choosing between an angel investor and a venture capital fund for a seed round. What's a key practical difference?",
        options: [
          "Angels typically write smaller personal cheques; VC funds invest institutional capital, often with more structure",
          "There is no difference between the two",
          "Angels only invest in public companies",
          "VC funds never sign any documents"
        ],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 9,
        question: "An investor offers a high valuation but demands a board seat and strong control clauses. What should a founder evaluate before accepting?",
        options: [
          "Only the valuation number",
          "The valuation together with control terms, board dynamics and long-term fit",
          "Nothing — always accept the highest number",
          "Whether the investor has a nice office"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 10,
        question: "A startup is burning cash fast and has under 4 months of runway left, with a raise not yet closed. What's the smartest immediate move?",
        options: [
          "Keep spending at the same pace and hope for the best",
          "Cut non-essential burn and actively accelerate fundraising or bridge financing conversations",
          "Shut down immediately without exploring options",
          "Ignore the runway and launch a large ad campaign"
        ],
        correctIndex: 1,
        correctAnswer: 1
      }
    ]
  },
  {
    id: "ai-iq-2026",
    slug: "ai-iq-challenge-2026",
    title: "UpForge AI & Future Skills IQ Challenge 2026",
    tagline: "Think like an innovator. Work smarter in the AI-driven era.",
    description: "Think like an innovator. Work smarter in the AI-driven era with practical skills.",
    summary: "Think like an innovator. Work smarter in the AI-driven era.",
    badge: "Future Skills Benchmark",
    category: "AI & Technology",
    duration: "3–5 Minutes",
    time: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/ai-iq-2026.webp",
    baseParticipants: 20340,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.1 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "AI Ready"
    },
    questions: [
      {
        id: 1,
        question: "You give an AI assistant a vague one-line instruction and get a poor result. What's the smartest fix?",
        options: [
          "Give up on using AI tools entirely",
          "Provide clearer context, specific goals and examples in your prompt",
          "Repeat the exact same vague prompt again",
          "Assume the tool is broken"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 2,
        question: "A company uses an algorithm to automatically approve or reject loan applications. What's a critical factor it must monitor?",
        options: [
          "Whether the algorithm shows bias against certain groups",
          "The color of the loan application form",
          "How many fonts are used in the UI",
          "The office's Wi-Fi speed"
        ],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 3,
        question: "A student uses an AI tool to summarize research papers before writing an assignment. What's the smartest practice?",
        options: [
          "Copy the AI output directly without reading the source",
          "Use the summary as a starting point, then verify facts and add original analysis",
          "Avoid reading anything the AI produces",
          "Submit the AI's raw output as final work"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 4,
        question: "A business wants to automate repetitive customer support queries while keeping complex issues handled by humans. What approach makes most sense?",
        options: [
          "Automate everything, including sensitive complaints",
          "Use automation for routine queries and route complex cases to humans",
          "Avoid any automation entirely",
          "Replace all support staff immediately with no fallback"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Which of these best describes 'machine learning'?",
        options: [
          "Software that follows only fixed, hardcoded rules forever",
          "Systems that improve their performance by learning patterns from data",
          "A type of physical robot hardware",
          "A method for formatting spreadsheets"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 6,
        question: "A team wants to use AI to speed up work but is worried about sharing confidential company data. What's the smartest approach?",
        options: [
          "Paste all confidential data into any public tool without checking",
          "Review data privacy policies and avoid sharing sensitive information with unvetted tools",
          "Avoid using AI tools forever out of fear",
          "Share passwords with the AI tool for convenience"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 7,
        question: "An AI writing tool produces a confident-sounding but factually incorrect answer. This is commonly known as:",
        options: ["A hallucination", "A firewall", "A cookie", "A cache hit"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 8,
        question: "A founder wants their small team to use AI tools effectively across the company. What's the smartest rollout strategy?",
        options: [
          "Force adoption overnight with zero training",
          "Introduce tools gradually with clear use-cases and basic training",
          "Ban all AI tools indefinitely",
          "Let only one person use it and tell no one else"
        ],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 9,
        question: "Which skill becomes more valuable, not less, as AI tools automate routine tasks?",
        options: [
          "Critical thinking and judgment on what to build and why",
          "Manually doing repetitive data entry",
          "Avoiding all new technology",
          "Memorizing information available with one search"
        ],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 10,
        question: "You're deciding whether to learn a new AI-related skill this year. What's the smartest way to evaluate it?",
        options: [
          "Ignore it since your current skills feel sufficient forever",
          "Check how the skill compounds with your existing strengths and industry direction",
          "Learn it only if a friend randomly mentions it",
          "Assume all new skills are equally important with no prioritization"
        ],
        correctIndex: 1,
        correctAnswer: 1
      }
    ]
  },
  {
    id: "founder-decision-iq-2026",
    slug: "founder-decision-iq-challenge-2026",
    title: "Could You Think Like a Founder? | UpForge Founder Decision IQ Challenge 2026",
    tagline: "Make the hard calls founders face before the outcome is obvious.",
    description: "Test your founder judgment across hiring, runway, product, customers, priorities and high-stakes startup decisions.",
    summary: "Test your founder judgment across real startup decisions.",
    badge: "Founder Benchmark",
    category: "Founder & Leadership",
    duration: "3–5 Minutes",
    time: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/Could%20You%20Think%20Like%20a%20Founder.png",
    baseParticipants: 0,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.4 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Founder Operator"
    },
    questions: [
      {
        id: 1,
        question: "A startup has ₹48 lakh in cash and a steady monthly net burn of ₹4 lakh. Ignoring changes in burn, approximately how much runway remains?",
        options: ["6 months", "8 months", "12 months", "16 months"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 2,
        question: "A founder has 20 customer interviews but hears the same workflow problem from 14 of them. What is the strongest next step?",
        options: ["Treat the repeated problem as a signal and test a focused solution", "Ignore the interviews until 1,000 customers are surveyed", "Build every feature mentioned by every customer", "Change the company name to match the problem"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 3,
        question: "A startup can ship either a polished feature used by 3% of users or a simpler fix for a problem reported by 40% of active users. Which should generally be investigated first?",
        options: ["The 3% feature because it looks more impressive", "The 40% problem because it affects a larger share of active users", "Neither until the team doubles", "Whichever requires more engineering hours"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 4,
        question: "A co-founder repeatedly misses agreed deadlines and the pattern is affecting customers. What is the most constructive first response?",
        options: ["Ignore the pattern indefinitely", "Discuss the specific misses directly and reset clear ownership and expectations", "Announce the problem publicly", "Immediately delete the person's access without discussion"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 5,
        question: "A founder has three priorities that all sound urgent. Which method creates the clearest decision rule?",
        options: ["Choose the task with the most notifications", "Rank them by customer impact, urgency and consequences of delay", "Work on all three simultaneously", "Choose the task that is easiest to finish"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 6,
        question: "A startup's largest customer asks for a custom feature that would consume most of the engineering team's month. What should the founder evaluate before committing?",
        options: ["Only the customer's logo", "Whether the request fits the broader product strategy and economics", "Whether the feature sounds technically difficult", "Whether competitors have a nicer office"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 7,
        question: "A founder discovers that a key growth metric was calculated using inconsistent definitions across teams. What should happen first?",
        options: ["Publish the metric anyway", "Define the metric consistently and rebuild the analysis from the corrected definition", "Delete the metric permanently", "Choose whichever number is highest"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 8,
        question: "A startup has strong sign-ups but very few users reach the product's core value moment. Which problem should the founder investigate?",
        options: ["Activation and onboarding", "Office rent", "Company registration color", "Investor logo placement"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 9,
        question: "A founder wants to hire a senior executive before the company has clearly defined the role's responsibilities. What is the strongest preparation step?",
        options: ["Write the role outcomes, decision rights and success measures first", "Hire immediately because senior titles solve ambiguity", "Skip interviews", "Let the candidate define every company priority"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 10,
        question: "A startup's revenue grows 50%, but support tickets and delivery failures grow even faster. What should the founder examine?",
        options: ["Only the revenue chart", "Whether growth is creating operational bottlenecks that threaten customer experience", "Whether to stop measuring support", "Whether the company needs a new logo"],
        correctIndex: 1,
        correctAnswer: 1
      }
    ]
  },
  {
    id: "pmf-iq-2026",
    slug: "product-market-fit-iq-challenge-2026",
    title: "Can You Spot Product-Market Fit? | UpForge PMF IQ Challenge 2026",
    tagline: "Separate real product pull from vanity metrics and noise.",
    description: "Test your ability to read retention, activation, customer feedback, experiments and product-market fit signals.",
    summary: "Learn to distinguish product pull from vanity growth.",
    badge: "Product Benchmark",
    category: "Product & Strategy",
    duration: "3–5 Minutes",
    time: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/Can%20You%20Spot%20Product-Market%20Fit.png",
    baseParticipants: 0,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.3 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Product Strategist"
    },
    questions: [
      {
        id: 1,
        question: "A product has 100,000 monthly visitors but only 1% become active users. Which metric should be investigated to understand the early funnel?",
        options: ["Activation rate", "Office occupancy", "Headcount growth", "Trademark count"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 2,
        question: "A cohort of customers continues using a product several months after signup without repeated sales pushes. Which signal is most relevant to product-market fit?",
        options: ["Sustained retention", "Number of press releases", "Office square footage", "Founder follower count"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 3,
        question: "An experiment changes one onboarding step while keeping the rest of the flow comparable. What makes the test easier to interpret?",
        options: ["Changing five unrelated variables at once", "Keeping the tested change isolated enough to compare outcomes", "Choosing the result before collecting data", "Removing the control group"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Users say they love a product in interviews but rarely return after the first use. What should the team do?",
        options: ["Treat interview enthusiasm as sufficient proof", "Investigate actual usage and retention alongside qualitative feedback", "Stop measuring usage", "Increase the logo size"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 5,
        question: "A startup's weekly active users rise from 2,000 to 2,400. What is the percentage increase?",
        options: ["10%", "15%", "20%", "40%"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 6,
        question: "A feature is requested by many prospects but existing customers almost never use it. What should the team avoid assuming?",
        options: ["That demand exists in some form", "That requests automatically prove the feature is valuable after launch", "That customer behavior provides useful evidence", "That the team should investigate the underlying need"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 7,
        question: "A startup's retention improves after removing a confusing onboarding step. What does that result most directly support?",
        options: ["The change may have reduced friction for users", "The market size doubled", "The company has no competitors", "Revenue is guaranteed to increase"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 8,
        question: "Which is the strongest reason to segment product metrics by customer cohort?",
        options: ["To see whether behavior changes across groups and over time", "To make charts look more complex", "To hide weak results", "To eliminate the need for retention analysis"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 9,
        question: "A startup doubles its ad spend and doubles sign-ups, but the percentage of users who become retained customers falls sharply. What should the team question?",
        options: ["Whether the additional acquisition is bringing lower-quality or less-qualified users", "Whether sign-ups are ever useful", "Whether retention should be ignored", "Whether advertising always creates product-market fit"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 10,
        question: "A product team wants to prioritize its roadmap. Which input is most useful when deciding between competing customer problems?",
        options: ["Only the loudest single request", "Evidence about customer impact, frequency, strategic fit and expected value", "The longest feature description", "The feature with the most engineering jargon"],
        correctIndex: 1,
        correctAnswer: 1
      }
    ]
  },
  {
    id: "startup-metrics-iq-2026",
    slug: "startup-metrics-iq-challenge-2026",
    title: "Do You Actually Understand Startup Numbers? | UpForge Startup Metrics IQ Challenge 2026",
    tagline: "Read the numbers founders and investors use to judge a business.",
    description: "Test CAC, LTV, gross margin, burn, runway, conversion, retention and unit-economics reasoning with practical scenarios.",
    summary: "Test your command of the numbers behind startup decisions.",
    badge: "Metrics Benchmark",
    category: "Startup Finance",
    duration: "3–5 Minutes",
    time: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/Do%20You%20Actually%20Understand%20Startup%20Numbers.png",
    baseParticipants: 0,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.6 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Startup Analyst"
    },
    questions: [
      {
        id: 1,
        question: "A startup spends ₹90,000 on sales and marketing and acquires 180 new customers. What is the CAC?",
        options: ["₹250", "₹500", "₹750", "₹1,000"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 2,
        question: "A SaaS startup has ₹24 lakh in cash and a monthly net burn of ₹3 lakh. Approximately how much runway does it have?",
        options: ["4 months", "6 months", "8 months", "12 months"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 3,
        question: "A company generates ₹10 lakh in revenue and spends ₹6 lakh on the direct costs of delivering that revenue. What is gross margin?",
        options: ["20%", "40%", "60%", "80%"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 4,
        question: "A funnel receives 5,000 visitors and 250 become paying customers. What is the visitor-to-customer conversion rate?",
        options: ["2%", "5%", "10%", "20%"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 5,
        question: "A subscription product has 1,000 customers at the start of a month and loses 50 during that month, with no other changes. What is the simple monthly customer churn rate?",
        options: ["2%", "5%", "10%", "20%"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 6,
        question: "A customer pays ₹2,000 per month and stays for an average of 12 months. Ignoring gross margin and other adjustments, what simple revenue LTV does that imply?",
        options: ["₹12,000", "₹20,000", "₹24,000", "₹48,000"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 7,
        question: "A startup has monthly revenue of ₹20 lakh and monthly operating expenses of ₹27 lakh, with no other cash inflows. What is the monthly net burn?",
        options: ["₹3 lakh", "₹5 lakh", "₹7 lakh", "₹47 lakh"],
        correctIndex: 2,
        correctAnswer: 2
      },
      {
        id: 8,
        question: "If a company's CAC rises from ₹500 to ₹750 while customer value stays unchanged, what happens to the efficiency of acquiring each customer?",
        options: ["It improves", "It becomes less efficient", "It stays exactly the same", "It becomes impossible to measure"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 9,
        question: "A startup reports revenue growth but its gross margin falls from 70% to 45%. What does this most directly indicate?",
        options: ["Revenue is growing, but a larger share is being consumed by direct delivery costs", "Customer retention must have doubled", "CAC must be zero", "The company has no operating expenses"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 10,
        question: "A startup has ₹60 lakh in cash and burns ₹5 lakh per month. If the burn remains constant, how many months of runway does the cash represent?",
        options: ["6 months", "10 months", "12 months", "15 months"],
        correctIndex: 2,
        correctAnswer: 2
      }
    ]
  },
  {
    id: "startup-intelligence-iq-2026",
    slug: "startup-intelligence-iq-challenge-2026",
    title: "Would You Spot the Signal? | UpForge Startup Intelligence IQ Challenge 2026",
    tagline: "Read startup evidence like an analyst, not a headline reader.",
    description: "Test your startup research judgment across traction, funding, market signals, diligence, sources and evidence quality.",
    summary: "Separate meaningful startup signals from noise and unsupported claims.",
    badge: "Intelligence Benchmark",
    category: "Startup Intelligence",
    duration: "3–5 Minutes",
    time: "3–5 Minutes",
    image: "https://images.upforge.org/quiz/Would%20You%20Spot%20the%20Signal.png",
    baseParticipants: 0,
    metrics: {
      scenariosCount: "10 MCQs",
      avgCompletionTime: "3.7 Mins",
      passingStandard: "Verified (≥ 70%)",
      credentialTier: "Research Analyst"
    },
    questions: [
      {
        id: 1,
        question: "A startup claims it is 'the fastest-growing company in its sector' but provides no underlying data. What is the strongest research response?",
        options: ["Repeat the claim because it sounds credible", "Treat it as an unverified claim and look for measurable evidence", "Assume the claim is false without checking", "Use the claim as a financial forecast"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 2,
        question: "An investor presentation says a market is worth ₹10,000 crore but does not explain the market definition. What should an analyst clarify first?",
        options: ["The exact market scope, geography, customer set and calculation basis", "The founder's favorite color", "The company's office size", "The number of social-media followers"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 3,
        question: "A startup announces a funding round. Which piece of information is most useful for understanding the round itself?",
        options: ["The amount raised, round stage and disclosed investors", "The founder's profile photo", "The color of the press-release logo", "The number of comments on the announcement"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 4,
        question: "Two sources report different startup revenue figures for the same year. What should a careful analyst do first?",
        options: ["Choose the larger number", "Check the dates, definitions, source quality and whether the figures measure the same thing", "Average the numbers without investigation", "Delete both figures"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 5,
        question: "A startup has 50,000 social followers but only 300 paying customers. What conclusion is justified from those two numbers alone?",
        options: ["The startup definitely has product-market fit", "The follower count is not sufficient by itself to establish commercial traction", "The startup is definitely failing", "The company must have zero revenue"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 6,
        question: "A company reports 100% year-over-year growth from ₹1 lakh to ₹2 lakh in revenue. What additional context is important before judging the scale of the result?",
        options: ["The starting base and the absolute revenue level", "Only the logo design", "Only the number of employees", "Nothing else is relevant"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 7,
        question: "During startup due diligence, why is it useful to compare a company's claims with independent or primary sources where available?",
        options: ["To test whether important claims are supported by evidence", "To make the report longer", "To guarantee the company will succeed", "To replace all management information"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 8,
        question: "A startup's website says it serves 'millions of users,' while a dated public filing lists a much smaller customer count. What is the best next step?",
        options: ["Ignore the discrepancy", "Determine whether 'users' and 'customers' are defined differently and check the relevant dates", "Publish the larger number as fact", "Publish both numbers as if they were identical"],
        correctIndex: 1,
        correctAnswer: 1
      },
      {
        id: 9,
        question: "Which source is generally strongest for confirming a company's own legal or financial filing when that primary document is publicly available?",
        options: ["The company's primary filing or official record", "An anonymous forum comment", "A random social post", "An unsourced screenshot"],
        correctIndex: 0,
        correctAnswer: 0
      },
      {
        id: 10,
        question: "A startup has strong press coverage but no disclosed customer, revenue or retention data. What should an analyst conclude?",
        options: ["Press coverage proves commercial success", "Press coverage is one signal, but it does not by itself establish operating performance", "The startup has no customers", "The startup must be overvalued"],
        correctIndex: 1,
        correctAnswer: 1
      }
    ]
  },
];

export function getQuizBySlug(slug: string): QuizItem | undefined {
  return QUIZ_REGISTRY.find((quiz) => quiz.slug === slug);
}

export function getAllQuizzes(): QuizItem[] {
  return QUIZ_REGISTRY;
}
