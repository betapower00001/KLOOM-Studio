export default function Blog() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Latest News</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((post) => (
            <div
              key={post}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={`/blog${post}.jpg`}
                alt="Blog"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  How to Choose the Best Suit
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn how to select the perfect tailored suit for any
                  occasion.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
