import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  Spinner,
  Table,
} from "react-bootstrap";

const API_URL = "http://localhost:9999";

function AdminBooking() {
  const [testDrives, setTestDrives] = useState([]);
  const [showroomBookings, setShowroomBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [updating, setUpdating] = useState({});

  const loadBookings = async () => {
    setLoading(true);
    setError("");

    try {
      const [
        testDrivesResponse,
        showroomBookingsResponse,
        carsResponse,
        showroomsResponse,
      ] = await Promise.all([
        axios.get(`${API_URL}/testDrives`),
        axios.get(`${API_URL}/showroomBookings`),
        axios.get(`${API_URL}/cars`),
        axios.get(`${API_URL}/showrooms`),
      ]);

      setTestDrives(testDrivesResponse.data);
      setShowroomBookings(showroomBookingsResponse.data);
      setCars(carsResponse.data);
      setShowrooms(showroomsResponse.data);
    } catch (loadError) {
      console.error("Unable to load admin bookings:", loadError);
      setError("Không thể tải danh sách đăng ký. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const getShowroomName = (showroomId) =>
    showrooms.find((showroom) => String(showroom.id) === String(showroomId))
      ?.name || `Mã showroom ${showroomId}`;

  const getCarName = (carId) =>
    cars.find((car) => String(car.id) === String(carId))?.name ||
    `Mã xe ${carId}`;

  const markCompleted = async (booking, type) => {
    const resource = type === "test-drive" ? "testDrives" : "showroomBookings";
    const key = `${resource}-${booking.id}`;
    setUpdating((current) => ({ ...current, [key]: true }));
    setActionError("");

    try {
      const response = await axios.patch(
        `${API_URL}/${resource}/${booking.id}`,
        { status: "Completed" },
      );
      const updateBooking = (current) =>
        current.map((item) =>
          String(item.id) === String(booking.id) ? response.data : item,
        );

      if (type === "test-drive") {
        setTestDrives(updateBooking);
      } else {
        setShowroomBookings(updateBooking);
      }
    } catch (updateError) {
      console.error("Unable to complete booking:", updateError);
      setActionError(
        `Không thể cập nhật đăng ký #${booking.id}. Vui lòng thử lại.`,
      );
    } finally {
      setUpdating((current) => ({ ...current, [key]: false }));
    }
  };

  const renderBookingTable = (bookings, type) => (
    <div className="table-responsive">
      <Table bordered hover striped className="align-middle text-center mb-0">
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Mã đăng ký</th>
            <th>Khách hàng</th>
            <th>Mẫu xe</th>
            <th>Showroom</th>
            <th>Ngày hẹn</th>
            <th>Khung giờ</th>
            <th>Số điện thoại</th>
            <th>Ghi chú</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => {
              const resource =
                type === "test-drive" ? "testDrives" : "showroomBookings";
              const key = `${resource}-${booking.id}`;
              const isCompleted = booking.status === "Completed";

              return (
                <tr key={key}>
                  <td>{index + 1}</td>
                  <td>#{booking.id}</td>
                  <td>{booking.customerName || "Chưa cập nhật"}</td>
                  <td>{getCarName(booking.carId)}</td>
                  <td>{getShowroomName(booking.showroomId)}</td>
                  <td>{booking.bookingDate || "Chưa cập nhật"}</td>
                  <td>{booking.timeSlot || "Chưa cập nhật"}</td>
                  <td>{booking.phone || "Chưa cập nhật"}</td>
                  <td>{booking.notes || "Không có"}</td>
                  <td>
                    <Badge bg={isCompleted ? "success" : "warning"} text={isCompleted ? undefined : "dark"}>
                      {isCompleted ? "Đã hoàn thành" : booking.status || "Đang chờ"}
                    </Badge>
                  </td>
                  <td>
                    {isCompleted ? (
                      <span className="text-success">Hoàn tất</span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-success"
                        disabled={Boolean(updating[key])}
                        onClick={() => markCompleted(booking, type)}
                      >
                        {updating[key] ? "Đang cập nhật..." : "Đánh dấu hoàn thành"}
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={11} className="text-center py-4">
                Chưa có lịch đăng ký nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );

  return (
    <Container className="py-5 mt-5">
      <header className="mb-4">
        <p className="text-uppercase text-danger fw-bold mb-2">
          Hoàng Nguyễn Auto
        </p>
        <h1 className="fw-bold">Quản lý lịch đăng ký</h1>
      </header>

      {error && (
        <Alert
          variant="danger"
          className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2"
        >
          <span>{error}</span>
          <Button
            variant="outline-danger"
            onClick={loadBookings}
            disabled={loading}
          >
            Tải lại
          </Button>
        </Alert>
      )}
      {actionError && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setActionError("")}
        >
          {actionError}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="danger" role="status" />
          <p className="mt-2">Đang tải danh sách đăng ký...</p>
        </div>
      ) : (
        <>
          <section className="mb-5">
            <h4 className="fw-bold mb-3">Lịch hẹn mua xe</h4>
            {renderBookingTable(showroomBookings, "showroom")}
          </section>

          <section className="mb-5">
            <h4 className="fw-bold mb-3">Lịch đăng ký lái thử</h4>
            {renderBookingTable(testDrives, "test-drive")}
          </section>
        </>
      )}
    </Container>
  );
}

export default AdminBooking;
