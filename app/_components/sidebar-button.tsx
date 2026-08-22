"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import React from "react";

interface SidebarButtonProps {
  href: string;
  children?: React.ReactNode
}

const SidebarButton = ({ children, href }: SidebarButtonProps) => {
  const pathName = usePathname();

  return (
    <Button
      className="justify-start gap-2"
      variant={pathName === href ? "secondary" : "ghost"}
      asChild
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
};

export default SidebarButton;
