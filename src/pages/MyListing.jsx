import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import Title from "../components/Title";

const MyListing = () => {
  const [user] = useAuthState(auth);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCars = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(`http://localhost:3000/cars/email/${user.email}`);
      const data = await res.json();
      if (data.success) setCars(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      const res = await fetch(`http://localhost:3000/cars/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCars(cars.filter((car) => car._id !== id));
      } else {
        alert("Failed to delete car");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, [user]);

  if (!user)
    return (
      <div className="text-center mt-20 text-gray-500">
        Please log in first.
      </div>
    );

  if (loading)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16 text-sm max-w-7xl">
      <Title
        title="My Listings"
        subTitle="Manage your added cars"
        align="left"
      />

      {cars.length === 0 ? (
        <p className="mt-10 text-gray-500">No cars added yet.</p>
      ) : (
        <div className="overflow-x-auto mt-10 border border-gray-200 rounded-xl shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-5">Car Name</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Price/Day</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-5 font-medium">
                    {car.brand} {car.model}
                  </td>
                  <td className="py-3 px-5">{car.category}</td>
                  <td className="py-3 px-5">${car.pricePerDay}</td>
                  <td className="py-3 px-5">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        car.isBooked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {car.isBooked ? "Booked" : "Available"}
                    </span>
                  </td>
                  <td className="py-3 px-5 flex gap-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => alert("Update feature coming soon")}
                    >
                      Update
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(car._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyListing;
