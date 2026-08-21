// src/App.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout'; 

// 1. Static Import of Home page to eliminate the massive 0.346 CLS on load
import Home from './routes/Home'; 

// 2. Lazy load inner routes to keep initial bundle size light
const About = lazy(() => import('./routes/About'));
const Services = lazy(() => import('./routes/Services'));
const Blog = lazy(() => import('./routes/Blog'));
const Contact = lazy(() => import('./routes/Contact'));
const Profile = lazy(() => import('./routes/Profile'));
const BlogPost = lazy(() => import('./routes/BlogPost')); 

// 3. Spacing fallback container to lock page structure while inner routes resolve
const withSuspense = (Component: React.ComponentType) => {
return (props: any) => ( 

);
}; 

const SuspendedAbout = withSuspense(About);
const SuspendedServices = withSuspense(Services);
const SuspendedBlog = withSuspense(Blog);
const SuspendedContact = withSuspense(Contact);
const SuspendedProfile = withSuspense(Profile);
const SuspendedBlogPost = withSuspense(BlogPost); 

// 4. Stable router structure matched to your production layout tree
const router = createBrowserRouter([
{
path: "/",
element: 

,
children: [
{ index: true, element:  },
{ path: "about-us", element:  },
{ path: "services", element:  },
{ path: "blog", element:  },
{ path: "contact", element:  },
{ path: "profile", element:  },
{ path: ":slug", element:  },
],
},
]); 

export default function App() {
return ;
}
