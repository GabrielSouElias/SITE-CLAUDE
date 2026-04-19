import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

const HERO_BG_DESKTOP =
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&auto=format&fit=crop&q=80";
const HERO_BG_MOBILE =
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&auto=format&fit=crop&q=80";

const WHATSAPP_URL =
  "https://wa.me/5500000000000?text=Ol%C3%A1!%20Gostaria%20de%20criar%20minha%20pr%C3%B3pria%20marca%20de%20vinhos%20finos.";

const EASE = [0.22, 1, 0.36, 1];

export default function Fold1Hero() {
  const heroRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncDesktop = () => setIsDesktop(mqDesktop.matches);
    const syncReduced = () => setReducedMotion(mqReduced.matches);
    syncDesktop();
    syncReduced();
    mqDesktop.addEventListener("change", syncDesktop);
    mqReduced.addEventListener("change", syncReduced);
    return () => {
      mqDesktop.removeEventListener("change", syncDesktop);
      mqReduced.removeEventListener("change", syncReduced);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const rawBackgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setShowStickyBar(value > 0.8);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const fadeUp = (delay, y = 30, duration = 0.8) => ({
    initial: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration, ease: EASE },
  });

  const scaleIn = (delay) => ({
    initial: reducedMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 20, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { delay, duration: 0.7, ease: EASE },
  });

  const handleScrollDown = () => {
    if (typeof window === "undefined") return;
    const next = document.getElementById("fold-2");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        ref={heroRef}
        aria-label="Apresentação Adega Própria"
        className="relative min-h-[100dvh] w-full overflow-hidden bg-wine-black"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <motion.div
          aria-hidden="true"
          style={{ y: isDesktop && !reducedMotion ? rawBackgroundY : 0 }}
          className="absolute inset-0 h-[118%] w-full"
        >
          <img
            src={isDesktop ? HERO_BG_DESKTOP : HERO_BG_MOBILE}
            srcSet={`${HERO_BG_MOBILE} 800w, ${HERO_BG_DESKTOP} 1600w`}
            sizes="100vw"
            alt=""
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-wine-black via-wine-black/80 to-transparent" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 45%, #1A0F10 100%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[420px] w-[640px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(191,140,96,0.09) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[220px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(166,44,33,0.08) 0%, transparent 60%)",
            }}
          />
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-[0.05] mix-blend-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="heroGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroGrain)" />
        </svg>

        <motion.nav
          {...fadeUp(0, -16, 0.8)}
          className="absolute left-0 right-0 top-0 z-40"
        >
          <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
            <div className="flex items-center justify-between rounded-2xl border border-wine-gold/10 bg-wine-black/45 px-4 py-2 sm:px-5 sm:py-3 lg:rounded-3xl lg:px-7 lg:py-3">
              <a
                href="#"
                aria-label="Adega Própria — início"
                className="group inline-flex items-center"
              >
                <img
                  src="/LOGO.png"
                  alt="Adega Própria"
                  className="h-20 w-auto transition-all duration-500 group-hover:[filter:drop-shadow(0_0_14px_rgba(191,140,96,0.3))] lg:h-24"
                />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-wine-gold/25 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.22em] text-wine-beige/80 transition-all duration-300 hover:border-wine-gold/60 hover:bg-wine-gold/10 hover:text-wine-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-wine-black lg:px-5 lg:py-2.5 lg:text-xs"
              >
                Fale Conosco
              </a>
            </div>
          </div>
        </motion.nav>

        <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-6">
          <div className="flex w-full max-w-4xl flex-col items-center gap-6 text-center lg:max-w-5xl lg:gap-8">
            <motion.p
              {...fadeUp(0.2, 30, 0.7)}
              className="font-sans text-[11px] font-medium tracking-[0.3em] text-wine-gold drop-shadow-[0_1px_8px_rgba(26,15,16,0.7)] sm:text-xs"
            >
              VINHOS FINOS
              <span className="mx-2 text-wine-gold/70">·</span>
              SERRA GAÚCHA
              <span className="mx-2 text-wine-gold/70">·</span>
              A PARTIR DE 60 GARRAFAS
            </motion.p>

            <motion.h1
              {...fadeUp(0.35, 40, 0.9)}
              className="mx-auto max-w-4xl font-serif text-[2.5rem] font-medium leading-[0.98] tracking-[-0.015em] text-wine-beige sm:text-5xl md:text-6xl lg:max-w-5xl lg:text-7xl xl:text-8xl"
            >
              Sua Própria Marca de Vinhos{" "}
              <em className="font-serif font-medium italic text-wine-gold">
                Finos
              </em>
            </motion.h1>

            <motion.p
              {...fadeUp(0.55, 30, 0.7)}
              className="mx-auto max-w-xl font-sans text-base font-light leading-relaxed text-wine-beige/70 lg:max-w-2xl lg:text-lg"
            >
              Vinhos premium direto das melhores vinícolas da Serra Gaúcha, com
              rótulo exclusivo e a partir de apenas 60 garrafas.
            </motion.p>

            <motion.div {...scaleIn(0.75)} className="mt-1 w-full sm:w-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-wine-gold px-8 py-4 font-sans text-base font-semibold text-wine-black shadow-[0_16px_48px_-16px_rgba(191,140,96,0.45)] transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-wine-beige hover:shadow-[0_0_40px_rgba(191,140,96,0.35)] active:scale-[0.97] active:bg-wine-brown focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-wine-black sm:w-auto lg:px-10 lg:py-5 lg:text-lg"
              >
                <MessageCircle
                  size={18}
                  strokeWidth={2}
                  className="transition-transform duration-500 group-hover:rotate-12"
                />
                Crie Sua Marca Agora
              </a>
            </motion.div>

            <motion.p
              {...fadeUp(0.9, 0, 0.6)}
              className="font-sans text-[11px] font-light tracking-wide text-wine-beige/45"
            >
              Atendimento personalizado via WhatsApp
            </motion.p>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleScrollDown}
          initial={
            reducedMotion
              ? { opacity: 1, y: 0, x: "-50%" }
              : { opacity: 0, y: 10, x: "-50%" }
          }
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          aria-label="Descer para a próxima seção"
          className="group absolute bottom-6 left-1/2 z-10 flex flex-col items-center justify-center gap-2 text-center text-wine-gold/60 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wine-gold focus-visible:ring-offset-2 focus-visible:ring-offset-wine-black lg:bottom-10"
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] mr-[-0.28em]">
            Descubra
          </span>
          <motion.span
            animate={reducedMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
            className="inline-flex items-center justify-center"
          >
            <ChevronDown size={16} strokeWidth={1.5} />
          </motion.span>
        </motion.button>

        <motion.div
          aria-hidden="true"
          initial={reducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
          className="absolute bottom-0 left-0 z-10 h-px w-full origin-center bg-gradient-to-r from-transparent via-wine-gold/30 to-transparent"
        />
      </section>

      <motion.div
        initial={{ y: 140 }}
        animate={{ y: showStickyBar ? 0 : 140 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-wine-gold/10 bg-wine-black/90 px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-wine-gold py-3.5 font-sans text-sm font-semibold text-wine-black transition-all duration-200 active:scale-[0.98] active:bg-wine-brown"
        >
          <MessageCircle size={16} strokeWidth={2} />
          Crie Sua Marca Agora
        </a>
      </motion.div>
    </>
  );
}
