import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

function MobileMenu() {
  return (
    <NavigationMenu className="block md:hidden">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent className={""}>
            <ul className={"flex flex-col gap-4 p-2 w-max underline border-2"}>
              <li>
                <NavigationMenuLink className="link cursor-pointer">
                  Admin
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  className="link cursor-pointer"
                  href="/all-posts/1"
                >
                  All Posts
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink
                  className="link cursor-pointer"
                  href="https://github.com/rubinimeri"
                  target="_blank"
                >
                  About Me
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const Header = () => {
  return (
    <header className="max-w-[1200px] mx-auto max-sm:px-4 px-[70px] py-5 flex items-center justify-between">
      <div>
        <Link to="/">
          <img
            src="/logo/logo-light.png"
            alt="logo"
            width={250}
            className="hidden md:block lg:block ml-[-10px]"
          />
          <img
            src="/logo/logo-light-sm.png"
            alt="logo-sm"
            width={100}
            className="sm:block md:hidden lg:hidden"
          />
        </Link>
      </div>
      <nav className="hidden md:flex gap-16 underline ">
        <a href="#" className="text-blue-500">
          Admin
        </a>
        <Link to="/all-posts/1" className="text-blue-500">
          All Posts
        </Link>
        <a
          href="https://github.com/rubinimeri"
          target="_blank"
          className="text-blue-500"
        >
          About Me
        </a>
      </nav>
      <MobileMenu />
    </header>
  );
};

export default Header;
