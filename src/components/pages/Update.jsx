import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useForm from "../../helpers/useForm";
import AjaxMethod from "../../helpers/AjaxMethod";

const { REACT_APP_URL, REACT_APP_POST_IMG, REACT_APP_GET_ID, REACT_APP_GET_IMG } = process.env;

const Update = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { form, changed } = useForm({});
  const [result, setResult] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {getUser()}, []);
  const getUser = async () => {
    const { data, loading } = await AjaxMethod(REACT_APP_GET_ID + id, 'GET');
    (data.status === "success") ? setUser(data.user) : navigate('/');
    setLoading(loading);
  };
  const updateUser = async (e) => {
    e.preventDefault();
    const { data } = await AjaxMethod(REACT_APP_URL + id, 'PUT', form);
    console.log(data);
    if (data.status === "success") {
      const imageInput = document.getElementById('image');
      if (imageInput.files[0]) {
        const formData = new FormData();
        formData.append('img', imageInput.files[0]);
        const uploadImage = await AjaxMethod(REACT_APP_POST_IMG + user._id, 'POST', formData, true);
        if (uploadImage.data.status === "success") {
          setResult('saved');
        } else {
          setResult('error');
        };
      } else {
        setResult('saved');
      };
    } else {
      setResult('error');
    };
  };
  return (
    <div>
      {result === 'saved' && <h4>User updated successfully</h4>}
      {result === 'error' && <h4>Error updating user</h4>}
      {
        loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={updateUser}>
            <label htmlFor='image'>Image</label>
            {
              user.image ? (
                <img src={REACT_APP_GET_IMG + user.image} alt={user.name} />
              ) : (
                <img src={REACT_APP_GET_IMG + 'default.jpg'} alt='cat default' />
              )
            }
            <input type='file' name='img' id='image' />
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' defaultValue={user.name} onChange={changed} />
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' defaultValue={user.email} onChange={changed} />
            <label htmlFor='phone'>Phone</label>
            <input type='tel' name='phone' defaultValue={user.phone} onChange={changed} />
            <input type='submit' value='Update' />
          </form>
        )
      }
    </div>
  );
};

export default Update;