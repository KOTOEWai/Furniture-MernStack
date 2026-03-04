import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import { lazy, Suspense } from 'react';

import { Spinner } from './components/ui/shadcn-io/spinner';

import FilterProduct from './Pages/FilterProducts';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { ProtectedRoute } from './Auth/protectedRoute';
import Dashboard from './Pages/Admin/Dashboard';

const RootLayout = lazy(() => import('./Layouts/RootLayout'));
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Contact = lazy(() => import('./Pages/Contact'));




function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<RootLayout />} >
          <Route index element={<Home />} />
          <Route path='Product' element={<FilterProduct />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
        </Route>

        <Route path='*' element={<NotFound />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />


        <Route element={<ProtectedRoute />}>
          <Route path='/Dashboard' element={<Dashboard />} />
        </Route>

      </>
    )
  )
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spinner /></div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;