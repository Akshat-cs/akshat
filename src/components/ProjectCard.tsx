"use client";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative p-6 rounded-xl bg-purple-900/20 border border-purple-500/20 hover:border-purple-500/40 transition-all"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
      <div className="relative">
        <h3 className="text-xl font-bold text-purple-400 mb-3">{title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30"
            >
              {tech}
            </span>
          ))}
        </div>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={githubUrl}
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          <FaGithub className="text-lg" />
          View on GitHub
        </motion.a>
      </div>
    </motion.div>
  );
}
