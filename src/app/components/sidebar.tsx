import React from "react";
import Logo from "@/app/assets/leaflens.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Camera,
  LayoutDashboard,
  FileText,
  LogOut,
  CalendarCheck2,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      label: "Diagnostics",
      icon: <Camera size={20} />,
      path: "/diagnostics",
    },
    {
      label: "Reports",
      icon: <FileText size={20} />,
      path: "/reports",
    },
    {
      label: "Tracker",
      icon: <CalendarCheck2 size={20} />,
      path: "/tracker",
    },
    {
      label: "Community",
      icon: <Users size={20} />,
      path: "/community",
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="h-screen w-20 bg-[#0E0E0E] p-2.5 box-border fixed top-0 left-0 flex flex-col items-center">
        <div className="mb-10 mt-5">
          <Image src={Logo} alt="LeafLens Logo" width={45} height={45} />
        </div>
        <div className="flex-1 flex flex-col items-center">
          {menuItems.map((item, index) => (
            <Link href={item.path} key={index} passHref>
              <div className="group flex justify-center mb-5 relative">
                <div
                  className={`rounded-lg p-3 cursor-pointer transition-colors ${
                    pathname === item.path
                      ? "bg-[#14c984] text-white"
                      : "bg-transparent text-[#cfcfcf] hover:text-[#14c984] transition-all duration-300"
                  }`}
                >
                  {React.cloneElement(item.icon, {
                    size: 24,
                    strokeWidth: pathname === item.path ? 2 : 1,
                    className: "group-hover:stroke-[3]",
                  })}
                </div>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/">
          <div className="group flex justify-center mb-2.5 relative">
            <div
              className={`p-2.5 rounded-lg cursor-pointer transition-colors ${
                pathname === "/"
                  ? "bg-[#14c984] text-white"
                  : "bg-transparent text-[#cfcfcf] hover:text-[#14c984] transition-all duration-300"
              }`}
            >
              <LogOut
                size={24}
                strokeWidth={pathname === "/" ? 2 : 1}
                className="group-hover:stroke-[3]"
              />
            </div>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              Logout
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
