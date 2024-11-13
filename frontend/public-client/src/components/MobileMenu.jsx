import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

function MobileMenu() {
    return (
        <NavigationMenu className='block md:hidden'>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        Menu
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className={''} >
                        <ul className={'flex flex-col gap-4 p-2 w-max underline border-2'}>
                            <li>
                                <NavigationMenuLink>
                                    <a href='#' className="text-blue-500">Admin</a>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink>
                                    <a href='#' className="text-blue-500">All Posts</a>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <NavigationMenuLink>
                                    <a href='#' className="text-blue-500">About Me</a>
                                </NavigationMenuLink>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default MobileMenu;