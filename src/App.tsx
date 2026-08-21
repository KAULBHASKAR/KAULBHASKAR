import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import Home from './routes/Home'; 

const About = lazy(() => import('./routes/About'));
const Services = lazy(() => import('./routes/Services'));
const Blog = lazy(() => import('./routes/Blog'));
const Contact = lazy(() => import('./routes/Contact'));
const Profile = lazy(() => import('./routes/Profile'));
const BlogPost = lazy(() => import('./routes/BlogPost')); 

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
