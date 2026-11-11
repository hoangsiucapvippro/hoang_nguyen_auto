import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="mb-4 text-light mt-auto"
      fixed="top"
    >
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/hoangnguyen_auto">
          <h4>Hoàng Nguyễn Auto</h4>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-between">
          <div className="d-flex gap-3">
            <Nav.Link as={Link} to="/hoangnguyen_auto">
              Trang chủ
            </Nav.Link>
            <Nav.Link as={Link} to="/hoangnguyen_auto/about_us">
              Giới thiệu
            </Nav.Link>
            {user && user.role === "user" && (
              <Nav.Link as={Link} to="/hoangnguyen_auto/cars">
                Danh sách xe
              </Nav.Link>
            )}

            {user && user.role === "admin" && (
              <Nav.Link as={Link} to="/admin/cars">
                Quản lý danh sách xe
              </Nav.Link>
            )}
            {user && user.role === "admin" && (
              <Nav.Link as={Link} to="/admin/bookings">
                Quản lý Lịch sử đăng ký
              </Nav.Link>
            )}
            {user && user.role === "user" && (
              <Nav.Link as={Link} to="/hoangnguyen_auto/test-drive">
                Đăng ký lái thử
              </Nav.Link>
            )}
            {user && user.role === "user" && (
              <Nav.Link as={Link} to="/hoangnguyen_auto/buying">
                Đặt lịch
              </Nav.Link>
            )}
            {user && user.role === "user" && (
              <Nav.Link as={Link} to="/hoangnguyen_auto/my_bookings">
                Lịch sử
              </Nav.Link>
            )}
          </div>

          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-2">
                  Xin chào, <strong>{user.fullName}</strong>{" "}
                </Navbar.Text>
                <Button variant="outline-secondary" onClick={handleLogout}>
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login">
                Đăng nhập
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
