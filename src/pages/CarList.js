import axios from "axios";
import React, { useEffect, useState } from "react";
const API_CAR = "http://localhost:9999/cars";
function CarList() {
  const [cars, setCars] = useState([]);

  const loadAPI = async () => {
    try {
      const [carRes] = await Promise.all([axios.get(API_CAR)]);
      setCars(carRes.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    loadAPI();
  }, []);

  return <div></div>;
}

export default CarList;
