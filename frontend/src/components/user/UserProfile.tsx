import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext"; // Use useAuth hook

const UserProfileEdit = () => {
  const navigate = useNavigate();
  const { userData, accessToken } = useAuth(); // Get user data and token from context

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    username: "",
    phoneNo: "",
    password: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!userData || !userData.id) return; // Ensure user is available before fetching

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${userData.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setUserDetails((prev) => ({
          ...prev,
          fullName: response.data.user.fullName,
          email: response.data.user.email,
          username: response.data.user.username,
          phoneNo: response.data.user.phoneNo,
          password: "", // Don't prefill password
          image: response.data.user.image || null,
        }));

        if (response.data.user.image) {
          setImagePreview(response.data.user.image);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userData, accessToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData || !userData.id) {
      alert("User not found!");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", userDetails.fullName);
    formData.append("email", userDetails.email);
    formData.append("username", userDetails.username);
    formData.append("phoneNo", userDetails.phoneNo);
    if (userDetails.password) {
      formData.append("password", userDetails.password);
    }
    if (userDetails.image) {
      formData.append("image", userDetails.image);
    }

    try {
      await axios.put(`http://localhost:3000/api/user/${userData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Edit Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", color: "#555", fontWeight: "500" }}>
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            value={userDetails.fullName}
            onChange={handleInputChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", color: "#555", fontWeight: "500" }}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            disabled
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
              backgroundColor: "#f9f9f9",
              color: "#777",
              cursor: "not-allowed",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", color: "#555", fontWeight: "500" }}>
            Phone Number:
          </label>
          <input
            type="text"
            name="phoneNo"
            value={userDetails.phoneNo}
            onChange={handleInputChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", color: "#555", fontWeight: "500" }}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            placeholder="Leave empty to keep current password"
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.3s ease",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "14px", color: "#555", fontWeight: "500" }}>
            Profile Image:
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            style={{ fontSize: "14px" }}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Profile Preview"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginTop: "10px",
                objectFit: "cover",
                border: "2px solid #ddd",
              }}
            />
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfileEdit;