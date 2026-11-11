import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { getCarImage } from "../components/CarCard";

const API_URL = "http://localhost:9999";
const EMPTY_FORM = {
  name: "",
  brandId: "",
  categoryId: "",
  price: "",
  fuelType: "",
  seats: "",
  year: "",
  transmission: "",
  horsepower: "",
  rangePerCharge: "",
  colors: "",
  description: "",
  image: "",
  status: "In Stock",
  isFeatured: false,
};

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const loadData = async () => {
    setError("");

    try {
      const [carsResponse, brandsResponse, categoriesResponse] =
        await Promise.all([
          axios.get(`${API_URL}/cars`),
          axios.get(`${API_URL}/brands`),
          axios.get(`${API_URL}/categories`),
        ]);
      setCars(carsResponse.data);
      setBrands(brandsResponse.data);
      setCategories(categoriesResponse.data);
    } catch (loadError) {
      console.error("Unable to load car management data:", loadError);
      setError(
        "Không thể tải danh sách xe. Vui lòng kiểm tra kết nối máy chủ.",
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateForm = () => {
    setEditingCar(null);
    setForm(EMPTY_FORM);
    setActionError("");
    setShowForm(true);
  };

  const openEditForm = (car) => {
    setEditingCar(car);
    setForm({
      ...EMPTY_FORM,
      ...car,
      brandId: String(car.brandId || ""),
      categoryId: String(car.categoryId || ""),
      price: car.price ?? "",
      seats: car.seats ?? "",
      year: car.year ?? "",
      colors: Array.isArray(car.colors)
        ? car.colors.join(", ")
        : car.colors || "",
    });
    setActionError("");
    setShowForm(true);
  };

  const handleFormChange = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setActionError("");
    setSuccess("");

    const carData = {
      ...form,
      price: Number(form.price),
      seats: Number(form.seats),
      year: Number(form.year),
      colors: form.colors
        .split(",")
        .map((color) => color.trim())
        .filter(Boolean),
    };

    try {
      if (editingCar) {
        const response = await axios.put(
          `${API_URL}/cars/${editingCar.id}`,
          carData,
        );
        setCars((current) =>
          current.map((car) =>
            String(car.id) === String(editingCar.id) ? response.data : car,
          ),
        );
        setSuccess("Đã cập nhật thông tin xe.");
      } else {
        const response = await axios.post(`${API_URL}/cars`, carData);
        setCars((current) => [...current, response.data]);
        setSuccess("Đã thêm xe mới vào danh sách.");
      }

      setShowForm(false);
      setEditingCar(null);
      setForm(EMPTY_FORM);
    } catch (saveError) {
      console.error("Unable to save car:", saveError);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (car) => {
    if (!window.confirm(`Bạn có chắc muốn xóa xe không?`)) {
      return;
    }

    setError("");
    setSuccess("");
    try {
      await axios.delete(`${API_URL}/cars/${car.id}`);
      setCars((current) =>
        current.filter((item) => String(item.id) !== String(car.id)),
      );
      setSuccess(`Đã xóa xe.`);
    } catch (deleteError) {
      console.error("Unable to delete car:", deleteError);
      setError("Không thể xóa xe. Vui lòng thử lại.");
    }
  };

  const filteredCars = cars.filter((car) =>
    (car.name || "").toLowerCase().includes(search.trim().toLowerCase()),
  );

  const getBrandName = (brandId) =>
    brands.find((brand) => String(brand.id) === String(brandId))?.name ||
    "Chưa cập nhật";

  const getCategoryName = (categoryId) =>
    categories.find((category) => String(category.id) === String(categoryId))
      ?.name || "Chưa cập nhật";

  return (
    <Container className="py-5 mt-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <p className="text-uppercase text-danger fw-bold mb-1">
            Hoàng Nguyễn Auto
          </p>
          <h1 className="fw-bold mb-1">Quản lý danh sách xe</h1>
        </div>
        <Button variant="danger" onClick={openCreateForm}>
          Thêm xe mới
        </Button>
      </div>

      {error && (
        <Alert
          variant="danger"
          className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2"
        >
          <span>{error}</span>
          <Button variant="outline-danger" onClick={loadData}>
            Tải lại
          </Button>
        </Alert>
      )}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Row className="g-3 mb-3 align-items-end">
        <Col xs={12} md={6} lg={4}>
          <Form.Group controlId="carSearch">
            <Form.Label className="fw-semibold">Tìm xe theo tên</Form.Label>
            <Form.Control
              type="search"
              placeholder="Nhập tên mẫu xe..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} md="auto">
          <Badge bg="light" text="dark" className="border px-3 py-2">
            {filteredCars.length} / {cars.length} mẫu xe
          </Badge>
        </Col>
      </Row>

      <div className="table-responsive bg-white border rounded-3 shadow-sm">
        <Table hover responsive className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Xe</th>
              <th scope="col">Thương hiệu</th>
              <th scope="col">Phân khúc</th>
              <th scope="col">Giá bán</th>
              <th scope="col">Trạng thái</th>
              <th scope="col" className="text-end">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr key={car.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <div className="fw-semibold">{car.name}</div>
                    </div>
                  </div>
                </td>
                <td>{getBrandName(car.brandId)}</td>
                <td>{getCategoryName(car.categoryId)}</td>
                <td>{Number(car.price || 0).toLocaleString("vi-VN")} VNĐ</td>
                <td>
                  <Badge bg={car.status === "In Stock" ? "success" : "danger"}>
                    {car.status === "In Stock"
                      ? "In Stock"
                      : "Out of Stock" || "Chưa cập nhật"}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      size="sm"
                      variant="outline-success"
                      onClick={() => openEditForm(car)}
                      aria-label={`Sửa ${car.name}`}
                    >
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDelete(car)}
                      aria-label={`Xóa ${car.name}`}
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCars.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted py-5">
                  {cars.length
                    ? "Không tìm thấy mẫu xe phù hợp."
                    : "Chưa có xe trong danh sách."}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Modal
        show={showForm}
        onHide={() => !saving && setShowForm(false)}
        size="lg"
        centered
        scrollable
      >
        <Modal.Header closeButton={!saving}>
          <Modal.Title>
            {editingCar ? "Cập nhật thông tin xe" : "Thêm xe mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="admin-car-form" onSubmit={handleSubmit}>
            {actionError && <Alert variant="danger">{actionError}</Alert>}
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="carName">
                  <Form.Label>
                    <b>Tên xe</b>
                  </Form.Label>
                  <Form.Control
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    maxLength={100}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="carBrand">
                  <Form.Label>
                    <b>Thương hiệu</b>
                  </Form.Label>
                  <Form.Select
                    name="brandId"
                    value={form.brandId}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Chọn thương hiệu</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="carCategory">
                  <Form.Label>
                    <b>Phân khúc</b>
                  </Form.Label>
                  <Form.Select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Chọn phân khúc</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="carPrice">
                  <Form.Label>
                    <b>Giá bán (VNĐ)</b> *
                  </Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    min="0"
                    step="1000000"
                    value={form.price}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="carFuelType">
                  <Form.Label>
                    <b>Nhiên liệu</b> *
                  </Form.Label>
                  <Form.Select
                    name="fuelType"
                    value={form.fuelType}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="">Chọn nhiên liệu</option>
                    <option value="Gasoline">Xăng</option>
                    <option value="Diesel">Dầu diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Điện</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="carSeats">
                  <Form.Label>
                    <b>Số chỗ</b> *
                  </Form.Label>
                  <Form.Control
                    name="seats"
                    type="number"
                    min="1"
                    max="100"
                    value={form.seats}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="carYear">
                  <Form.Label>
                    <b>Năm sản xuất</b> *
                  </Form.Label>
                  <Form.Control
                    name="year"
                    type="number"
                    min="1900"
                    max="2100"
                    value={form.year}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="carTransmission">
                  <Form.Label>
                    <b>Hộp số</b>
                  </Form.Label>
                  <Form.Control
                    name="transmission"
                    value={form.transmission}
                    onChange={handleFormChange}
                    maxLength={60}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="carHorsepower">
                  <Form.Label>
                    <b>Công suất</b>
                  </Form.Label>
                  <Form.Control
                    name="horsepower"
                    value={form.horsepower}
                    onChange={handleFormChange}
                    maxLength={40}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="carRange">
                  <Form.Label>
                    <b>Quãng đường mỗi lần sạc</b>
                  </Form.Label>
                  <Form.Control
                    name="rangePerCharge"
                    value={form.rangePerCharge}
                    onChange={handleFormChange}
                    maxLength={40}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="carColors">
                  <Form.Label>
                    <b>Màu sắc</b>
                  </Form.Label>
                  <Form.Control
                    name="colors"
                    value={form.colors}
                    onChange={handleFormChange}
                    placeholder="Ví dụ: Trắng, Đen, Đỏ"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="carStatus">
                  <Form.Label>
                    <b>Tình trạng</b>
                  </Form.Label>
                  <Form.Select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                  >
                    <option value="In Stock">Còn hàng</option>
                    <option value="Out of Stock">Hết hàng</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="carDescription">
                  <Form.Label>
                    <b>Mô tả</b>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    maxLength={1000}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowForm(false)}
            disabled={saving}
          >
            Hủy
          </Button>
          <Button
            variant="danger"
            type="submit"
            form="admin-car-form"
            disabled={saving}
          >
            {saving ? "Đang lưu..." : editingCar ? "Lưu thay đổi" : "Thêm xe"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminCars;
