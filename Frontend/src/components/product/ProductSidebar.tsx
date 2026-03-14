import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const CATEGORIES = [
  { title: "All", href: "/Product" },
  { title: "Tables", href: "/Product?product_type=Tables" },
  { title: "Seating", href: "/Product?product_type=Seating" },
  { title: "Beds", href: "/Product?product_type=Beds" },
  { title: "Storage", href: "/Product?product_type=Storage" },
  { title: "Decor", href: "/Product?product_type=Decor" },
  { title: "Floor & Mat", href: "/Product?product_type=Floor%20%26%20Mat" },
  { title: "Lighting", href: "/Product?product_type=Lighting" },
  { title: "Other", href: "/Product?product_type=Other" },
];

const COLLECTIONS = [
  {
    title: "All", links: [
      { title: "All", href: "/Product" },
      { title: "Tables", href: "/Product?product_type=Tables" },
      { title: "Seating", href: "/Product?product_type=Seating" },
      { title: "Beds", href: "/Product?product_type=Beds" },
      { title: "Storage", href: "/Product?product_type=Storage" },
      { title: "Decor", href: "/Product?product_type=Decor" },
      { title: "Floor & Mat", href: "/Product?product_type=Floor%20%26%20Mat" },
      { title: "Lighting", href: "/Product?product_type=Lighting" },
      { title: "Other", href: "/Product?product_type=Other" }
    ]
  },

  {
    title: "Tables",
    links: [
      { title: "All", href: "/Product?product_type=Tables" },
      { title: "Dining Tables", href: "/Product?product_type=Dining%20Tables" },
      { title: "Coffee Tables", href: "/Product?product_type=Coffee%20Tables" },
      { title: "Side Tables", href: "/Product?product_type=Side%20Tables" },
      { title: "Console Tables", href: "/Product?product_type=Console%20Tables" },
      { title: "Other", href: "/Product?product_type=Other" },
    ],
  },
  {
    title: "Seating",
    links: [
      { title: "All", href: "/Product?product_type=Seating" },
      { title: "Sofas", href: "/Product?product_type=Sofas" },
      { title: "Chairs", href: "/Product?product_type=Chairs" },
      { title: "Benches", href: "/Product?product_type=Benches" },
      { title: "Ottomans", href: "/Product?product_type=Ottomans" },
      { title: "Stools", href: "/Product?product_type=Stools" },
      { title: "Other", href: "/Product?product_type=Other" },
    ],
  },
  {
    title: "Beds",
    links: [
      { title: "All", href: "/Product?product_type=Beds" },
      { title: "Platform Beds", href: "/Product?product_type=Platform%20Beds" },
      { title: "Bunk Beds", href: "/Product?product_type=Bunk%20Beds" },
      { title: "Single Beds", href: "/Product?product_type=Single%20Beds" },
      { title: "Other", href: "/Product?product_type=Other" },
    ],
  },
  {
    title: "Storage",
    links: [
      { title: "All", href: "/Product?product_type=Storage" },
      { title: "Wardrobes", href: "/Product?product_type=Wardrobes" },
      { title: "Dressers", href: "/Product?product_type=Dressers" },
      { title: "Bookcases", href: "/Product?product_type=Bookcases" },
      { title: "Cabinets", href: "/Product?product_type=Cabinets" },
      { title: "Other", href: "/Product?product_type=Other" },
    ],
  },
  {
    title: "Decor",
    links: [
      { title: "All", href: "/Product?product_type=Decor" },
      { title: "Mirrors", href: "/Product?product_type=Mirrors" },
      { title: "Clocks", href: "/Product?product_type=Clocks" },
      { title: "Vases", href: "/Product?product_type=Vases" },
      { title: "Wall Art", href: "/Product?product_type=Wall%20Art" },
      { title: "Plants", href: "/Product?product_type=Plants" },
      { title: "Other", href: "/Product?product_type=Other" },
    ],
  },
  {
    title: "Floor & Mat",
    links: [
      { title: "All", href: "/Product?product_type=Floor%20%26%20Mat" },
      { title: "Rugs", href: "/Product?product_type=Rugs" },
      { title: "Mats", href: "/Product?product_type=Mats" },
      { title: "Carpets", href: "/Product?product_type=Carpets" },
      { title: "Other", href: "/Product?product_type=Other" },
    ],
  },
  {
    title: "Lighting",
    links: [
      { title: "All", href: "/Product?product_type=Lighting" },
      { title: "Ceiling Lights", href: "/Product?product_type=Ceiling%20Lights" },
      { title: "Wall Lights", href: "/Product?product_type=Wall%20Lights" },
      { title: "Table Lamps", href: "/Product?product_type=Table%20Lamps" },
      { title: "Floor Lamps", href: "/Product?product_type=Floor%20Lamps" },
      { title: "Outdoor Lighting", href: "/Product?product_type=Outdoor%20Lighting" },
      { title: "Other", href: "/Product?product_type=Other" },
    ],
  },
  {
    title: "Other",
    links: [
      { title: "All", href: "/Product?product_type=Other" },
      { title: "Other", href: "/Product?product_type=Other" },
    ],
  },
];
interface SidebarProps {
  onPriceChange: (min: number, max: number) => void;
}

const COLORS = ["Red", "Blue", "Green", "Black", "White", "Brown", "Gray", "Yellow"];
export const ProductSidebar: React.FC<SidebarProps> = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get("product_type") || "All";
 const currentCollection = COLLECTIONS.find(
  (collection) => collection.title === activeType
) || COLLECTIONS[0]; // ရှာမတွေ့ရင် default အနေနဲ့ "All" ကို ပြမယ်
  const activeColor = searchParams.get("color") || "";
  const [open, setOpen] = useState(true);

  const handleColorClick = (color: string) => {
    if (activeColor === color) {
      searchParams.delete("color"); // ရွေးထားတာကို ပြန်နှိပ်ရင် filter ဖြုတ်မယ်
    } else {
      searchParams.set("color", color);
    }
    searchParams.set("page", "1"); // filter ပြောင်းတိုင်း page 1 ကို ပြန်သွားမယ်
    setSearchParams(searchParams);
  };
  
  const handleApply = () => {
    const min = minPrice === "" ? 0 : parseFloat(minPrice);
    const max = maxPrice === "" ? Infinity : parseFloat(maxPrice);
    onPriceChange(min, max);
  };

  return (
    <aside className="w-full p-5 space-y-6 border shadow-sm lg:w-64 bg-background/50 backdrop-blur-md rounded-2xl border-border">
      {/* Category Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold tracking-tight text-foreground">Categories</h3>
        <Switch checked={open} onCheckedChange={setOpen} />
      </div>

      {open && (
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col space-y-1"
        >
          {CATEGORIES.map((category) => {
            const queryPart = category.href.split("?")[1];
            const currentHrefParams = new URLSearchParams(queryPart || "");
            const hrefType = currentHrefParams.get("product_type") || "All";
            const itemActive = hrefType === activeType;

            return (
              <Link
                key={category.title}
                to={category.href}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  itemActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <span>{category.title}</span>
                {itemActive && <motion.div layoutId="active-pill" className="w-1.5 h-1.5 rounded-full bg-current" />}
              </Link>
            );
          })}
        </motion.nav>
      )}

      <Separator />
        {/* Collections Section */}
   {/* Collections Section */}
<div className="space-y-3">
  <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
    {activeType} Collections
  </h3>
  <div className="flex flex-wrap gap-2">
    {currentCollection.links.map((link) => {
      // လက်ရှိ ရွေးထားတဲ့ Sub-category ဖြစ်မဖြစ် စစ်မယ်
      const isSubActive = searchParams.get("product_type") === new URLSearchParams(link.href.split('?')[1]).get("product_type") 
                          || (activeType === "All" && link.title === "All");

      return (
        <Link
          key={link.title}
          to={link.href}
          className={`px-3 py-1 text-[11px] font-medium border rounded-full transition-all ${
            isSubActive
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-secondary hover:bg-accent text-secondary-foreground border-transparent"
          }`}
        >
          {link.title}
        </Link>
      );
    })}
  </div>
</div>
      
     <Separator />
      {/* Price Filter Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Price Range</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="min" className="text-xs">Min</Label>
            <Input
              id="min"
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="max" className="text-xs">Max</Label>
            <Input
              id="max"
              type="number"
              placeholder="Any"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="h-9"
            />
          </div>
        </div>
        <Button onClick={handleApply} className="w-full h-9" variant="default">
          Apply Filter
        </Button>
      </div>

      <Separator />

    
      {/* Future sections like Color Filter can be added here */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => handleColorClick(c)}
              className={`px-3 py-1 text-[11px] font-medium border rounded-full transition-all ${
                activeColor === c
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-secondary hover:bg-accent text-secondary-foreground border-transparent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};