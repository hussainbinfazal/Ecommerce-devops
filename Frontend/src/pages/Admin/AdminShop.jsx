import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminShop = () => {
  const dispatch = useDispatch();
  const logoInputRef = useRef(null);

  // const { settings, loading, error } = useSelector((state) => state.adminShop);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    primaryColor: "#2563eb",
    returnPolicy: "",
    shippingPolicy: "",
    privacyPolicy: "",
    googleAnalyticsId: "",
    logo: "", // File or string
  });

  const [logoPreview, setLogoPreview] = useState("");

  // useEffect(() => {
  //   dispatch(fetchShopSettings());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (settings) {
  //     setForm({
  //       ...settings,
  //       logo: settings.logo || "",
  //     });
  //     setLogoPreview(settings.logo ? $`{import.meta.env.VITE_API_URL}/uploads/shop/${settings.logo}` : "");
  //   }
  // }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "logo" && typeof value !== "string") {
        formData.append("logo", value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await dispatch(updateShopSettings(formData)).unwrap();
      toast.success("Shop settings updated!");
    } catch (err) {
      toast.error("Failed to update settings.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Shop Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Shop Name" name="name" value={form.name} onChange={handleChange} />
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Address" name="address" value={form.address} onChange={handleChange} />
        </div>

        {/* Appearance */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Primary Color</label>
          <input
            type="color"
            name="primaryColor"
            value={form.primaryColor}
            onChange={handleChange}
            className="w-20 h-10 p-0 border-none"
          />
        </div>

        {/* Logo Upload */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Logo</label>
          {logoPreview && (
            <div className="relative w-32 h-32">
              <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-contain border rounded" />
              <button
                type="button"
                onClick={() => {
                  setLogoPreview("");
                  setForm((prev) => ({ ...prev, logo: "" }));
                  if (logoInputRef.current) logoInputRef.current.value = "";
                }}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => logoInputRef.current?.click()}
            className="w-fit bg-blue-600 text-white px-4 py-2 rounded hover:scale-95 transition"
          >
            Upload Logo
          </button>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
          />
        </div>

        {/* Policies */}
        <TextArea label="Return Policy" name="returnPolicy" value={form.returnPolicy} onChange={handleChange} />
        <TextArea label="Shipping Policy" name="shippingPolicy" value={form.shippingPolicy} onChange={handleChange} />
        <TextArea label="Privacy Policy" name="privacyPolicy" value={form.privacyPolicy} onChange={handleChange} />

        {/* Google Analytics */}
        <Input
          label="Google Analytics ID"
          name="googleAnalyticsId"
          value={form.googleAnalyticsId}
          onChange={handleChange}
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

// Reusable input
const Input = ({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="input border-b-2 border-gray-300 p-2"
    />
  </div>
);

// Reusable textarea
const TextArea = ({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows="4"
      className="input border-2 border-gray-300 p-2"
    />
  </div>
);

export default AdminShop;

