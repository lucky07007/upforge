// components/forbes/forbes-blogs.tsx
"use client"

import { ArrowUpRight } from "lucide-react"

export function ForbesBlogs() {

  const blogs = [
    {
      id: 1,
      title: "WhatsApp Business Chat Filter: Auto-Separate Spam Feature Leaked",
      author: "Sophia Nair",
      role: "Messaging Platforms Technology Analyst",
      img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202604/whatsapp-275346757-16x9.jpg?VersionId=_JfUx7kCJ83JoNIjvnGINCpwKW89rS9.&size=690:388",
      url: "https://blog.upforge.org/2026/04/whatsapp-business-chat-filter-spam-solution-2026.html"
    },
    {
      id: 2,
      title: "EU Jet Fuel Emergency: 6 Weeks Left as Iran War Chokes Flights",
      author: "Oliver Strauss",
      role: "European Energy Security Correspondent",
      img: "https://www.reuters.com/resizer/v2/NGRI46ILK5L65GUFYRMKAW2ISU.jpg?auth=180679ae77ac7acb25610bb0de6fd365487124172b8775e544f00d7d2dd8435e&width=960&quality=80",
      url: "https://blog.upforge.org/2026/04/eu-jet-fuel-crisis-iran-war-travel-warning-2026.html"
    },
    {
      id: 3,
      title: "India Slips to 6th Largest Economy 2025: IMF Ranking Shock",
      author: "Amelia Grant",
      role: "Global Economy Correspondent",
      img: "https://images.moneycontrol.com/static-mcnews/2026/04/20260415121726_India-Indian-economy.png?impolicy=website&width=770&height=431",
      url: "https://blog.upforge.org/2026/04/india-economy-ranking-2025-slips-to-6th.html"
    },
    {
      id: 4,
      title: "Is Claude Down? Live Outage Status & Why It's Failing",
      author: "Jennifer Tan",
      role: "AI Infrastructure Analyst",
      img: "https://cdn.mos.cms.futurecdn.net/zEFXeYTtHV8bCodc2TArfH-650-80.jpg.webp",
      url: "https://blog.upforge.org/2026/04/is-claude-down-outage-status-2026.html"
    },
    {
      id: 5,
      title: "Palm Sunday 2026: Meaning, Global Significance, Pope Leo’s Message & Why the World Is Talking About It Today",
      author: "Daniel Pereira",
      role: "Global Affairs Editor",
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEix8LThcSVqx2d8mWa1SX0WK-7mnW6B-ihkfVJw0H1sLWq50DPilO70r9XmtdlsjbfHrtkBO8OiQ3FOhB8t93wQpPF5xYhbOOoMjrEFJCt5W5NNWhzxS-SmDFFYFcTGBE1uS2woROZFtsTWx-oP5wKtf-hhNbLNpdTTc6oaMxMbv-_jlZ40zqagyiNEsQ=w640-h400-rw",
      url: "https://blog.upforge.org/2026/03/palm-sunday-2026-meaning-global.html"
    },
    {
      id: 6,
      title: "Tiger Woods Crash 2026: DUI Arrest, Rollover Accident & Latest Health Update",
      author: "Marcus Lee",
      role: "Sports Intelligence Reporter",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8e0oS0ovLAkWoS5N8QCRf5yU-C_rtDuXn73nNBUKZAGmptpqsVa18cbNP2VLmXZ7IINkmlsRDEPNx2Y0EorbTbQTARBWL1GSGhKB_AtjYkN0n8CwsTGiD1pWofs8H8nFaZWpS2PLlcwITpYcckTS6uMTVG3AWAg7GVwSpWM8WSw2HQMCT6WV6YF4P4Q/w640-h480-rw/Tiger%20Woods%20Crash%202026.jpg",
      url: "https://blog.upforge.org/2026/03/tiger-woods-crash-2026-dui-arrest.html"
    },
    {
      id: 7,
      title: "OpenAI Sora Shutdown Truth: Sora App Availability Explained (2026)",
      author: "Rahul Menon",
      role: "Emerging AI Policy Researcher",
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiGnimsdna5b2whjuPTNEI7zY63uwO58HxFQ7OKo81lAVzsuI90k731Atup_i7jclDB7lg4LCKmpMSK7IKDR3Bcm7FcMEAWJy4ctuY0Q9q_WfpZs9QA4rXwu9v3C4IqptBuzSEZP0A09a4wDeKgmulKZ9nfj-JAWnsmlr6SsjWwMuGtJxhJh2rHItEDZg/w640-h426-rw/openai-sora-shutdown-truth-ai-video-explainer.png",
      url: "https://blog.upforge.org/2026/03/truth-about-sora-app.html"
    }
  ]



  return (
    <div className="pt-2 pb-6 w-full mt-4">

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-2 border-b-[1.5px] border-foreground">

        <h2 className="font-sans font-black text-[13px] uppercase tracking-widest text-[#C59A2E]">
          UpForge Intelligence Journal
        </h2>

        <a
          href="https://blog.upforge.org/"
          target="_blank"
          className="group inline-flex items-center gap-1.5 font-sans font-bold text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          Read Full Journal
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

      </div>


      {/* Blog Feed */}
      <div className="flex flex-col gap-6 md:gap-8">

        {blogs.map((blog) => (

          <a
            key={blog.id}
            href={blog.url}
            target="_blank"
            className="group flex flex-row items-center gap-5 sm:gap-6 pb-6 lg:pb-8 border-b border-border/60 last:border-0 transition-all duration-300 hover:translate-x-[2px]"
          >

            {/* Thumbnail */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 shrink-0 bg-muted overflow-hidden border border-border">

              <img
                src={blog.img}
                alt={blog.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />

            </div>


            {/* Content */}
            <div className="flex flex-col justify-center flex-1 py-1">

              <h3 className="font-serif font-bold text-lg sm:text-xl lg:text-[1.55rem] leading-snug text-foreground mb-2 group-hover:text-[#C59A2E] transition-colors line-clamp-3">

                {blog.title}

              </h3>


              {/* Author */}
              <div className="mt-1 flex items-center flex-wrap gap-1">

                <span className="font-sans font-bold text-[11px] sm:text-[12px] text-foreground">
                  By
                  <span className="ml-1 underline underline-offset-2 group-hover:text-[#C59A2E]">
                    {blog.author}
                  </span>
                </span>

                <span className="font-sans text-[11px] sm:text-[12px] text-muted-foreground">
                  · {blog.role}
                </span>

              </div>

            </div>

          </a>

        ))}

      </div>


      {/* Footer CTA */}
      <div className="mt-12 flex justify-center border-t border-border pt-10">

        <a
          href="https://blog.upforge.org/"
          target="_blank"
          className="font-sans font-bold text-[11px] uppercase tracking-widest text-foreground border border-foreground px-10 py-3.5 hover:bg-muted transition-colors inline-block"
        >
          View More Journals
        </a>

      </div>

    </div>
  )
}
