export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-[url('/image-1.jpg')] bg-cover bg-center">
      <div className="bg-black/40 absolute inset-0" />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          CREATE YOUR OWN PERSONAL STYLE
        </h1>
        <button className="px-6 py-3 bg-white text-black rounded-lg">
          Discover More
        </button>
      </div>
    </section>
  );
}
