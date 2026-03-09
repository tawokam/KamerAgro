//import { createBrowserRouter } from "react-router";
import { createHashRouter } from "react-router";
import Onboarding from "./pages/Onboarding";
import ProducteurDashboard from "./pages/ProducteurDashboard";
import AcheteurCatalogue from "./pages/AcheteurCatalogue";
import ProductDetail from "./pages/ProductDetail";
import Paiement from "./pages/Paiement";
import SocialFeed from "./pages/SocialFeed";
import IndustrialCatalogue from "./pages/IndustrialCatalogue";
import IndustrialProductDetail from "./pages/IndustrialProductDetail";

export const router = createHashRouter([
  {
    path: "/",
    Component: Onboarding,
  },
  {
    path: "/social",
    Component: SocialFeed,
  },
  {
    path: "/producteur",
    Component: ProducteurDashboard,
  },
  {
    path: "/acheteur",
    Component: AcheteurCatalogue,
  },
  {
    path: "/industrial",
    Component: IndustrialCatalogue,
  },
  {
    path: "/industrial/:id",
    Component: IndustrialProductDetail,
  },
  {
    path: "/produit/:id",
    Component: ProductDetail,
  },
  {
    path: "/paiement",
    Component: Paiement,
  },
]);