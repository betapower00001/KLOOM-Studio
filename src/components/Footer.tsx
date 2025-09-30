export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-2">About Us</h3>
          <p className="text-sm text-gray-400">
            We are dedicated to providing premium tailoring services for
            everyone.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-400">📍 123 Tailor Street, NY</p>
          <p className="text-sm text-gray-400">📞 +1 (555) 333-0409</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <p className="text-sm text-gray-400">
            Facebook | Instagram | Twitter
          </p>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-6">
        © 2025 Tayler. All rights reserved.
      </p>
    </footer>
  );
}
