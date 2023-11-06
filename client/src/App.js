import "./App.css";
import { useEffect, useState, useRef } from "react";
// import { Routes, Route } from "react-router-dom";
import SearchBar from "./Components/SearchBar";

function App() {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [newMovieForm, setNewMovieForm] = useState({
		title: "",
	});
	const [added, setAdded] = useState(false);
  const [deleted, setDeleted] = useState(false);
	// const [searchedMovies, setSearchedMovies] = useState([]);
	const isMounted = useRef(false);

	useEffect(() => {
		const fetchMovies = async () => {
			let res = await fetch("http://localhost:8080/");
			res = await res.json();
			setMovies(res);
		};
		fetchMovies();
	}, []);

	useEffect(() => {
		if (isMounted.current) {
			const searchedMoviesArray = [];
			const fetchSearchedMovies = async () => {
				let res = await fetch("http://localhost:8080/");
				res = await res.json();
				res.map((movie) => {
					if (movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
						searchedMoviesArray.push(movie);
				});
				setMovies(searchedMoviesArray);
			};
			fetchSearchedMovies();
		} else isMounted.current = true;
	}, [searchTerm, added, deleted]);

	const handleChange = (e) => {
		setNewMovieForm((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleNewMovie = (e) => {
		e.preventDefault();
		const newMovie = {
			title: newMovieForm.title,
		};
		const createNewMovie = async () => {
			await fetch("http://localhost:8080/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newMovie),
			});
		};
		createNewMovie();

		// const fetchMovies = async () => {
		//   let res = await fetch('http://localhost:8080/');
		//   res = await res.json();
		// }
		// fetchMovies();

		// const addNewMovie = async () => {
		// 	await fetch("http://localhost:8080/", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	});
		// };
		// addNewMovie();
		setAdded((prev) => !prev);
	};

	const handleDelete = (movie) => {
		const removeMovie = async () => {
			await fetch("http://localhost:8080/", {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
				},
        body: JSON.stringify(movie)
			});
		};
		removeMovie();
		setDeleted((prev) => !prev);
	};

	return (
		<div className="App">
			<header className="App-Header">
				<p>
					The Best Damn Movie List You'll Ever See on this Side of the Galaxy
				</p>
			</header>
			<SearchBar setSearchTerm={setSearchTerm} />
			{movies.map((movie) => (
				<ul>{movie.title}<button onClick={(e) => handleDelete(movie)}>
        Remove
      </button></ul>
			))}
			<div>
				<h4>Add movie</h4>
				<form>
					<div>
						<label htmlFor="name">
							<strong>NAME</strong>
						</label>
						<br />
						<input
							className="Login-form-field"
							type="text"
							placeholder="Enter the weapon name"
							id="name"
							//   value={}
							aria-describedby="inputGroupPrepend2"
							required
							onChange={handleChange}
						/>
					</div>
					<button type="submit" onClick={handleNewMovie}>
						SUBMIT
					</button>
				</form>
			</div>
		</div>
	);
}

export default App;
