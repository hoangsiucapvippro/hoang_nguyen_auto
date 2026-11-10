import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

const carImageAliases = {
  "VinFast VF5 Plus": "VinFast_VF5.jpg",
  "VinFast VF6 Plus": "VinFast_VF6.jpg",
  "VinFast VF7 Plus": "VinFast_VF7.jpg",
  "Toyota Corolla Cross 1.8V": "Toyota_Corolla_Cross.jpg",
  "Toyota Corolla Altis 1.8HEV": "Toyota_Corolla_Altis.jpg",
  "Toyota Fortuner Legender 2.8L 4x4": "Toyota_Fortuner_Legender_2.8L.jpg",
  "BMW 330i M Sport": "BMW_330i_M_Sport.jpg",
};

const fuelTypeDisplay = {
  gasoline: { label: "Gasoline", variant: "danger" },
  hybrid: { label: "Hybrid", variant: "warning" },
  electric: { label: "Electric", variant: "success" },
  diesel: { label: "Diesel", variant: "dark" },
};

export function getCarImage(car) {
  if (car.image) {
    if (/^(https?:)?\/\//.test(car.image) || car.image.startsWith("/")) {
      return car.image;
    }
    return `${process.env.PUBLIC_URL}/${car.image}`;
  }

  const imageName =
    carImageAliases[car.name] ||
    `${(car.name || "default").replace(/\s+/g, "_")}.jpg`;
  return `${process.env.PUBLIC_URL}/image/${imageName}`;
}

function CarCard({ car, brandName, onDetail, onTestDrive }) {
  const fuelType = fuelTypeDisplay[(car.fuelType || "").toLowerCase()] || {
    label: car.fuelType || "Chưa cập nhật",
    variant: "dark",
  };

  const formatPrice = (price) => {
    return price ? `${Number(price).toLocaleString("vi-VN")} VNĐ` : "Liên hệ";
  };

  return (
    <Card className="h-100 border-0 shadow-sm">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={getCarImage(car)}
          alt={car.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </div>

      <Card.Body className="d-flex flex-column p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small className="text-muted fw-bold">
            {brandName || "Thương hiệu"}
          </small>
          <Badge bg={fuelType.variant}>{fuelType.label}</Badge>
        </div>

        <Card.Title className="fw-bold fs-5 text-dark mb-2">
          {car.name}
        </Card.Title>

        <div className="text-muted small mb-3">
          <span> {car.year || 2024}</span> •{" "}
          <span> {car.seats ? `${car.seats} chỗ` : "5 chỗ"}</span> •{" "}
          <span> {car.transmission || "Tự động"}</span>
        </div>

        <div className="mt-auto">
          <small className="text-muted d-block">Giá niêm yết:</small>
          <span className="text-danger fw-bold fs-5">
            {formatPrice(car.price)}
          </span>

          <div className="d-flex gap-2 mt-3">
            <Button
              variant="outline-secondary"
              className="w-100 btn-sm fw-semibold"
              onClick={() => onDetail && onDetail(car.id || car)}
            >
              Chi tiết
            </Button>
            {onTestDrive && (
              <Button
                variant="warning"
                className="w-100 btn-sm fw-bold text-dark"
                onClick={() => onTestDrive(car.id || car)}
              >
                Lái thử
              </Button>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CarCard;
