import React from "react";
import { ArrowLeft, BookOpen, Sparkles, MapPin, Search } from "lucide-react";
import { StateItem } from "../types";
import { STATES_DATA } from "../data";

interface StateDirectoryViewProps {
  onBack: () => void;
  onSelectState: (stateName: string) => void;
}

export default function StateDirectoryView({ onBack, onSelectState }: StateDirectoryViewProps) {
  // Enhanced catalogue of states
  const directory: StateItem[] = [
    ...STATES_DATA,
    {
      name: "Uttar Pradesh",
      code: "UP",
      artForm: "Tarkashi Walnut Box & Inlay",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoUIFw30KV7yoWZPCG33W2ZrXM6Kz6RI6Mpr174B2OsblOSxvLqu1X2hdWA-v5ivZDFZ-fohjie9S9FHDBJmLLv4rdi6whGXB-s2nFCxz3Tzjitc-IHZiD7SaQZaSyPCGZNZgVeoudSAIYwVdSXET82fQyfEznqcc9gaR7UIZ7huXKBpI1djTDdxcbtte6jW2SQtyjaUk7YbbWxNLocDoL96Kgf7kzswYYbszIRV_ju6DchpMWiNdXBcWP2jSQOtoYj4h3vzujSSc"
    },
    {
      name: "Bihar",
      code: "BR",
      artForm: "Madhubani Painting & Kulhads",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB67vr1eG49RjT6pe8UCBrMe5Z-vb978dCPEckUYvx0WJeum2AIbIClsOmh7b47v5T92wKeKNSw8kGobUsmoTsyuuYctqK87M8_8Oc_fof-kiyX6oa-Y8d1PPuOmcjprMMKkl43lX0-vnO2niO0w_5oPiPvbjXZrW5OXoIcqfC0KhcCO6RR6rBfh4ZulKH2Jxo0-IzKyj_GzexCy0cyIG8J2rgo0m1Bkm6dn-VwXi9ZvGLhOM4fEu2OC1rdgle5jXh7fgKwSE-bVHA"
    },
    {
      name: "Chhattisgarh",
      code: "CG",
      artForm: " lost-wax Bastar Dhokra Art",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS9CUCzrhxmkBJ2elVA41bSiQa5VddmuVa6S_sK8cFKLoHTVZIPnHyt-Fn-WagbUuCdG2pJGTSqbO7066-IZMll5xa7PeDmMdUg8hbbJzEcMaSZsNcEtVNF2gj3AXAbro8-_VMiKRhQscgllPCK0Q61FrQYdowY94t-n063rLMZMaHuH7Q1-dEDljXaGx_ScLkKp3l8l2L1a1KLdUGH9SJxbmOZeSYAwO2cQ-nIjGvPo9lLNSG3fzW3oduFiIRrmZpUNxusX3Hlhs"
    },
    {
      name: "Jammu and Kashmir",
      code: "JK",
      artForm: "Cashmere Pashmina Weavings",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaIICrivNFJfI9JW6XOz1JMzl3MkHLYSf2y53hh0beVuMZPsHoKDMIE_cSExbBAuE0Ec2aXGfiI4MzFW5059oUPOVT7waSjJXxCqAQpErvZAyVf2jsAz_GOEKfOqWsg2lUD_hC_8xJSzIV4bhuZ7wa1dpZUBLSOXYv5MFBFYa7uzK8kNff6jmsrMa8g0_pdcJn4jJy8x0evqsajn8YhjQfMW57-v-1PfxsxSJSlhUifv0H9QImHbfcArm3u-1kZbl8vuZMICJZE8M"
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-12 mt-24 mb-32 animate-fadeIn font-sans pb-16">
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 mb-8 select-none">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors font-sans font-semibold text-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs uppercase font-mono tracking-widest text-on-surface-variant">
          Bharat State Directory index
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-12 select-none">
        <div className="bg-primary/5 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-primary mb-3">
          <BookOpen className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl text-primary font-medium">Bespoke Regional Directory</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Explore and filter based on historic craft locations protecting thousands of generational livelihoods.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {directory.map((state) => (
          <div
            key={state.name}
            onClick={() => onSelectState(state.name)}
            className="group cursor-pointer rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 bg-white"
          >
            <div className="relative h-48 bg-surface-container overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 select-none"
                src={state.image}
                alt={state.artForm}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pt-12 pb-3 px-4 flex flex-col justify-end">
                <span className="text-[10px] text-white/70 uppercase tracking-widest font-mono flex items-center gap-1 font-semibold">
                  <MapPin className="w-3 h-3 text-white" />
                  State Code: {state.code}
                </span>
                <h4 className="text-white font-serif text-lg font-bold tracking-wide mt-0.5">
                  {state.name}
                </h4>
              </div>
            </div>

            <div className="p-4 flex justify-between items-center bg-surface-bright border-t border-outline-variant/20">
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold select-none">
                  Defining Heritage Form
                </p>
                <p className="text-xs text-primary font-bold mt-0.5">{state.artForm}</p>
              </div>
              <div className="bg-primary/5 group-hover:bg-primary group-hover:text-white text-primary w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <Sparkles className="w-4 h-4 fill-current select-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
