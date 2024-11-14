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
                <NavigationMenuLink className="link cursor-pointer">
                  All Posts
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className="link cursor-pointer">
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
    <header className="max-w-[1200px] mx-auto max-sm:px-4 px-[70px] py-5 border-b-2 flex items-center justify-between">
      <div>
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
      </div>
      <nav className="hidden md:flex gap-16 underline ">
        <a href="#" className="text-blue-500">
          Admin
        </a>
        <a href="#" className="text-blue-500">
          All Posts
        </a>
        <a href="#" className="text-blue-500">
          About Me
        </a>
      </nav>
      <MobileMenu />
    </header>
  );
};

export default Header;
