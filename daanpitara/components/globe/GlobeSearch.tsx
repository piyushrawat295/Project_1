"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useGlobe } from "@/context/GlobeContext";
import FilterModal from "../layout/FilterModal";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobeSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [showResults, setShowResults] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const { setSelectedLocation, setViewMode, allNgos } = useGlobe();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredNgos = allNgos
    .filter((ngo) => {
      const q = debouncedQuery.trim().toLowerCase();
      
      if (category !== "All" && !ngo.category.includes(category) && ngo.category !== category) return false;
      if (category === "All" && !q) return false;
      
      if (q) {
        const textMatch =
          ngo.name.toLowerCase().includes(q) ||
          (ngo.city && ngo.city.toLowerCase().includes(q)) ||
          ngo.state.toLowerCase().includes(q);
        
        if (!textMatch) return false;
      }
      return true;
    })
    .slice(0, 5);

  function handleSelect(ngo: any) {
    setSelectedLocation(ngo);
    setViewMode("map");
    setShowResults(false);
    setQuery("");
  }

  function handleSearchSubmit() {
    if (filteredNgos.length > 0) {
      handleSelect(filteredNgos[0]);
    }
  }

  return (
    <div className="relative w-full z-40">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
            <div className="flex h-[56px] items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all duration-200">
            <Search className="h-5 w-5 text-gray-400" />
            <input
                value={query}
                onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                className="flex-1 bg-transparent text-[16px] text-gray-900 outline-none placeholder:text-gray-400"
                placeholder="Search NGOs on the Global Map..."
            />
            </div>

            <AnimatePresence>
            {showResults && (debouncedQuery || category !== "All") && (
                <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-[64px] left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 z-50 max-h-[400px] overflow-y-auto"
                >
                {filteredNgos.length > 0 ? (
                    filteredNgos.map((ngo) => (
                    <div
                        key={ngo.id}
                        onClick={() => handleSelect(ngo)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none flex justify-between items-center"
                    >
                        <div>
                        <p className="font-medium text-gray-900">{ngo.name}</p>
                        <p className="text-sm text-gray-500">{ngo.city}, {ngo.state}</p>
                        </div>
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        {ngo.category}
                        </span>
                    </div>
                    ))
                ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">No results found</div>
                )}
                </motion.div>
            )}
            </AnimatePresence>
        </div>

        <button 
            onClick={() => setIsFilterModalOpen(true)}
            className={`flex items-center gap-2 h-[56px] px-6 rounded-xl border transition-all duration-200 shadow-sm
                ${category !== 'All' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                }`}
        >
            <span className="text-base font-medium">Filter</span>
            <SlidersHorizontal className="h-5 w-5" />
        </button>
      </div>

      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)}
        selectedCategory={category}
        onSelectCategory={setCategory}
        onApply={() => {
            setIsFilterModalOpen(false);
            if (category !== "All") setShowResults(true);
        }}
      />
      
      {showResults && (
        <div 
            className="fixed inset-0 z-30 bg-transparent" 
            onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}
