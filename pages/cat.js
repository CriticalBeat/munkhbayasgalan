import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CatGallery() {
    const [cats, setCats] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [search, setSearch] = useState("");
    const [grid, setGrid] = useState(false);
    const [selectedBreed, setSelectedBreed] = useState("");
    
    const API_URL = "https://api.thecatapi.com/v1/images/search?limit=12";
    const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";
    const API_KEY = "live_3aHNaqjSNrK3P2KSHBQsvH2dT5UZciLjwP5I1H0RtrmIMew3zAL5Nlz3IzSm2wDS";

    const router = useRouter();

    useEffect(() => {
        fetch(`${BREEDS_URL}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setBreeds(data))
            .catch(err => console.error("Error fetching breeds:", err));
    }, []);

    useEffect(() => {
        let url = `${API_URL}&api_key=${API_KEY}`;
        if (selectedBreed) {
            url = `https://api.thecatapi.com/v1/images/search?limit=12&breed_ids=${selectedBreed}&api_key=${API_KEY}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setCats(data))
            .catch(err => console.error("Error fetching cats:", err));
    }, [selectedBreed]);

    return (
        <div className="p-4 bg-white min-h-screen relative">
            <button className="absolute top-4 left-4 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition" onClick={() => router.push("/")}>Back</button>
            <p className="text-2xl font-bold text-center text-black mb-4">🐱 Cat Gallery 🐱</p>
            <div className="w-2/5 h-20 bg-gray-100 gap-4 flex items-center justify-between p-4 border drop-shadow-xl rounded-lg mx-auto">
                <input 
                    className="w-3/5 h-full rounded text-black px-3 placeholder-gray-600 focus:outline-none" 
                    placeholder="Search cats..." 
                    type="search" 
                    onChange={(e) => setSearch(e.target.value)} 
                />
                <button 
                    onClick={() => setGrid(!grid)} 
                    className="w-1/5 h-full rounded bg-blue-400 hover:bg-blue-500 transition-all ease-in-out text-black font-bold">
                    TOGGLE
                </button>
            </div>

            <div className="flex justify-center mt-4">
                <select 
                    className="p-2 border rounded bg-white text-black"
                    onChange={(e) => setSelectedBreed(e.target.value)}
                >
                    <option value="">All Breeds</option>
                    {breeds.map((breed) => (
                        <option key={breed.id} value={breed.id}>
                            {breed.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={`w-full ${grid ? "grid grid-cols-2 gap-6" : "grid grid-cols-4 gap-6"} mt-8`}>
                {cats.length === 0 ? (
                    <div className="text-center text-gray-600">No results found</div>
                ) : (
                    cats.map((cat) => (
                        <div key={cat.id} className="flex justify-center mt-4">
                            <img 
                                src={cat.url} 
                                alt="Cat" 
                                className="w-80 h-80 object-cover rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" 
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
