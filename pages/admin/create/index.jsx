"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoMdClose } from "react-icons/io";
import api from "@/utils/api";
import { useAuth } from "@/hooks/useAuth";

function CreateCourse() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const { isAuthenticated } = useAuth();
  const getUserInfo = async () => {
    try {
      const response = await api.get("auth/me");
      setUser(response.data);
    } catch (err) {
      setError(err.message);
      
      if (err.response?.status === 401) {
        // Clear auth data and redirect
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        // window.location.href = "/"; // Hard redirect (Next.js router deyil)
      }
    } finally {
      setLoading(false);
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    attachmentUrl: "",
    price: "",
    categoryId: "",
    courseLanguages: [
      { title: "", description: "", videoUrl: "", langCode: "az" },
      { title: "", description: "", videoUrl: "", langCode: "ru" },
    ],
    lessons: [
      {
        id: Date.now(), // Temporary unique ID
        lessonLanguages: [
          { title: "", videoUrl: "", langCode: "az" },
          { title: "", videoUrl: "", langCode: "ru" },
        ],
      },
    ],
  });

  useEffect(() => {
    getUserInfo()
    // Fetch categories on mount
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category/getall/az");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

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
    setFormData((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          id: Date.now(), // Temporary unique ID
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
      setFormData((prev) => ({
        ...prev,
        lessons: prev.lessons.filter((lesson) => lesson.id !== id),
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.attachmentUrl)
      errors.attachmentUrl = "Şəkil URL-i tələb olunur";
    if (!formData.price || isNaN(formData.price))
      errors.price = "Düzgün qiymət daxil edin";
    if (!formData.categoryId) errors.categoryId = "Kateqoriya seçmək mütləqdir";

    // Validate course languages
    formData.courseLanguages.forEach((lang, index) => {
      if (!lang.title.trim())
        errors[
          `title_${lang.langCode}`
        ] = `${lang.langCode.toUpperCase()} başlıq tələb olunur`;
      if (!lang.description.trim())
        errors[
          `description_${lang.langCode}`
        ] = `${lang.langCode.toUpperCase()} təsvir tələb olunur`;
    });

    // Validate lessons
    formData.lessons.forEach((lesson, lessonIndex) => {
      lesson.lessonLanguages.forEach((lang, langIndex) => {
        if (!lang.title.trim())
          errors[`lesson_${lessonIndex}_title_${lang.langCode}`] = `Dərs ${
            lessonIndex + 1
          } üçün ${lang.langCode.toUpperCase()} başlıq tələb olunur`;
        if (!lang.videoUrl.trim())
          errors[`lesson_${lessonIndex}_video_${lang.langCode}`] = `Dərs ${
            lessonIndex + 1
          } üçün ${lang.langCode.toUpperCase()} video URL tələb olunur`;
      });
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      // Prepare the data in the format backend expects
      const requestData = {
        ...formData,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
        active: true,
        lessons: formData.lessons.map((lesson) => ({
          ...lesson,
          id: undefined, // Let backend generate IDs for new lessons
        })),
      };

      await api.post("/course/create", requestData);
      setSuccess(true);
      setTimeout(() => router.push("/admin"), 2000);
    } catch (error) {
      console.error("Creation error:", error);
      alert(
        "Yaradılma zamanı xəta baş verdi: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !success)
    return <div className="text-center py-12">Yüklənir...</div>;
  if (success)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">
            Kurs uğurla yaradıldı!
          </h2>
          <p className="mt-2">Kurslar siyahısına yönləndirilirsiniz...</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h2 className="text-3xl font-bold mb-8 mt-10">Yeni Kurs Yaradın</h2>

      <form onSubmit={handleSubmit} className="grid gap-8">
        {/* Image Upload */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Şəkil</h3>
          <input
            type="text"
            name="attachmentUrl"
            placeholder="Şəkil URL"
            className={`input input-bordered w-full ${
              formErrors.attachmentUrl ? "input-error" : ""
            }`}
            value={formData.attachmentUrl}
            onChange={handleInputChange}
          />
          {formErrors.attachmentUrl && (
            <p className="mt-2 text-sm text-error">
              {formErrors.attachmentUrl}
            </p>
          )}
        </div>

        {/* Price Section */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Qiymət</h3>
          <input
            type="number"
            name="price"
            placeholder="Qiymət"
            className={`input input-bordered w-full ${
              formErrors.price ? "input-error" : ""
            }`}
            value={formData.price}
            onChange={handleInputChange}
          />
          {formErrors.price && (
            <p className="mt-2 text-sm text-error">{formErrors.price}</p>
          )}
        </div>

        {/* Category Section */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Kateqoriya</h3>
          <select
            name="categoryId"
            className={`select select-bordered w-full ${
              formErrors.categoryId ? "select-error" : ""
            }`}
            value={formData.categoryId}
            onChange={handleInputChange}
          >
            <option value="">Kateqoriya seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {formErrors.categoryId && (
            <p className="mt-2 text-sm text-error">{formErrors.categoryId}</p>
          )}
        </div>

        {/* Course Languages */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Kurs Məlumatları</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Azerbaijani */}
            <div>
              <h4 className="font-medium mb-2">Azərbaycan dili</h4>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Başlıq (AZ)"
                    className={`input input-bordered w-full ${
                      formErrors.title_az ? "input-error" : ""
                    }`}
                    value={formData.courseLanguages[0].title}
                    onChange={(e) =>
                      handleLanguageChange(0, "title", e.target.value)
                    }
                  />
                  {formErrors.title_az && (
                    <p className="mt-2 text-sm text-error">
                      {formErrors.title_az}
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    placeholder="Təsvir (AZ)"
                    className={`textarea textarea-bordered w-full ${
                      formErrors.description_az ? "textarea-error" : ""
                    }`}
                    value={formData.courseLanguages[0].description}
                    onChange={(e) =>
                      handleLanguageChange(0, "description", e.target.value)
                    }
                  />
                  {formErrors.description_az && (
                    <p className="mt-2 text-sm text-error">
                      {formErrors.description_az}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Russian */}
            <div>
              <h4 className="font-medium mb-2">Rus dili</h4>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Başlıq (RU)"
                    className={`input input-bordered w-full ${
                      formErrors.title_ru ? "input-error" : ""
                    }`}
                    value={formData.courseLanguages[1].title}
                    onChange={(e) =>
                      handleLanguageChange(1, "title", e.target.value)
                    }
                  />
                  {formErrors.title_ru && (
                    <p className="mt-2 text-sm text-error">
                      {formErrors.title_ru}
                    </p>
                  )}
                </div>
                <div>
                  <textarea
                    placeholder="Təsvir (RU)"
                    className={`textarea textarea-bordered w-full ${
                      formErrors.description_ru ? "textarea-error" : ""
                    }`}
                    value={formData.courseLanguages[1].description}
                    onChange={(e) =>
                      handleLanguageChange(1, "description", e.target.value)
                    }
                  />
                  {formErrors.description_ru && (
                    <p className="mt-2 text-sm text-error">
                      {formErrors.description_ru}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Section */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Dərslər</h3>
          <div className="space-y-6">
            {formData.lessons.map((lesson, lessonIndex) => (
              <div key={lesson.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Dərs #{lessonIndex + 1}</h4>
                  {formData.lessons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleLessonDelete(lesson.id)}
                      className="btn btn-circle btn-sm btn-ghost"
                    >
                      <IoMdClose className="text-lg" />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Azerbaijani Lesson */}
                  <div>
                    <h5 className="font-medium mb-2">Azərbaycan dili</h5>
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Dərs Başlığı (AZ)"
                          className={`input input-bordered w-full ${
                            formErrors[`lesson_${lessonIndex}_title_az`]
                              ? "input-error"
                              : ""
                          }`}
                          value={lesson.lessonLanguages[0].title}
                          onChange={(e) =>
                            handleLessonChange(
                              lessonIndex,
                              0,
                              "title",
                              e.target.value
                            )
                          }
                        />
                        {formErrors[`lesson_${lessonIndex}_title_az`] && (
                          <p className="mt-2 text-sm text-error">
                            {formErrors[`lesson_${lessonIndex}_title_az`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Video URL (AZ)"
                          className={`input input-bordered w-full ${
                            formErrors[`lesson_${lessonIndex}_video_az`]
                              ? "input-error"
                              : ""
                          }`}
                          value={lesson.lessonLanguages[0].videoUrl}
                          onChange={(e) =>
                            handleLessonChange(
                              lessonIndex,
                              0,
                              "videoUrl",
                              e.target.value
                            )
                          }
                        />
                        {formErrors[`lesson_${lessonIndex}_video_az`] && (
                          <p className="mt-2 text-sm text-error">
                            {formErrors[`lesson_${lessonIndex}_video_az`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Russian Lesson */}
                  <div>
                    <h5 className="font-medium mb-2">Rus dili</h5>
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Dərs Başlığı (RU)"
                          className={`input input-bordered w-full ${
                            formErrors[`lesson_${lessonIndex}_title_ru`]
                              ? "input-error"
                              : ""
                          }`}
                          value={lesson.lessonLanguages[1].title}
                          onChange={(e) =>
                            handleLessonChange(
                              lessonIndex,
                              1,
                              "title",
                              e.target.value
                            )
                          }
                        />
                        {formErrors[`lesson_${lessonIndex}_title_ru`] && (
                          <p className="mt-2 text-sm text-error">
                            {formErrors[`lesson_${lessonIndex}_title_ru`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Video URL (RU)"
                          className={`input input-bordered w-full ${
                            formErrors[`lesson_${lessonIndex}_video_ru`]
                              ? "input-error"
                              : ""
                          }`}
                          value={lesson.lessonLanguages[1].videoUrl}
                          onChange={(e) =>
                            handleLessonChange(
                              lessonIndex,
                              1,
                              "videoUrl",
                              e.target.value
                            )
                          }
                        />
                        {formErrors[`lesson_${lessonIndex}_video_ru`] && (
                          <p className="mt-2 text-sm text-error">
                            {formErrors[`lesson_${lessonIndex}_video_ru`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addNewLesson}
            className="btn btn-primary mt-6"
          >
            Yeni dərs əlavə et
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard/courses")}
            className="btn btn-ghost"
          >
            Ləğv et
          </button>
          <button
            type="submit"
            className="btn btn-primary px-8"
            disabled={loading}
          >
            {loading ? "Yaradılır..." : "Yarat"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCourse;