import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './index.css';
import {LoginPage,SignupPage,AddPost,AllPosts,MyPosts} from './pages/pages';
import Layout from './Layout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/add-post' element={<AddPost/>} />
      <Route path='/home' element={<AllPosts/>} />
      <Route path='/my-posts' element={<MyPosts/>} />
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
