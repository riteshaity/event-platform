import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <nav
      style={{
        background: "#1976d2",
        padding: 12,
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 15,
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Dashboard
      </Link>

      <Link to="/create" style={{ color: "white", textDecoration: "none" }}>
        Create Event
      </Link>

      <Link to="/my-events" style={{ color: "white", textDecoration: "none" }}>
        My Events
      </Link>

      <button
        onClick={logout}
        style={{
          marginLeft: "auto",
          background: "#e53935",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
