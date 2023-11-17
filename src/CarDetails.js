import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RandomCenter from "./RandomCenter";

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://myfakeapi.com/api/cars/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCar(data.Car);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="car-details-loading">Loading...</div>;
  if (error)
    return <div className="car-details-error">Error: {error.message}</div>;

  return (
    <div className="car-details-container">
      <h1 className="car-title">{car?.car}</h1>
      <div className="car-image-container">
        <img
          src="https://www.topgear.com/sites/default/files/2022/08/1-Mercedes-McLaren-SLR.jpg"
          alt={`${car?.car_model} Image`}
          className="car-image"
        />

<div class="custom-card">
  <div class="card-content">
    <p class="card-title">Avtomobil Qiyməti</p>
    <p class="price">24.800 AZN</p>
    <p class="buy-option">Hissə-hissə almaq</p>
    <p class="phone">Telefon Nömrəsi: 022-222-22-22</p>
  </div>
</div>

      </div>
      <div className="car-details">
        <p>
          <strong>Model:</strong> {car?.car_model}
        </p>
        <p>
          <strong>Color:</strong> {car?.car_color}
        </p>
        <p>
          <strong>Year:</strong> {car?.car_model_year}
        </p>
        <p>
          <strong>VIN:</strong> {car?.car_vin}
        </p>
        <p>
          <strong>Price:</strong> {car?.price}
        </p>
        <p>
          <strong>Availability:</strong>{" "}
          {car?.availability ? "Available" : "Not available"}
        </p>
      </div>

      <RandomCenter/>
    </div>
  );
};

export default CarDetails;
