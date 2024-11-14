import './App.css';
import md5 from 'md5'; // Si tienes instalada la librería `md5`, o puedes escribir la función manualmente
import { useEffect, useState } from 'react';
import { MARVEL_API_PUBLIC_KEY, MARVEL_API_PRIVATE_KEY } from './privateKeys.js';
import Card from './components/Card.jsx';

function App() {
	const [data, setData] = useState([]);
	const [favorites, setFavorites] = useState(() => {
		const savedFavorites = localStorage.getItem('favorites');
		return savedFavorites ? JSON.parse(savedFavorites) : [];
	});
	const [showFavorites, setShowFavorites] = useState(false);
	const [loading, setLoading] = useState(true);
	const [selectedComic, setSelectedComic] = useState(null); // Estado para el cómic seleccionado
	const [showComicInfo, setShowComicInfo] = useState(false); // Estado para mostrar/ocultar el div de información
	const [loadingCharacters, setLoadingCharacters] = useState(false); // Estado para la carga de personajes

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

	const handleMoreInfo = async (id) => {
		setLoadingCharacters(true); // Establece el estado de carga antes de buscar el cómic
		const comic = data.find((comic) => comic.id === id);

		// Hacer las peticiones de personajes
		const characterPromises = comic.characters.items.map(async (character) => {
			const characterDataURL = GET_API_PETITION(character.resourceURI);
			const response = await fetch(characterDataURL);
			const characterData = await response.json();
			return characterData.data.results[0];
		});

		const characters = await Promise.all(characterPromises);
		// Asigna los personajes a los datos del cómic después de obtenerlos
		const updatedComic = { ...comic, characters: { ...comic.characters, items: characters } };
		setSelectedComic(updatedComic); // Actualiza `selectedComic` con los personajes cargados
		setShowComicInfo(true);
		setLoadingCharacters(false); // Cambia a `false` solo cuando termina la carga
	};

	const handleCloseInfo = () => {
		setShowComicInfo(false);
		setSelectedComic(null);
	};

	function GET_API_PETITION(initialURL) {
		return initialURL + '?ts=1&apikey=' + MARVEL_API_PUBLIC_KEY + '&hash=' + md5('1' + MARVEL_API_PRIVATE_KEY + MARVEL_API_PUBLIC_KEY);
	}

	const MARVEL_API_COMICS_URL =
		'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=' +
		MARVEL_API_PUBLIC_KEY +
		'&hash=' +
		md5('1' + MARVEL_API_PRIVATE_KEY + MARVEL_API_PUBLIC_KEY);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(MARVEL_API_COMICS_URL);
				const jsonData = await response.json();
				setData(jsonData.data.results);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
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
			{showComicInfo && selectedComic && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white overflow-scroll">
					<div className="bg-gray-700 p-5 rounded relative flex flex-row w-[50%] mr-10">
						<img
							className="w-1/3 h-auto object-contain"
							src={`${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}`}
							alt={selectedComic.title}
							style={{ width: '268px', height: '408px' }}
						/>
						<div className="ml-5 pr-12">
							<h2 className="text-2xl font-bold">{selectedComic.title}</h2>
							<p className="mt-2">
								<strong>Serie:</strong> {selectedComic.series.name}
							</p>
							<strong>Personajes:</strong>
							{loadingCharacters ? (
								<div className="loader"></div> // Muestra el loader cuando `loadingCharacters` está en `true`
							) : (
								<ul className="flex flex-wrap gap-4 mt-2">
									{selectedComic.characters.items.map((character) => (
										<li key={character.id} className="flex flex-col items-center bg-gray-800 p-2 rounded-lg shadow-lg">
											<img
												src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
												alt={character.name}
												className="w-20 h-20 object-cover rounded-full mb-2"
											/>
											<p className="text-center text-sm">{character.name}</p>
										</li>
									))}
								</ul>
							)}
						</div>
						<button onClick={handleCloseInfo} className="absolute top-2 right-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
							Cerrar
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
