import { Link, useLocation } from "react-router-dom";
import LightingProduct from "./LightingProduct";

const CATEGORIES = [
  { title: "All", links: [{ title: "All", href: "/Product" }] },
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

const getLinkClass = (isActive: boolean) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
    isActive
      ? "bg-blue-600 text-white"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }`;

function FilterProductComponent() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const productType = params.get("product_type");
  const decodedType = productType ? decodeURIComponent(productType) : null;

  // ✅ Identify active main category
  const activeCategory =
    CATEGORIES.find((cat) =>
      cat.links.some((link) =>
        link.href.includes(`product_type=${encodeURIComponent(decodedType || "")}`)
      )
    ) || null;

  // ===== CASE 1: No product_type → "All"
  if (!productType) {
    return (
      <CategoryBar active="All" />
    );
  }

  // ===== CASE 2: Other
  if (productType === "Other") {
    return (
      <CategoryBar active="Other" />
    );
  }

  // ===== CASE 3: Lighting (with component)
  if (productType === "Lighting") {
    return (
      <div className="mb-4 space-y-8">
        <CategoryBar active="Lighting" />
        
        <SubCategoryBar activeCategory={activeCategory} decodedType={decodedType} />
        <LightingProduct />
      </div>
    );
  }

  // ===== CASE 4: Normal categories
  return (
    <div className="mb-4 space-y-8">
      <CategoryBar active={activeCategory?.title || ""}  />
         <span className="block w-full h-px bg-black" />
      <SubCategoryBar activeCategory={activeCategory} decodedType={decodedType} />
    </div>
  );
}

// ===== Reusable Components =====
function CategoryBar({ active }: { active: string }) {
  return (
    <nav className="flex flex-wrap justify-center gap-1 mb-4 md:gap-3 ">
      {CATEGORIES.map((category) => {
        const isActive = active === category.title;
        return (
          <Link
            key={category.title}
            to={category.links[0].href}
            className={`relative px-2 py-2 rounded-full text-medium font-medium transition-colors 
              ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}
            `}
          >
            {category.title}
            {isActive && (
              <span className="absolute left-1/2 -bottom-1.5 h-[2px] w-6 -translate-x-1/2 bg-blue-600 rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}


function SubCategoryBar({
  activeCategory,
  decodedType,
}: {
  activeCategory: (typeof CATEGORIES)[0] | null;
  decodedType: string | null;
}) {
  if (!activeCategory) return null;

  return (
    <>
  
    <nav className="flex flex-wrap justify-center gap-2 md:gap-3 ">
      {activeCategory.links.map((link) => {
        const linkType = decodeURIComponent(
          link.href.split("product_type=")[1] || ""
        );
        const isActive = linkType === decodedType;

        return (
          <Link key={link.title} to={link.href} className={getLinkClass(isActive)}>
            {link.title}
          </Link>
        );
      })}
    </nav>
    </>
  );
}

export default FilterProductComponent;
