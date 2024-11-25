import { ModeToggle } from "@/components/mode-toggle.jsx";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";

function Header({ user }) {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header className="flex items-center justify-between border-b gap-2 py-2 px-[10vw] max-sm:px-1">
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
      <div className="flex items-center gap-3">
        {user && (
          <>
            <p>{user.username}</p>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.object,
};

export default Header;
