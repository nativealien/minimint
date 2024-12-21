import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/notfound/NotFound";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Gallery from "../pages/gallery/Gallery";
import Collection from "../pages/collection/Collection";
import NFT from "../pages/nft/NFT";
import MintCollection from "../pages/mintcollection/MintCollection";

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
                path: 'gallery/collection/mint',
                element: <MintCollection />
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