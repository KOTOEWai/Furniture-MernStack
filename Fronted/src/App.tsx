import {  Route,createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import { lazy, Suspense} from 'react';
import LightingProduct from './Layouts/LightingProduct';
import { Spinner } from './components/ui/shadcn-io/spinner';
import AmazonProduct from './Pages/AmazonProduct';
import FilterProduct from './Pages/FilterProducts';

const  RootLayout = lazy(() => import('./Layouts/RootLayout'));
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));




function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<RootLayout/>} >
        <Route index element={<Home/>}/>
        <Route path='products' element={<AmazonProduct/>}/>
        <Route path='filterProduct' element={<FilterProduct/>}/>
        <Route path='about' element={<About/>}/> 
        <Route path='Lighting' element={<LightingProduct/>}/>
      </Route>
       <Route path='*'  element= {<NotFound/>}/>
    
       </>
    )
  )
  return (
   <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spinner /></div>}>
      <RouterProvider router={router}/>
    </Suspense>
  );
}

export default App;