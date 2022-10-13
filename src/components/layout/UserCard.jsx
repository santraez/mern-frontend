import React from "react";
import { Link } from "react-router-dom";
import AjaxMethod from "../../helpers/AjaxMethod";

const { REACT_APP_URL, REACT_APP_GET_IMG } = process.env;

const UserCard = ({ users, setUsers }) => {
  const handleDelete = async (id) => {
    const { data } = await AjaxMethod(REACT_APP_URL + id, "DELETE");
    if (data.status === "success") {
      const newUsers = users.filter((user) => user._id !== id);
      setUsers(newUsers);
    };
  };
  return (
    users.map((user) => {
      return (
        <article key={user._id}>
          {
            user.image ? (
              <Link to={`/user/${user._id}`}>
                <img src={REACT_APP_GET_IMG + user.image} alt={user.name} />
              </Link>
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
      );
    })
  );
};

export default UserCard;