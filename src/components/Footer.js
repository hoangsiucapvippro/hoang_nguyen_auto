import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h6>Hệ thống Showroom</h6>
            <ul>
              <li>📍 Hà Nội: Phố Duy Tân, Cầu Giấy</li>
              <li>📍 TP.HCM: ĐL Nguyễn Văn Linh, Q.7</li>
              <li>📍 Đà Nẵng: Đ. Nguyễn Văn Linh, Hải Châu</li>
            </ul>
          </Col>

          <Col md={4}>
            <h5> Hoàng Nguyễn Auto</h5>
            <p>
              Hệ thống phân phối xe ô tô hàng đầu Việt Nam. Cung cấp các dòng xe
              mới nhất từ VinFast, Toyota, Mercedes-Benz và Hyundai với mức giá
              ưu đãi và dịch vụ lái thử tận nơi.
            </p>
          </Col>
          <Col md={4}>
            <h6>Liên kết</h6>
            <ul>
              <li>
                <Link
                  className="text-decoration-none text-light"
                  to="/hoangnguyen_auto"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-light"
                  to="/hoangnguyen_auto/about_us"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  className="text-decoration-none text-light"
                  to="/hoangnguyen_auto/test_drive"
                >
                  Đăng ký lái thử
                </Link>
              </li>
              <li>
                <Link className="text-decoration-none text-light">
                  Đăng nhập
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
