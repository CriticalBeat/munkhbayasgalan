import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ItemDetail() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { query, back } = useRouter();
  const { id } = query;

  useEffect(() => {
    if (id) {
      console.log("Fetched ID:", id);

      const fetchItem = async () => {
        try {
          const endpoints = [
            "touristAttractions",
            "instruments",
            "historicalTools",
            "ethnicGroups",
            "provinces",
            "historicalFigures",
            "clothes",
          ];

          let foundItem = null;

          for (let endpoint of endpoints) {
            const response = await fetch(`https://mongol-api-rest.vercel.app/${endpoint}`);
            if (!response.ok) continue;

            const result = await response.json();
            foundItem = result[endpoint]?.find((item) => item.id === id);
            if (foundItem) break;
          }

          if (!foundItem) {
            setError("Item not found.");
            return;
          }

          setItem(foundItem);
        } catch (err) {
          console.error("Error", err);
          setError("An error occurred.");
        } finally {
          setLoading(false);
        }
      };

      fetchItem();
    } else {
      setError("Item ID is missing. Please check the URL.");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-200">
        <div className="text-blue-500 animate-spin rounded-full border-t-4 border-b-4 border-blue-600 w-12 h-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg"
          onClick={() => back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <button
        className="px-6 py-2 border-2 rounded-lg bg-white font-bold text-black hover:bg-zinc-200 transition duration-300 shadow-lg mb-6"
        onClick={() => back()}
      >
        Back
      </button>

      <div className="bg-white border-2 border-black p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-black mb-10 drop-shadow-lg">
          {item.name}
        </h1>

        {item.images && (
          <img
            src={item.images}
            alt={item.name}
            className="w-full h-72 object-contain mb-10"
          />
        )}

        <p className="text-gray-700 text-lg mb-4">{item.description}</p>

        {item.address?.country && (
          <p className="text-black text-xl font-semibold">
            Country of Origin: <span className="font-bold">{item.address.country}</span>
          </p>
        )}
      </div>
    </div>
  );
}