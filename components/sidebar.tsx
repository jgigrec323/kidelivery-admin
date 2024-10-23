import React from "react";
import {
  FaHome,
  FaUsers,
  FaShoppingBag,
  FaTruck,
  FaClipboardList,
  FaChartLine,
  FaCog,
} from "react-icons/fa"; // Icons for visual appeal
import Logo from "./logo";
import CustomUserButton from "./custom-user-button";

const sidebarLinks = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: <FaHome className="mr-2" />,
  },
  {
    section: "Gestion",
    links: [
      {
        title: "Commandes",
        href: "/orders",
        icon: <FaClipboardList className="mr-2" />,
      },
      {
        title: "Livraisons",
        href: "/deliveries",
        icon: <FaTruck className="mr-2" />,
      },
      {
        title: "Boutiques",
        href: "/shops",
        icon: <FaShoppingBag className="mr-2" />,
      },
      {
        title: "Utilisateurs",
        href: "/users",
        icon: <FaUsers className="mr-2" />,
      },
    ],
  },
  {
    section: "Rapports",
    links: [
      {
        title: "Performance",
        href: "/reports/delivery-performance",
        icon: <FaChartLine className="mr-2" />,
      },
      {
        title: "Financiers",
        href: "/reports/financials",
        icon: <FaChartLine className="mr-2" />,
      },
    ],
  },
  {
    section: "Paramètres",
    links: [
      {
        title: "Paramètres",
        href: "/settings",
        icon: <FaCog className="mr-2" />,
      },
    ],
  },
];

function Sidebar() {
  return (
    <div className="flex flex-col flex-1 justify-around ">
      <Logo></Logo>
      <div className="space-y-6">
        {sidebarLinks.map((item, index) => (
          <div key={index}>
            {/* If it's a standalone link (e.g., Accueil), render it directly */}
            {item.title && (
              <a
                href={item.href}
                className="flex items-center mb-4 text-white hover:text-orange transition-colors duration-300"
              >
                {item.icon}
                {item.title}
              </a>
            )}
            {/* If it's a section with links, render the section */}
            {item.section && (
              <>
                <h3 className="text-gray-600 mb-2">{item.section}</h3>
                <ul className="space-y-4">
                  {item.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="flex items-center text-white hover:text-orange transition-colors duration-300"
                      >
                        {link.icon}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="justify-self-end">
        <CustomUserButton></CustomUserButton>
      </div>
    </div>
  );
}

export default Sidebar;
