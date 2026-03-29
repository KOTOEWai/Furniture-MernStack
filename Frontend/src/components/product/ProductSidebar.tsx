import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useGetFurnitureCategoriesQuery, useGetFurnitureColorsQuery } from "@/api/AmazonApi";


interface SidebarProps {
  onPriceChange: (min: number, max: number) => void;
}
export const ProductSidebar: React.FC<SidebarProps> = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const { data: dynamicCategories, isLoading: isCatsLoading } = useGetFurnitureCategoriesQuery();
  const { data: dynamicColors, isLoading: isColorsLoading } = useGetFurnitureColorsQuery();
  const activeType = searchParams.get("product_type") || "All";

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
          {/* Default 'All' Category */}
          <Link
            to="/Product"
            className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${activeType === "All"
              ? "bg-primary text-primary-foreground font-medium"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
          >
            <span>All Products</span>
            {activeType === "All" && <motion.div layoutId="active-pill" className="w-1.5 h-1.5 rounded-full bg-current" />}
          </Link>

          {/* Dynamic Categories From Backend */}
          {!isCatsLoading && dynamicCategories?.slice(0, 15).map((category) => {
            const itemActive = activeType === category.name;
            return (
              <Link
                key={category.name}
                to={`/Product?product_type=${encodeURIComponent(category.name)}`}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${itemActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                <span className="truncate">{category.name}</span>
                <span className="text-[10px] opacity-70 ml-2">({category.count})</span>
              </Link>
            );
          })}
        </motion.nav>
      )}

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


      {/* Color Filter Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {!isColorsLoading && dynamicColors?.slice(0, 11).map((c) => (
            <button
              key={c.name}
              onClick={() => handleColorClick(c.name)}
              className={`px-3 py-1 text-[11px]font-medium border rounded-full transition-all ${activeColor === c.name
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-secondary hover:bg-accent text-secondary-foreground border-transparent"
                }`}
            >
              <span className="truncate max-w-[80px]">{c.name}</span>
              <span className="text-[9px] opacity-60 ml-1">({c.count})</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};