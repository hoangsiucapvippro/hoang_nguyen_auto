import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const API_USER = "http://localhost:9999/users";
function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user.username.trim() || !user.password.trim()) {
      setError("Vui long nhap day du Ten dang nhap va mat khau");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${API_USER}?username=${user.username}&password=${user.password}`,
      );
      if (!response.ok) {
        throw new Error(`Login request failed with status ${response.status}`);
      }

      const users = await response.json();
      if (Array.isArray(users) && users.length > 0) {
        const logInUser = users[0];
        localStorage.setItem("user", JSON.stringify(logInUser));
        alert("Dang nhap thanh cong");

        if (logInUser.role === "admin") {
          navigate("/hoangnguyen_auto");
        } else {
          navigate("/hoangnguyen_auto");
        }
      } else {
        setError("Ten dang nhap hoac mat khau khong dung");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Khong the ket noi toi may chu. Vui long thu lai sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Card
        className="mt-5 p-4"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <Card.Header>
          <h3>Đăng nhập</h3>
        </Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Tên đăng nhập
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Dang dang nhap..." : "Đăng nhập"}
            </button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
