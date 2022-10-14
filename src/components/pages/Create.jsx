import React, { useState } from "react";
import useForm from "../../helpers/useForm";
import AjaxMethod from "../../helpers/AjaxMethod";

const { REACT_APP_URL, REACT_APP_POST_IMG } = process.env;

const Create = () => {
  const { form, changed } = useForm({});
  const [result, setResult] = useState('');
  const saveUser = async (e) => {
    e.preventDefault();
    const { data } = await AjaxMethod(REACT_APP_URL, 'POST', form);
    if (data.status === "success") {
      const imageInput = document.getElementById('image');
      if (imageInput.files[0]) {
        const formData = new FormData();
        formData.append('img', imageInput.files[0]);
        const uploadImage = await AjaxMethod(REACT_APP_POST_IMG + data.user._id, 'POST', formData, true);
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
    <div className="container-create">
      {result === 'saved' && <h4>User created successfully</h4>}
      {result === 'error' && <h4>Error creating user</h4>}
      <form onSubmit={saveUser}>
            <label htmlFor='image'>Image</label>
            <input type='file' name='img' id='image' />
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' onChange={changed} />
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={changed} />
            <label htmlFor='phone'>Phone</label>
            <input type='tel' name='phone' onChange={changed} />
            <input className="create-button" type='submit' value='Create' />
          </form>
    </div>
  );
};

export default Create;