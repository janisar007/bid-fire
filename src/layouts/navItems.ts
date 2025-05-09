import type { NavItem } from "../types/layout";
import { Dashboard } from "../pages/private/Dashboard"; 
import  YourPost  from "../pages/private/YourPost/index"; 
import  NewPost  from "../pages/private/AddNewPost/index";
import { FaTachometerAlt, FaUsers } from "react-icons/fa";

export const navItems: NavItem[] = [
  // Sidebar pages
  {
    id: "dashboard",
    name: "Dashboard",
    icon: FaTachometerAlt,
    path: "/dashboard",
    showInSidebar: true,
    component: Dashboard,
  },
  {
    id: "yourpost",
    name: "You Posts",
    icon: FaUsers,
    component: YourPost,
    path: "/youpost",
    showInSidebar: true,
  },

  {
    id: "newPost",
    name: "New Post",
    // icon: PeopleIcon,
    component: NewPost,
    path: "/newpost",
    showInSidebar: false,
  },
//   {
//     id: "reports",
//     name: "Reports",
//     icon: ReportsIcon,
//     path: "/reports",
//     showInSidebar: true,
//     component: "Reports",
//   },
//   {
//     id: "settings",
//     name: "Settings",
//     icon: SettingsIcon,
//     path: "/settings",
//     showInSidebar: true,
//     component: "Settings",
//   },
  
  // Private pages not in sidebar
//   {
//     id: "profile",
//     name: "Profile",
//     path: "/profile",
//     showInSidebar: false,
//     component: "Profile",
//   },
//   {
//     id: "project-detail",
//     name: "Project Detail",
//     path: "/projects/:id",
//     showInSidebar: false,
//     component: "ProjectDetail",
//   },
];