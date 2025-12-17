import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Menu, X, ShoppingBag, TrendingUp, MessageSquare, Moon, Sun, LayoutDashboard, Wrench, Bug, Beaker, Calendar, Droplets, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { path: "/prices", label: "Prices", icon: TrendingUp },
    { path: "/community", label: "Community", icon: MessageSquare },
  ];

  // Only show Dashboard link in main nav if logged in? Or maybe always in dropdown
  // navLinks.push({ path: "/dashboard", label: "Dashboard", icon: LayoutDashboard });

  const toolsLinks = [
    { path: "/tools/disease-detection", label: "Disease Detection", icon: Bug },
    { path: "/tools/soil-analysis", label: "Soil Analysis", icon: Beaker },
    { path: "/tools/planting-schedule", label: "Planting Schedule", icon: Calendar },
    { path: "/tools/irrigation-guide", label: "Irrigation Guide", icon: Droplets },
  ];

  const isToolsActive = toolsLinks.some(link => location.pathname === link.path);

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" id="nav-logo" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl text-foreground">AgriOne</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path}>
                  <Button variant={isActive ? "default" : "ghost"} className="gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    {link.label}
                  </Button>
                </Link>
              );
            })}

            {/* Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={isToolsActive ? "default" : "ghost"} className="gap-2">
                  <Wrench className="h-4 w-4" />
                  AI Tools
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {toolsLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <DropdownMenuItem key={link.path} asChild>
                      <Link to={link.path} className="flex items-center gap-2 cursor-pointer">
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <div className="flex items-center space-x-1 ml-2">
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt={user.email} />
                        <AvatarFallback>{getInitials(user.first_name || user.email)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.first_name} {user.last_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="default">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block">
                  <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start gap-2">
                    {Icon && <Icon className="h-4 w-4" />}
                    {link.label}
                  </Button>
                </Link>
              );
            })}

            {/* Mobile Tools Section */}
            <div className="pt-2 border-t border-border">
              <p className="px-4 py-2 text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Farm Tools
              </p>
              {toolsLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="block">
                    <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start gap-2 pl-8">
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-border space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>

              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-2 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt={user.email} />
                      <AvatarFallback>{getInitials(user.first_name || user.email)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.first_name} {user.last_name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start gap-2 text-destructive" onClick={() => { logout(); setIsOpen(false); }}>
                    <LogOut className="h-4 w-4" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="ghost" className="w-full justify-start">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="default" className="w-full justify-start">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
