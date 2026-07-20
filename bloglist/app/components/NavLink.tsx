import Link from "next/link";

type NavLinkType = {
  href: string;
  children: React.ReactNode;
};
const NavLink = ({ href, children }: NavLinkType) => {
  return (
    <Link href={href} className="hover:text-gray-300">
      {children}
    </Link>
  );
};

export default NavLink;
