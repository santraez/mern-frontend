import React, { useState, useEffect } from "react";
import AjaxMethod from "../../helpers/AjaxMethod";
import UserCard from "../layout/UserCard";

const { REACT_APP_URL } = process.env;

const Read = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {getUsers()}, []);
  const getUsers = async () => {
    const { data, loading } = await AjaxMethod(REACT_APP_URL, 'GET');
    if (data.status === "success") setUsers(data.users);
    setLoading(loading);
  };
  return (
    <div className="container-read">
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          users.length >= 1 ? <UserCard users={users} setUsers={setUsers} /> : <h3>No users found</h3>
        )
      }
    </div>
  );
};

export default Read;