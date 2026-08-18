"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import SignalGraph from "@/components/home/SignalGraph";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <div className="absolute inset-0">
        <SignalGraph />
        <div className="absolute inset-0 bg-grid-fade" />
      </div>

      <div className="container-px relative mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow inline-block rounded-full glass px-4 py-1.5"
        >
          Software · AI · Data · Cloud · Academy
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 font-heading text-4xl font-bold leading-[1.1] sm:text-6xl"
        >
          Building intelligent
          <br />
          <span className="gradient-text">solutions for tomorrow</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg"
        >
          Intellix designs and ships enterprise software, AI systems, and data platforms —
          and trains the engineers who will build the next generation of them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/contact">Start a Project</Button>
          <Button href="/academy" variant="secondary">
            Explore Academy
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
