import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({
    marka: "",
    model: "",
    minFiyat: "",
    maxFiyat: "",
  });

  useEffect(() => {
    fetch("https://myfakeapi.com/api/cars/")
      .then((response) => response.json())
      .then((data) => {
        const updatedCars = data.cars.map((car) => ({
          ...car,
          isLiked: false,
        }));
        setCars(updatedCars);
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    const cleanedValue = name.includes("Fiyat")
      ? value.replace(/[^0-9.-]+/g, "")
      : value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: cleanedValue,
    }));
  };

  const filteredCars = cars.filter((car) => {
    const carPrice = parseFloat(car.price.replace(/[^0-9.-]+/g, ""));
    return (
      (!filters.marka || car.marka === filters.marka) &&
      (!filters.model || car.model === filters.model) &&
      (!filters.minFiyat || carPrice >= parseFloat(filters.minFiyat)) &&
      (!filters.maxFiyat || carPrice <= parseFloat(filters.maxFiyat))
    );
  });

  return (
    <div className="car-list-container">
      {/* <h1 style={{ textAlign: "center" }}>NitroAZE</h1> */}

      <form className="form-container">
        <select
          className="select-field"
          name="marka"
          onChange={handleFilterChange}
        >
          <option value="">Tüm Markalar</option>
        </select>

        <select
          className="select-field"
          name="model"
          onChange={handleFilterChange}
        >
          <option value="">Tüm Modeller</option>
        </select>

        <input
          className="input-field"
          type="number"
          name="minFiyat"
          placeholder="Min. Fiyat"
          onChange={handleFilterChange}
        />

        <input
          className="input-field"
          type="number"
          name="maxFiyat"
          placeholder="Max. Fiyat"
          onChange={handleFilterChange}
        />

        <button className="filter-button" type="submit">
          Filtrele
        </button>
      </form>

      <div className="car-grid">
        {filteredCars.map((car) => (
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

          // ...
        ))}
      </div>
    </div>
  );
};

export default CarList;
