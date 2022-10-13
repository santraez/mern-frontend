import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AjaxMethod from "../../helpers/AjaxMethod";

const { REACT_APP_URL, REACT_APP_GET_ID, REACT_APP_GET_IMG } = process.env;

const User = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {getUser()}, []);
  const getUser = async () => {
    const { data, loading } = await AjaxMethod(REACT_APP_GET_ID + id, 'GET');
    (data.status === "success") ? setUser(data.user) : navigate('/');
    setLoading(loading);
  };
  const handleDelete = async (id) => {
    const { data } = await AjaxMethod(REACT_APP_URL + id, "DELETE");
    if (data.status === "success") navigate('/read');
  };
  return (
    <div>
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          user ? (
            <article>
              {
                user.image ? (
                  <img src={REACT_APP_GET_IMG + user.image} alt={user.name} />
                ) : (
                  <img src={REACT_APP_GET_IMG + 'default.jpg'} alt='cat profile' />
                )
              }
              <h3>{user.name}</h3>
              <h3>{user.email}</h3>
              <h3>{user.phone}</h3>
              <h3>{user.date}</h3>
              <Link to={`/update/${user._id}`}><button>Edit</button></Link>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </article>
          ) : (
            <h3>No user found</h3>
          )
        )
      }
    </div>
  );
};

export default User;