"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {  Link } from "react-router-dom";

// ✅ Structured Data
const CATEGORIES = [
  { title: "All", links: [
  { title: "All", href: "/Product" },
  { title: "Tables" , href: "/Product?product_type=Tables"},
  { title: "Seating" , href: "/Product?product_type=Seating"},
  { title: "Beds" , href: "/Product?product_type=Beds"},
  { title: "Storage" , href: "/Product?product_type=Storage"},
  { title: "Decor" , href: "/Product?product_type=Decor"},
  { title: "Floor & Mat" , href: "/Product?product_type=Floor%20%26%20Mat"},
  { title: "Lighting" , href: "/Product?product_type=Lighting"},
  { title: "Other" , href: "/Product?product_type=Other"}
    ] },
  
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


export function NavigationMenuDemo() {
  return (
    <NavigationMenu
      viewport={false}
      className="z-30 rounded-lg shadow-sm bg-background/60 backdrop-blur-md"
    >
      <NavigationMenuList>
        {/* Home Link */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Dynamic Categories */}
        {CATEGORIES.map((category) => (
          <NavigationMenuItem key={category.title}>
            <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 p-3 md:grid-cols-2">
                {category.links.map((link) => (
                  <li key={link.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={link.href}
                        className="block rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition"
                      >
                        {link.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        {/* Static Pages */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/contact">Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
