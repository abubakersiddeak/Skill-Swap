import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  User,
  Mail,
  Link as LinkIcon,
  Save,
  Camera,
  Shield,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper: Profile Skeleton Loader
const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Skeleton */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 flex flex-col items-center animate-pulse h-96">
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-6"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      {/* Right Skeleton */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-200 animate-pulse h-96">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
        <div className="space-y-6">
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          <div className="h-12 bg-gray-200 rounded-xl"></div>
          <div className="h-12 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function ProfilePage() {
  const { currentUser, ubdateUser, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
  });
  const [updating, setUpdating] = useState(false);

  // Sync state with currentUser data
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.displayName || "",
        email: currentUser.email || "",
        photoURL: currentUser.photoURL || "https://via.placeholder.com/150",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setUpdating(true);

    try {
      // Note: Using 'ubdateUser' as per your context naming (likely updateUser)
      await ubdateUser(
        currentUser,
        formData.name,
        formData.photoURL || "https://via.placeholder.com/150"
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile details.");
    } finally {
      setUpdating(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";
  };

  if (loading) return <ProfileSkeleton />;

  return (
    <section className="min-h-screen bg-gray-50 py-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-900 tracking-tight">
            Account Settings
          </h1>
          <p className="text-primary-700 mt-2">
            Manage your profile details and public appearance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-100 p-8 flex flex-col items-center text-center h-full relative overflow-hidden">
              <div className="absolute top-0 w-full h-32 bg-linear-to-b from-primary-50 to-transparent opacity-50"></div>

              {/* Avatar */}
              <div className="relative mb-6 z-10 group">
                <div className="p-1.5 bg-white rounded-full shadow-md ring-4 ring-primary-50">
                  <img
                    src={formData.photoURL}
                    alt={formData.name}
                    onError={handleImageError}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-2 right-2 bg-primary-600 text-white p-2 rounded-full shadow-lg border-2 border-white"
                  title="Verified User"
                >
                  <Shield size={16} />
                </div>
              </div>

              {/* Name & Stats */}
              <h2 className="text-2xl font-bold text-primary-900 z-10">
                {formData.name || "User"}
              </h2>
              <p className="text-gray-500 text-sm mb-6 z-10">
                {formData.email}
              </p>

              {/* Mock Stats Badge */}
              <div className="w-full bg-primary-50 rounded-xl p-4 border border-primary-100 flex justify-around mt-auto">
                <div>
                  <p className="text-xl font-bold text-primary-700">0</p>
                  <p className="text-xs text-primary-400 uppercase font-semibold">
                    Skills
                  </p>
                </div>
                <div className="w-px bg-primary-200"></div>
                <div>
                  <p className="text-xl font-bold text-primary-700">5.0</p>
                  <p className="text-xs text-primary-400 uppercase font-semibold">
                    Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg shadow-primary-900/5 border border-primary-100 p-8 md:p-10">
              <h3 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-2">
                <User size={20} className="text-primary-600" />
                Personal Information
              </h3>

              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-bold text-primary-700 mb-2 ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User
                      className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                    />
                  </div>
                </div>

                {/* Photo URL Input */}
                <div>
                  <label className="block text-sm font-bold text-primary-700 mb-2 ml-1">
                    Profile Image URL
                  </label>
                  <div className="relative group">
                    <Camera
                      className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary-500 transition-colors"
                      size={18}
                    />
                    <input
                      type="text"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleChange}
                      placeholder="https://example.com/my-photo.jpg"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-gray-700"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-1">
                    Paste a direct link to an image (JPG/PNG).
                  </p>
                </div>

                {/* Email Input (Read Only) */}
                <div>
                  <label className="block text-sm font-bold text-primary-700 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed font-medium"
                    />
                    <CheckCircle
                      size={16}
                      className="absolute right-4 top-4 text-green-500"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-1">
                    Email cannot be changed securely here.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={updating}
                    className={`
                      w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg shadow-primary-600/30 
                      flex items-center justify-center gap-2 transition-all duration-300
                      ${
                        updating
                          ? "bg-primary-400 cursor-not-allowed"
                          : "bg-primary-600 hover:bg-primary-700 hover:shadow-primary-600/40 hover:-translate-y-1 cursor-pointer"
                      }
                    `}
                  >
                    {updating ? (
                      <>Saving Changes...</>
                    ) : (
                      <>
                        <Save size={20} /> Update Profile
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
