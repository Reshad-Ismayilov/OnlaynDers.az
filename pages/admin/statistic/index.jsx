"use client";
import { useState, useEffect } from 'react';
import api from '@/utils/api';

const StatisticsManagementPage = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStatistic, setCurrentStatistic] = useState(null);
  const [formData, setFormData] = useState({
    number: 0,
    icon: '',
    statisticLanguages: [
      { title: '', langCode: 'az' },
      { title: '', langCode: 'ru' }
    ]
  });

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await api.get('statistic/dashboard/all/az');
      setStatistics(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle language input changes
  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.statisticLanguages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setFormData(prev => ({ ...prev, statisticLanguages: updatedLanguages }));
  };

  // Create new statistic
  const handleCreate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('statistic/create', formData);
      setShowCreateModal(false);
      fetchStatistics();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create statistic");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open edit modal and fetch statistic data
  const openEditModal = async (id) => {
    try {
      const response = await api.get(`statistic/update/${id}`);
      setCurrentStatistic(response.data);
      setFormData({
        number: response.data.number,
        icon: response.data.icon,
        statisticLanguages: response.data.statisticLanguages || [
          { title: '', langCode: 'az' },
          { title: '', langCode: 'ru' }
        ]
      });
      setShowEditModal(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load statistic data");
    }
  };

  // Update statistic
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.put(`statistic/update/${currentStatistic.id}`, {
        ...formData,
        id: currentStatistic.id
      });
      setShowEditModal(false);
      fetchStatistics();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update statistic");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete statistic
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this statistic?")) return;
    
    try {
      await api.delete(`statistic/remove/${id}`);
      fetchStatistics();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete statistic");
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      number: 0,
      icon: '',
      statisticLanguages: [
        { title: '', langCode: 'az' },
        { title: '', langCode: 'ru' }
      ]
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
        <br />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Statistics Management</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add New Statistic
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {statistics.map((stat) => (
                <tr key={stat.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-2xl">{stat.icon}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {stat.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stat.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(stat.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(stat.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Statistic Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Statistic</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Font Awesome class or emoji)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Language Content</h3>
                {formData.statisticLanguages.map((lang, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 mb-2">
                      {lang.langCode === 'az' ? 'Azerbaijani' : 'Russian'} Content
                    </h4>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={lang.title}
                        onChange={(e) => handleLanguageChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-md text-white ${
                    isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Creating..." : "Create Statistic"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Statistic Modal */}
      {showEditModal && currentStatistic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Edit Statistic</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Font Awesome class or emoji)</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Language Content</h3>
                {formData.statisticLanguages.map((lang, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 mb-2">
                      {lang.langCode === 'az' ? 'Azerbaijani' : 'Russian'} Content
                    </h4>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={lang.title}
                        onChange={(e) => handleLanguageChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded-md text-white ${
                    isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Updating..." : "Update Statistic"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsManagementPage;