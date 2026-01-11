"use client";

import { X, GraduationCap, Heart, Users, Leaf, Accessibility, Brain, Ambulance, Droplets } from "lucide-react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onApply: () => void;
}

const categories = [
  { id: "Education", label: "Education and Skill Development", icon: GraduationCap },
  { id: "Health", label: "Healthcare and Medical Support", icon: Heart },
  { id: "Women Empowerment", label: "Women Empowerment", icon: Users },
  { id: "Environment", label: "Environmental Conservation", icon: Leaf },
  { id: "Disability", label: "Disability And Inclusion", icon: Accessibility },
  { id: "Mental Health", label: "Mental Health", icon: Brain },
  { id: "Disaster Relief", label: "Disaster Relief", icon: Ambulance },
  { id: "Water and Sanitation", label: "Water and Sanitation", icon: Droplets },
];

export default function FilterModal({ isOpen, onClose, selectedCategory, onSelectCategory, onApply }: FilterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-[24px] bg-white p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Filter NGOs by Category</h2>
          <p className="text-gray-500 mt-1">select one category to continue</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 group text-left
                  ${isSelected 
                    ? "border-blue-500 bg-blue-50/50 text-blue-700 ring-1 ring-blue-500" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <Icon className={`h-5 w-5 ${isSelected ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"}`} />
                <span className="font-medium">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={() => {
                onSelectCategory("All"); // Optional: clear filter on cancel or just close?
                onClose();
            }}
            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={onApply}
            className="px-8 py-2.5 rounded-lg bg-[#0EA5E9] text-white font-medium hover:bg-[#0284C7] transition-colors shadow-sm cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
