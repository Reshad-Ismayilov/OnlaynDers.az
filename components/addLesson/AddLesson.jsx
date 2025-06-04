"use client";
import React, { useEffect, useState } from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

function AddLesson() {
  const router = useRouter();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const [headerImage, setHeaderImage] = useState("");
  const [titleAz, setTitleAz] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [descriptionAz, setDescriptionAz] = useState("");
  const [descriptionRu, setDescriptionRu] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [lessons, setLessons] = useState([
    { id: 0, titleAz: "", titleRu: "", videoUrlAz: "", videoUrlRu: "" },
  ]);

  const addNewLesson = () => {
    setLessons([
      ...lessons,
      { 
        id: lessons.length, 
        titleAz: "", 
        titleRu: "", 
        videoUrlAz: "", 
        videoUrlRu: "" 
      },
    ]);
  };

  const handleLessonChange = (index, field, value) => {
    const newLessons = [...lessons];
    newLessons[index][field] = value;
    setLessons(newLessons);
  };

  const handleLessonDelete = (id) => {
    if (lessons.length > 1) {
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    }
  };

  const getCategories = async () => {
    try {
      const response = await api.get(`/category/getall/az`);
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!headerImage) errors.headerImage = "Şəkil URL-i tələb olunur";
    if (!titleAz.trim()) errors.titleAz = "Azərbaycan dilində başlıq tələb olunur";
    if (!titleRu.trim()) errors.titleRu = "Rus dilində başlıq tələb olunur";
    if (!descriptionAz.trim()) errors.descriptionAz = "Azərbaycan dilində təsvir tələb olunur";
    if (!descriptionRu.trim()) errors.descriptionRu = "Rus dilində təsvir tələb olunur";
    if (!price || isNaN(price)) errors.price = "Düzgün qiymət daxil edin";
    if (!category) errors.category = "Kateqoriya seçmək mütləqdir";
    
    // Validate lessons
    lessons.forEach((lesson, index) => {
      if (!lesson.titleAz.trim()) errors[`lessonTitleAz_${index}`] = `Dərs ${index + 1} üçün Azərbaycan dilində başlıq tələb olunur`;
      if (!lesson.titleRu.trim()) errors[`lessonTitleRu_${index}`] = `Dərs ${index + 1} üçün Rus dilində başlıq tələb olunur`;
      if (!lesson.videoUrlAz.trim()) errors[`lessonVideoAz_${index}`] = `Dərs ${index + 1} üçün Azərbaycan dilində video URL tələb olunur`;
      if (!lesson.videoUrlRu.trim()) errors[`lessonVideoRu_${index}`] = `Dərs ${index + 1} üçün Rus dilində video URL tələb olunur`;
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const courseData = {
      attachmentUrl: headerImage,
      price: Number(price),
      active: true,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      categoryId: Number(category),
      courseLanguages: [
        {
          title: titleAz,
          description: descriptionAz,
          videoUrl,
          langCode: "az",
        },
        {
          title: titleRu,
          description: descriptionRu,
          videoUrl,
          langCode: "ru",
        },
      ],
      lessons: lessons.map((lesson) => ({
        lessonLanguages: [
          {
            title: lesson.titleAz,
            videoUrl: lesson.videoUrlAz,
            langCode: "az",
          },
          {
            title: lesson.titleRu,
            videoUrl: lesson.videoUrlRu,
            langCode: "ru",
          },
        ],
      })),
    };

    try {
      setLoading(true);
      await api.post("/course/create", courseData);
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      console.error("Error:", error);
      alert("Server xətası");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (success) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">Kurs uğurla əlavə edildi!</h2>
          <p className="mt-2">Dashboard səhifəsinə yönləndirilirsiniz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h2 className="text-3xl font-bold mb-8">Video dərs əlavə et</h2>

      <form onSubmit={handleSubmit} className="grid gap-8">
        {/* Image Upload */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Şəkil</h3>
          <input
            type="text"
            placeholder="Şəkil URL"
            className={`input input-bordered w-full ${formErrors.headerImage ? 'input-error' : ''}`}
            value={headerImage}
            onChange={(e) => setHeaderImage(e.target.value)}
          />
          {formErrors.headerImage && (
            <p className="mt-2 text-sm text-error">{formErrors.headerImage}</p>
          )}
        </div>

        {/* Title Section */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Başlıq</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Başlıq (AZ)"
                className={`input input-bordered w-full ${formErrors.titleAz ? 'input-error' : ''}`}
                value={titleAz}
                onChange={(e) => setTitleAz(e.target.value)}
              />
              {formErrors.titleAz && (
                <p className="mt-2 text-sm text-error">{formErrors.titleAz}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Başlıq (RU)"
                className={`input input-bordered w-full ${formErrors.titleRu ? 'input-error' : ''}`}
                value={titleRu}
                onChange={(e) => setTitleRu(e.target.value)}
              />
              {formErrors.titleRu && (
                <p className="mt-2 text-sm text-error">{formErrors.titleRu}</p>
              )}
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Qiymət</h3>
          <input
            type="number"
            placeholder="Qiymət"
            className={`input input-bordered w-full ${formErrors.price ? 'input-error' : ''}`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {formErrors.price && (
            <p className="mt-2 text-sm text-error">{formErrors.price}</p>
          )}
        </div>

        {/* Description Section */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Təsvir</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <textarea
                placeholder="Təsvir (AZ)"
                className={`textarea textarea-bordered w-full ${formErrors.descriptionAz ? 'textarea-error' : ''}`}
                value={descriptionAz}
                onChange={(e) => setDescriptionAz(e.target.value)}
              />
              {formErrors.descriptionAz && (
                <p className="mt-2 text-sm text-error">{formErrors.descriptionAz}</p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Təsvir (RU)"
                className={`textarea textarea-bordered w-full ${formErrors.descriptionRu ? 'textarea-error' : ''}`}
                value={descriptionRu}
                onChange={(e) => setDescriptionRu(e.target.value)}
              />
              {formErrors.descriptionRu && (
                <p className="mt-2 text-sm text-error">{formErrors.descriptionRu}</p>
              )}
            </div>
          </div>
        </div>

        {/* Category Section */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Kateqoriya</h3>
          <select 
            className={`select select-bordered w-full ${formErrors.category ? 'select-error' : ''}`}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">Kateqoriya seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {formErrors.category && (
            <p className="mt-2 text-sm text-error">{formErrors.category}</p>
          )}
        </div>

        {/* Lessons Section */}
        <div className="card bg-base-100 shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Dərslər</h3>
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Dərs #{index + 1}</h4>
                  {lessons.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => handleLessonDelete(lesson.id)}
                      className="btn btn-circle btn-sm btn-ghost"
                    >
                      <IoMdClose className="text-lg" />
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Dərs Başlığı (AZ)"
                      className={`input input-bordered w-full ${formErrors[`lessonTitleAz_${index}`] ? 'input-error' : ''}`}
                      value={lesson.titleAz}
                      onChange={(e) =>
                        handleLessonChange(index, "titleAz", e.target.value)
                      }
                    />
                    {formErrors[`lessonTitleAz_${index}`] && (
                      <p className="mt-2 text-sm text-error">{formErrors[`lessonTitleAz_${index}`]}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Dərs Başlığı (RU)"
                      className={`input input-bordered w-full ${formErrors[`lessonTitleRu_${index}`] ? 'input-error' : ''}`}
                      value={lesson.titleRu}
                      onChange={(e) =>
                        handleLessonChange(index, "titleRu", e.target.value)
                      }
                    />
                    {formErrors[`lessonTitleRu_${index}`] && (
                      <p className="mt-2 text-sm text-error">{formErrors[`lessonTitleRu_${index}`]}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Video URL (AZ)"
                      className={`input input-bordered w-full ${formErrors[`lessonVideoAz_${index}`] ? 'input-error' : ''}`}
                      value={lesson.videoUrlAz}
                      onChange={(e) =>
                        handleLessonChange(index, "videoUrlAz", e.target.value)
                      }
                    />
                    {formErrors[`lessonVideoAz_${index}`] && (
                      <p className="mt-2 text-sm text-error">{formErrors[`lessonVideoAz_${index}`]}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Video URL (RU)"
                      className={`input input-bordered w-full ${formErrors[`lessonVideoRu_${index}`] ? 'input-error' : ''}`}
                      value={lesson.videoUrlRu}
                      onChange={(e) =>
                        handleLessonChange(index, "videoUrlRu", e.target.value)
                      }
                    />
                    {formErrors[`lessonVideoRu_${index}`] && (
                      <p className="mt-2 text-sm text-error">{formErrors[`lessonVideoRu_${index}`]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addNewLesson}
            className="btn btn-primary mt-4"
          >
            Yeni dərs əlavə et
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn btn-primary px-8"
            disabled={loading}
          >
            {loading ? 'Yüklənir...' : 'Dərsi əlavə et'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLesson;