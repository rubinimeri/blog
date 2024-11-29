import { Link } from "react-router-dom";
import Header from "@/components/Header.jsx";

function ErrorPage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] content-center place-items-center">
        <h1 className="font-black">404</h1>
        <h2>Oops...Page was not found!</h2>
        <h2>
          Click
          <Link to="/" className="font-bold text-blue-500 hover:opacity-75">
            {" "}
            here{" "}
          </Link>
          to go home
        </h2>
      </main>
    </>
  );
}

export default ErrorPage;
