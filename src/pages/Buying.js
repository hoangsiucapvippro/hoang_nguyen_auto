import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:9999";

function Buying() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    carId: carId || "",
    showroomId: "",
    customerName: "",
    phone: "",
    email: "",
    bookingDate: "",
    timeSlot: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    let loggedInUser;
    try {
      loggedInUser = userString ? JSON.parse(userString) : null;
    } catch {
      setError("Thông tin đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
      return;
    }

    setUser(loggedInUser);

    const loadFormData = async () => {
      try {
        const [carsResponse, showroomsResponse] = await Promise.all([
          axios.get(`${API_URL}/cars`),
          axios.get(`${API_URL}/showrooms`),
        ]);
        setCars(carsResponse.data);
        setShowrooms(showroomsResponse.data);

        if (carId) {
          const selectedCar = carsResponse.data.find(
            (item) => String(item.id) === String(carId),
          );
          if (!selectedCar) {
            setError("Không tìm thấy mẫu xe đã chọn.");
          } else {
            setCar(selectedCar);
            setForm((current) => ({
              ...current,
              carId: String(selectedCar.id),
            }));
          }
        }
      } catch (loadError) {
        console.error("Unable to load showroom booking form data:", loadError);
        setError("Không thể tải thông tin xe hoặc showroom. Vui lòng thử lại.");
      }
    };

    loadFormData();
  }, [carId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === "carId") {
      setCar(cars.find((item) => String(item.id) === value) || null);
      navigate(
        value
          ? `/hoangnguyen_auto/buying/${value}`
          : "/hoangnguyen_auto/buying",
        {
          replace: true,
        },
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !user?.id ||
      !form.carId ||
      !form.showroomId ||
      !form.bookingDate ||
      !form.timeSlot
    ) {
      setError("Vui lòng chọn xe, showroom, ngày và khung giờ hẹn.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/showroomBookings`, {
        ...form,
        userId: String(user.id),
        carId: String(form.carId),
        showroomId: String(form.showroomId),
        status: "Pending",
        createdAt: new Date().toISOString(),
      });
      navigate("/hoangnguyen_auto/my_bookings", {
        state: { message: "Đăng ký lịch hẹn tại showroom thành công." },
      });
    } catch (submitError) {
      console.error("Unable to create showroom booking:", submitError);
      setError("Không thể gửi lịch hẹn. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-5 mt-5">
      <Row className="justify-content-center">
        <Col lg={8} xl={7}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4 p-md-5">
              <p className="text-uppercase text-danger fw-bold mb-2">
                Hoàng Nguyễn Auto
              </p>
              <h1 className="fw-bold mb-2">Đặt lịch đến showroom</h1>

              <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col xs={12}>
                      <Form.Group controlId="buyingCar">
                        <Form.Label>Mẫu xe quan tâm</Form.Label>
                        <Form.Select
                          name="carId"
                          value={form.carId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Chọn mẫu xe</option>
                          {cars.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      {car && (
                        <div className="small  text-muted mt-1">
                          Giá bán: {Number(car.price).toLocaleString("vi-VN")}{" "}
                          VNĐ
                        </div>
                      )}
                    </Col>
                    <Col xs={12}>
                      <Form.Group controlId="buyingShowroom">
                        <Form.Label>Showroom muốn đến</Form.Label>
                        <Form.Select
                          name="showroomId"
                          value={form.showroomId}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Chọn showroom</option>
                          {showrooms.map((showroom) => (
                            <option key={showroom.id} value={showroom.id}>
                              {showroom.name} — {showroom.address}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="buyingName">
                        <Form.Label>Họ và tên</Form.Label>
                        <Form.Control
                          name="customerName"
                          value={form.customerName}
                          onChange={handleChange}
                          required
                          placeholder="Họ và tên..."
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="buyingPhone">
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="09xx-xxx-xxx"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="buyingEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="example@gmail.com"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="buyingDate">
                        <Form.Label>Ngày hẹn</Form.Label>
                        <Form.Control
                          name="bookingDate"
                          type="date"
                          min={new Date().toISOString().slice(0, 10)}
                          value={form.bookingDate}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group controlId="buyingTime">
                        <Form.Label>Khung giờ</Form.Label>
                        <Form.Select
                          name="timeSlot"
                          value={form.timeSlot}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Chọn khung giờ</option>
                          <option>09:00 - 10:30</option>
                          <option>10:30 - 12:00</option>
                          <option>13:30 - 15:00</option>
                          <option>15:00 - 16:30</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group controlId="buyingNotes">
                        <Form.Label>Nội dung cần tư vấn</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="notes"
                          value={form.notes}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Button
                        type="submit"
                        variant="dark"
                        disabled={submitting}
                      >
                        Đặt lịch showroom
                      </Button>
                    </Col>
                  </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Buying;
