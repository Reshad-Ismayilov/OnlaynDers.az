import AddLesson from '@/components/addLesson/AddLesson'
import CoursesList from '@/components/dashboard/admin/CoursesList'
import api from '@/utils/api'
import React, { useEffect, useState } from 'react'

function index() {

  const [user, setUser] = useState()
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(false)

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

  useEffect(() =>{
    getUserInfo()
  },[])
  return (
    <div>
      <CoursesList />
    </div>
  )
}

export default index