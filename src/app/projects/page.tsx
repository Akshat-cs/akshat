"use client";

import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
  SiRust,
  SiTypescript,
  SiSolidity,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiCplusplus,
  SiC,
  SiPhp,
  SiRuby,
  SiGo,
  SiSwift,
} from "react-icons/si";
import Navbar from "@/components/Navbar";

interface Project {
  name: string;
  description: string;
  language: string;
  languages: string[];
  updated_at: string;
  html_url: string;
}

const languageIcons: { [key: string]: React.ReactNode } = {
  Rust: <SiRust className="w-4 h-4" />,
  TypeScript: <SiTypescript className="w-4 h-4" />,
  Solidity: <SiSolidity className="w-4 h-4" />,
  Python: <SiPython className="w-4 h-4" />,
  JavaScript: <SiJavascript className="w-4 h-4" />,
  HTML: <SiHtml5 className="w-4 h-4" />,
  CSS: <SiCss3 className="w-4 h-4" />,
  "C++": <SiCplusplus className="w-4 h-4" />,
  C: <SiC className="w-4 h-4" />,
  PHP: <SiPhp className="w-4 h-4" />,
  Ruby: <SiRuby className="w-4 h-4" />,
  Go: <SiGo className="w-4 h-4" />,
  Swift: <SiSwift className="w-4 h-4" />,
};

const languageColors: { [key: string]: string } = {
  Rust: "text-orange-400",
  TypeScript: "text-blue-400",
  Solidity: "text-yellow-400",
  Python: "text-green-400",
  JavaScript: "text-yellow-300",
  HTML: "text-orange-500",
  CSS: "text-blue-500",
  "C++": "text-blue-600",
  C: "text-blue-300",
  Java: "text-red-400",
  PHP: "text-purple-400",
  Ruby: "text-red-500",
  Go: "text-blue-400",
  Swift: "text-orange-500",
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/github");

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `Updated on ${date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0D0D0F] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-bold">Projects</h1>
            <a
              href="https://github.com/akshat-cs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <FaGithub className="w-6 h-6" />
              <span>View GitHub</span>
            </a>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <motion.a
                  key={project.name}
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 bg-purple-900/5 hover:bg-purple-900/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {project.description || "No description available"}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
                    {project.languages?.slice(0, 3).map((lang) => (
                      <span
                        key={lang}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                      >
                        <span
                          className={languageColors[lang] || "text-gray-400"}
                        >
                          {languageIcons[lang] || "●"}
                        </span>
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* Removed primary language display */}
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatDate(project.updated_at)}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
