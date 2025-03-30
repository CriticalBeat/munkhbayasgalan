import { useEffect, useState } from "react";

export default function CatGallery() {
    const [cats, setCats] = useState([]);
    const [search, setSearch] = useState("");
    const [grid, setGrid] = useState(false);
    const API_URL = "https://api.thecatapi.com/v1/images/search?limit=12";
    const API_KEY = "live_3aHNaqjSNrK3P2KSHBQsvH2dT5UZciLjwP5I1H0RtrmIMew3zAL5Nlz3IzSm2wDS";

    useEffect(() => {
        fetch(`${API_URL}&api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setCats(data))
            .catch(err => console.error("Error:", err));
    }, []);

    const searchFilter = (array) => {
        return array.filter(
            (e) => e.breed && e.breed.toLowerCase().includes(search.toLowerCase())
        );
    }
 
    const filteredData = searchFilter(cats);
    return (
        <div className="p-4 bg-white">
            <p className="text-2xl font-bold text-center text-black mb-4">🐱 Cat Gallery 🐱</p>
            <div className="w-2/5 h-20 bg-gray-100 gap-4 flex items-center justify-between p-4 border drop-shadow-xl rounded-lg">
                        <input className="w-3/5 h-full rounded text-black px-3 placeholder-gray-600 focus:outline-none" placeholder="Cats?" type="search" onChange={(e) => setSearch(e.target.value)} />
                        <button onClick={() => setGrid(!grid)} className="w-1/5 h-full rounded bg-blue-400 hover:bg-blue-500 transition-all ease-in-out text-black font-bold">
                            TOGGLE
                        </button>
                    </div>
            <div className={`w-full ${grid ? "grid grid-cols-2 gap-6 bg-white" : "grid grid-cols-4 gap-6 bg-white"} mt-8`}>
                            {cats.length === 0 ? (
                                <div>No results found</div>
                            ) : (
                                cats.map((cat, index) => (
                                    <div className="flex justify-center mt-20">
                        <img key={cat.id} src={cat.url} alt="" className="w-80 h-80 object-cover rounded-lg shadow-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" />
                    </div>
                                ))
                            )}
                        </div>
            </div>
    );
}