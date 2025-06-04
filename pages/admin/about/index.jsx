"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    photoUrl: '',
    aboutLanguages: [] // Düz ad
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/about/update/1');
        setAboutData(res.data);
        setFormData({
          photoUrl: res.data?.photoUrl || '',
          aboutLanguages: res.data?.aboutLanguages || []
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.aboutLanguages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setFormData(prev => ({ ...prev, aboutLanguages: updatedLanguages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.put('/about/update/1', formData);
      const res = await api.get('/about/update/1');
      setAboutData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update about");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">About Section</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <label className="block text-sm font-medium mb-2">About Image</label>
        <input
          type="url"
          name="photoUrl"
          value={formData.photoUrl}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md mb-4"
          placeholder="Enter image URL"
        />

        <h3 className="text-lg font-semibold mb-4">Language Content</h3>
        {formData.aboutLanguages.map((lang, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium">
              {lang.langCode === 'az' ? 'Azerbaijani' : lang.langCode === 'ru' ? 'Russian' : 'Other'}
            </label>
            <input
              type="text"
              value={lang.title}
              onChange={(e) => handleLanguageChange(index, 'title', e.target.value)}
              className="w-full px-4 py-2 border rounded-md mt-2"
              placeholder="Enter title"
            />
            <textarea
              value={lang.description}
              onChange={(e) => handleLanguageChange(index, 'description', e.target.value)}
              className="w-full px-4 py-2 border rounded-md mt-2"
              rows="3"
              placeholder="Enter description"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-4 px-6 py-2 rounded-md text-white ${
            isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AboutPage;
