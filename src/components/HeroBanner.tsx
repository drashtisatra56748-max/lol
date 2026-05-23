import React, { useState } from "react";
import { ArrowRight, Sparkles, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function HeroBanner() {
  const [showStory, setShowStory] = useState(false);

  return (
    <>
      <section className="px-4 md:px-12 mb-12">
        <div className="relative overflow-hidden rounded-2xl h-[450px] md:h-[550px] shadow-sm group">
          <img
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 select-none"
            alt="Master Indian artisan hand-carving wood patterns"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzz6Q8IkBXGvFDPHuXdBcU5oAOvlbbzcugvzyW70-1usf3nltcXiiMKUA1rhK8zXKuzL1nKwfhhLAc4l9oxiGDmWp2M1QpEMzHY1y4CkHfXCzCGn4U0ZHf7NH5IqjVSH-sWlumEWnFP2xn9BxV2TxpaQturPWEXUpExAe1mfElyNWDmqRRaMLL8YTRg5bH8A3lZVICgauFJWGeRPJ7bvnppYrfwMdd-IluNS5z6WPzuVq4-mV2Jz_liAzpJhtfD-zapu6Gk6Wt5Gs"
          />
          <div className="absolute inset-0 artisan-gradient"></div>
          <div className="absolute inset-0 mandala-overlay"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-3/4">
            <span className="inline-flex items-center gap-1.5 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-sans font-semibold tracking-widest px-3 py-1 rounded mb-4 uppercase">
              <Sparkles className="w-3 h-3 text-on-tertiary-fixed fill-current" />
              Artisans of the Month
            </span>
            <h2 className="text-white font-serif text-3xl md:text-5xl mb-4 leading-tight">
              Mastering the Loom: The Weavers of Maheshwar
            </h2>
            <p className="text-white/90 text-sm md:text-lg font-sans mb-8 max-w-xl leading-relaxed">
              Experience the timeless elegance of hand-woven silk, carrying forward a 250-year-old legacy of the Holkar dynasty.
            </p>
            <button
              onClick={() => setShowStory(true)}
              className="bg-primary hover:bg-primary-container text-white px-6 md:px-8 py-3 rounded-xl font-sans font-semibold text-sm transition-all hover:shadow-lg active:scale-95 flex items-center gap-3 cursor-pointer group"
            >
              READ THEIR STORY
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Story Details Modal Dialog */}
      <AnimatePresence>
        {showStory && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStory(false)}
              className="fixed inset-0 bg-black z-[200] cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-20 md:bottom-20 max-w-2xl w-full bg-background z-[210] rounded-2xl shadow-2xl overflow-y-auto border border-outline-variant/30 custom-scrollbar p-6 md:p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs uppercase text-tertiary font-sans font-semibold tracking-wider">Provenance Focus</span>
                  <h3 className="text-3xl font-serif text-primary mt-1">The Weavers of Maheshwar</h3>
                </div>
                <button
                  onClick={() => setShowStory(false)}
                  className="bg-surface-container hover:bg-white text-primary p-2 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden mb-6 h-64 shadow-sm border border-outline-variant/30 relative">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzz6Q8IkBXGvFDPHuXdBcU5oAOvlbbzcugvzyW70-1usf3nltcXiiMKUA1rhK8zXKuzL1nKwfhhLAc4l9oxiGDmWp2M1QpEMzHY1y4CkHfXCzCGn4U0ZHf7NH5IqjVSH-sWlumEWnFP2xn9BxV2TxpaQturPWEXUpExAe1mfElyNWDmqRRaMLL8YTRg5bH8A3lZVICgauFJWGeRPJ7bvnppYrfwMdd-IluNS5z6WPzuVq4-mV2Jz_liAzpJhtfD-zapu6Gk6Wt5Gs"
                  alt="Maheshwar weavings detail"
                />
                <div className="absolute inset-0 artisan-gradient opacity-60"></div>
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded">
                  Craft Cluster: Maheshwar, Madhya Pradesh
                </div>
              </div>

              <div className="space-y-4 text-on-surface-variant text-sm md:text-base leading-relaxed font-sans">
                <p>
                  Maheshwari weaving traces back to the late 18th century during the reign of the legendary Queen **Ahilyabai Holkar**. Dissatisfied with standard regional textiles, the Queen personally invited master artisans from Surat and Mandu to settle on the banks of the sacred Narmada river.
                </p>
                <p>
                  Traditionally, these textiles were woven into elegant nine-yard sarees gifted to visiting royal dignitaries. What makes Maheshwari fabrics unique is their light, gossamer weight—achieved by using ultra-fine cotton yarns in the weft and crisp mulberry silk yarn in the warp.
                </p>
                <p>
                  The signature borders (such as the *Chatai* or mat block design, and the *Narmada wave* block design) are directly inspired by the intricate stone carvings on the walls of Maheshwar's majestic riverfront fort.
                </p>
                <p>
                  Today, over 3,000 households still depend on this meditative hand-loom craft. Every purchase helps sustain fair-wage cooperatives supporting rural women spinners and traditional male master dye-houses.
                </p>

                <div className="bg-surface-container rounded-xl p-4 border border-outline-variant-20 flex gap-4 items-center mt-6">
                  <div className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h5 className="font-sans font-semibold text-on-surface text-sm">Empowerment Impact</h5>
                    <p className="text-xs text-on-surface-variant">
                      Each throw, saree, or stole purchased provides 5 days of dignified living wages for a weaver family unit.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowStory(false)}
                className="w-full mt-8 bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-sans font-semibold text-sm transition-all cursor-pointer"
              >
                Close Backstory
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
