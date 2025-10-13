
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom";

const CATEGORY_LINKS = [
  { title: "All", href: "/products" },
  { title: "Seating", href: "/filterProduct?product_type=Seating" },
  { title: "Tables", href: "/filterProduct?product_type=Tables" },
  { title: "Storage", href: "/filterProduct?product_type=Storage" },
  { title: "Lighting", href: "/Lighting" },
  { title: "Decor", href: "/filterProduct?product_type=Decor" },
  { title: "Floor & Mat", href: "/filterProduct?product_type=Floor%20%26%20Mat" },
  { title: "Other", href: "/filterProduct?product_type=Other" },
]

export function NavigationMenuDemo() {
 
  return (
    <NavigationMenu viewport={false} className="z-30">
      <NavigationMenuList>
       
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shops</NavigationMenuTrigger>
            <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-2 md:grid-cols-2">
              {CATEGORY_LINKS.map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className="block rounded-md px-2 py-1.5 text-sm hover:bg-accent transition"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        
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
  )
}

