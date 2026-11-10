import React from "react";
import { Card, Badge, Button } from "react-bootstrap";

function CarCard({ car, brandName, onDetail, onTestDrive }) {
  const formatPrice = (price) => {
    return Number(price).toLocaleString("vi-VN") + " VNĐ";
  };

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={car.image} alt={car.name} />
      <Card.Body></Card.Body>
    </Card>
  );
}

export default CarCard;
