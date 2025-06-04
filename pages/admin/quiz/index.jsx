"use client";
import { useEffect, useState } from "react";
import api from "@/utils/api"; // Axios instance
import Head from "next/head";

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialLanguageData = {
    az: {
      questionText: "",
      variantA: "",
      variantB: "",
      variantC: "",
      variantD: "",
    },
    ru: {
      questionText: "",
      variantA: "",
      variantB: "",
      variantC: "",
      variantD: "",
    },
  };

  const [formData, setFormData] = useState({
    courseId: 1,
    correctAnswer: 1,
    testQuestionLanguages: initialLanguageData,
  });

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/test-questions/all-by-lang/az");
      setQuestions(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Suallar yüklənmədi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleInputChange = (lang, field, value) => {
    setFormData((prev) => ({
      ...prev,
      testQuestionLanguages: {
        ...prev.testQuestionLanguages,
        [lang]: {
          ...prev.testQuestionLanguages[lang],
          [field]: value,
        },
      },
    }));
  };

  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "correctAnswer" || name === "courseId" ? Number(value) : value,
    }));
  };

  const handleEdit = async (id) => {
    try {
      const res = await api.get(`/test-questions/dashboard/${id}`);
      const question = res.data;
      const testQuestionLanguages = {};
      question.testQuestionLanguages.forEach((langObj) => {
        testQuestionLanguages[langObj.langCode] = {
          questionText: langObj.questionText,
          variantA: langObj.variantA,
          variantB: langObj.variantB,
          variantC: langObj.variantC,
          variantD: langObj.variantD,
        };
      });

      setFormData({
        courseId: question.courseId,
        correctAnswer: question.testQuestionLanguages[0].correctAnswer,
        testQuestionLanguages,
      });
      setEditingId(id);
      setEditMode(true);
      setShowCreateModal(true);
    } catch (err) {
      setError("Sual məlumatları yüklənmədi");
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const postData = {
      courseId: formData.courseId,
      testQuestionLanguages: Object.entries(formData.testQuestionLanguages).map(
        ([langCode, langData]) => ({
          langCode,
          ...langData,
          correctAnswer: formData.correctAnswer,
        })
      ),
    };

    try {
      if (editMode) {
        await api.put(`/test-questions/update/${editingId}`, postData);
      } else {
        await api.post("/test-questions/create", postData);
      }
      await fetchQuestions();
      setShowCreateModal(false);
      setFormData({
        courseId: 1,
        correctAnswer: 1,
        testQuestionLanguages: initialLanguageData,
      });
      setEditMode(false);
      setEditingId(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Əməliyyat zamanı xəta baş verdi"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Salestar - Home</title>
        <meta name="description" content="Sizin sayt təsviri" />
      </Head>

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Sual İdarəetməsi</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              setEditMode(false);
              setFormData({
                courseId: 1,
                correctAnswer: 1,
                testQuestionLanguages: initialLanguageData,
              });
              setShowCreateModal(true);
            }}
          >
            Yeni Sual Əlavə Et
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-200 shadow rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Sual </th>
                <th className="border px-4 py-2 text-left">Kurs ID</th>
                <th className="border px-4 py-2 text-left">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody>
              {questions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-4 text-gray-500">
                    Heç bir sual tapılmadı.
                  </td>
                </tr>
              ) : (
                questions.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-gray-50 border-b border-gray-200"
                  >
                    <td className="border px-4 py-2">{q.questionText}</td>
                    <td className="border px-4 py-2">{q.courseId}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => handleEdit(q.id)}
                      >
                        Redaktə et
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded p-6 w-full max-w-4xl shadow-lg relative">
              <button
                className="absolute top-3 right-3 text-gray-600 text-3xl font-bold hover:text-gray-900"
                onClick={() => {
                  setShowCreateModal(false);
                  setEditMode(false);
                  setEditingId(null);
                }}
              >
                &times;
              </button>
              <h2 className="text-2xl mb-4 font-semibold">
                {editMode ? "Sual Redaktəsi" : "Yeni Sual Əlavə Et"}
              </h2>

              <form
                onSubmit={handleCreateOrUpdate}
                className="grid grid-cols-2 gap-6"
              >
                {["az", "ru"].map((lang) => (
                  <div key={lang}>
                    <h3 className="font-semibold mb-3">
                      {lang === "az" ? "Azərbaycan dili" : "Русский язык"}
                    </h3>
                    <label className="block mb-1 font-medium">
                      {lang === "az" ? "Sual" : "Вопрос"}
                    </label>
                    <textarea
                      value={formData.testQuestionLanguages[lang].questionText}
                      onChange={(e) =>
                        handleInputChange(lang, "questionText", e.target.value)
                      }
                      required
                      className="border rounded w-full p-2 mb-3"
                      rows={3}
                    />
                    {["A", "B", "C", "D"].map((letter) => (
                      <div key={letter} className="mb-3">
                        <label className="block mb-1 font-medium">
                          {lang === "az"
                            ? `Variant ${letter}`
                            : `Вариант ${letter}`}
                        </label>
                        <input
                          type="text"
                          value={
                            formData.testQuestionLanguages[lang][
                              `variant${letter}`
                            ]
                          }
                          onChange={(e) =>
                            handleInputChange(
                              lang,
                              `variant${letter}`,
                              e.target.value
                            )
                          }
                          required
                          className="border rounded w-full p-2"
                        />
                      </div>
                    ))}
                  </div>
                ))}

                <div className="col-span-2 flex space-x-6 mt-4">
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">
                      Doğru Cavab (1-4)
                    </label>
                    <input
                      type="number"
                      name="correctAnswer"
                      min={1}
                      max={4}
                      value={formData.correctAnswer}
                      onChange={handleMainChange}
                      required
                      className="border rounded w-full p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1 font-medium">Kurs ID</label>
                    <input
                      type="number"
                      name="courseId"
                      value={formData.courseId}
                      onChange={handleMainChange}
                      required
                      className="border rounded w-full p-2"
                    />
                  </div>
                </div>

                <div className="col-span-2 flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                    disabled={isSubmitting}
                  >
                    Ləğv et
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    {isSubmitting
                      ? editMode
                        ? "Yenilənir..."
                        : "Yaradılır..."
                      : editMode
                      ? "Yenilə"
                      : "Yarat"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionManagement;
