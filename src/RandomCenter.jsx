import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const RandomCenter = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("https://myfakeapi.com/api/cars/")
      .then((response) => response.json())
      .then((data) => {
        const first28Cars = data.cars.slice(0, 28).map((car) => ({
          ...car,
          isLiked: false,
        }));
        setCars(first28Cars);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleLike = (id) => {
    const updatedCars = cars.map((car) => ({
      ...car,
      isLiked: car.id === id ? !car.isLiked : car.isLiked,
    }));
    setCars(updatedCars);
  };

  return (
    <div className="car-list-container">
      <div className="car-grid">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <Link to={`/car/${car.id}`} style={{ textDecoration: "none" }}>
              <img
                src={
                  "https://www.topgear.com/sites/default/files/2022/08/1-Mercedes-McLaren-SLR.jpg"
                }
                alt={car.name}
              />
              <h2>{car.name}</h2>
              <p>Model: {car.car_model}</p>
              <p>Color: {car.car_color}</p>
              <p>Year: {car.car_model_year}</p>
              <p>VIN: {car.car_vin}</p>
              <p>Price: {car.price}</p>
              <p>
                Availability: {car.availability ? "Available" : "Not available"}
              </p>
            </Link>

            <button
              className={`car-card-like ${car.isLiked ? "liked" : ""}`}
              onClick={() => toggleLike(car.id)}
            >
              <FaHeart />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomCenter;
