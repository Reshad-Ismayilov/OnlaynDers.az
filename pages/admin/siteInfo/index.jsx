"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';

const SiteSettings = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    facebook: '',
    instagram: '',
    twitter: '',
    youtube: ''
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/site/update/1');
        setFormData(res.data);
      } catch (err) {
        setError("Məlumat yüklənə bilmədi");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await api.put('/site/update/1', formData);
      setSuccessMessage("Uğurla yeniləndi!");
    } catch (err) {
      setError("Yenilənmə zamanı xəta baş verdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Yüklənir...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Əlaqə və Sosial Şəbəkələr</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {["phoneNumber", "email", "facebook", "instagram", "twitter", "youtube"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block text-sm font-medium mb-1 capitalize">
              {field === 'phoneNumber' ? 'Telefon Nömrəsi' :
               field === 'email' ? 'Email' :
               field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 px-6 py-2 rounded-md text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSubmitting ? 'Yenilənir...' : 'Yadda saxla'}
        </button>
      </form>
    </div>
  );
};

export default SiteSettings;
