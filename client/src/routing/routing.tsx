import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import Collection from "../pages/Collection";
import NFT from "../pages/NFT";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'gallery',
                element: <Gallery />
            },
            {
                path: 'gallery/collection',
                element: <Collection />
            },
            {
                path: 'gallery/collection/nft',
                element: <NFT />
            },
            {
                path: 'notfound',
                element: <NotFound />
            }
        ]
    }
])