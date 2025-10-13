import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import Logo from "@/assets/furniture.svg"
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "../components/ui/FooterSupport";
import { ModeToggle } from "../components/ui/mode-toggle";

interface FooterLink {
  text: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: ReactNode;
  name?: string;
  columns?: FooterColumnProps[];
  copyright?: string;
  policies?: FooterLink[];
  showModeToggle?: boolean;
  className?: string;
}

export default function FooterSection({

  name = "Funiture",
  columns = [
    {
      title: "Product",
      links: [
        { text: "Changelog", href: "https://www.launchuicomponents.com/" },
        { text: "Documentation", href: "https://www.launchuicomponents.com/" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", href: "https://www.launchuicomponents.com/" },
        { text: "Careers", href: "https://www.launchuicomponents.com/" },
        { text: "Blog", href: "https://www.launchuicomponents.com/" },
      ],
    },
    {
      title: "Contact",
      links: [
        { text: "Discord", href: "https://www.launchuicomponents.com/" },
        { text: "Twitter", href: "https://www.launchuicomponents.com/" },
        { text: "Github", href: "https://www.launchuicomponents.com/" },
      ],
    },
  ],
  copyright = "© 2025 Mikołaj Dobrucki. All rights reserved",
  policies = [
    { text: "Privacy Policy", href: "https://www.launchuicomponents.com/" },
    { text: "Terms of Service", href: "https://www.launchuicomponents.com/" },
  ],
  showModeToggle = true,
  className,
}: FooterProps) {
  
  return (
        
    <footer className={cn("bg-background w-full px-4 border-t-slate-950", className)} style={{backgroundColor: "#f0e9d4"}} >
      <div className="mx-auto max-w-container" >
        <Footer style={{backgroundColor: "#f0e9d4"}}>
          <FooterContent>
            <FooterColumn className="col-span-2 text-black sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
               <img src={Logo}   alt="Logo" className="h-16 w-11" />
                <h3 className="text-xl font-bold text-black">{name}</h3>
              </div>
            </FooterColumn>
            {columns.map((column, index) => (
              <FooterColumn key={index}>
                <h3 className="pt-1 font-semibold text-black text-md">{column.title}</h3>
                {column.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="text-sm text-black text-muted-foreground"
                  >
                    {link.text}
                  </a>
                ))}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom className="pt-6 mt-6 border-t" style={{borderColor: "#563232"}}>
            <div>{copyright}</div>
            <div className="flex items-center gap-4 text-white">
              {policies.map((policy, index) => (
                <a key={index} href={policy.href} className="text-black" >
                  {policy.text}
                </a>
              ))}
              {showModeToggle && <ModeToggle />}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
