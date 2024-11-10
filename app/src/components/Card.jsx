import { FaStar } from 'react-icons/fa';

export default function Card({ comic, isFavorite, toggleFavorite }) {
	return (
		<div className="relative bg-gray-800 shadow-lg rounded-lg overflow-hidden w-80 h-[520px] transform transition-transform duration-200 hover:scale-105 cursor-pointer border-4 border-gray-600 group">
			<div className="w-full h-80 overflow-hidden">
				<img className="w-full h-full object-cover" src={comic.thumbnail.path + '.' + comic.thumbnail.extension} alt={comic.title} />
			</div>
			<div className="p-4 bg-gray-700 flex flex-col justify-between h-[195px]">
				<h2 className="text-white text-lg font-bold mb-2 text-center">{comic.title}</h2>
				<p className="text-gray-400 text-sm text-center">{comic.modified}</p>
				<p className="text-gray-200 text-sm text-center">{`Price: ${comic.prices[0].price} USD`}</p>
				<button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700">Saber más</button>
			</div>
			<button
				onClick={toggleFavorite}
				className={`absolute top-2 right-2 text-2xl transition-opacity duration-200 ${
					isFavorite ? 'text-yellow-400 opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'
				}`}
			>
				<FaStar />
			</button>
		</div>
	);
}
