export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-black">
      <div className="flex items-center gap-10">
      <div className="flex flex-col items-center">
        <div className="text-6xl bg-gradient-to-b from-green-500 to-gray-300 bg-clip-text text-transparent">
          Connect to the World
        </div>
        <button type="button" className="w-1/5 mt-10 h-10 border border-green-500 bg-green-500 rounded-md cursor-pointer">
          Lets Chat
        </button>
      </div>
      <div className="flex flex-col items-center">
      </div>
    </div> 
    </main>
  )
}
