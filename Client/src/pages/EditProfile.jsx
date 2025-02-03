/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(
    user?.profilePic || "/default-avatar.png"
  );
  const navigate = useNavigate();

  // HANDLE IMAGE SELECTION
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // HANDLE PROFILE UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FORM SENT TO THE BACKEND
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("name", name);
    formData.append("email", email);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const { data } = await axios.post("/api/user/update-profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(data.user);
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Profile update failed", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-950 via-blue-950 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-3xl p-8 text-center w-full sm:w-96">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <div className="mt-4 flex justify-center">
          <img
            src={user.profilePic} // PREVIEW THE IMAGE
            alt="Profile Preview"
            className="w-24 h-24 rounded-full border-4 border-indigo-600 shadow-lg"
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-700 border rounded-lg cursor-pointer bg-gray-50 p-2"
          />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg text-gray-700"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg text-gray-700"
          />

          <button
            type="submit"
            className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
