import MobileMenu from "@/components/MobileMenu.jsx";

const Header = () => {
    return (
        <header className="max-sm:px-4 px-[70px] py-5 flex items-center justify-between">
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
                <a href="#" className="text-blue-500">Admin</a>
                <a href="#" className="text-blue-500">All Posts</a>
                <a href="#" className="text-blue-500">About Me</a>
            </nav>
            <MobileMenu />
        </header>
    );
};

export default Header;
