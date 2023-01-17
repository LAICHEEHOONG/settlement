import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetAmount, pathName } from '../store/actions';
import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import cookie from 'react-cookies';


const Header = () => {

    const verify = useSelector(state => state.verify);
    const dispatch = useDispatch();
    let location = useLocation();


    useEffect(() => {
        if (location.pathname !== '/calculator') {
            dispatch(pathName(false));
        } else {
            dispatch(pathName(true));
        }
        // console.log(location.pathname)
    }, [dispatch, location])

    const navLogout = () => {
        dispatch(logout());
        console.log('fire logout');
        cookie.remove('token')
    }

    const reset = () => {
        dispatch(resetAmount());
        document.querySelector('.startAmount').value = '';
        document.querySelector('.systemAmount').value = '';

        document.querySelector('.btn-close').click();
    }

    return (
        <Navbar bg="light" expand={false}>
            <Container fluid>

                <LinkContainer to='/'>
                    <Navbar.Brand>结算计算器</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">结算计算器</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {
                            verify.resetBtn ? 
                            <>
                            <Nav.Link href="#action1" onClick={reset} >重置计算器</Nav.Link>
                            <Nav.Link href="/"
                                onClick={navLogout}
                            >登出</Nav.Link>
                            </>
                            : null
}

                         
                            {/* <div
                            onClick={navLogout}
                            >登出</div> */}
                            {/* <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        {/* <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Header;