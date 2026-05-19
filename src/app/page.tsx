"use client";

import { motion } from "framer-motion";
import CursorGlow from "@/components/CursorGlow";
import NoiseOverlay from "@/components/NoiseOverlay";
import Vignette from "@/components/Vignette";
import ProjectCard from "@/components/ProjectCard";
import GradientHeading from "@/components/GradientHeading";
import ScrollIndicator from "@/components/ScrollIndicator";
import InstagramPrototype from "@/components/prototypes/instagram/InstagramPrototype";
import AccountsCenterSearch from "@/components/prototypes/accounts-center/AccountsCenterSearch";
import AccountRecoveryPrototype from "@/components/prototypes/account-recovery/AccountRecoveryPrototype";
import ThemeToggle from "@/components/ThemeToggle";

const ease = [0.25, 0.1, 0.25, 1] as const;

function SearchHintIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.4 10.4 L13.2 13.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen px-[24px] py-[60px] md:px-[80px] lg:px-[160px] md:py-[100px]">
      <ThemeToggle />
      {/* <CursorGlow /> */}
      <NoiseOverlay />
      <Vignette />

      {/* Content */}
      <div className="relative z-30">
        {/* Name */}
        <motion.h1
          className="font-[family-name:var(--font-ultra)] leading-[0.95] w-full whitespace-nowrap overflow-hidden cursor-default text-foreground"
          style={{ fontSize: "calc((100vw - var(--page-margin) * 2) * 0.115)" }}
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease }}
        >
          Denzel Oduro
        </motion.h1>

        {/* Bio */}
        <motion.p
          className="text-[24px] md:text-[40px] text-foreground mt-[16px] md:mt-[24px] leading-snug"
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.0, delay: 0.4, ease }}
        >
          Product designer specializing in growth and authentication
          experiences at scale. Currently at Meta, previously at{" "}
          <a href="https://www.studiorodrigo.com/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent-orange-light transition-colors duration-500">Studio
          Rodrigo</a>. Based in New York City
        </motion.p>

        {/* Nav links */}
        <motion.div
          className="flex gap-[24px] md:gap-[32px] mt-[24px] md:mt-[32px] mb-[48px] md:mb-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease }}
        >
          <a href="mailto:denzeloduro1@gmail.com" className="text-[24px] text-secondary hover:text-foreground transition-colors duration-500">Email</a>
          <a href="https://www.linkedin.com/in/denzeloduro/" target="_blank" rel="noopener noreferrer" className="text-[24px] text-secondary hover:text-foreground transition-colors duration-500">LinkedIn</a>
        </motion.div>

        {/* Divider */}
        <motion.hr
          className="mb-[48px] md:mb-[60px] border-0 h-px"
          style={{ backgroundColor: "var(--divider)", transformOrigin: "left" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease }}
        />

        {/* Two projects side by side */}
        <div className="flex flex-col lg:flex-row gap-[40px] mb-[40px]">
          <ProjectCard
            title="Search in Accounts Center"
            context="Meta, 2022"
            delay={0}
            tilt="left"
            hint={{ text: "tap search icon to search", icon: <SearchHintIcon />, position: "top" }}
            href="/projects/search-in-accounts-center"
            background="radial-gradient(circle at 100% 100%, rgba(64,247,104,0.6), transparent 60%), radial-gradient(circle at 100% 0%, rgba(80,188,255,0.6), transparent 60%), radial-gradient(circle at 75% 100%, rgba(255,221,90,0.6), transparent 45%), radial-gradient(circle at 0% 95%, rgba(255,143,188,0.7), transparent 60%), radial-gradient(circle at 0% 40%, rgba(255,143,188,0.55), transparent 55%), radial-gradient(circle at 20% 0%, rgba(178,143,252,0.6), transparent 60%), #ffffff"
          >
            <AccountsCenterSearch />
          </ProjectCard>
          <ProjectCard
            title="Login on Instagram"
            context="Meta, 2026"
            delay={0.15}
            href="/projects/login-on-instagram"
            background="linear-gradient(to top right, #FFC838 0%, #FFC838 15%, #DC624B 57%, #C23D85 77%, #743CD7 100%)"
          >
            <InstagramPrototype />
          </ProjectCard>
        </div>

        {/* Full-width project */}
        <ProjectCard
          title="Account Recovery across Meta"
          context="Meta, 2024"
          aspectRatio="wide"
          delay={0}
          tilt="left"
          hideHint
          background="linear-gradient(to right, #0022FF 0%, #3CB9EF 100%)"
        >
          <AccountRecoveryPrototype />
        </ProjectCard>

        {/* Scroll position indicator */}
        <ScrollIndicator />
      </div>
    </div>
  );
}
