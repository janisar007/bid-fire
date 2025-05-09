import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// Define drawer width (same as original)
const drawerWidth = 240

// AppBar styles using cva
const appBarVariants = cva(
  "fixed z-50 transition-all duration-300 ease-sharp",
  {
    variants: {
      open: {
        true: `ml-[${drawerWidth}px] w-[calc(100%-${drawerWidth}px)]`,
        false: "w-full"
      }
    },
    defaultVariants: {
      open: false
    }
  }
)

interface AppBarProps extends React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof appBarVariants> {}

export const AppBar = ({ className, open, ...props }: AppBarProps) => (
  <header 
    className={cn(appBarVariants({ open, className }))}
    {...props}
  />
)

// Drawer styles
const drawerVariants = cva(
  "fixed h-screen overflow-hidden transition-all duration-300 ease-sharp",
  {
    variants: {
      open: {
        true: `w-[${drawerWidth}px]`,
        false: "w-14 sm:w-16"
      }
    },
    defaultVariants: {
      open: false
    }
  }
)

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof drawerVariants> {}

export const Drawer = ({ className, open, ...props }: DrawerProps) => (
  <aside
    className={cn(drawerVariants({ open, className }))}
    {...props}
  />
)

// DrawerHeader component
export const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={cn(
      "flex items-center justify-end p-1 min-h-[64px]", // Equivalent to theme.mixins.toolbar
      className
    )}
    {...props}
  />
)