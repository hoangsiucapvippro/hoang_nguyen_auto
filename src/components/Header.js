import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Đăng xuất thành công");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 text-light mt-auto" fixed="top">
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
            <Nav.Link as={Link} to="/hoangnguyen_auto/cars">
              Danh sách xe
            </Nav.Link>

            {user && user.role === "admin" && (
              <Nav.Link as={Link} to="/admin">
                Quản lý
              </Nav.Link>
            )}
            {user && user.role === "user" && (
              <Nav.Link as={Link} to="/hoangnguyen_auto/test_drive">
                Đăng ký lái thử
              </Nav.Link>
            )}
            {user && user.role === "user" && (
              <Nav.Link as={Link} to="/hoangnguyen_auto/my_bookings">
                Lịch sử lái thử
              </Nav.Link>
            )}
          </div>

          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-2">
                  Xin chào, <strong>{user.fullName}</strong>{" "}
                </Navbar.Text>
                <Button onClick={handleLogout}>Đăng xuất</Button>
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
