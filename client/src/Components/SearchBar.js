import { React, useRef } from "react";
// import { useNavigate } from "react-router-dom";

const SearchBar = ({ setSearchTerm }) => {
	let inputRef = useRef("");
	// const navigate = useNavigate();

	const search = (e) => {
		e.preventDefault();
		setSearchTerm(inputRef.current.value);
		// navigate('/');
		inputRef.current.value = "";
		};

	return (
		<>
			<form>
				<input
					className="searchInput"
					type="text"
					id="searchBar"
					ref={inputRef}
					placeholder="Search for a movie"
				/>
				<button className="searchButton" type="submit" onClick={search} />
			</form>
		</>
	);
};

export default SearchBar;
