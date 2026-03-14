import Logo from "@/assets/furniture.svg"
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "@/components/ui/FooterSupport";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-4 border-t" style={{ backgroundColor: "#FFF8F0", borderColor: "#D2B48C" }}>
      <div className="mx-auto max-w-7xl">
        <Footer className="py-12 bg-transparent">
          <FooterContent className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {/* Column 1: Brand Identity */}
            <FooterColumn className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={Logo} alt="Logo" className="w-auto h-12" />
                <h3 className="text-2xl font-bold" style={{ color: "#8B4513" }}>Funiture</h3>
              </div>
              <p className="max-w-xs mb-6 text-sm leading-relaxed" style={{ color: "#5C4033" }}>
                Crafting comfort and elegance for your home. High-quality, sustainable furniture designed to last a lifetime.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 transition-colors rounded-full bg-[#D2B48C]/20 hover:bg-[#D2B48C]" style={{ color: "#8B4513" }}>
                  <Facebook size={18} />
                </a>
                <a href="#" className="p-2 transition-colors rounded-full bg-[#D2B48C]/20 hover:bg-[#D2B48C]" style={{ color: "#8B4513" }}>
                  <Instagram size={18} />
                </a>
                <a href="#" className="p-2 transition-colors rounded-full bg-[#D2B48C]/20 hover:bg-[#D2B48C]" style={{ color: "#8B4513" }}>
                  <Twitter size={18} />
                </a>
                <a href="#" className="p-2 transition-colors rounded-full bg-[#D2B48C]/20 hover:bg-[#D2B48C]" style={{ color: "#8B4513" }}>
                  <Youtube size={18} />
                </a>
              </div>
            </FooterColumn>

            {/* Column 2: Shop */}
            <FooterColumn>
              <h3 className="mb-4 text-lg font-bold" style={{ color: "#8B4513" }}>Shop</h3>
              <ul className="flex flex-col gap-2">
                <li><a href="/living-room" className="text-sm transition-colors hover:translate-x-1 inline-block" style={{ color: "#5C4033" }}>Living Room</a></li>
                <li><a href="/bedroom" className="text-sm transition-colors hover:translate-x-1 inline-block" style={{ color: "#5C4033" }}>Bedroom</a></li>
                <li><a href="/dining" className="text-sm transition-colors hover:translate-x-1 inline-block" style={{ color: "#5C4033" }}>Dining Room</a></li>
                <li><a href="/office" className="text-sm transition-colors hover:translate-x-1 inline-block" style={{ color: "#5C4033" }}>Home Office</a></li>
              </ul>
            </FooterColumn>

            {/* Column 3: Support */}
            <FooterColumn>
              <h3 className="mb-4 text-lg font-bold" style={{ color: "#8B4513" }}>Support</h3>
              <ul className="flex flex-col gap-2">
                <li><a href="/shipping" className="text-sm transition-colors hover:translate-x-1 inline-block" style={{ color: "#5C4033" }}>Shipping & Returns</a></li>
                <li><a href="/warranty" className="text-sm transition-colors hover:translate-x-1 inline-block" style={{ color: "#5C4033" }}>Warranty</a></li>
                <li><a href="/faq" className="text-sm transition-colors hover:translate-x-1 inline-block" style={{ color: "#5C4033" }}>FAQs</a></li>
                <li><a href="/contact" className="text-sm transition-colors hover:translate-x-1 inline-block" style={{ color: "#5C4033" }}>Contact Us</a></li>
              </ul>
            </FooterColumn>

            {/* Column 4: Newsletter/Contact */}
            <FooterColumn className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-1">
              <h3 className="mb-4 text-lg font-bold" style={{ color: "#8B4513" }}>Newsletter</h3>
              <p className="mb-4 text-xs" style={{ color: "#5C4033" }}>Subscribe to receive updates & offers.</p>
              <div className="flex w-full max-w-sm items-center mb-6 space-x-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-[#8B4513]"
                  style={{ backgroundColor: "#FFF", borderColor: "#D2B48C" }}
                />
                <button
                  className="px-4 py-2 text-sm font-medium text-white transition-all rounded-md hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "#8B4513" }}
                >
                  Join
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs" style={{ color: "#5C4033" }}>
                  <Phone size={14} className="opacity-70" /> <span>+95 9 123 456 789</span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "#5C4033" }}>
                  <Mail size={14} className="opacity-70" /> <span>hello@funiture.com</span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "#5C4033" }}>
                  <MapPin size={14} className="opacity-70" /> <span>123 Furniture St, Yangon</span>
                </div>
              </div>
            </FooterColumn>
          </FooterContent>

          <FooterBottom className="pt-8 mt-12 border-t" style={{ borderColor: "#D2B48C" }}>
            <p className="text-sm" style={{ color: "#5C4033" }}>
              © {currentYear} Funiture. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-xs transition-colors hover:text-black" style={{ color: "#5C4033" }}>Privacy Policy</a>
              <a href="/terms" className="text-xs transition-colors hover:text-black" style={{ color: "#5C4033" }}>Terms of Service</a>
              <ModeToggle />
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
