import { useState, useEffect } from "react";

const UpdateItem = () => {
    const [item, setItem] = useState({});
    const [updatedData, setUpdatedData] = useState("");
    const [message, setMessage] = useState("");

    // Fetch existing item when the component mounts
    useEffect(() => {
        fetchItem();
    }, []);

    // Function to fetch the existing item
    const fetchItem = async () => {
        try {
            const response = await fetch(`${import.meta.env.API_URI}/item/1`);
            if (!response.ok) throw new Error("Failed to fetch item");
            const data = await response.json();
            setItem(data);
            setUpdatedData(data.name); // Replace "name" with the actual field name
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    // Handle user input changes
    const handleInputChange = (e) => {
        setUpdatedData(e.target.value);
    };

    // Function to update the item
    const updateItem = async () => {
        try {
            const response = await fetch(`${import.meta.env.API_URI}/item/1`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: updatedData }), // Replace "name" with the actual field name
            });

            if (!response.ok) throw new Error("Failed to update item");
            const data = await response.json();
            setMessage("Item updated successfully!");
            setItem(data);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Update Item</h2>
            {message && <p>{message}</p>}
            <div>
                <p>Current Item: {item.name}</p> {/* Replace "name" with the actual field name */}
                <input
                    type="text"
                    value={updatedData}
                    onChange={handleInputChange}
                    placeholder="Update item name"
                />
                <button onClick={updateItem}>Update</button>
            </div>
        </div>
    );
};

export default UpdateItem;
