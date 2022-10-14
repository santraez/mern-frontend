import React, { useState } from "react";
import AjaxMethod from "../../helpers/AjaxMethod";
import UserCard from "../layout/UserCard";

const { REACT_APP_SEARCH } = process.env;

const Search = () => {
	const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (e) => {
		e.preventDefault();
		const inputValue = e.target.browser.value;
		if (inputValue.length >= 1) {
			setLoading(true);
			const { data, loading } = await AjaxMethod(REACT_APP_SEARCH + inputValue, 'GET');
			(data.status === "success") ? setUsers(data.users) : setUsers([]);
			setLoading(loading);
		}	else {
			setUsers([]);
		};
  };
	return (
		<div className="container-search">
			<form onSubmit={handleSearch}>
				<input name="browser" type="text" placeholder="Search" />
				<input type="submit" value="search" />
			</form>
			{
        loading ? (
          <p>Loading...</p>
        ) : (
          users.length >= 1 ? <UserCard users={users} setUsers={setUsers} /> : <h3>No users found</h3>
        )
      }
		</div>
	);
}

export default Search;