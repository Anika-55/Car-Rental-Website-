import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import Title from "../components/Title";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const MyListing = () => {
  const [user] = useAuthState(auth);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);

  // Fetch cars added by logged-in user
  const fetchMyCars = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(
        `https://car-r-server.vercel.app/cars/email/${user.email}`
      );
      const data = await res.json();
      if (data.success) setCars(data.result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, [user]);

  // Delete car
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://car-r-server.vercel.app/cars/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          setCars(cars.filter((car) => car._id !== id));
          Swal.fire("Deleted!", "Your car has been deleted.", "success");
        } else {
          Swal.fire("Error!", "Failed to delete the car.", "error");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Something went wrong!", "error");
      }
    }
  };

  // Update car
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedCar = {
        brand: editingCar.brand,
        model: editingCar.model,
        category: editingCar.category,
        pricePerDay: editingCar.pricePerDay,
        image: editingCar.image,
        isAvailable: editingCar.isAvailable,
      };

      const res = await fetch(
        `https://car-r-server.vercel.app/cars/${editingCar._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCar),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Car updated successfully!");
        setCars((prev) =>
          prev.map((c) =>
            c._id === editingCar._id ? { ...c, ...updatedCar } : c
          )
        );
        setEditingCar(null);
      } else {
        toast.error("Update failed!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

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
      <ToastContainer position="top-right" />
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
                <tr key={car._id} className="border-t hover:bg-gray-50 ">
                  <td className="py-3 px-5 font-medium flex items-center gap-3">
                    <img
                      src={car.image}
                      alt={car.model}
                      className="w-12 h-12 object-cover rounded"
                    />
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
                  <td className="py-5 px-5 flex gap-3">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setEditingCar(car)}
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

      {/* Update Modal */}
      {editingCar && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              ✏️ Update Car Details
            </h3>
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              {/* Brand */}
              <div>
                <label className="block text-sm mb-1 font-medium">Brand</label>
                <input
                  type="text"
                  value={editingCar.brand}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, brand: e.target.value })
                  }
                  className="border p-2 rounded w-full border-borderColor outline-none"
                  required
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm mb-1 font-medium">Model</label>
                <input
                  type="text"
                  value={editingCar.model}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, model: e.target.value })
                  }
                  className="border p-2 rounded w-full border-borderColor outline-none"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Price Per Day
                </label>
                <input
                  type="number"
                  value={editingCar.pricePerDay}
                  onChange={(e) =>
                    setEditingCar({
                      ...editingCar,
                      pricePerDay: e.target.value,
                    })
                  }
                  className="border p-2 rounded w-full border-borderColor outline-none"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Category
                </label>
                <select
                  value={editingCar.category}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, category: e.target.value })
                  }
                  className="border p-2 rounded w-full border-borderColor outline-none"
                >
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editingCar.image || ""}
                  onChange={(e) =>
                    setEditingCar({ ...editingCar, image: e.target.value })
                  }
                  className="border p-2 rounded w-full border-borderColor outline-none"
                  placeholder="Enter image URL"
                  required
                />
                {editingCar.image && (
                  <img
                    src={editingCar.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded mt-2"
                  />
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  onClick={() => setEditingCar(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListing;
