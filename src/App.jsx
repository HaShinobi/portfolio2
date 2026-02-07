import React from "react";

const Container = ({ children }) => (
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const Section = ({ id, title, children }) => (
  <section id={id} className="py-16 sm:py-20">
    <Container>
      <h2 className="text-xl tracking-wide text-zinc-300 mb-4">{title}</h2>
      <div className="h-px w-full bg-zinc-800 mb-6" />
      {children}
    </Container>
  </section>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300 shadow-sm">
    {children}
  </span>
);

const Tag = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/50 px-2 py-0.5 text-[11px] text-zinc-300">
    {children}
  </span>
);

const PillLink = ({ href, icon, label }) => (
  <a
    href={href}
    target={href?.startsWith("#") ? undefined : "_blank"}
    rel={href?.startsWith("#") ? undefined : "noreferrer"}
    className="inline-flex items-center gap-2 rounded-lg border border-zinc-700/70 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800/70 transition"
  >
    {icon}
    <span className="font-medium">{label}</span>
    {!href?.startsWith("#") && (
      <svg
        className="size-3 opacity-70"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    )}
  </a>
);

const Card = ({ children }) => (
  <div className="rounded-2xl border border-zinc-700/70 bg-zinc-900/60 p-5 shadow-sm hover:shadow-md hover:bg-zinc-900 transition">
    {children}
  </div>
);

const Divider = () => <div className="my-2 h-px w-full bg-zinc-800" />;

const Logo = ({ kind }) => {
  const map = { in: "in", gh: "{}", x: "𝕏", sc: "⊕", cv: "🗎", mail: "✉︎" };
  return (
    <span className="grid place-items-center rounded-md border border-zinc-700 bg-zinc-900/70 text-[11px] w-5 h-5">
      {map[kind] || "•"}
    </span>
  );
};

// ---------- Projects ----------
const ProjectCard = ({ p }) => (
  <Card>
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">{p.name}</h3>
          <p className="mt-1 text-sm text-zinc-400">{p.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          {p.links?.github && (
            <PillLink
              href={p.links.github}
              label="GitHub"
              icon={<Logo kind="gh" />}
            />
          )}
          {p.links?.details && (
            <PillLink
              href={p.links.details}
              label="More details"
              icon={<span className="text-[12px]">↗</span>}
            />
          )}
          {p.links?.demo && (
            <PillLink
              href={p.links.demo}
              label="Live demo"
              icon={<span className="text-[12px]">▶</span>}
            />
          )}
        </div>
      </div>

      {/* Optional project images row */}
      {p.images?.length > 0 && (
        <>
          <Divider />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {p.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${p.name} screenshot ${idx + 1}`}
                className="w-full h-44 object-cover rounded-xl border border-zinc-700"
                loading="lazy"
              />
            ))}
          </div>
        </>
      )}

      <Divider />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-zinc-300 mb-2">
            Functionality
          </div>
          <ul className="space-y-2 text-sm text-zinc-400 list-disc pl-5">
            {p.functionality?.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-medium text-zinc-300 mb-2">Design</div>
          <ul className="space-y-2 text-sm text-zinc-400 list-disc pl-5">
            {p.design?.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      {p.stack?.length > 0 && (
        <>
          <Divider />
          <div className="flex flex-wrap gap-2">
            {p.stack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </>
      )}
    </div>
  </Card>
);

// ---------- Publications ----------
const PublicationCard = ({ pub }) => (
  <Card>
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-100">{pub.title}</h3>
          <p className="text-sm text-zinc-400 mt-1">
            {pub.venue}
            {pub.year ? ` • ${pub.year}` : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {pub.badges?.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
      </div>

      {pub.authors && (
        <p className="text-sm text-zinc-300/90">
          <span className="text-zinc-400">Authors:</span> {pub.authors}
        </p>
      )}

      {pub.abstract && (
        <p className="text-sm text-zinc-400 leading-relaxed">{pub.abstract}</p>
      )}

      {pub.tags?.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-2">
          {pub.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}

      {pub.links && (
        <div className="mt-2 flex flex-wrap gap-2">
          {pub.links.paper && (
            <PillLink
              href={pub.links.paper}
              label="Paper"
              icon={<span className="text-[12px]">📄</span>}
            />
          )}
          {pub.links.doi && (
            <PillLink
              href={pub.links.doi}
              label="DOI"
              icon={<span className="text-[12px]">⎋</span>}
            />
          )}
          {pub.links.code && (
            <PillLink
              href={pub.links.code}
              label="Code"
              icon={<Logo kind="gh" />}
            />
          )}
          {pub.links.slides && (
            <PillLink
              href={pub.links.slides}
              label="Slides"
              icon={<span className="text-[12px]">🖼</span>}
            />
          )}
        </div>
      )}
    </div>
  </Card>
);

// ---------- Data (edit me!) ----------
const profile = {
  name: "Hashem",
  title: "Hey, I'm Hashem!",
  subtitle:
    "A KFUPM University student majoring in Electrical Engineering. Currently exploring Smart Electrotherapy and Electronic Defense Systems. Based in Dhahran, KSA.",
  fun: [
    "I am a Syrian/Dominican National",
    "I'm a big fan of Shinobis, and enjoy practicing Cross Country and Competitive Programming in my free time.",
  ],
  avatar: "Hashem Altujar.jpg",
  links: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hashem-altujar-b7366419b/",
      icon: "in",
    },
    { label: "GitHub", href: "https://github.com/HaShinobi", icon: "gh" },
    {
      label: "ResearchGate",
      href: "https://www.researchgate.net/profile/Hashem-Altujar?ev=hdr_xprf",
      icon: "sc",
    },
    {
      label: "Resume",
      href: "https://drive.google.com/file/d/1WrIYAL6NX20_O82nkXk6QaR3hZI7lWN5/view?usp=sharing",
      icon: "cv",
    },
    { label: "Contact", href: "#contact", icon: "x" },
  ],
};

// ✅ Experiences with 500x500 PNG logos
// Put these logos in: /public/logos/
const experiences = [
  {
    org: "KFUPM Research and Innovation",
    role: "Research Student",
    time: "09/2025 - Current",
    location: "Dhahran, Saudi Arabia",
    logo: "KFUPM_INNOVATION_BLACK.png",
    bullets: [
      "Developing a robotic hand for real-time speech-to-sign-language translation.",
      "Designed and assembled CAD model with 16 degrees of freedom.",
      "Utilizing NVIDIA Jetson Orin Nano for real-time speech-to-text translation and gloss language conversion.",
      "Developing a ROS model to control robot motor functions to translate gloss to American Sign Language (ASL).",
    ],
  },
  {
    org: "KFUPM Robotics Team",
    role: "Design & Assembly Lead",
    time: "10/2025 - Current",
    location: "Dhahran, Saudi Arabia",
    logo: "KRT.png",
    bullets: [
      "Currently designing a 22 × 22 × 22 remote-controlled robot to compete in the annual VEX U Pushback 2025 Competition.",
      "Used AutoCAD to design the robot and assembled intake, outtake, and scoring mechanism through a system of motors, flex wheels, and pneumatics.",
    ],
  },
  {
    org: "KFUPM Research & Innovation — Telecommunications Research Lab",
    role: "Research Student",
    time: "06/2025 - 10/2025",
    location: "KFUPM, Dhahran, Saudi Arabia",
    logo: "KFUPM_INNOVATION_BLACK.png",
    bullets: [
      "Designed and 3D-printed a weather-resistant sensor enclosure (AutoCAD, Fusion 360).",
      "Developed a hybrid drone-detection pipeline on NVIDIA Jetson Nano (Ubuntu) with real-time inference (15–20 FPS).",
      "Trained a ResNet-based acoustic classifier (TensorFlow, ~92% precision).",
      "Implemented Direction-of-Arrival (DoA) localization via microphone array.",
    ],
  },
  {
    org: "KFUPM Research and Innovation",
    role: "Research Student",
    time: "05/2025 - 10/2025",
    location: "KFUPM, Dhahran, Saudi Arabia",
    logo: "KFUPM_INNOVATION_BLACK.png",
    bullets: [
      "Primary author of a 2,700-word literature review on acoustic UAV detection pipelines and signal-processing workflows.",
      "Analyzed 20+ studies (2018–2024) and synthesized findings across noise filtering, feature engineering, classification, and cost effectiveness.",
      "Published in IEEE SCC 2025.",
    ],
  },
];

const skills = [
  { category: "Programming Languages", items: ["Python"] },
  { category: "Backend", items: ["Git", "Linux"] },
  { category: "Machine Learning", items: ["TensorFlow", "NumPy", "Scikit-learn"] },
  {
    category: "Embedded Systems & Electronics",
    items: ["Robotics", "Arduino", "Microcontrollers", "Jetson Nano"],
  },
  { category: "Design & Fabrication", items: ["3D Design (AutoCAD)", "3D Printing"] },
];

const projects = [
  {
    name: "KFUPM Robotics Team: Theeb",
    tagline:
      "Leader of Robot Theeb for the VEX 2026 National Competition",
    images: ["krt_team.jpeg", "theeb.jpeg", "theeb2.png"],
    functionality: [
      "4:3 Gear Ratio Base for higher torque",
      "L-Pathway with Pneumatic intake",
      "Color sorting mechanism to remove enemy balls.",
    ],
    design: [
      "H-bridge drivetrain with 4 motors",
      "14' x  18' x 20'"
    ],
    stack: ["VEX Pushback", "Robotics", "CAD", "Mechanical", "Leader"],
    links: {
      github: "https://github.com/HaShinobi/REPO_NAME",
      details: "https://drive.google.com/file/d/1dGkBVYeNqGBXQcTXNkhISZzXhaKhiWgP/view?usp=sharing",
      demo: "",
    },
  },
  {
    name: "Robotic Hand: Speech-to-Sign Translation (IN PROGRESS)",
    tagline:
      "Real-time speech → text → gloss → ASL motion on an embedded robot hand.",
    images: ["/projects/hand-1.jpg", "/projects/hand-2.jpg", "/projects/hand-3.jpg"],
    functionality: [
      "Speech-to-text pipeline optimized for embedded hardware",
      "Gloss conversion layer feeding motion primitives",
      "Motor-control stack to execute sign sequences",
    ],
    design: [
      "16-DoF CAD-driven mechanical design",
      "Jetson Orin Nano for real-time inference",
      "ROS-based control architecture for modularity",
    ],
    stack: ["ROS", "Jetson Orin Nano", "CAD", "Embedded", "Robotics"],
    links: {
      github: "https://github.com/HaShinobi/REPO_NAME",
      details: "https://github.com/HaShinobi/REPO_NAME#readme",
      demo: "",
    },
  },
  {
    name: "Hybrid Drone Detection (Jetson Nano)",
    tagline:
      "Edge inference UAV detection with acoustic classification and DoA localization.",
    images: [
      "Fusion_Drone_detection.png",
      "drone_detection_1.png",
      "drone_detection.png",
    ],
    functionality: [
      "Real-time inference pipeline (15–20 FPS)",
      "Acoustic ResNet classifier (~92% precision)",
      "DoA localization via microphone array",
    ],
    design: [
      "Weather-resistant enclosure design and fabrication",
      "Low-latency processing on Ubuntu/Jetson Nano",
      "Modular pipeline suitable for field deployment",
    ],
    stack: [
      "TensorFlow",
      "Jetson Nano",
      "Ubuntu",
      "Signal Processing",
      "3D Printing",
    ],
    links: {
      github: "https://github.com/HaShinobi/Hybrid_Drone_Detection"
    },
  },
];

// ✅ Publications (edit links/title/authors as needed)
const publications = [
  {
    title:
      "A Review of Acoustic Techniques for Drone Detection",
    venue: "IEEE SCC 2025",
    year: "2025",
    authors: "Hashem Altujar",
    abstract:
      "A 2,700-word literature review analyzing 20+ studies (2018–2024) across noise filtering, feature engineering, classification, and cost effectiveness for acoustic UAV detection.",
    badges: ["Published"],
    tags: ["UAV", "Acoustics", "Signal Processing", "Literature Review"],
    links: {
      paper: "https://www.researchgate.net/publication/398339228_A_Review_of_Acoustic_Techniques_for_Drone_Detection"
    },
  },
];

const socials = [
  { label: "Email", href: "mailto:hashem.altujar@gmail.com", icon: "mail" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hashem-altujar-b7366419b/",
    icon: "in",
  },
  { label: "GitHub", href: "https://github.com/HaShinobi", icon: "gh" },
  { label: "ORDCiD", href: "https://orcid.org/my-orcid?orcid=0009-0001-2021-6293", icon: "sc" },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/1arfHC63LRx2-I72njRYmZhHId3K7Cap2/view?usp=sharing",
    icon: "cv",
  },
];

export default function App() {
  return (
    <main className="min-h-screen bg-[#0b0c0f] text-zinc-100 antialiased">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#0b0c0f]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0b0c0f]/60">
        <Container>
          <div className="flex items-center justify-between py-4">
            <a href="#" className="font-mono text-zinc-300">
              hashemaltujar.dev
            </a>
            <nav className="flex flex-wrap gap-2">
              {profile.links.map((l) => (
                <PillLink
                  key={l.label}
                  href={l.href}
                  label={l.label}
                  icon={<Logo kind={l.icon} />}
                />
              ))}
            </nav>
          </div>
        </Container>
      </header>

      {/* Welcome / Hero */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-8 items-start">
            <img
              src="https://hashemaltujar.dev/Hashem-Altujar.jpg"
              alt="Avatar"
              className="aspect-square w-60 rounded-2xl object-cover border border-zinc-700 shadow"
            />

            <div>
              <Badge>Welcome!</Badge>
              <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">
                Hey, I'm <span className="text-zinc-50">Hashem</span>!
              </h1>
              <p className="mt-4 text-zinc-300 leading-relaxed max-w-2xl">
                {profile.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>KSA KFUPM, Dhahran</Tag>
                <Tag>🎓 King Fahd University of Petroleum and Minerals</Tag>
                <Tag>⚡ Electrotherapy & Electronic Defense Systems</Tag>
              </div>

              <ul className="mt-6 space-y-2 text-zinc-400">
                {profile.fun.map((f, i) => (
                  <li key={i} className="leading-relaxed">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Experience (logos only) */}
      <Section id="experience" title="Experience">
        <div className="grid gap-6">
          {experiences.map((e, i) => (
            <Card key={i}>
              <div className="grid grid-cols-1 md:grid-cols-[120px,1fr] gap-5 items-start">
                {/* Logo */}
                {e.logo && (
                  <img
                    src={e.logo}
                    alt={`${e.org} logo`}
                    className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-xl border border-zinc-700 bg-zinc-950/40 p-2"
                    loading="lazy"
                  />
                )}

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-zinc-100">
                      {e.role}
                    </h3>
                    {e.time && <Badge>{e.time}</Badge>}
                  </div>

                  <div className="text-sm text-zinc-400">
                    {e.org}
                    {e.location ? ` — ${e.location}` : ""}
                  </div>

                  {e.bullets?.length > 0 && (
                    <ul className="mt-1 space-y-2 text-sm text-zinc-300 list-disc pl-5">
                      {e.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects (detailed images) */}
      <Section id="projects" title="Projects">
        <div className="grid gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={i} p={p} />
          ))}
        </div>
      </Section>

      {/* Publications */}
      <Section id="publications" title="Publications">
        <div className="grid gap-4">
          {publications.map((pub, i) => (
            <PublicationCard key={i} pub={pub} />
          ))}
        </div>


      </Section>

      {/* Technical Skills */}
      <Section id="skills" title="Technical Skills">
        <div className="overflow-hidden rounded-2xl border border-zinc-700/70">
          <div className="grid grid-cols-1 md:grid-cols-5 bg-zinc-950/40">
            <div className="hidden md:block col-span-2 p-4 text-sm font-medium text-zinc-400">
              Category
            </div>
            <div className="md:col-span-3 p-4 text-sm font-medium text-zinc-400">
              Technologies
            </div>
          </div>
          {skills.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-5 border-t border-zinc-800"
            >
              <div className="md:col-span-2 p-4 text-zinc-200">
                {row.category}
              </div>
              <div className="md:col-span-3 p-4">
                <div className="flex flex-wrap gap-2">
                  {row.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm text-zinc-300">Full Name</label>
                <input
                  className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">
                  Email Address
                </label>
                <input
                  className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="johndoe@example.com"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Subject</label>
                <input
                  className="mt-1 w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="Your subject must be 250 characters or fewer."
                />
              </div>
              <div>
                <label className="text-sm text-zinc-300">Message</label>
                <textarea
                  className="mt-1 h-40 w-full rounded-xl border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-600"
                  placeholder="Your message must be 2500 characters or fewer."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-zinc-200 px-4 py-2 text-zinc-900 font-medium hover:bg-white transition"
              >
                Submit
              </button>
            </form>
          </Card>

          <div className="lg:col-span-2 grid gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-zinc-700/70 bg-zinc-900/60 px-4 py-3 text-zinc-200 hover:bg-zinc-900"
              >
                <div className="flex items-center gap-3">
                  <Logo kind={s.icon} />
                  <span>{s.label}</span>
                </div>
                <svg
                  className="size-4 opacity-70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="pb-12 pt-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-500">
            <div>Last Updated 05/01/2026</div>
            <div>
              Made with <span className="text-zinc-200">♥</span> in{" "}
              <span className="text-zinc-300">KFUPM, Dhahran</span>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
