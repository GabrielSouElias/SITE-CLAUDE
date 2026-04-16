import Fold1Hero from "../folds/Fold1Hero.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#012626] text-[#D9BBA9] overflow-x-hidden">
      <Fold1Hero />
      {/* Placeholder anchor for scroll-cue target until Fold 2 lands */}
      <section
        id="fold-2"
        className="min-h-[60vh] flex items-center justify-center bg-[#012626] border-t border-[#BF8C60]/10"
      >
        <p className="text-[#D9BBA9]/30 text-xs uppercase tracking-[0.3em]">
          Fold 2 — Em breve
        </p>
      </section>
    </div>
  );
}
