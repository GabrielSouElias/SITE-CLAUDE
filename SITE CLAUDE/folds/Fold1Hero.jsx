import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// CONFIGURATION — Replace with real brand assets
// ============================================
// TODO: replace with real number
const WHATSAPP_NUMBER = "5500000000000";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá! Gostaria de saber mais sobre criar minha própria marca de vinhos."
)}`;

// Logo lives at project root — served from /LOGO.png in a typical Vite/Next public setup
const LOGO_SRC = "/LOGO.png";

const HERO_IMAGES = {
  desktop:
    "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=1400&auto=format&fit=crop&q=80",
  mobile:
    "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=800&auto=format&fit=crop&q=80",
};

// Signature entrance easing used across every fold
const EASE = [0.22, 1, 0.36, 1];

export default function Fold1Hero() {
  const heroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [showMobileCTA, setShowMobileCTA] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    setPrefersReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setNavScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const enableParallax = !prefersReducedMotion;

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setShowMobileCTA(v > 0.75);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleScrollCue = () => {
    document.getElementById("fold-2")?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper: build motion props for entrance reveal, respecting reduced-motion and mobile simplification
  const reveal = (y, delay, duration = 0.7) => ({
    initial: prefersReducedMotion
      ? false
      : { opacity: 0, y: isMobile ? 0 : y },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');
        .adegapr-hero, .adegapr-hero button, .adegapr-hero a, .adegapr-hero p, .adegapr-hero span, .adegapr-nav, .adegapr-nav * { font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif; }
        .adegapr-hero .font-display { font-family: 'Fraunces', ui-serif, Georgia, serif; }
      `}</style>

      {/* ========== NAVIGATION ========== */}
      <motion.nav
        initial={prefersReducedMotion ? false : { opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0, ease: EASE }}
        className={cn(
          "adegapr-nav fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-5 transition-all duration-500",
          navScrolled &&
            "bg-[#012626]/80 backdrop-blur-md border-b border-[#BF8C60]/5"
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a
            href="#top"
            aria-label="Adega Própria — início"
            className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#012626] rounded"
          >
            <img
              src={LOGO_SRC}
              alt="Adega Própria"
              className={cn(
                "max-h-[4.5rem] lg:max-h-[6.25rem] w-auto transition-opacity duration-500",
                navScrolled ? "opacity-100" : "opacity-90"
              )}
            />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-transparent border border-[#BF8C60]/20 text-[#BF8C60] text-base lg:text-xl font-medium tracking-wide px-7 py-3.5 lg:px-12 lg:py-5 rounded-full hover:bg-[#BF8C60]/10 hover:border-[#BF8C60]/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#012626]"
          >
            Fale Conosco
          </a>
        </div>
      </motion.nav>

      {/* ========== HERO SECTION ========== */}
      <section
        id="top"
        ref={heroRef}
        className="adegapr-hero relative w-full min-h-[100dvh] overflow-hidden bg-[#012626]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        {/* Layer 1 — Parallax background image (clipped to the section via clipPath on parent) */}
        {enableParallax ? (
          <div className="fixed top-[-10vh] left-0 h-[120vh] w-full pointer-events-none">
            <motion.div
              className="relative h-full w-full"
              style={{ y: backgroundY }}
            >
              <img
                src={HERO_IMAGES.desktop}
                srcSet={`${HERO_IMAGES.mobile} 800w, ${HERO_IMAGES.desktop} 1400w`}
                sizes="100vw"
                alt="Interior de adega com barris de carvalho"
                className="absolute inset-0 w-full h-full object-cover brightness-[0.3] lg:brightness-[0.35]"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>
          </div>
        ) : (
          <img
            src={HERO_IMAGES.mobile}
            srcSet={`${HERO_IMAGES.mobile} 800w, ${HERO_IMAGES.desktop} 1400w`}
            sizes="100vw"
            alt="Interior de adega com barris de carvalho"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.3] pointer-events-none"
            loading="eager"
            fetchPriority="high"
          />
        )}

        {/* Layer 2 — Atmospheric overlay stack (this is where the mood lives) */}
        {/* 2a. Primary anchor gradient — grounds the bottom in near-solid darkness */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#012626] via-[#012626]/90 to-[#012626]/40 pointer-events-none" />
        {/* 2b. Top vignette — for nav readability */}
        <div className="absolute top-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-[#012626]/70 to-transparent pointer-events-none" />
        {/* 2c. Radial edge vignette — cinematic push to center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, #012626 85%)",
          }}
        />
        {/* 2d. Wine-red atmospheric wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 70%, rgba(166,44,33,0.08) 0%, transparent 50%)",
          }}
        />
        {/* 2e. Clay warmth — aged oak undertone */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(140,61,32,0.05) 0%, transparent 40%)",
          }}
        />
        {/* 2f. Gold headline glow — the one candle in the cellar */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[250px] lg:w-[700px] lg:h-[450px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(191,140,96,0.06) 0%, transparent 65%)",
          }}
        />

        {/* Layer 3 — Procedural grain overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] lg:opacity-[0.035] mix-blend-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="heroGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>

        {/* Layer 5 — Content */}
        <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 pt-28 pb-24 gap-5 md:gap-6 lg:gap-7">
          <motion.p
            {...reveal(25, 0.2, 0.7)}
            className="text-[10px] sm:text-xs uppercase tracking-[0.25em] lg:tracking-[0.3em] text-[#BF8C60]/80 max-w-md mx-auto text-center"
          >
            VINHOS FINOS · SERRA GAÚCHA · A PARTIR DE 60 GARRAFAS
          </motion.p>

          <motion.h1
            {...reveal(35, 0.4, 0.9)}
            className="font-display text-center text-[#D9BBA9] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.92] tracking-[-0.025em] max-w-[18ch] sm:max-w-[20ch] lg:max-w-4xl xl:max-w-5xl mx-auto"
          >
            Sua Própria Marca de Vinhos{" "}
            <span className="font-display italic text-[#BF8C60]">Finos</span>
          </motion.h1>

          <motion.p
            {...reveal(25, 0.6, 0.7)}
            className="font-light text-sm sm:text-base lg:text-lg leading-relaxed text-[#D9BBA9]/55 lg:text-[#D9BBA9]/60 max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto text-center px-2"
          >
            Vinhos premium direto das melhores vinícolas da Serra Gaúcha, com
            rótulo exclusivo e a partir de apenas 60 garrafas.
          </motion.p>

          <motion.div
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                    y: isMobile ? 0 : 15,
                    scale: isMobile ? 1 : 0.96,
                  }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
            className="w-full sm:w-auto flex justify-center"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-[#BF8C60] text-[#012626] font-semibold text-base rounded-full px-8 py-4 lg:px-10 lg:py-5 ring-1 ring-[#BF8C60]/20 hover:bg-[#D9BBA9] hover:ring-[#BF8C60]/40 hover:shadow-[0_0_35px_rgba(191,140,96,0.25)] hover:scale-[1.02] active:scale-[0.97] active:bg-[#8C3D20] transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#012626]"
            >
              <MessageCircle
                size={18}
                strokeWidth={2}
                className="transition-transform duration-500 group-hover:rotate-12"
              />
              <span>Crie Sua Marca Agora</span>
            </a>
          </motion.div>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95, ease: "easeOut" }}
            className="text-[10px] lg:text-xs text-[#D9BBA9]/30 tracking-wider mt-3 text-center"
          >
            Atendimento personalizado via WhatsApp
          </motion.p>
        </div>

        {/* Scroll indicator — absolute bottom center */}
        <motion.button
          type="button"
          onClick={handleScrollCue}
          aria-label="Rolar para a próxima seção"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
          className="absolute bottom-5 lg:bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#012626] rounded px-3 py-1"
        >
          <motion.div
            animate={
              prefersReducedMotion ? { y: 0 } : { y: [0, 5, 0] }
            }
            transition={{
              duration: 2.8,
              ease: "easeInOut",
              repeat: prefersReducedMotion ? 0 : Infinity,
              repeatDelay: 0.5,
            }}
            className="flex flex-col items-center gap-2 w-[120px]"
          >
            <span
              className="block w-full text-center text-[10px] lg:text-xs uppercase tracking-[0.25em] text-[#BF8C60]/40 leading-none"
              style={{ textIndent: "0.25em" }}
            >
              Descubra
            </span>
            <ChevronDown
              size={14}
              strokeWidth={1}
              className="text-[#BF8C60]/40 mx-auto"
            />
          </motion.div>
        </motion.button>

        {/* Gold hairline — seam with next fold */}
        <motion.div
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.5, ease: EASE }}
          style={{ transformOrigin: "center" }}
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#BF8C60]/20 to-transparent z-10"
        />
      </section>

      {/* ========== STICKY MOBILE WHATSAPP BAR ========== */}
      <AnimatePresence>
        {showMobileCTA && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#012626]/95 backdrop-blur-lg border-t border-[#BF8C60]/10 px-4 pt-2"
            style={{
              paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
            }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full py-3.5 flex items-center justify-center gap-2 bg-[#BF8C60] text-[#012626] font-semibold text-sm active:scale-[0.97] active:bg-[#8C3D20] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#012626]"
            >
              <MessageCircle size={16} strokeWidth={2} />
              <span>Crie Sua Marca Agora</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
