import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Container, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const API_URL = "http://localhost:9999";

function MyBooking() {
  const location = useLocation();

  const [testDrives, setTestDrives] = useState([]);
  const [showroomBookings, setShowroomBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let user;

    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      setError("Không thể đọc thông tin người dùng.");
      return;
    }

    if (!user?.id) {
      return;
    }

    const loadBookings = async () => {
      try {
        const userId = encodeURIComponent(String(user.id));

        const [
          testDrivesResponse,
          showroomBookingsResponse,
          carsResponse,
          showroomsResponse,
        ] = await Promise.all([
          axios.get(`${API_URL}/testDrives?userId=${userId}`),
          axios.get(`${API_URL}/showroomBookings?userId=${userId}`),
          axios.get(`${API_URL}/cars`),
          axios.get(`${API_URL}/showrooms`),
        ]);

        setTestDrives(testDrivesResponse.data);
        setShowroomBookings(showroomBookingsResponse.data);
        setCars(carsResponse.data);
        setShowrooms(showroomsResponse.data);
      } catch (loadError) {
        console.error("Unable to load booking history:", loadError);
        setError("Không thể tải lịch sử đăng ký. Vui lòng thử lại.");
      }
    };

    loadBookings();
  }, []);

  const getShowroomName = (showroomId) =>
    showrooms.find((showroom) => String(showroom.id) === String(showroomId))
      ?.name || `Mã showroom ${showroomId}`;

  const renderBookingTable = (bookings, type) => (
    <div className="table-responsive">
      <Table bordered hover striped className="align-middle text-center mb-0">
        <thead className="table-dark">
          <tr>
            <th>STT</th>

            <th>Showroom</th>
            <th>Ngày hẹn</th>
            <th>Khung giờ</th>
            <th>Số điện thoại</th>
            <th>Ghi chú</th>
            <th>Loại đăng ký</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={`${type}-${booking.id}`}>
                <td>{index + 1}</td>

                <td>{getShowroomName(booking.showroomId)}</td>
                <td>{booking.bookingDate || "Chưa cập nhật"}</td>
                <td>{booking.timeSlot || "Chưa cập nhật"}</td>
                <td>{booking.phone || "Chưa cập nhật"}</td>
                <td>{booking.notes || "Không có"}</td>
                <td>
                  {type === "test-drive" ? (
                    <Badge bg="danger">Lái thử</Badge>
                  ) : (
                    <Badge bg="info" text="dark">
                      Hẹn mua xe
                    </Badge>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
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
        <h1 className="fw-bold">Lịch sử đăng ký</h1>
      </header>

      {location.state?.message && (
        <Alert variant="success">{location.state.message}</Alert>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      <section className="mb-5">
        <h4 className="fw-bold mb-3">
          <i className="bi bi-calendar-check-fill text-danger me-2"></i>
          Lịch hẹn mua xe
        </h4>

        {renderBookingTable(showroomBookings, "showroom")}
      </section>

      <section className="mb-5">
        <h4 className="fw-bold mb-3">
          <i className="bi bi-car-front-fill text-danger me-2"></i>
          Lịch đăng ký lái thử
        </h4>

        {renderBookingTable(testDrives, "test-drive")}
      </section>
    </Container>
  );
}

export default MyBooking;
