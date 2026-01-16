"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x:
        direction === "left"
          ? 40
          : direction === "right"
          ? -40
          : 0,
      y:
        direction === "up"
          ? 40
          : direction === "down"
          ? -40
          : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
