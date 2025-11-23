import {
    LayoutGrid,
    Package,
    Users2,
    ShoppingBag,
    Settings,
} from "lucide-react";

export const adminMenu = [
    {
        label: "Dashboard",
        icon: LayoutGrid,
        path: "/admin/dashboard",
    },
    {
        label: "Products",
        icon: Package,
        path: "/admin/products",
    },
    {
        label: "Orders",
        icon: ShoppingBag,
        path: "/admin/orders",
    },
    {
        label: "Users",
        icon: Users2,
        path: "/admin/users",
    },
    {
        label: "Settings",
        icon: Settings,
        path: "/admin/settings",
    },
];
