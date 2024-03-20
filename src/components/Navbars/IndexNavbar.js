import React from "react";
import { Link } from "react-router-dom";
import { useWeb3 } from '../../contexts/Web3Context.js'; // Adjust the import path as necessary

import {  Button,  Collapse,  DropdownToggle,  DropdownMenu,  DropdownItem,  UncontrolledDropdown,  NavbarBrand,  Navbar,  NavItem,  NavLink,  Nav,  Container,  Row,  Col,  UncontrolledTooltip,} from "reactstrap";

export default function IndexNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");

  const { web3, contract, currentAccount, connectWalletHandler } = useWeb3(); // Now using the useWeb3 hook
  console.log(web3, contract, currentAccount, connectWalletHandler);
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };

  const shortenAddress = (address) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <>
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>BaseBets </span>
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Designed by the Troll under the Bridge
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  BLK•React
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle
                caret
                color="default"
                data-toggle="dropdown"
                href="#pablo"
                nav
                onClick={(e) => e.preventDefault()}
              >
                <i className="fa fa-cogs d-lg-none d-xl-none" />
                Menu
              </DropdownToggle>
              <DropdownMenu className="dropdown-with-icons">
                <DropdownItem tag={Link} to="/alt">
                  <i className="tim-icons icon-bullet-list-67" />
                  Home
                </DropdownItem>
                <DropdownItem tag={Link} to="/">
                  <i className="tim-icons icon-image-02" />
                  Alt
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink tag={Link} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/alt">Alt</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/bets">Bets</NavLink>
            </NavItem>
            <NavItem>
            {!currentAccount ? (
              <Button onClick={connectWalletHandler} className="nav-link d-none d-lg-block" color="primary"><i className="tim-icons icon-spaceship" /> Connect Wallet</Button>
              ) : (
              <Button color="primary" disabled>{shortenAddress(currentAccount)}</Button>
            )}
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
    <Container style={{height:"80px"}} >

    </Container>
    </>
  );
}
