"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import CryptoDonate from "@/components/CryptoDonate";
import TechnicalVideos from "@/components/TechnicalVideos";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";

const projects = [
  {
    title: "Base Sniper Bot",
    description:
      "A sophisticated sniping bot for Base network using Bitquery Events API and Uniswap SDK for efficient token tracking and trading.",
    technologies: ["TypeScript", "Web3.js", "Bitquery API", "Uniswap SDK"],
    githubUrl: "https://github.com/akshat-cs/Base-sniper-bot",
  },
  {
    title: "NFT Marketplace",
    description:
      "A decentralized NFT marketplace built with Hardhat on Polygon Mumbai testnet, featuring NFT minting, listing, and trading capabilities.",
    technologies: ["React", "Solidity", "IPFS", "Web3.js", "Polygon"],
    githubUrl: "https://github.com/akshat-cs/nft-marketplace",
  },
  {
    title: "MERN AI Chatbot",
    description:
      "An intelligent chatbot built with MERN stack and OpenAI API, featuring secure authentication and MongoDB for chat storage.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "OpenAI API"],
    githubUrl: "https://github.com/akshat-cs/mern-ai-chatbot",
  },
  {
    title: "MERN Chat App",
    description:
      "Real-time chat application with features like direct messaging, image sharing and online/offline status using Socket.io.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Socket.io"],
    githubUrl: "https://github.com/akshat-cs/mern-chat-app",
  },
  {
    title: "React Jobs App",
    description:
      "A modern job board application with advanced filtering, search functionality, and responsive design for optimal user experience.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST API"],
    githubUrl: "https://github.com/akshat-cs/react-jobs-app",
  },
  {
    title: "NFT Ticketing dApp",
    description:
      "Built using PyTeal and Beaker for Algorand blockchain, enabling secure and transparent event ticket management.",
    technologies: ["PyTeal", "Beaker", "Algorand", "React"],
    githubUrl: "https://github.com/akshat-cs/algorand-nft-ticketing",
  },
];

const experiences = [
  {
    title: "Developer Relations Engineer",
    company: "Bitquery",
    period: "04/2024 - present",
    points: [
      "Built and managed product documentation accessed by 12K+ users, reducing support tickets",
      "Increased 10x the YouTube content reach by creating 60+ technical tutorials",
      "Built Solana data APIs adding $500K to Bitquery's annual revenue",
      "Managing technical community of 3500+ members on Telegram",
    ],
  },
  {
    title: "Developer Relations Engineer Intern",
    company: "Algorand Foundation",
    period: "06/2023 - 08/2023",
    points: [
      "Guided startup founders building NFT ticketing systems on Algorand",
      "Built NFT Ticketing dApp using PyTeal and Beaker",
      "Managed technical support on Discord with 15K+ members",
    ],
  },
];

const skills = [
  {
    category: "Programming",
    items: ["Solidity", "JavaScript", "TypeScript", "Python", "C"],
  },
  {
    category: "Frameworks",
    items: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Hardhat",
      "Foundry",
    ],
  },
  {
    category: "Blockchain",
    items: ["Ethereum", "Solana", "Algorand", "Web3.js", "The Graph"],
  },
  {
    category: "Tools & Others",
    items: ["MongoDB", "TailwindCSS", "Git", "Docker", "REST APIs"],
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0D0F]">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_100%)]" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600">
              Akshat Meena
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              Developer Relations Engineer
            </p>
            <div className="flex gap-6 justify-center mb-12">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/akshat-cs"
                target="_blank"
                className="text-3xl text-gray-300 hover:text-purple-400 transition-colors"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/akshat-meena20"
                target="_blank"
                className="text-3xl text-gray-300 hover:text-purple-400 transition-colors"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://twitter.com/akshatmeena368"
                target="_blank"
                className="text-3xl text-gray-300 hover:text-purple-400 transition-colors"
              >
                <FaXTwitter />
              </motion.a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all text-lg font-medium"
              >
                Get in Touch
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                target="_blank"
                className="px-8 py-4 rounded-full border-2 border-purple-600 hover:bg-purple-600/10 transition-all text-lg font-medium text-white"
              >
                Resume
              </motion.a>
              <CryptoDonate />
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 bg-black/30">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-lg leading-relaxed"
            >
              I&apos;m a Developer Relations Engineer at Bitquery, specializing
              in blockchain development and technical content creation. With
              experience across Ethereum, Solana, and Algorand ecosystems, I
              bridge the gap between complex blockchain technologies and
              developer communities. I&apos;ve helped numerous startups
              integrate blockchain solutions and created educational content
              reaching thousands of developers worldwide.
            </motion.p>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Experience
            </motion.h2>
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l-2 border-purple-600"
                >
                  <div className="absolute w-4 h-4 bg-purple-600 rounded-full -left-[9px] top-0" />
                  <h3 className="text-2xl font-bold text-purple-400">
                    {exp.title}
                  </h3>
                  <p className="text-xl text-gray-300 mb-2">{exp.company}</p>
                  <p className="text-gray-400 mb-4">{exp.period}</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 bg-black/30">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Skills
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl bg-purple-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <h3 className="text-xl font-bold text-purple-400 mb-4">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 rounded-full text-sm bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Featured Projects
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Technical Videos Section */}
        <TechnicalVideos />

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-black/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Get in Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-300 text-lg mb-12"
            >
              Interested in collaborating or have questions about blockchain
              development? Let&apos;s connect!
            </motion.p>
            <div className="flex flex-wrap gap-6 justify-center mb-16">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:akshatmeena368@gmail.com"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                <HiMail className="text-xl" />
                Email Me
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com/in/akshat-meena20"
                target="_blank"
                className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-purple-600 hover:bg-purple-600/10 transition-all text-white"
              >
                <FaLinkedin className="text-xl" />
                LinkedIn
              </motion.a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
