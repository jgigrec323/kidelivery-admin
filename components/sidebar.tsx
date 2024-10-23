"use client";
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
import { useParams, usePathname } from "next/navigation";

function Sidebar() {
  const params = useParams();
  const pathname = usePathname();

  const sidebarLinks = [
    {
      title: "Tableau de bord",
      href: `/${params.username}/dashboard`,
      icon: <FaHome className="mr-2" />,
      active: pathname === `/${params.username}/dashboard`,
    },
    {
      section: "Gestion",
      links: [
        {
          title: "Commandes",
          href: `/${params.username}/orders`,
          icon: <FaClipboardList className="mr-2" />,
          active: pathname === `/${params.username}/orders`,
        },
        {
          title: "Livraisons",
          href: `/${params.username}/deliveries`,
          icon: <FaTruck className="mr-2" />,
          active: pathname === `/${params.username}/deliveries`,
        },
        {
          title: "Boutiques",
          href: `/${params.username}/shops`,
          icon: <FaShoppingBag className="mr-2" />,
          active: pathname === `/${params.username}/shops`,
        },
        {
          title: "Utilisateurs",
          href: `/${params.username}/users`,
          icon: <FaUsers className="mr-2" />,
          active: pathname === `/${params.username}/users`,
        },
      ],
    },
    {
      section: "Rapports",
      links: [
        {
          title: "Performance",
          href: `/${params.username}/reports/delivery-performance`,
          icon: <FaChartLine className="mr-2" />,
          active:
            pathname === `/${params.username}/reports/delivery-performance`,
        },
        {
          title: "Financiers",
          href: `/${params.username}/reports/financials`,
          icon: <FaChartLine className="mr-2" />,
          active: pathname === `/${params.username}/reports/financials`,
        },
      ],
    },
    {
      section: "Paramètres",
      links: [
        {
          title: "Paramètres",
          href: `/${params.username}/settings`,
          icon: <FaCog className="mr-2" />,
          active: pathname === `/${params.username}/settings`,
        },
      ],
    },
  ];

  return (
    <div className="flex pl-4 flex-col flex-1 justify-around">
      <Logo />

      <div className="space-y-6 mt-6">
        {sidebarLinks.map((item, index) => (
          <div key={index}>
            {item.title && (
              <a
                href={item.href}
                className={`flex items-center mb-4 ${
                  item.active ? "text-orange" : "text-white"
                } hover:text-orange transition-colors duration-300`}
              >
                {item.icon}
                {item.title}
              </a>
            )}

            {item.section && (
              <>
                <h3 className="text-gray-400 mb-2">{item.section}</h3>
                <ul className="space-y-4">
                  {item.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className={`flex items-center ${
                          link.active ? "text-orange" : "text-white"
                        } hover:text-orange transition-colors duration-300`}
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

      <div className="pt-4 border-t ">
        <CustomUserButton />
      </div>
    </div>
  );
}

export default Sidebar;
