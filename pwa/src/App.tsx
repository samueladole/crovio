import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Prices from "./pages/Prices";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import PriceDetail from "./pages/PriceDetail";
import ContactDealer from "./pages/ContactDealer";
import DiscussionDetail from "./pages/DiscussionDetail";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./pages/ChatRoom";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Dealers from "./pages/admin/Dealers";
import Products from "./pages/admin/Products";
import PriceManagement from "./pages/admin/PriceManagement";
import Discussions from "./pages/admin/Discussions";
import AddDealer from "./pages/admin/AddDealer";
import AddProduct from "./pages/admin/AddProduct";
import Analytics from "./pages/admin/Analytics";
import SetPriceAlert from "./pages/SetPriceAlert";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<ProductDetail />} />
          <Route path="/contact-dealer/:id" element={<ContactDealer />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/prices/:id" element={<PriceDetail />} />
          <Route path="/set-price-alert" element={<SetPriceAlert />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/discussion/:id" element={<DiscussionDetail />} />
          <Route path="/community/chats" element={<ChatRooms />} />
          <Route path="/community/chat/:id" element={<ChatRoom />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dealers" element={<Dealers />} />
          <Route path="/admin/dealers/add" element={<AddDealer />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/prices" element={<PriceManagement />} />
          <Route path="/admin/discussions" element={<Discussions />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
