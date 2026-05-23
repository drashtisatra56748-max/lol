import React from "react";
import { X, BookOpen, Users, MapPin, Leaf, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
}

export default function NavigationDrawer({ isOpen, onClose, onSelectOption }: NavigationDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[100] cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 bg-surface-container-low dark:bg-surface-container z-[110] rounded-r-2xl shadow-2xl flex flex-col py-6"
          >
            <div className="px-6 mb-8 flex justify-between items-center border-b border-outline-variant/20 pb-3">
              <h2 className="text-2xl font-serif italic text-primary">Heritage Craft</h2>
              <button
                onClick={onClose}
                className="text-primary hover:bg-surface-container transition-colors duration-200 p-1.5 rounded-full cursor-pointer"
                title="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col flex-grow text-on-surface-variant font-sans">
              <button
                onClick={() => {
                  onSelectOption("heritage");
                  onClose();
                }}
                className="flex items-center gap-4 px-6 py-4 text-primary bg-primary-fixed/20 font-bold transition-all hover:bg-primary-fixed/30 text-left border-l-4 border-primary cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Our Heritage</span>
              </button>

              <button
                onClick={() => {
                  onSelectOption("stories");
                  onClose();
                }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-surface-variant/50 transition-all text-left border-l-4 border-transparent hover:border-outline cursor-pointer"
              >
                <Users className="w-5 h-5 text-on-surface-variant" />
                <span>Artisan Stories</span>
              </button>

              <button
                onClick={() => {
                  onSelectOption("states");
                  onClose();
                }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-surface-variant/50 transition-all text-left border-l-4 border-transparent hover:border-outline cursor-pointer"
              >
                <MapPin className="w-5 h-5 text-on-surface-variant" />
                <span>State Directory</span>
              </button>

              <button
                onClick={() => {
                  onSelectOption("sustainability");
                  onClose();
                }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-surface-variant/50 transition-all text-left border-l-4 border-transparent hover:border-outline cursor-pointer"
              >
                <Leaf className="w-5 h-5 text-on-surface-variant" />
                <span>Sustainability</span>
              </button>

              <div className="border-t border-outline-variant/30 my-4" />

              <button
                onClick={() => {
                  onSelectOption("help");
                  onClose();
                }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-surface-variant/50 transition-all text-left border-l-4 border-transparent hover:border-outline mt-auto cursor-pointer"
              >
                <HelpCircle className="w-5 h-5 text-on-surface-variant" />
                <span>Help Center</span>
              </button>
            </nav>

            <div className="px-6 text-xs text-on-surface-variant opacity-60 border-t border-outline-variant/20 pt-4 mt-4">
              <p>© 2026 Heritage Craft India</p>
              <p className="mt-1">Preserving Handcrafted Legacy</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
