import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spinner } from './components/ui/shadcn-io/spinner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import FilterProduct from '@/pages/FilterProducts';
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import NotFound from '@/pages/NotFound';
import RootLayout from './components/layout/RootLayout';
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));




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