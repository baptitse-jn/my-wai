import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CGU from "./pages/CGU";
import MentionsLegales from "./pages/MentionsLegales";
import Entreprise from "./pages/Entreprise";
import Blogues from "./pages/Blogues";
import BloguePost from "./pages/BloguePost";
import PaiementMerci from "./pages/PaiementMerci";
import PaiementAnnulation from "./pages/PaiementAnnulation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cgu" element={<CGU />} />
        <Route path="/entreprise" element={<Entreprise />} />
        <Route path="/blogues" element={<Blogues />} />
        <Route path="/blogue/:slug" element={<BloguePost />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="/paiement/merci" element={<PaiementMerci />} />
        <Route path="/paiement/annulation" element={<PaiementAnnulation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
