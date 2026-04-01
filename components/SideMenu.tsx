"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "BIBLIOTECA", href: "/bloco/biblioteca" },
  { name: "BLOCO A", href: "/bloco/bloco-a" },
  { name: "BLOCO B", href: "/bloco/bloco-b" },
  { name: "BLOCO C", href: "/bloco/bloco-c" },
  { name: "BLOCO D", href: "/bloco/bloco-d" },
  { name: "BLOCO T", href: "/bloco/bloco-t" },
  { name: "BLOCO M", href: "/bloco/bloco-m" },
  { name: "REITORIA", href: "/bloco/reitoria" },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-brand/20 bg-background/95 backdrop-blur-md flex flex-col items-center pt-20">
        <SheetHeader className="mb-10">
          <SheetTitle className="text-brand font-heading text-2xl tracking-[0.2em] text-center">
            MENU
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-8 items-center w-full">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="text-brand font-heading text-xl tracking-[0.15em] hover:text-brand-light transition-all hover:scale-110 active:scale-95"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Brand footer inside sheet */}
        <div className="absolute bottom-10 flex flex-col items-center opacity-30">
          <span className="text-brand text-xs font-heading font-black tracking-tighter">GREEN</span>
          <span className="text-brand-light text-[10px] font-heading italic -mt-1 font-bold">Garden</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
