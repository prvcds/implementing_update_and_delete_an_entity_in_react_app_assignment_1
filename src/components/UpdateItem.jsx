import { useState, useEffect } from "react";
import axios from "axios";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

const UpdateItem = ({ itemId }) => {
  const [item, setItem] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${API_URI}/${itemId}`);
        setItem(response.data);
        setUpdatedValue(response.data.name); // Assuming 'name' is the field to update
      } catch (err) {
        setError("Error fetching item: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleInputChange = (e) => {
    setUpdatedValue(e.target.value);
  };

  const handleUpdate = async () => {
    if (!updatedValue.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    setUpdating(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URI}/${itemId}`, {
        name: updatedValue,
      });
      setItem(response.data);
      alert("Item updated successfully!");
    } catch (err) {
      setError("Error updating item: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Update Item</h2>
      {item && (
        <div>
          <p>Current Name: {item.name}</p>
          <input
            type="text"
            value={updatedValue}
            onChange={handleInputChange}
            disabled={updating}
          />
          <button onClick={handleUpdate} disabled={updating}>
            {updating ? "Saving..." : "Update"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateItem;
