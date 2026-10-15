import { NavLink } from "react-router-dom";
import "./Header.css";

import logo from "../../assets/Logo (1).svg";

type Props = {
  onMenuOpen: () => void;
  onMenuClose: () => void;
  isMobileMenuOpen: boolean;
};

export default function Header({
  onMenuOpen,
  onMenuClose,
  isMobileMenuOpen,
}: Props) {
  function getNavLinkClass({ isActive }: { isActive: boolean }) {
    return isActive ? "header__link header__link_active" : "header__link";
  }
  return (
    <header className={isMobileMenuOpen ? "header header_mobile" : "header"}>
      <button
        type="button"
        className="header__menu-btn"
        aria-label="Open menu"
        onClick={onMenuOpen}
      />
      <img src={logo} alt="MeshAI Logo" className="header__logo" />
      <nav
        className={
          isMobileMenuOpen ? "header__nav header__nav_mobile" : "header__nav"
        }
      >
        <NavLink
          to="/knowledge"
          className={getNavLinkClass}
          onClick={onMenuClose}
        >
          Knowledge Base
        </NavLink>
        <NavLink to="/chat" className={getNavLinkClass} onClick={onMenuClose}>
          Chat
        </NavLink>
      </nav>
    </header>
  );
}
