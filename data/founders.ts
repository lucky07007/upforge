// data/founders.ts
// 10 highest-traffic trending global startups — March 2026 edition.
// Each entry is tuned for SEO: slug, deck, headline, cols, and stats
// are all keyword-rich and match real high-volume search queries.

export interface FounderCol {
  h: string
  b: string
}

export interface FounderStat {
  l: string
  v: string
}

export interface Founder {
  no: string
  edition: string
  category: string
  name: string
  nameShort: string
  initials: string
  company: string
  slug: string
  role: string
  city: string
  context: string
  valuation: string
  funding: string
  founded: string
  imgSrc: string
  videoId: string
  videoTitle: string
  accent: string
  accentBg: string
  accentBorder: string
  headline: string
  deck: string
  cols: FounderCol[]
  pull: string
  pullBy: string
  lesson: string
  stats: FounderStat[]
}

export const FOUNDERS: Founder[] = [
  // ── 01 · OPENAI ───────────────────────────────────────────────────────────
  {
    no: "01", edition: "No. 01",
    category: "ARTIFICIAL INTELLIGENCE",
    name: "Sam Altman",
    nameShort: "Sam Altman",
    initials: "O",
    company: "OpenAI", slug: "openai",
    role: "CEO",
    city: "San Francisco, CA", context: "Built the most trafficked AI product in history",
    valuation: "$300B+", funding: "$17B+", founded: "2015",
    imgSrc: "https://etedge-insights.com/wp-content/uploads/2025/07/sam-altman.jpg",
    videoId: "e1cf58tYLtY",
    videoTitle: "Sam Altman — Building OpenAI and the Future of AGI",
    accent: "#10A37F", accentBg: "#F0FDF4", accentBorder: "#BBF7D0",
    headline: "ChatGPT became the fastest product to 100 million users in history. Sam Altman turned a nonprofit AI lab into the world's most valuable private tech company.",
    deck: "OpenAI's ChatGPT, DALL-E 3, Sora, and GPT-4o have redefined every category of software. Sam Altman leads the organisation racing fastest toward AGI — and attracting the most web traffic of any AI platform on earth.",
    cols: [
      {
        h: "ChatGPT Plus Login and the Consumer AI Revolution",
        b: "When ChatGPT launched in November 2022, it hit one million users in five days. By January 2023 it had 100 million monthly active users — the fastest consumer product adoption in internet history. Sam Altman's insight was deceptively simple: make the most powerful AI model in the world available to anyone, free.\n\nThe ChatGPT Plus login page alone now drives billions of monthly searches globally. OpenAI's web traffic rivals major search engines — a position no AI company had ever occupied before. The product didn't just create a category; it became the category.",
      },
      {
        h: "DALL-E 3, Sora, and the Generative Media Stack",
        b: "OpenAI's product expansion beyond text set new benchmarks in every media category. DALL-E 3 became the world's most searched AI image generator, integrated directly into ChatGPT and Bing. Sora — OpenAI's text-to-video model — demonstrated cinematic-quality video generation and triggered a wave of investment into AI video startups globally.\n\nThe OpenAI API now powers thousands of applications, from coding assistants to customer service bots, making OpenAI API pricing one of the highest-volume developer search queries in 2025. The platform has become the default AI infrastructure layer for the internet.",
      },
      {
        h: "The $300 Billion Bet",
        b: "In 2025, OpenAI raised $40B at a $300B valuation — the largest private tech funding round in history. Investors include Microsoft ($13B+), SoftBank, and a16z. The company's transition from nonprofit to capped-profit structure remains one of tech's most debated governance decisions.\n\nCritics question concentration of power. Supporters argue OpenAI is the only organisation with the resources to ensure AGI is built safely. Either way, the traffic numbers are inarguable: ChatGPT processes over 100 million daily active users, making it the most-used AI chatbot for business and personal use worldwide.",
      },
    ],
    pull: "We wanted to build AI that benefits all of humanity. That turned out to be harder — and more important — than we imagined.",
    pullBy: "Sam Altman",
    lesson: "If you make transformative technology genuinely accessible, distribution takes care of itself.",
    stats: [
      { l: "Valuation",    v: "$300B+"  },
      { l: "Founded",      v: "2015"    },
      { l: "Daily Users",  v: "100M+"   },
      { l: "Total Raised", v: "$17B+"   },
    ],
  },

  // ── 02 · PERPLEXITY AI ────────────────────────────────────────────────────
  {
    no: "02", edition: "No. 02",
    category: "AI-POWERED SEARCH",
    name: "Aravind Srinivas",
    nameShort: "Aravind Srinivas",
    initials: "P",
    company: "Perplexity AI", slug: "perplexity-ai",
    role: "Co-Founder & CEO",
    city: "San Francisco, CA", context: "Ex-OpenAI researcher building the AI search engine",
    valuation: "$9B", funding: "$900M+", founded: "2022",
    imgSrc: "https://images.indianexpress.com/2025/10/India-youngest-billionaire-Perplexity-CEO-Aravind-Srinivas.jpg",
    videoId: "e-gwvmhyU7A",
    videoTitle: "Aravind Srinivas — How Perplexity Is Replacing Google Search",
    accent: "#20B2AA", accentBg: "#F0FDFA", accentBorder: "#CCFBF1",
    headline: "Google gives you ten blue links. Perplexity gives you the answer. Aravind Srinivas is building the AI search engine that could make traditional search obsolete.",
    deck: "Perplexity AI reached 100 million weekly queries by late 2024 by doing what Google wouldn't: replacing links with direct, cited, real-time AI answers. The AI research assistant for the post-search era.",
    cols: [
      {
        h: "The Answer Engine vs The Search Engine",
        b: "Aravind Srinivas spent time at OpenAI, DeepMind, and Google Brain before co-founding Perplexity in 2022. His thesis was precise: search hadn't fundamentally changed in 25 years, and LLMs had finally made it possible to answer questions directly instead of routing users to ten links and hoping for the best.\n\nPerplexity vs Google is now one of the most searched tech comparisons of 2025. The platform processes over 100 million weekly queries with real-time web access, citations, and follow-up question chains — closer to talking to a knowledgeable research assistant than using a traditional search engine.",
      },
      {
        h: "The Real-Time AI Research Assistant",
        b: "What separates Perplexity from ChatGPT and other AI chatbots is its real-time web grounding. Every answer cites its sources, links to original articles, and can be interrogated with follow-up questions. For researchers, journalists, students, and professionals, it has become the default AI research assistant.\n\nThe product's 'Spaces' feature allows teams to build shared research environments with persistent context — a direct play for enterprise and academic users who need collaborative, cited AI search. Perplexity Pro subscriptions have grown 400% year-over-year.",
      },
      {
        h: "The $9 Billion Search Challenger",
        b: "Perplexity's $9B valuation in 2025 was backed by Jeff Bezos, Nvidia, SoftBank, and Institutional Venture Partners — a signal that serious capital believes AI search can challenge Google's 90% market share. The company generates revenue through Pro subscriptions and an enterprise API used by publishers and corporations.\n\nThe 'Perplexity vs Google' narrative has moved from tech-blog speculation to board-room conversation. Google's own internal studies reportedly acknowledge Perplexity as a meaningful threat to search query volume among the 18–34 demographic — the same cohort that adopted ChatGPT first.",
      },
    ],
    pull: "Search is 25 years old and hasn't really changed. LLMs finally give us the technology to replace links with actual answers.",
    pullBy: "Aravind Srinivas",
    lesson: "The best product doesn't always win first. But the product that solves the real user intent — not the proxy metric — wins eventually.",
    stats: [
      { l: "Valuation",      v: "$9B"    },
      { l: "Founded",        v: "2022"   },
      { l: "Weekly Queries", v: "100M+"  },
      { l: "Total Raised",   v: "$900M+" },
    ],
  },

  // ── 03 · REVOLUT ──────────────────────────────────────────────────────────
  {
    no: "03", edition: "No. 03",
    category: "GLOBAL FINTECH",
    name: "Nik Storonsky",
    nameShort: "Nik Storonsky",
    initials: "R",
    company: "Revolut", slug: "revolut",
    role: "Co-Founder & CEO",
    city: "London, UK", context: "Built Europe's most valuable fintech from a travel card",
    valuation: "$45B", funding: "$1.7B+", founded: "2015",
    imgSrc: "https://i.guim.co.uk/img/media/011ce19637fbb1d4ed6250fa02eae0b49834d0c8/29_0_6880_5504/master/6880.jpg?width=465&dpr=1&s=none&crop=none",
    videoId: "AJlTBblpSyA",
    videoTitle: "Nik Storonsky — Building Revolut Into Europe's Most Valuable Fintech",
    accent: "#6366F1", accentBg: "#EEF2FF", accentBorder: "#C7D2FE",
    headline: "Revolut started as a multi-currency travel card that saved fees abroad. It became a $45B financial super-app serving 50 million customers worldwide.",
    deck: "Nik Storonsky built Revolut by attacking every hidden fee in banking — foreign exchange, international transfers, crypto trading — and packaging them into the best travel card of 2026.",
    cols: [
      {
        h: "The Multi-Currency Card That Started Everything",
        b: "Nik Storonsky was a trader at Lehman Brothers and Credit Suisse before co-founding Revolut in 2015 with Vlad Yatsenko. The founding insight came from personal frustration: every time he travelled for work, banks charged 3–5% on foreign currency transactions — a hidden tax that added up to thousands per year.\n\nRevolut's multi-currency card offered interbank exchange rates with no markup. The best travel card for 2026 searches now reliably surface Revolut at the top — a testament to a product that solved a genuine pain point for millions of international travellers, students, and remote workers.",
      },
      {
        h: "Beyond Banking: Crypto, Stock Trading, and Business Accounts",
        b: "Revolut's expansion has followed a consistent logic: identify every fee or friction in traditional banking, build a product that eliminates it, and bundle it into one app. Today Revolut offers multi-currency accounts, buy crypto online, stock trading, international money transfer at near-zero fees, insurance, savings vaults, and business accounts for SMEs.\n\nThe 'international money transfer fees' search query — once dominated by Western Union and Wise — now increasingly leads users to Revolut. Its international money transfer product processes billions in cross-border payments monthly at a fraction of bank fees.",
      },
      {
        h: "Europe's Most Valuable Private Fintech",
        b: "Revolut's $45B valuation from its 2024 secondary sale made it the most valuable private fintech in Europe and one of the top five globally. The company is profitable, operating in 38+ countries, and has 50 million personal customers alongside its fast-growing Revolut Business product.\n\nThe long-delayed UK banking licence was finally granted in 2024 — a watershed moment that allows Revolut to offer deposit protection and lending in its home market. With licences now in the UK, EEA, and several other jurisdictions, Revolut is transitioning from a fintech challenger to a regulated global bank.",
      },
    ],
    pull: "Every fee a bank charges is an opportunity for us. We've spent ten years eliminating them one by one.",
    pullBy: "Nik Storonsky",
    lesson: "The fintech opportunity is simple: banks charge too much, move too slow, and build terrible products. Fix any one of those and you have a business.",
    stats: [
      { l: "Valuation",   v: "$45B"   },
      { l: "Founded",     v: "2015"   },
      { l: "Customers",   v: "50M+"   },
      { l: "Total Raised",v: "$1.7B+" },
    ],
  },

  // ── 04 · CANVA ────────────────────────────────────────────────────────────
  {
    no: "04", edition: "No. 04",
    category: "AI DESIGN & CREATIVITY",
    name: "Melanie Perkins",
    nameShort: "Melanie Perkins",
    initials: "C",
    company: "Canva", slug: "canva",
    role: "Co-Founder & CEO",
    city: "Sydney, Australia", context: "Rejected 100 times before building a $40B design empire",
    valuation: "$40B", funding: "$560M+", founded: "2013",
    imgSrc: "https://miro.medium.com/0*ZeW1YWwCNdh80n_n",
    videoId: "1GVXQ1mFJfM",
    videoTitle: "Melanie Perkins — How Canva Became the World's Design Platform",
    accent: "#7C3AED", accentBg: "#F5F3FF", accentBorder: "#DDD6FE",
    headline: "Melanie Perkins was rejected by over 100 investors. She built Canva anyway — a $40B design platform used by 200 million people in 190 countries.",
    deck: "Canva's AI image generator, Instagram post templates, and online logo maker have seen a 226% traffic surge. Melanie Perkins turned design from a specialist skill into something anyone can do in minutes.",
    cols: [
      {
        h: "The Idea 100 Investors Rejected",
        b: "In 2011, Melanie Perkins was a 19-year-old teaching graphic design tools at a university in Perth, Australia. She noticed her students spent most of their time learning Photoshop and InDesign — not actually designing. She had an idea: what if design software was so simple anyone could use it in minutes?\n\nShe spent two years building a pitch and was rejected by over 100 venture capitalists. The breakthrough came through a connection at a Silicon Valley kite-surfing festival — Canva finally raised seed funding in 2013, and launched with a product that would prove every investor wrong.",
      },
      {
        h: "The AI Photo Editor and Template Revolution",
        b: "Canva's 226% traffic surge in 2024–2025 was driven by one thing: AI. Canva's AI image generator free tier, AI photo editor, and Magic Design features — which turn a text prompt into a finished presentation or social post — made Canva the most visited creative platform online.\n\nInstagram post templates, online logo maker, and presentation maker are now among the highest-volume design search terms globally, and Canva owns them. Its Magic Write (AI copywriting), Background Remover, and AI video tools have extended Canva's lead beyond static design into every creative format.",
      },
      {
        h: "From Consumer to Enterprise",
        b: "Canva's most significant recent move has been enterprise. Canva for Teams now serves over 95% of the Fortune 500, with brand kits, workflow tools, and admin controls that have displaced expensive design agency retainers for routine content creation.\n\nThe company's $40B valuation reflects a platform that has genuinely expanded the global addressable market for design — from tens of millions of professional designers to over 200 million monthly active users. It generates over $2.3B in annual revenue and is profitable — a rare distinction at its scale.",
      },
    ],
    pull: "I was told the idea was too simple. That was exactly the point. Simple is what gets 200 million people to use it.",
    pullBy: "Melanie Perkins",
    lesson: "Simplify the tool until the person who has never used design software can make something beautiful on day one.",
    stats: [
      { l: "Valuation",   v: "$40B"   },
      { l: "Founded",     v: "2013"   },
      { l: "MAU",         v: "200M+"  },
      { l: "Revenue",     v: "$2.3B+" },
    ],
  },

  // ── 05 · CHARACTER.AI ─────────────────────────────────────────────────────
  {
    no: "05", edition: "No. 05",
    category: "ENTERTAINMENT AI",
    name: "Noam Shazeer & Daniel De Freitas",
    nameShort: "Noam Shazeer",
    initials: "C",
    company: "Character.AI", slug: "character-ai",
    role: "Co-Founders — CEO & VP Engineering",
    city: "Menlo Park, CA", context: "Ex-Google engineers building AI companionship at scale",
    valuation: "$5B", funding: "$600M+", founded: "2021",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRod-dULjDyoekRyRsio8u7ysNgCYgoMtJ4bw&s",
    videoId: "r5p0G8P3cDI",
    videoTitle: "Noam Shazeer — How Character.AI Built the Most Engaging AI Platform on Earth",
    accent: "#EC4899", accentBg: "#FDF2F8", accentBorder: "#FBCFE8",
    headline: "Character.AI users spend more time on the platform than on YouTube. Noam Shazeer built the AI companionship app that a generation has made part of daily life.",
    deck: "Character.AI lets users chat with AI characters — custom AI personalities, roleplay AI, and AI companions — driving engagement metrics that rival the world's top social platforms.",
    cols: [
      {
        h: "The Most Engaging AI Product Ever Built",
        b: "Noam Shazeer co-authored the 'Attention Is All You Need' paper — the foundational Transformer research that underlies GPT-4, Gemini, and every modern LLM. He left Google to build Character.AI with Daniel De Freitas in 2021, betting that the most valuable application of language models wasn't productivity or search — it was human connection.\n\nThe bet has proven correct. Character.AI users spend an average of 2+ hours per day on the platform — more than TikTok, more than YouTube, more than any social network except Facebook Messenger. Chat with AI characters, roleplay AI, and custom AI personalities have become the platform's highest-volume search terms.",
      },
      {
        h: "AI Girlfriend, Therapist, and Study Partner",
        b: "Character.AI's user base skews 18–25 and uses the platform for a startling range of emotional and practical purposes: language practice, creative writing, companionship, homework help, mental health support, and entertainment roleplay.\n\nThe 'AI girlfriend/boyfriend chatbot' and 'custom AI personalities' use cases drive enormous search volume and organic growth — but they also bring Character.AI into contentious territory around AI companionship ethics, addiction potential, and safety guardrails for minors. The company has invested heavily in trust and safety infrastructure in 2025.",
      },
      {
        h: "The Google Licensing Deal and the $5B Company",
        b: "In 2024, Google signed a licensing deal with Character.AI worth approximately $2.7B, while co-founders Noam Shazeer and Daniel De Freitas returned to Google to lead AI research. The company itself remains independent, continuing to operate and develop the platform with new leadership.\n\nCharacter.AI's $5B valuation reflects its extraordinary engagement metrics. With over 20 million daily active users and one of the most loyal user bases in consumer tech, it remains the defining platform for entertainment AI — a category that didn't exist four years ago.",
      },
    ],
    pull: "We asked: what do people actually want to do with AI? The answer wasn't productivity. It was connection.",
    pullBy: "Noam Shazeer",
    lesson: "Engagement is truth. Build the product people come back to every day without being prompted, and the business follows.",
    stats: [
      { l: "Valuation",   v: "$5B"    },
      { l: "Founded",     v: "2021"   },
      { l: "DAU",         v: "20M+"   },
      { l: "Total Raised",v: "$600M+" },
    ],
  },

  // ── 06 · ANTHROPIC ────────────────────────────────────────────────────────
  {
    no: "06", edition: "No. 06",
    category: "ENTERPRISE AI",
    name: "Dario Amodei & Daniela Amodei",
    nameShort: "Dario Amodei",
    initials: "A",
    company: "Anthropic", slug: "anthropic",
    role: "Co-Founders — CEO & President",
    city: "San Francisco, CA", context: "Ex-OpenAI researchers building safe enterprise AI",
    valuation: "$61B", funding: "$12B+", founded: "2021",
    imgSrc: "https://image.cnbcfm.com/api/v1/image/108250830-260106-cg-31-anthropic-openai-thumb_no_text.png?v=1767997984&w=750&h=422&vtcrop=y",
    videoId: "Gi8LUnhP5yU",
    videoTitle: "Dario Amodei — Anthropic, Claude 3, and the Future of Safe Enterprise AI",
    accent: "#D97706", accentBg: "#FFFBEB", accentBorder: "#FDE68A",
    headline: "Dario and Daniela Amodei left OpenAI to build an AI safety company. Claude became the world's preferred AI for coding, enterprise, and safe business use.",
    deck: "Anthropic's Claude models lead on safety, capability, and enterprise trust. Claude 3 AI login, the Anthropic API, and AI for coding are among the fastest-growing search categories in enterprise software.",
    cols: [
      {
        h: "The Safety-First Bet on Enterprise AI",
        b: "Dario Amodei was VP of Research at OpenAI before leaving with several colleagues — including his sister Daniela — to found Anthropic in 2021. The founding thesis was that AI safety research and frontier model development had to happen together, not in separate organisations.\n\nClaude — named after Claude Shannon, father of information theory — launched in 2023 and immediately differentiated on two dimensions: Constitutional AI (a training approach designed to make models less harmful) and context window size, giving enterprise users the ability to process entire codebases, legal documents, and research papers in a single prompt.",
      },
      {
        h: "Claude 3 and the AI for Coding Revolution",
        b: "Claude 3 Opus, Sonnet, and Haiku launched in March 2024 and achieved state-of-the-art results on coding, reasoning, and instruction following benchmarks. 'AI for coding' became one of the most searched enterprise software terms of 2024–2025, and Claude consistently ranks as developers' preferred model alongside GPT-4o.\n\nThe Anthropic API's developer ecosystem has grown rapidly, powering everything from internal enterprise tools to consumer-facing coding assistants. 'Claude 3 AI login' and 'Anthropic API' have become two of the highest-volume searches among technical users — a direct measure of developer mindshare.",
      },
      {
        h: "The $61 Billion Safe Enterprise AI Company",
        b: "Anthropic raised $4B from Amazon in 2023, followed by additional Amazon commitments totalling $7.5B and a Google investment of $2B+ — making it one of the most heavily capitalised AI safety companies in history. The $61B valuation in 2025 reflects both its technical reputation and its enterprise traction.\n\nAmazon's AWS has made Claude the default AI model in its Bedrock platform, giving Anthropic distribution to hundreds of thousands of enterprise customers. Safe enterprise AI is not just a positioning statement — it's the reason governments, legal firms, healthcare organisations, and financial institutions choose Claude over competitors.",
      },
    ],
    pull: "The most important thing we can do right now is ensure that as AI gets more powerful, it also gets more honest, more helpful, and less harmful.",
    pullBy: "Dario Amodei",
    lesson: "In enterprise, safety is a feature. The customers who need AI most are also the ones who can't afford it to go wrong.",
    stats: [
      { l: "Valuation",   v: "$61B"   },
      { l: "Founded",     v: "2021"   },
      { l: "Total Raised",v: "$12B+"  },
      { l: "Lead Backer", v: "Amazon" },
    ],
  },

  // ── 07 · RAMP ─────────────────────────────────────────────────────────────
  {
    no: "07", edition: "No. 07",
    category: "FINANCIAL OPERATIONS",
    name: "Eric Glyman & Karim Atiyeh",
    nameShort: "Eric Glyman",
    initials: "RA",
    company: "Ramp", slug: "ramp",
    role: "Co-Founders — CEO & CTO",
    city: "New York, NY", context: "Building the corporate card that saves companies money",
    valuation: "$13B", funding: "$1.6B+", founded: "2019",
    imgSrc: "https://fortune.com/img-assets/wp-content/uploads/2025/09/web-horizontal-082125_Rivera_Fortune_Ramp6707-e1758217924284.webp?format=webp&w=1440&q=100",
    videoId: "GvFn-JwDJOo",
    videoTitle: "Eric Glyman on How Ramp Is Automating Business Finance",
    accent: "#F59E0B", accentBg: "#FFFBEB", accentBorder: "#FDE68A",
    headline: "Ramp's corporate credit card is the only card in history designed to help you spend less. That contrarian idea built a $13B company.",
    deck: "Ramp automates business expenses, eliminates waste, and replaces your entire finance stack. The fastest-growing corporate card and spend management software in the US.",
    cols: [
      {
        h: "The Corporate Card That Saves You Money",
        b: "Every corporate credit card in history was designed to maximise spending — higher limits, more rewards, more transactions. Eric Glyman and Karim Atiyeh launched Ramp in 2019 with the opposite thesis: what if a corporate card actively helped companies spend less?\n\nRamp's spend management software flags duplicate subscriptions, identifies vendor overcharges, and automates expense reporting — saving the average customer 3.5% on annual spend. 'Automate business expenses' and 'spend management software' became two of the fastest-growing B2B software search categories in 2024, and Ramp dominates both.",
      },
      {
        h: "The Ramp vs Brex Battle",
        b: "Ramp and Brex have become the defining rivalry in modern corporate finance. Both offer corporate credit cards for startups and growth-stage companies. But Ramp has consistently differentiated on automation depth and savings intelligence — its AI surfaces cost-reduction opportunities that Brex's platform doesn't.\n\nThe 'Ramp vs Brex' search comparison is now one of the highest-volume queries in B2B fintech — a measure of how seriously finance teams research the switch. Ramp has won an estimated 40%+ of competitive head-to-head evaluations, and its NPS among finance teams consistently ranks above 70.",
      },
      {
        h: "The Full Finance Stack",
        b: "Ramp has expanded from corporate cards to a full financial operations platform: bill payments, expense reimbursements, procurement, accounting integrations, and AI-powered financial insights. The company processes over $30B in annualised transaction volume.\n\nThe $13B valuation reflects Ramp's position not as a card company but as the operating system for business finance — a category that incumbents like American Express, SAP Concur, and Expensify have failed to meaningfully innovate in for over a decade. Investors include Founders Fund, Stripe, Goldman Sachs, and Thrive Capital.",
      },
    ],
    pull: "Every other card company is incentivised to make you spend more. We're the only ones incentivised to make you spend less. That's not marketing — it's a different business model.",
    pullBy: "Eric Glyman",
    lesson: "Align your business model with your customer's actual goal, not the proxy metric that's easy to monetise.",
    stats: [
      { l: "Valuation",    v: "$13B"   },
      { l: "Founded",      v: "2019"   },
      { l: "Annual Volume",v: "$30B+"  },
      { l: "Total Raised", v: "$1.6B+" },
    ],
  },

  // ── 08 · REMOVE.BG / KALEIDO ──────────────────────────────────────────────
  {
    no: "08", edition: "No. 08",
    category: "SINGLE-PURPOSE AI UTILITY",
    name: "Benjamin Grölz & Peter Vorlaufer",
    nameShort: "Benjamin Grölz",
    initials: "RB",
    company: "remove.bg (Kaleido AI)", slug: "remove-bg",
    role: "Co-Founders",
    city: "Vienna, Austria", context: "One AI tool, one job, 150 million monthly visits",
    valuation: "Acquired by Canva", funding: "Bootstrapped", founded: "2018",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-FSxqPCoOAg3nwOwyJQ6M9KzMNwIFLkrzg&s",
    videoId: "HqhJCo7bShI",
    videoTitle: "How Remove.bg Built a 150-Million-Visit AI Utility from a Single Feature",
    accent: "#06B6D4", accentBg: "#ECFEFF", accentBorder: "#A5F3FC",
    headline: "Remove.bg does exactly one thing — remove the background from your image — and gets 150 million visits per month doing it. The most powerful lesson in product focus.",
    deck: "Remove background from image is one of the highest-traffic search terms in AI tools. Remove.bg built a business worth hundreds of millions by doing one thing better than anyone else.",
    cols: [
      {
        h: "One Tool. One Job.",
        b: "Benjamin Grölz and Peter Vorlaufer launched Remove.bg in 2018 with a product that did exactly one thing: remove the background from any photo automatically, using AI, in under five seconds. No signup required. No Photoshop knowledge needed.\n\n'Remove background from image' became one of the most searched photo editing queries on the internet — and Remove.bg owned it completely. The site reached 1 billion images processed by 2020. The business was largely bootstrapped, profitable from early on, and grew entirely through organic search traffic.",
      },
      {
        h: "The SEO Moat of Doing One Thing Perfectly",
        b: "Remove.bg's traffic strategy is a masterclass in long-tail keyword dominance. 'Transparent background maker', 'AI photo cutout', 'remove background free', 'background eraser online' — the product and its supporting content pages rank #1 across the entire category.\n\nBecause the tool works instantly without signup for basic use, users share it virally across design communities, social media, and Slack groups. The refer-and-retain loop has kept Remove.bg at 150M+ monthly visits for years — traffic that most well-funded startups spend tens of millions trying to generate.",
      },
      {
        h: "Acquired by Canva: The $100M+ Exit",
        b: "Kaleido AI — the Vienna-based company behind Remove.bg and its family of single-purpose AI tools (including Slazzer and icons8 integrations) — was acquired by Canva in 2021 for a reported $100M+. The acquisition brought Remove.bg's background removal technology directly into Canva's design platform, powering the 'Background Remover' feature used by millions of Canva users daily.\n\nThe Remove.bg story is the ultimate validation of single-purpose AI utilities: find the most common, highest-friction photo or document task that professionals and consumers both need, solve it with AI instantly, charge for volume API use, and let search traffic compound the business over time.",
      },
    ],
    pull: "We built one tool and made it work perfectly. That turned out to be enough.",
    pullBy: "Benjamin Grölz",
    lesson: "The highest-traffic AI products don't do everything. They do one thing — the thing everyone needs — instantly and flawlessly.",
    stats: [
      { l: "Monthly Visits",    v: "150M+"       },
      { l: "Founded",           v: "2018"        },
      { l: "Images Processed",  v: "1B+"         },
      { l: "Exit",              v: "Canva Acq."  },
    ],
  },

  // ── 09 · SMALLPDF ─────────────────────────────────────────────────────────
  {
    no: "09", edition: "No. 09",
    category: "PRODUCTIVITY TOOLS",
    name: "Roy Röthlisberger & Siebren Schoemaker",
    nameShort: "Roy Röthlisberger",
    initials: "SP",
    company: "Smallpdf", slug: "smallpdf",
    role: "Co-Founders",
    city: "Zürich, Switzerland", context: "The PDF utility that prints more revenue than most unicorns",
    valuation: "$300M+", funding: "Bootstrapped", founded: "2013",
    imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS34KPSUIoLqvgzl8JNJX0VIxLoJieom7GQPA&s",
    videoId: "Ox3K-KGq8-Q",
    videoTitle: "How Smallpdf Built a Profitable $300M Business by Solving PDF Pain",
    accent: "#EF4444", accentBg: "#FEF2F2", accentBorder: "#FECACA",
    headline: "Compress PDF. Convert PDF to Word. Merge PDF free. Three search queries. One bootstrapped company doing $50M+ in revenue.",
    deck: "Smallpdf built a $300M+ productivity business by owning the most universally painful digital task — dealing with PDFs. No VC. No hype. Just 50 million monthly users.",
    cols: [
      {
        h: "The Universal Pain of PDFs",
        b: "Roy Röthlisberger and Siebren Schoemaker launched Smallpdf in 2013 with a simple observation: every office worker in the world deals with PDFs, and the tools to handle them were either too expensive (Adobe Acrobat), too complex, or too slow.\n\nSmallpdf's initial product was a single page: drag a PDF in, get a smaller file out. 'Compress PDF' quickly became one of the highest-traffic utility searches on the internet, and Smallpdf's clean, instant tool owned the top result. No signup, no download, no friction — just the thing you needed done in 30 seconds.",
      },
      {
        h: "The Productivity SEO Flywheel",
        b: "Smallpdf's growth model is the textbook example of utility SEO compounding. Each new tool — 'convert PDF to Word', 'merge PDF free', 'edit PDF online', 'split PDF', 'PDF to JPG' — targeted a distinct high-volume search query, built its own landing page, and accumulated its own backlink profile over years.\n\nThe company now offers 21 PDF tools, each ranking at or near the top of its respective search category. Aggregate monthly visits exceed 50 million across the product suite. This is entirely organic traffic — the company has spent almost nothing on paid acquisition.",
      },
      {
        h: "Bootstrapped, Profitable, and Building AI",
        b: "Smallpdf is among the most remarkable bootstrapped SaaS companies in Europe — profitable since its early years, with $50M+ in annual recurring revenue, without ever raising institutional funding. Its freemium model (free for limited daily use; Pro at $9–12/month) converts a meaningful fraction of its enormous free user base into paying subscribers.\n\nIn 2024 and 2025, Smallpdf has added AI capabilities: AI PDF summariser, AI form filling, and AI document translation — extending its utility lead and targeting a new wave of 'AI PDF tool' search queries that are growing at 200%+ year-over-year.",
      },
    ],
    pull: "We didn't raise money because we didn't need to. The product paid for itself. That's the only metric that matters.",
    pullBy: "Roy Röthlisberger",
    lesson: "Solve the task everyone needs done but nobody wants to spend time on. Then make it free enough that nobody bothers looking for an alternative.",
    stats: [
      { l: "Valuation",   v: "$300M+"  },
      { l: "Founded",     v: "2013"    },
      { l: "Monthly Users",v: "50M+"  },
      { l: "Funding",     v: "Bootstrapped" },
    ],
  },

  // ── 10 · PREPLY ───────────────────────────────────────────────────────────
  {
    no: "10", edition: "No. 10",
    category: "EDTECH & LANGUAGE LEARNING",
    name: "Kirill Bigai",
    nameShort: "Kirill Bigai",
    initials: "PR",
    company: "Preply", slug: "preply",
    role: "Co-Founder & CEO",
    city: "Barcelona, Spain / New York, NY", context: "The language tutoring platform that became an SEO juggernaut",
    valuation: "$1B+", funding: "$220M+", founded: "2012",
    imgSrc: "https://economia3.com/wp-content/uploads/2024/02/Kirill-Bigai-CEO-de-Preply.jpg",
    videoId: "6kHMVPHDiB4",
    videoTitle: "Kirill Bigai on How Preply Became the World's Leading Language Tutoring Platform",
    accent: "#2563EB", accentBg: "#EFF6FF", accentBorder: "#BFDBFE",
    headline: "Preply matches students with native-speaking tutors in 50+ languages. It became an SEO juggernaut by owning 'learn English online' — and everything around it.",
    deck: "Preply's tutor marketplace connects 40,000+ tutors with learners in 190 countries. It dominates the 'best language learning apps 2026' and 'Spanish tutor near me' search categories worldwide.",
    cols: [
      {
        h: "The Tutor Marketplace No One Else Built Properly",
        b: "Kirill Bigai co-founded Preply in Kyiv in 2012, initially as a marketplace for tutors across all subjects. The pivot to language learning — specifically pairing students with native-speaking tutors for live, 1-on-1 lessons — proved to be the platform's defining decision.\n\nWhile Duolingo gamified language learning and Babbel packaged it into courses, Preply bet on something neither offered: a real human on the other side of the screen. 'Learn English online with a native speaker' and 'Spanish tutor near me' became Preply's anchor keywords — and it built content and product around owning them completely.",
      },
      {
        h: "The SEO Juggernaut Strategy",
        b: "Preply's content marketing and SEO strategy is regarded as one of the most effective in EdTech. The company has built thousands of language-learning resource pages — grammar guides, vocabulary lists, pronunciation tutorials — each targeting a specific long-tail query.\n\n'Best language learning apps 2026', 'how to learn Spanish fast', 'online English tutor affordable', 'native speaking tutors' — Preply ranks on page one for hundreds of high-intent language learning queries globally. The organic traffic moat this creates is worth tens of millions in equivalent paid search spend annually.",
      },
      {
        h: "Enterprise and the B2B Push",
        b: "Preply's most significant revenue growth has come from Preply Business — its corporate language training product. Major employers including Spotify, Booking.com, and Dell use Preply to offer language training as an employee benefit, with progress tracking, manager dashboards, and lessons in 50+ languages.\n\nThe enterprise pivot has transformed Preply from a tutoring marketplace into a workforce development platform. With 40,000+ tutors, 300,000+ active learners, and operations in 190 countries, it is the largest personalised language tutoring platform in the world — and one of the most profitable EdTech unicorns of the 2020s.",
      },
    ],
    pull: "Duolingo teaches you to say 'the cat drinks milk'. A real tutor teaches you to have a conversation. We always believed the tutor wins.",
    pullBy: "Kirill Bigai",
    lesson: "In education, the product that delivers real outcomes at scale always outperforms the product that just feels like learning.",
    stats: [
      { l: "Valuation",   v: "$1B+"   },
      { l: "Founded",     v: "2012"   },
      { l: "Tutors",      v: "40K+"   },
      { l: "Total Raised",v: "$220M+" },
    ],
  },
]
