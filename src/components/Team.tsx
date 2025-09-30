export default function Team() {
  return (
    <section className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-10">Meet the Taylors</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {["Robert", "Kevin", "Mike"].map((name, i) => (
          <div key={i} className="p-6 bg-white shadow rounded-lg">
            <img
              src={`/team${i + 1}.jpg`}
              alt={name}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-600">Expert Tailor</p>
          </div>
        ))}
      </div>
    </section>
  );
}
