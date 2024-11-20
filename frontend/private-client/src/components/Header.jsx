import { ModeToggle } from "@/components/mode-toggle.jsx";

function Header() {
  return (
    <header className="flex items-center justify-between border-b gap-2 py-2 px-[10vw]">
      <img
        src="/logo-dark.png"
        alt="logo"
        className="hidden dark:block"
        width={200}
      />
      <img
        src="/logo-light.png"
        alt="logo"
        className="block dark:hidden"
        width={200}
      />
      <ModeToggle />
    </header>
  );
}

export default Header;
