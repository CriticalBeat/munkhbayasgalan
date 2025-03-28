import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
 
const Home = () => {
    const [data, setData] = useState([]);
    const [time, setTime] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [grid, setGrid] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await fetch('https://mongol-api-rest.vercel.app/touristAttractions');
                const result1 = await res1.json();
                const res2 = await fetch('https://mongol-api-rest.vercel.app/instruments');
                const result2 = await res2.json();
                const res3 = await fetch('https://mongol-api-rest.vercel.app/historicalTools');
                const result3 = await res3.json();
                const res4 = await fetch('https://mongol-api-rest.vercel.app/ethnicGroups');
                const result4 = await res4.json();
                const res5 = await fetch('https://mongol-api-rest.vercel.app/provinces');
                const result5 = await res5.json();
                const res6 = await fetch('https://mongol-api-rest.vercel.app/historicalFigures');
                const result6 = await res6.json();
 
                setData([
                    ...result1.touristAttractions,
                    ...result2.instruments,
                    ...result3.historicalTools,
                    ...result4.ethnicGroups,
                    ...result5.provinces,
                    ...result6.historicalFigures,
                ]);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
 
    const searchFilter = (array) => {
        return array.filter(
            (e) => e.name && e.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    const filteredData = searchFilter(data);

    const navigateToDetail = (id) => {
        router.push(`/mongol/2?id=${id}`);
    };
 
    return (
        <div className="w-full bg-white">
            <div className="w-full h-96 text-black bg-center flex flex-col justify-between items-center bg-white">
                <header className="w-full h-20 flex justify-between items-center font-semibold px-30">
                    <div className="w-full flex justify-between items-center">
                        <a href="" className="">Mongolia</a>
                        <a href="" className="">Travel plans</a>
                        <a href="" className="">Dates</a>
                        <a href="" className="">Login / Signup</a>
                        <button className="bg-blue-400 hover:bg-blue-500 flex items-center transition-all ease-in-out p-3 text-black rounded-lg hover:shadow-none shadow-lg">
                            +976 9000-000
                        </button>
                    </div>
                </header>
                <div className="w-full flex justify-between items-center px-36 bg-white">
                    <p className="font-bold text-5xl font-mono">Join us to explore the wonder of Mongolia!</p>
                    <div className="w-2/5 h-20 bg-gray-100 gap-4 flex items-center justify-between p-4 border drop-shadow-xl rounded-lg">
                        <input className="w-3/5 h-full rounded text-black px-3 placeholder-gray-600 focus:outline-none" placeholder="What will be your next adventure?" type="search" onChange={(e) => setSearch(e.target.value)} />
                        <button onClick={() => setGrid(!grid)} className="w-1/5 h-full rounded bg-blue-400 hover:bg-blue-500 transition-all ease-in-out text-black font-bold">
                            TOGGLE
                        </button>
                    </div>
                </div>
            </div>
            <main className="px-36 pt-20 bg-white">
                <section className="w-full bg-white">
                    <p className="text-black font-bold text-2xl">Suggested</p>
                    {loading ? (
                        <div className="h-96 w-80 animate-pulse bg-white mt-12 p-4 text-black">Please wait.</div>
                    ) : (
                        <div className={`w-full ${grid ? "grid grid-cols-2 gap-6 bg-white" : "grid grid-cols-4 gap-6 bg-white"} mt-8`}>
                            {filteredData.length === 0 ? (
                                <div>No results found</div>
                            ) : (
                                filteredData.map((item, index) => (
                                    <div key={index} className="h-120 w-full border rounded-lg overflow-hidden shadow-xl">
                                        <img
                                            src={item.images}
                                            alt={item.name}
                                            className="w-full h-56 object-cover rounded-t-lg"
                                        />
                                        <div className="w-full h-50 p-4 grid grid-flow-col grid-rows-3 justify-between">
                                            <p className="font-semibold text-black">{item.name}</p>
                                            <p className="text-gray-600 font-thin text-sm m-4">{item.description}</p>
                                            <button
                                                className="mt-15 h-10 bg-blue-400 text-black p-2 rounded-lg hover:bg-blue-500"
                                                onClick={() => navigateToDetail(item.id)}
                                            >
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};
 
export default Home;