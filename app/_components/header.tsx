import React from "react";

interface HeaderProps {
  subtitle: string;
  title: string;
  button?: React.ReactNode;
}
const Header = ({ subtitle, title, button }: HeaderProps) => {
  return (
    <div className="flex w-full shrink-0 items-center justify-between">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-primary">{subtitle}</span>
        <h2 className="text-xl font-semibold"> {title} </h2>
      </div>
      {button}
    </div>
  );
};

export default Header;
