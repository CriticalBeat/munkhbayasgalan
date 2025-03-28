import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter();

  const pages = [
    {name: "MONGOL API", path: "mongol/mongol"},
    {name: "CAT API", path: "cat"},
    {name: "Color", path: "color"},
    {name: "Counter", path: "counter"},
  ]
  return (  
    <div className="w-full h-233 bg-white flex justify-center items-center text-center">
      <div className='pb-40'>
      <div className='text-4xl font-bold pb-40 text-green-500/100 animate-bounce'>
        Munkhbayasgalan's corner
      </div>
      <div className='gap-6 w-full justify-center flex'>
        {pages.map(({ name,path }) => (
          <button
          key={path} 
          className='text-black border-2 h-15 w-40 rounded-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 font-bold'
           onClick={() => router.push(path)}>
          {name}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
}
