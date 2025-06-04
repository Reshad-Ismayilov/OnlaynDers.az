import { API_URL } from "@/app/apiconfig";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Index() {
  const [sections, setSections] = useState([]);
   const { t, i18n } = useTranslation("common");

  useEffect(() => {
     const currentLang = i18n.language || 'az'; // Default dili 'az' olaraq müəyyən et
    // Fetch "About" section data
    const fetchAboutData = async (lang) => {
      try {
        const response = await fetch(`${API_URL}/about/get/${lang}`);
        const data = await response.json();
        const aboutSection = {
          title: data.title, // Assuming the data structure contains this
          text: data.description,
          image: data.photoUrl, // This could be dynamically set if the data includes an image URL
        };

        // Fetch "Innovation" section data
        const responseInnovation = await fetch(`${API_URL}/innovation/get/${lang}`);
        const dataInnovation = await responseInnovation.json();
        const innovationSection = {
          title: dataInnovation.title,
          text: dataInnovation.description,
          image: dataInnovation.photoUrl, // Same as above, replace with actual image URL if available
        };

        // Fetch "Mission" section data
        const responseMission = await fetch(`${API_URL}/mission/get/${lang}`);
        const dataMission = await responseMission.json();
        const missionSection = {
          title: dataMission.title,
          text: dataMission.description,
          image: dataMission.photoUrl, // You can change this if the API provides an image URL
        };

        // Set both sections to the state
        setSections([aboutSection, missionSection, innovationSection]);
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchAboutData(currentLang);
  }, [i18n.language]);

  return (
    <>
      <Head>
        <title>Salestar - {t('about')}</title>
        <meta name="description" content="Sizin sayt təsviri" />
      </Head>
      <div className="max-w-5xl mx-auto px-6 py-24 space-y-10">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-8`}
          >
            <div className="flex-1 relative">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                {section.title}
              </h2>
              <div className="flex absolute top-0 -z-10">
                <img src="/aboutImg/red.svg" alt="Decor" className="h-12" />
                <img src="/aboutImg/blue.svg" alt="Decor" className="h-12" />
              </div>
              <p className="mt-4 text-gray-600">{section.text}</p>
            </div>
            <div className="flex-1">
              <img src={section.image} alt={section.title} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Index;
