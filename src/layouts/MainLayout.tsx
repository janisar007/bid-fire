import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { navItems } from "./navItems";
import { NavListItem } from "../components/NavListItem";
import { AppBar, Drawer, DrawerHeader } from "./LayoutStyledComponents";

export const MainLayout = () => {
  const [open, setOpen] = useState(true);
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen">
      {/* Top Navbar */}
      <AppBar open={open} className="fixed z-50 bg-[#2AAA8A]">
        <div className="flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 text-white hover:bg-transparent hover:text-white"
            onClick={handleDrawerOpen}
            style={{ display: open ? "none" : "block" }}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>

          <h1 className="text-lg font-semibold text-white flex-grow">
            Bid Fire
          </h1>

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">{role}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={role} />
                    <AvatarFallback>{role?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </AppBar>

      {/* Left Sidebar */}
      <Drawer open={open} className="fixed h-screen overflow-y-auto">
        <DrawerHeader>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleDrawerClose}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </DrawerHeader>
        <Separator />
        <nav className="cursor-pointer overflow-y-auto">
          {navItems
            .filter((item) => item.showInSidebar)
            .map((item) => (
              <NavListItem
                key={item.id}
                item={item}
                open={open}
                active={() => isActive(item.path)}
                onClick={() => navigate(item.path)}
              />
            ))}
        </nav>
      </Drawer>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        <DrawerHeader />
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
