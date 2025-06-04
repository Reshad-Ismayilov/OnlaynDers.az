import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api";

const UserStatisticsTable = () => {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();


  const getUserStatistic = async () => {
    try {
      const response = await api.get("user-progress/user-statistics");
      setStatistics(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        router.push("/");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  

    getUserStatistic();
  }, []);

  if (loading) return <p className="text-center text-lg font-semibold">Yüklənir...</p>;
  if (error) return <p className="text-center text-red-500">Xəta baş verdi: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        📊 İstifadəçi Statistikaları
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Kurs Adı</th>
              <th className="p-3 text-left">Dərs Adı</th>
              <th className="p-3 text-left">Son Baxış Vaxtı</th>
              <th className="p-3 text-left">% Baxış</th>
              <th className="p-3 text-left">Son Baxış Tarixi</th>
            </tr>
          </thead>
          <tbody>
            {statistics.map((stat, index) => (
              <tr
                key={index}
                className="border-b transition hover:bg-gray-100"
              >
                <td className="p-3">{stat.email}</td>
                <td className="p-3">{stat.courseName || "—"}</td>
                <td className="p-3">{stat.lessonName}</td>
                <td className="p-3">{stat.lastWatchedTime.toFixed(2)} saniyə</td>
                <td className="p-3 font-semibold text-blue-600">
                  {stat.watchedPercentage.toFixed(2)}%
                </td>
                <td className="p-3">
                  {new Date(stat.lastWatchedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserStatisticsTable;
