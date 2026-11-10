import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";

import CarCard, { getCarImage } from "../components/CarCard";
import { useNavigate } from "react-router-dom";

const API_CARS = "http://localhost:9999/cars";
const API_BRANDS = "http://localhost:9999/brands";
const API_CATEGORIES = "http://localhost:9999/categories";

function CarList() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCar, setSelectedCar] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");

  const naivigate = useNavigate();

  const loadData = async () => {
    try {
      setError("");

      const carRes = await axios.get(API_CARS);
      const brandRes = await axios.get(API_BRANDS);
      const categoryRes = await axios.get(API_CATEGORIES);

      setCars(carRes.data);
      setBrands(brandRes.data);
      setCategories(categoryRes.data);
    } catch (error) {
      console.log(error);
      setError("Không thể tải danh sách xe!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredCars = cars.filter((car) => {
    const matchesSearch = (car.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesBrand = selectedBrand
      ? String(car.brandId) === selectedBrand
      : true;
    const matchesCategory = selectedCategory
      ? String(car.categoryId) === selectedCategory
      : true;
    const matchesFuelType = selectedFuelType
      ? (car.fuelType || "").toLowerCase() === selectedFuelType.toLowerCase()
      : true;
    return matchesSearch && matchesBrand && matchesCategory && matchesFuelType;
  });

  const getBrandName = (brandId) => {
    const brand = brands.find((item) => item.id === brandId);
    return brand ? brand.name : "Chưa cập nhật";
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((item) => item.id === categoryId);

    return category ? category.name : "Chưa cập nhật";
  };

  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN") + " VNĐ";
  };

  return (
    <Container className="py-5 mt-5">
      <header className="text-center mb-4 mb-md-5">
        <p className="text-uppercase text-danger fw-bold mb-2">
          Hoàng Nguyễn Auto
        </p>
        <h1 className="fw-bold display-5 mb-2">Danh sách xe</h1>
        <p className="text-muted fs-5 mb-3">
          Khám phá các mẫu xe và xem thông tin chi tiết.
        </p>

        <span className="badge rounded-pill bg-light text-dark border px-3 py-2">
          {filteredCars.length} / {cars.length} mẫu xe
        </span>
      </header>

      {error && (
        <Alert variant="danger">
          {error}

          <Button variant="outline-danger" className="ms-3" onClick={loadData}>
            Tải lại
          </Button>
        </Alert>
      )}

      <div className="container">
        <Row className="justify-content-center mb-4">
          <Col xs={12} lg={9} xl={8}>
            <section
              className="bg-white border rounded-4 shadow-sm p-3 p-md-4"
              aria-label="Tìm và lọc xe"
            >
              <Row className="g-3 align-items-end">
                <Col xs={12}>
                  <Form.Group controlId="searchInput">
                    <Form.Label className="fw-semibold">Tìm kiếm xe</Form.Label>
                    <Form.Control
                      type="search"
                      placeholder="Nhập tên mẫu xe..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group controlId="brandSelect">
                    <Form.Label className="fw-semibold">Thương hiệu</Form.Label>
                    <Form.Select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      <option value="">Tất cả thương hiệu</option>
                      {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group controlId="categorySelect">
                    <Form.Label className="fw-semibold">Phân khúc</Form.Label>
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Tất cả phân khúc</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="fuelTypeSelect">
                    <Form.Label className="fw-semibold">Nhiên liệu</Form.Label>
                    <Form.Select
                      value={selectedFuelType}
                      onChange={(e) => setSelectedFuelType(e.target.value)}
                    >
                      <option value="">Tất cả nhiên liệu</option>
                      <option value="gasoline">Gasoline</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="electric">Electric</option>
                      <option value="diesel">Diesel</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </section>
          </Col>
        </Row>

        {filteredCars.length === 0 ? (
          <Alert variant="light" className="text-center py-4">
            Không tìm thấy xe phù hợp.
          </Alert>
        ) : (
          <Row className="g-4">
            {filteredCars.map((car) => (
              <Col key={car.id} xs={12} sm={6} lg={4} xl={4}>
                <CarCard
                  car={car}
                  brandName={getBrandName(car.brandId)}
                  onDetail={() => setSelectedCar(car)}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Modal
        show={selectedCar !== null}
        onHide={() => setSelectedCar(null)}
        centered
        size="lg"
        scrollable
        fixed="top"
      >
        {selectedCar && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCar.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body className="p-4">
              <img
                src={getCarImage(selectedCar)}
                alt={selectedCar.name}
                className="w-100 mb-4"
                style={{
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              <p>{selectedCar.description || "Chưa có mô tả"}</p>

              <Row className="g-3">
                <Col md={6}>
                  <div className="fw-bold">Mã xe:</div>
                  <div>{selectedCar.id}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Tên xe:</div>
                  <div>{selectedCar.name}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Thương hiệu:</div>
                  <div>{getBrandName(selectedCar.brandId)}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Phân khúc:</div>
                  <div>{getCategoryName(selectedCar.categoryId)}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Giá bán:</div>
                  <div>{formatPrice(selectedCar.price)}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Nhiên liệu:</div>
                  <div>{selectedCar.fuelType || "Chưa cập nhật"}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Số chỗ ngồi:</div>
                  <div>{selectedCar.seats || "Chưa cập nhật"}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Năm sản xuất:</div>
                  <div>{selectedCar.year || "Chưa cập nhật"}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Hộp số:</div>
                  <div>{selectedCar.transmission || "Chưa cập nhật"}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Công suất:</div>
                  <div>{selectedCar.horsepower || "Chưa cập nhật"}</div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Màu sắc:</div>
                  <div>
                    {Array.isArray(selectedCar.colors)
                      ? selectedCar.colors.join(", ")
                      : selectedCar.colors || "Chưa cập nhật"}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Tình trạng:</div>
                  <div>
                    {selectedCar.status === "In Stock"
                      ? "Còn hàng"
                      : selectedCar.status || "Chưa cập nhật"}
                  </div>
                </Col>
                <Col md={6}>
                  <div className="fw-bold">Xe nổi bật:</div>
                  <div>{selectedCar.isFeatured ? "Có" : "Không"}</div>
                </Col>{" "}
                <Col md={6}></Col>
                <Col md={6}>
                  <Button
                    disabled={selectedCar.status !== "In Stock"}
                    variant={
                      selectedCar.status === "In Stock" ? "outline-danger" : "outline-secondary"
                    }
                    onClick={() =>
                      naivigate(
                        `/hoangnguyen_auto/test-drive/${selectedCar.id || selectedCar}`,
                      )
                    }
                  >
                    Đăng ký lái thử
                  </Button>
                </Col>
                <Col md={6}>
                  <Button
                    variant={
                      selectedCar.status === "In Stock" ? "outline-danger" : "outline-secondary"
                    }
                    onClick={() =>
                      naivigate(
                        `/hoangnguyen_auto/buying/${selectedCar.id || selectedCar}`,
                      )
                    }
                    disabled={selectedCar.status !== "In Stock"}
                  >
                    Sở hữu ngay
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
      </Modal>
    </Container>
  );
}

export default CarList;
