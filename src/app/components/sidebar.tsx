import React from "react";
import Logo from "@/app/assets/leaflens.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, LayoutDashboard, FileText, LogOut } from "lucide-react";

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
  ];

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          height: "100vh",
          width: "80px",
          backgroundColor: "#f4f4f4",
          padding: "10px 0",
          boxSizing: "border-box",
          position: "fixed",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Image src={Logo} alt="LeafLens Logo" width={40} height={40} />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {menuItems.map((item, index) => (
            <Link href={item.path} key={index} passHref>
              <div
                className="group"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    backgroundColor:
                      pathname === item.path ? "#14c984" : "transparent",
                    color: pathname === item.path ? "#fff" : "#000",
                    borderRadius: "8px",
                    padding: "10px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                >
                  {item.icon}
                </div>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/">
          <div
            className="group"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
              position: "relative",
            }}
          >
            <div
              style={{
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
            >
              <LogOut size={20} />
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
