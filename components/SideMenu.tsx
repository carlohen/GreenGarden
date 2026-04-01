"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "BIBLIOTECA", href: "#" },
  { name: "BLOCO A", href: "/bloco/bloco-a" },
  { name: "BLOCO B", href: "/bloco/bloco-b" },
  { name: "BLOCO C", href: "/bloco/bloco-c" },
  { name: "BLOCO D", href: "/bloco/bloco-d" },
  { name: "BLOCO T", href: "/bloco/bloco-t" },
  { name: "BLOCO M", href: "/bloco/bloco-m" },
  { name: "REITORIA", href: "#" },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="relative w-72 h-full bg-white shadow-2xl flex flex-col items-center pt-12 animate-in slide-in-from-right duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-1 rounded-full border-2 border-brand text-brand hover:bg-brand/10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Links */}
        <nav className="flex flex-col gap-6 mt-12 items-center w-full">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-brand font-heading text-lg tracking-widest hover:scale-105 transition-transform"
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
