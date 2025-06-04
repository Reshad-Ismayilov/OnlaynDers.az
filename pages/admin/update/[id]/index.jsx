"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api";

function CourseUpdate() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    attachmentUrl: "",
    price: "",
    active: true,
    categoryId: "",
    courseLanguages: [
      { title: "", description: "", videoUrl: "", langCode: "az" },
      { title: "", description: "", videoUrl: "", langCode: "ru" },
    ],
    lessons: [
      {
        id: 0,
        orderIndex: 1,
        lessonLanguages: [
          { title: "", videoUrl: "", langCode: "az" },
          { title: "", videoUrl: "", langCode: "ru" },
        ],
      },
    ],
  });

  const fetchData = async () => {
    try {
      if (!id) return;

      const courseResponse = await api.get(`/course/update/${id}`);
      const categoriesResponse = await api.get("/category/getall/az");

      setFormData(courseResponse.data);
      setCategories(categoriesResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanguageChange = (index, field, value) => {
    const newCourseLanguages = [...formData.courseLanguages];
    newCourseLanguages[index][field] = value;
    setFormData((prev) => ({ ...prev, courseLanguages: newCourseLanguages }));
  };

  const handleLessonChange = (lessonIndex, langIndex, field, value) => {
    const newLessons = [...formData.lessons];
    newLessons[lessonIndex].lessonLanguages[langIndex][field] = value;
    setFormData((prev) => ({ ...prev, lessons: newLessons }));
  };

  const addNewLesson = () => {
    const newId =
      formData.lessons.length > 0
        ? Math.max(...formData.lessons.map((l) => l.id)) + 1
        : 1;

    setFormData((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          id: newId,
          orderIndex: prev.lessons.length + 1,
          lessonLanguages: [
            { title: "", videoUrl: "", langCode: "az" },
            { title: "", videoUrl: "", langCode: "ru" },
          ],
        },
      ],
    }));
  };

  const handleLessonDelete = (id) => {
    if (formData.lessons.length > 1) {
      const updated = formData.lessons.filter((lesson) => lesson.id !== id);
      // Yenidən sıralamaq
      const reordered = updated.map((lesson, index) => ({
        ...lesson,
        orderIndex: index + 1,
      }));
      setFormData((prev) => ({ ...prev, lessons: reordered }));
    }
  };

  // Drag and drop
  const [draggedIndex, setDraggedIndex] = useState(null);

  const onDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const items = [...formData.lessons];
    const draggedItem = items.splice(draggedIndex, 1)[0];
    items.splice(index, 0, draggedItem);

    const reordered = items.map((item, idx) => ({
      ...item,
      orderIndex: idx + 1,
    }));

    setFormData((prev) => ({ ...prev, lessons: reordered }));
    setDraggedIndex(null);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    formData.lessons.forEach((lesson, lessonIndex) => {
      lesson.lessonLanguages.forEach((lang, langIndex) => {
        if (!lang.title)
          errors[`lesson_${lessonIndex}_title_${lang.langCode}`] = "Başlıq boş ola bilməz";
        if (!lang.videoUrl)
          errors[`lesson_${lessonIndex}_video_${lang.langCode}`] = "Video linki boş ola bilməz";
      });
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // lessons array-dən yalnız orderIndex-ləri ayrıca çıxarırıq
    const orderIndexes = formData.lessons.map((lesson) => lesson.orderIndex);

    try {
      await api.put(`/course/update/${id}`, {
        ...formData,
        orderIndexes, // əlavə olaraq göndəririk
      });
      setSuccess(true);

      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) return <div className="text-center py-12">Yüklənir...</div>;

  if (success)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">Kurs uğurla yeniləndi!</h2>
          <p className="mt-2">Yönləndirilirsiniz...</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h2 className="text-3xl font-bold mb-8 mt-10">Kursu Yenilə</h2>

      <form onSubmit={handleSubmit} className="grid gap-8">
        <div>
          <label className="block mb-2">Qiymət</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block mb-2">Kateqoriya</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="select select-bordered w-full"
          >
            <option value="">Seçin</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Lessons */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Dərslər</h3>

          <div>
            {formData.lessons.map((lesson, lessonIndex) => (
              <div
                key={lesson.id}
                draggable
                onDragStart={(e) => onDragStart(e, lessonIndex)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, lessonIndex)}
                className="mb-8 border p-4 rounded-lg bg-base-200 cursor-move"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">
                    Dərs #{lesson.orderIndex}
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleLessonDelete(lesson.id)}
                    className="btn btn-error btn-sm"
                    disabled={formData.lessons.length === 1}
                  >
                    Sil
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {lesson.lessonLanguages.map((lang, langIndex) => (
                    <div key={lang.langCode}>
                      <h4 className="font-medium mb-2">{lang.langCode.toUpperCase()} Dili</h4>

                      <input
                        type="text"
                        placeholder="Dərs başlığı"
                        value={lang.title}
                        onChange={(e) =>
                          handleLessonChange(lessonIndex, langIndex, "title", e.target.value)
                        }
                        className={`input input-bordered w-full mb-2 ${
                          formErrors[`lesson_${lessonIndex}_title_${lang.langCode}`]
                            ? "input-error"
                            : ""
                        }`}
                      />
                      {formErrors[`lesson_${lessonIndex}_title_${lang.langCode}`] && (
                        <p className="text-error text-sm mb-2">
                          {formErrors[`lesson_${lessonIndex}_title_${lang.langCode}`]}
                        </p>
                      )}

                      <input
                        type="text"
                        placeholder="Video URL"
                        value={lang.videoUrl}
                        onChange={(e) =>
                          handleLessonChange(lessonIndex, langIndex, "videoUrl", e.target.value)
                        }
                        className={`input input-bordered w-full ${
                          formErrors[`lesson_${lessonIndex}_video_${lang.langCode}`]
                            ? "input-error"
                            : ""
                        }`}
                      />
                      {formErrors[`lesson_${lessonIndex}_video_${lang.langCode}`] && (
                        <p className="text-error text-sm">
                          {formErrors[`lesson_${lessonIndex}_video_${lang.langCode}`]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={addNewLesson} className="btn btn-primary">
            Yeni dərs əlavə et
          </button>
        </div>

        <button type="submit" className="btn btn-success">
          Yenilə
        </button>
      </form>
    </div>
  );
}

export default CourseUpdate;
