import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Define type for layout items
interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function MyGrid() {
  const layouts: { lg: LayoutItem[]; md: LayoutItem[]; sm: LayoutItem[]; xs: LayoutItem[]; xxs: LayoutItem[] } = {
    lg: [
      { i: "a", x: 0, y: 0, w: 4, h: 2 },
      { i: "b", x: 4, y: 0, w: 4, h: 2 },
      { i: "c", x: 8, y: 0, w: 4, h: 2 }
    ],
    md: [
      { i: "a", x: 0, y: 0, w: 5, h: 2 },
      { i: "b", x: 5, y: 0, w: 5, h: 2 },
      { i: "c", x: 0, y: 2, w: 10, h: 2 }
    ],
    sm: [
      { i: "a", x: 0, y: 0, w: 6, h: 2 },
      { i: "b", x: 0, y: 2, w: 6, h: 2 },
      { i: "c", x: 0, y: 4, w: 6, h: 2 }
    ],
    xs: [
      { i: "a", x: 0, y: 0, w: 4, h: 2 },
      { i: "b", x: 0, y: 2, w: 4, h: 2 },
      { i: "c", x: 0, y: 4, w: 4, h: 2 }
    ],
    xxs: [
      { i: "a", x: 0, y: 0, w: 2, h: 2 },
      { i: "b", x: 0, y: 2, w: 2, h: 2 },
      { i: "c", x: 0, y: 4, w: 2, h: 2 }
    ]
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">Responsive React Grid Layout</h1>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
      >
        <div key="a" className="flex items-center justify-center rounded-lg shadow">A</div>
        <div key="b" className="flex items-center justify-center rounded-lg shadow">B</div>
        <div key="c" className="flex items-center justify-center rounded-lg shadow">C</div>
      </ResponsiveGridLayout>
    </div>
  );
}
