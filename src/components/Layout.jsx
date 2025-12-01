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
import { useNavigate } from "react-router-dom";
import {
  Switcher as SwitcherIcon,
  Notification,
  Search,
} from "@carbon/icons-react";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }) {
  const navigate = useNavigate();
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
            style={{ minHeight: "100vh" }}
          >
            {children}
          </Content>
        </>
      )}
    />
  );
}
