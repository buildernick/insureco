import React from "react";
import {
  Content,
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderName,
  HeaderNavigation,
  HeaderMenu,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderSideNavItems,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem,
} from "@carbon/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Switcher as SwitcherIcon,
  Notification,
  Search,
} from "@carbon/icons-react";
import ThemeToggle from "./ThemeToggle";
import "./Layout.scss";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Remove padding for landing page
  const isLandingPage = location.pathname === '/';

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="InsureCo">
            <SkipToContent />
            <HeaderMenuButton
              aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
              aria-expanded={isSideNavExpanded}
            />
            <HeaderName onClick={() => navigate("/")} prefix="InsureCo">
              Insurance
            </HeaderName>
            <HeaderNavigation aria-label="InsureCo Navigation">
              <HeaderMenuItem onClick={() => navigate("/")}>
                Home
              </HeaderMenuItem>
              <HeaderMenuItem onClick={() => navigate("/dashboard")}>
                Dashboard
              </HeaderMenuItem>

              {/* Business Menu with Dropdown */}
              <HeaderMenu aria-label="Business" menuLinkName="Business">
                <HeaderMenuItem onClick={() => navigate("/business/dashboard")}>
                  Overview
                </HeaderMenuItem>
                <HeaderMenuItem onClick={() => navigate("/business/properties")}>
                  Properties
                </HeaderMenuItem>
                <HeaderMenuItem onClick={() => navigate("/business/fleet")}>
                  Fleet
                </HeaderMenuItem>
                <HeaderMenuItem onClick={() => navigate("/business/map")}>
                  Map View
                </HeaderMenuItem>
                <HeaderMenuItem onClick={() => navigate("/business/claims")}>
                  Claims
                </HeaderMenuItem>
                <HeaderMenuItem onClick={() => navigate("/business/payments")}>
                  Payments
                </HeaderMenuItem>
              </HeaderMenu>

              <HeaderMenuItem onClick={() => navigate("/login")}>
                Login
              </HeaderMenuItem>
              <HeaderMenuItem onClick={() => navigate("/signup")}>
                Sign Up
              </HeaderMenuItem>
              <HeaderMenuItem onClick={() => navigate("/about")}>
                About
              </HeaderMenuItem>
            </HeaderNavigation>
            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="Search">
                <Search size={20} />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="Notifications">
                <Notification size={20} />
              </HeaderGlobalAction>
              <ThemeToggle />
              <HeaderGlobalAction
                aria-label="App Switcher"
                tooltipAlignment="end"
              >
                <SwitcherIcon size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              onSideNavBlur={onClickSideNavExpand}
              href="#main-content"
            >
              <SideNavItems>
                <HeaderSideNavItems hasDivider>
                  <HeaderMenuItem onClick={() => navigate("/")}>
                    Home
                  </HeaderMenuItem>
                  <HeaderMenuItem onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </HeaderMenuItem>

                  {/* Business Section in Sidebar with Submenu */}
                  <SideNavMenu title="Business">
                    <SideNavMenuItem onClick={() => navigate("/business/dashboard")}>
                      Overview
                    </SideNavMenuItem>
                    <SideNavMenuItem onClick={() => navigate("/business/properties")}>
                      Properties
                    </SideNavMenuItem>
                    <SideNavMenuItem onClick={() => navigate("/business/fleet")}>
                      Fleet
                    </SideNavMenuItem>
                    <SideNavMenuItem onClick={() => navigate("/business/map")}>
                      Map View
                    </SideNavMenuItem>
                    <SideNavMenuItem onClick={() => navigate("/business/claims")}>
                      Claims
                    </SideNavMenuItem>
                    <SideNavMenuItem onClick={() => navigate("/business/payments")}>
                      Payments
                    </SideNavMenuItem>
                  </SideNavMenu>

                  <HeaderMenuItem onClick={() => navigate("/login")}>
                    Login
                  </HeaderMenuItem>
                  <HeaderMenuItem onClick={() => navigate("/signup")}>
                    Sign Up
                  </HeaderMenuItem>
                  <HeaderMenuItem onClick={() => navigate("/about")}>
                    About
                  </HeaderMenuItem>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
          <Content
            id="main-content"
            className="cds--content"
            style={{
              minHeight: "100vh",
              padding: isLandingPage ? 0 : undefined
            }}
          >
            {children}
          </Content>
        </>
      )}
    />
  );
}
