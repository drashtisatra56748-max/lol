import React, { useRef } from "react";
import { Map, ArrowRight, ArrowLeft } from "lucide-react";
import { STATES_DATA } from "../data";

interface StateBrowseProps {
  selectedState: string | null;
  onSelectState: (state: string | null) => void;
}

export default function StateBrowse({ selectedState, onSelectState }: StateBrowseProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="mb-12 overflow-hidden select-none">
      <div className="px-4 md:px-12 flex justify-between items-end mb-6">
        <div>
          <h3 className="text-2xl md:text-3.5xl font-serif text-primary">Browse by State</h3>
          <p className="text-on-surface-variant text-sm md:text-base font-sans">
            Discover regional masterpieces across India
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedState && (
            <button
              onClick={() => onSelectState(null)}
              className="text-xs font-sans font-semibold text-primary/80 hover:text-primary underline cursor-pointer"
            >
              Clear Filter
            </button>
          )}
          <button
            onClick={() => onSelectState("all_directory")}
            className="text-primary font-sans font-semibold text-xs md:text-sm hover:underline flex items-center gap-1 cursor-pointer transition-colors"
          >
            VIEW DIRECTORY <Map className="w-4 h-4 text-[18px]" />
          </button>
        </div>
      </div>

      <div className="relative group px-4 md:px-12">
        {/* Navigation Buttons for desktop */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-zinc-800/90 text-primary p-2 rounded-full shadow-md hover:bg-white active:scale-95 transition-all opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
          title="Scroll Left"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 hide-scrollbar py-2 px-1 scroll-smooth"
        >
          {STATES_DATA.map((state) => {
            const isSelected = selectedState === state.name;
            return (
              <div
                key={state.name}
                onClick={() => onSelectState(isSelected ? null : state.name)}
                className={`flex-shrink-0 w-64 md:w-72 group cursor-pointer transform transition-all duration-300 hover:-translate-y-1.5 ${
                  isSelected ? "ring-2 ring-primary ring-offset-2 rounded-2xl" : ""
                }`}
              >
                <div className="relative h-80 rounded-2xl overflow-hidden mb-2 border border-outline-variant/30 shadow-sm transition-all duration-300 group-hover:shadow-md">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={state.image}
                    alt={state.artForm}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent pt-12 pb-4 px-4">
                    <p className="text-white font-serif text-xl md:text-2xl font-medium tracking-wide">
                      {state.name}
                    </p>
                    <p className="text-white/80 font-sans text-xs md:text-sm mt-0.5 tracking-wide">
                      {state.artForm}
                    </p>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 right-3 bg-primary text-white text-[10px] font-sans font-semibold tracking-wider px-2 py-1 rounded">
                      FILTERED
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-6 md:right-14 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-zinc-800/90 text-primary p-2 rounded-full shadow-md hover:bg-white active:scale-95 transition-all opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
          title="Scroll Right"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
