"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';

const index = () => {
  const [aboutData, setAboutData] = useState(null);
  const [bannerData, setBannerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    photoUrl: '',
    videoUrl: '',
    bannerLanguages: []
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, bannerRes] = await Promise.all([
          api.get('banner/dashboard/1'),
          api.get('banner/dashboard/1')
        ]);
        
        setAboutData(aboutRes.data);
        setBannerData(bannerRes.data);
        setFormData({
          photoUrl: bannerRes.data?.photoUrl || '',
          videoUrl: bannerRes.data?.videoUrl || '',
          bannerLanguages: bannerRes.data?.bannerLanguages || []
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
    const updatedLanguages = [...formData.bannerLanguages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setFormData(prev => ({ ...prev, bannerLanguages: updatedLanguages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.put('banner/dashboard/1', formData);
      const res = await api.get('banner/dashboard/1');
      setBannerData(res.data);
      setEditingId(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
    // Reset form data to original
    setFormData({
      photoUrl: bannerData?.photoUrl || '',
      videoUrl: bannerData?.videoUrl || '',
      bannerLanguages: bannerData?.bannerLanguages || []
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <br />
        <br />
        <br />
      <div className="flex border-b mb-6">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'banner' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('banner')}
        >
          Banner Section
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}



        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Banner Section</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Banner Image</label>
                {formData.photoUrl ? (
                  <img 
                    src={formData.photoUrl} 
                    alt="Banner preview" 
                    className="w-full h-48 object-contain rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    No image selected
                  </div>
                )}
                <input
                  type="url"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleInputChange}
                  className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter video URL"
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Language Content</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.bannerLanguages.map((lang, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {lang.langCode === 'az' ? 'Azerbaijani' : 'Russian'}
                        </td>
                        <td className="px-6 py-4">
                          {editingId === index ? (
                            <input
                              type="text"
                              value={lang.title}
                              onChange={(e) => handleLanguageChange(index, 'title', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md"
                            />
                          ) : (
                            <div className="text-sm text-gray-900">{lang.title}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingId === index ? (
                            <textarea
                              value={lang.description}
                              onChange={(e) => handleLanguageChange(index, 'description', e.target.value)}
                              className="w-full px-3 py-1 border border-gray-300 rounded-md"
                              rows="3"
                            />
                          ) : (
                            <div className="text-sm text-gray-900 line-clamp-2">{lang.description}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingId === index ? (
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => cancelEditing()}
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => startEditing(index)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              {editingId !== null && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md text-white ${
                  isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Saving...' : 'Save All Changes'}
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default index;