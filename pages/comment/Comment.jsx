import api from "@/utils/api";
import React, { useEffect, useState } from "react";

function Comment({ lessonId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();



  const getUserInfo = async () => {
    api
      .get("auth/me")
      .then((response) => {
        setUser(response.data);

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const getComments = async () => {
   await api
      .get(`/comments/lesson/${lessonId}`)
      .then((response) => {
        setComments(response.data);
        
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  
  const handleSubmit = async () => {
    try {
      await api.post("/comments", {
        lessonId: lessonId,
        content: newComment,
      });
      setNewComment("")
    } catch (err) {
      alert("Təyin edərkən xəta baş verdi: " + err.message);
    }
  };

  useEffect(() => {
    getComments();
    getUserInfo()
  }, [lessonId,newComment]);

  return (
    <div>
      <div className="md:flex max-sm:hidden items-center gap-3">
        <div>
          <p className="font-[700] text-[16px]">{user?.firstName} {user?.lastName}</p>
        </div>
      </div>

      <div className="md:flex flex-col gap-4 max-sm:hidden">
        <h3>Comments</h3>
        <div className="bg-[#F1ECEC] flex items-center justify-center p-7 rounded-2xl">
          <textarea
            onChange={(e) => setNewComment(e.target.value)}
            defaultValue={newComment}
            value={newComment}
            type="text"
            id=""
            placeholder="Add Comment"
            className="p-5 bg-white w-[97%] text-[16px] font-[500] rounded-xl outline-none"
          />
          <button
            onClick={() => handleSubmit()}
            className="btn bg-green-800 text-white py-4 px-8 m-3"
          >
            Add
          </button>
        </div>

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-[#F1ECEC] flex items-center justify-center p-7 rounded-2xl"
          >
            <div className="bg-white w-full flex items-center gap-4 p-2 rounded-3xl">
              <img
                src={comment.userPhoto}
                alt={comment.userName}
                className="md:w-[8%] max-sm:w-[17%]"
              />
              <div>
                <p className="font-[700] text-[12px]">{comment.user.firstName} {comment.user.lastName}</p>
                <p className="font-[300] text-[12px]">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
