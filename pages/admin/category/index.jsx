"use client";

import api from "@/utils/api";
import React, { useEffect, useState } from "react";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [nameAz, setNameAz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/category/getall/az");
      setCategories(res.data);
    } catch (err) {
      console.error("Kateqoriyalar yüklənmədi", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async () => {
    try {
      await api.post("/category/create", {
        categoryLanguages: [
          { name: nameAz, langCode: "az" },
          { name: nameRu, langCode: "ru" },
        ],
      });
      setNameAz("");
      setNameRu("");
      fetchCategories();
    } catch (err) {
      console.error("Kateqoriya əlavə olunmadı", err);
    }
  };

  const updateCategory = async () => {
    if (!editId) return;
    try {
      await api.put(`/category/update/${editId}`, {
        categoryLanguages: [
          { name: nameAz, langCode: "az" },
          { name: nameRu, langCode: "ru" },
        ],
      });
      setNameAz("");
      setNameRu("");
      setEditId(null);
      fetchCategories();
    } catch (err) {
      console.error("Kateqoriya yenilənmədi", err);
    }
  };

  const deleteCategory = async (id) => {
    const confirmed = window.confirm("Bu kateqoriyanı silməyə əminsiniz?");
    if (!confirmed) return;

    try {
      await api.delete(`/category/delete/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Kateqoriya silinmədi", err);
    }
  };

  const onEdit = async (category) => {
    setEditId(category.id);
    try {
      const res = await api.get(`/category/update/${category.id}`);
      const azLang = res.data.categoryLanguages.find(
        (cl) => cl.langCode === "az"
      );
      const ruLang = res.data.categoryLanguages.find(
        (cl) => cl.langCode === "ru"
      );

      setNameAz(azLang ? azLang.name : "");
      setNameRu(ruLang ? ruLang.name : "");
    } catch (err) {
      console.error("Kateqoriya məlumatı yüklənmədi", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Kateqoriya İdarəsi
      </h2>

      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Ad (AZ)"
          value={nameAz}
          onChange={(e) => setNameAz(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Ad (RU)"
          value={nameRu}
          onChange={(e) => setNameRu(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex space-x-4">
          {editId ? (
            <>
              <button
                onClick={updateCategory}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
              >
                Yenilə
              </button>
              <button
                onClick={() => {
                  setEditId(null);
                  setNameAz("");
                  setNameRu("");
                }}
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-400 transition"
              >
                Ləğv et
              </button>
            </>
          ) : (
            <button
              onClick={createCategory}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            >
              Əlavə et
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Yüklənir...</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Ad (AZ)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Əməliyyatlar
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{cat.id}</td>
                <td className="border border-gray-300 px-4 py-2">{cat.name}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-4">
                  <button
                    onClick={() => onEdit(cat)}
                    className="text-blue-600 hover:underline"
                  >
                    Redaktə et
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-red-600 hover:underline"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryManagement;
