import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CarCard, { getCarImage } from "../components/CarCard";

const API_CARS = "http://localhost:9999/cars";
const API_BRANDS = "http://localhost:9999/brands";

const brandShowcase = [
  {
    name: "VinFast",
    image: "VinFast_VF7.jpg",
    description: "Xe điện Việt Nam",
  },
  {
    name: "Toyota",
    image: "Toyota_Camry_2.5Q.jpg",
    description: "Bền bỉ mỗi ngày",
  },
  {
    name: "Mercedes-Benz",
    image: "Mercedes-Benz_GLC_300_4MATIC.jpg",
    description: "Sang trọng và tinh tế",
  },
  {
    name: "BMW",
    image: "BMW_X5_xDrive40i_M_Sport.jpg",
    description: "Đậm chất thể thao",
  },
];

const carFieldLabels = {
  id: "Mã xe",
  name: "Tên xe",
  brandId: "Mã thương hiệu",
  categoryId: "Mã phân khúc",
  price: "Giá bán",
  fuelType: "Nhiên liệu",
  seats: "Số chỗ",
  year: "Năm sản xuất",
  transmission: "Hộp số",
  horsepower: "Công suất",
  rangePerCharge: "Quãng đường mỗi lần sạc",
  colors: "Màu sắc",
  description: "Mô tả",
  isFeatured: "Xe nổi bật",
  status: "Tình trạng",
};

function formatCarValue(key, value) {
  if (key === "price") {
    const price = Number(value);
    return Number.isFinite(price)
      ? `${price.toLocaleString("vi-VN")} VNĐ`
      : value;
  }
  if (key === "colors" && Array.isArray(value)) return value.join(", ");
  if (key === "isFeatured") return value ? "Có" : "Không";
  if (key === "status" && value === "In Stock") return "Còn hàng";
  if (value === null || value === undefined || value === "")
    return "Chưa cập nhật";
  return String(value);
}

function HomePage() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [error, setError] = useState("");

  const loadData = async () => {
    setError("");

    try {
      const [carResponse, brandResponse] = await Promise.all([
        axios.get(API_CARS),
        axios.get(API_BRANDS),
      ]);
      setCars(carResponse.data);
      setBrands(brandResponse.data);
    } catch (loadError) {
      console.error("Error loading homepage data:", loadError);
      setError("Không thể tải dữ liệu trang chủ. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showcaseCars = [];
  for (let index = 0; index < cars.length && index < 12; index += 1) {
    showcaseCars.push(cars[index]);
  }

  const getBrandName = (brandId) => {
    const brand = brands.find((item) => String(item.id) === String(brandId));
    return brand ? brand.name : "Thương hiệu";
  };

  return (
    <>
      <section className="bg-dark text-white">
        <Container
          className="py-5 mt-5 mb-4 text-center text-lg-start position-relative"
          style={{
            minHeight: "770px",
          }}
        >
          <Row
            className="align-items-center g-4 g-lg-5 py-lg-4 "
            style={{
              minHeight: "770px",
            }}
          >
            <Col lg={4}>
              <p className="text-danger fw-bold text-uppercase mb-2">
                Hoàng Nguyễn Auto
              </p>
              <h1 className="display-4 fw-bold">
                Chọn xe tốt. Bắt đầu hành trình mới.
              </h1>
              <p className="lead text-white-50 my-4">
                Khám phá nhiều thương hiệu, kiểu dáng và lựa chọn nhiên liệu.
                Tìm hiểu chiếc xe phù hợp với nhịp sống của bạn.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Button as={Link} to="/hoangnguyen_auto/cars" variant="danger">
                  Khám phá các mẫu xe
                </Button>
                <Button
                  as={Link}
                  to="/hoangnguyen_auto/about_us"
                  variant="outline-light"
                >
                  Về chúng tôi
                </Button>
              </div>
            </Col>
            <Col lg={8}>
              <Carousel pause="hover" className="rounded-4 overflow-hidden">
                {brandShowcase.map((brand) => (
                  <Carousel.Item key={brand.name}>
                    <div className="ratio ratio-16x9">
                      <img
                        src={`${process.env.PUBLIC_URL}/image/${brand.image}`}
                        alt={`Xe ${brand.name}`}
                        className="d-block w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <Carousel.Caption className="bg-dark bg-opacity-75 rounded-3 py-2">
                      <h3 className="h5 fw-bold mb-1">{brand.name}</h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="container py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <p className="text-danger fw-bold text-uppercase mb-2">
              Thương hiệu nổi bật
            </p>
            <h2 className="fw-bold mb-0">Chọn phong cách của bạn</h2>
          </div>
          <Link
            className="link-dark fw-semibold text-decoration-none"
            to="/hoangnguyen_auto/cars"
          >
            Xem tất cả thương hiệu
          </Link>
        </div>

        <Row xs={1} sm={2} lg={4} className="g-4">
          {brandShowcase.map((brand) => (
            <Col key={brand.name}>
              <Link
                to="/hoangnguyen_auto/cars"
                className="text-decoration-none text-dark"
                aria-label={`Xem xe ${brand.name}`}
              >
                <Card className="h-100 border-0 shadow-sm overflow-hidden">
                  <div className="ratio ratio-4x3">
                    <Card.Img
                      variant="top"
                      src={`${process.env.PUBLIC_URL}/image/${brand.image}`}
                      alt={`Xe ${brand.name}`}
                      className="object-fit-cover"
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold">{brand.name}</Card.Title>
                    <Card.Text className="text-muted mb-0">
                      {brand.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      <section className="bg-light py-5">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
            <div>
              <p className="text-danger fw-bold text-uppercase mb-2">
                Dành cho bạn
              </p>
              <h2 className="fw-bold mb-0">Khám phá các mẫu xe</h2>
            </div>
            <Link
              className="link-dark fw-semibold text-decoration-none"
              to="/hoangnguyen_auto/cars"
            >
              Xem toàn bộ danh sách
            </Link>
          </div>

          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {!error && showcaseCars.length === 0 ? (
            <Alert variant="light">Hiện chưa có xe để hiển thị.</Alert>
          ) : (
            !error && (
              <Row className="flex-nowrap overflow-auto g-3 pb-3">
                {showcaseCars.map((car) => (
                  <Col
                    key={car.id}
                    xs={10}
                    sm={6}
                    lg={4}
                    xl={3}
                    className="flex-shrink-0"
                  >
                    <CarCard
                      car={car}
                      brandName={getBrandName(car.brandId)}
                      onDetail={(carId) =>
                        setSelectedCar(
                          cars.find(
                            (item) => String(item.id) === String(carId),
                          ),
                        )
                      }
                    />
                  </Col>
                ))}
              </Row>
            )
          )}
        </Container>
      </section>

      <section className="container py-5">
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <p className="text-danger fw-bold text-uppercase mb-2">
              Tìm chiếc xe phù hợp
            </p>
            <h2 className="display-6 fw-bold">
              Từ nhu cầu hàng ngày đến chuyến đi đáng nhớ
            </h2>
            <p className="text-secondary">
              Cần xe nhỏ gọn để đi phố, không gian rộng rãi cho cả gia đình hay
              muốn trải nghiệm công nghệ xe điện? Hãy xem thông tin từng mẫu, so
              sánh trang bị và chọn chiếc xe hợp với kế hoạch của bạn.
            </p>
          </Col>
          <Col lg={5}>
            <div className="row g-3">
              {[
                ["Nhiều thương hiệu", `${brands.length || 4} hãng xe`],
                ["Đa dạng lựa chọn", "Sedan, SUV và xe điện"],
                ["Xem thông tin xe", "Giá bán và thông số"],
                ["Trải nghiệm thực tế", "Đăng ký lái thử"],
              ].map(([title, detail]) => (
                <div className="col-6" key={title}>
                  <div className="h-100 border rounded-3 p-3">
                    <p className="fw-bold mb-1">{title}</p>
                    <p className="small text-muted mb-0">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </section>

      <section className=" bg-light text-center py-5">
        <Container className="py-3">
          <p className="text-danger fw-bold text-uppercase mb-2">
            Hành trình tiếp theo đang chờ bạn
          </p>
          <h2 className="display-6 fw-bold mb-3">
            Cùng tìm chiếc xe dành riêng cho bạn
          </h2>

          <Button
            as={Link}
            to="/hoangnguyen_auto/cars"
            variant="dark"
            size="lg"
          >
            Xem danh sách xe
          </Button>
        </Container>
      </section>

      <Modal
        show={Boolean(selectedCar)}
        onHide={() => setSelectedCar(null)}
        centered
        size="lg"
        scrollable
      >
        {selectedCar && (
          <>
            <Modal.Header closeButton>
              <div>
                <div className="small text-muted">
                  {getBrandName(selectedCar.brandId)}
                </div>
                <Modal.Title>{selectedCar.name}</Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="ratio ratio-16x9 rounded-3 overflow-hidden mb-4">
                <img
                  src={getCarImage(selectedCar)}
                  alt={selectedCar.name}
                  className="img-fluid object-fit-cover"
                />
              </div>
              {selectedCar.description && (
                <p className="text-secondary">{selectedCar.description}</p>
              )}
              <Row className="g-3">
                {Object.entries(selectedCar)
                  .filter(([key]) => key !== "description" && key !== "image")
                  .map(([key, value]) => (
                    <Col xs={12} sm={6} key={key}>
                      <div className="border rounded-3 p-3 h-100">
                        <div className="small text-muted mb-1">
                          {carFieldLabels[key] ||
                            key.replace(/([A-Z])/g, " $1")}
                        </div>
                        <div className="fw-semibold">
                          {formatCarValue(key, value)}
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}

export default HomePage;
