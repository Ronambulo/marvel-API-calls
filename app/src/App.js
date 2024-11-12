import './App.css';
import { useEffect, useState } from 'react';
import { MARVEL_API_URL } from './privateKeys.js';
import Card from './components/Card.jsx';

function App() {
	const [data, setData] = useState([]);
	const [favorites, setFavorites] = useState(() => {
		const savedFavorites = localStorage.getItem('favorites');
		return savedFavorites ? JSON.parse(savedFavorites) : [];
	});
	const [showFavorites, setShowFavorites] = useState(false);
	const [loading, setLoading] = useState(true); // Estado de carga

	const toggleFavorite = (id) => {
		setFavorites((prevFavorites) => {
			const updatedFavorites = prevFavorites.includes(id) ? prevFavorites.filter((favId) => favId !== id) : [...prevFavorites, id];
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
			return updatedFavorites;
		});
	};

	const toggleShowFavorites = () => {
		setShowFavorites((prevShowFavorites) => !prevShowFavorites);
	};

	function handleMoreInfo(id) {
		const comic = data.find((comic) => comic.id === id);
		console.log(comic);
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(MARVEL_API_URL);
				const jsonData = await response.json();
				setData(jsonData.data.results);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false); // Desactivar el estado de carga
			}
		};
		fetchData();
	}, []);

	const comicsToDisplay = showFavorites ? data.filter((comic) => favorites.includes(comic.id)) : data;

	return (
		<div className="min-h-screen bg-slate-800 p-7">
			<header>
				<nav className="flex justify-between items-center px-11">
					<h1 className="text-4xl font-bold text-white">🦸‍♂️ Marvel API display</h1>
					<button onClick={toggleShowFavorites} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
						{showFavorites ? 'Mostrar Todos' : 'Mostrar Favoritos'}
					</button>
				</nav>
			</header>
			<div className="flex flex-row gap-10 flex-wrap justify-center mt-12">
				{loading ? (
					<div className="flex justify-center items-center w-full h-full">
						<div className="loader"></div>
					</div>
				) : comicsToDisplay.length > 0 ? (
					comicsToDisplay.map((comic) => (
						<Card
							key={comic.id}
							comic={comic}
							handleMoreInfo={() => handleMoreInfo(comic.id)}
							isFavorite={favorites.includes(comic.id)}
							toggleFavorite={() => toggleFavorite(comic.id)}
						/>
					))
				) : (
					<div className="flex justify-center items-center w-full h-full">
						<p className="text-white text-4xl">No hay nada en favoritos</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
