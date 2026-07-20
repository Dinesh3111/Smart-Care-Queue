import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import HospitalCard from "../components/HospitalCard";
import SearchBox from "../components/SearchBox";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">
            🏥 Smart Care Queue
          </h1>

          <div className="space-x-6 hidden md:block">
           <div className="space-x-6 hidden md:block">
  <Link to="/" className="text-gray-700 hover:text-blue-600">
    Home
  </Link>

  <Link to="/login" className="text-gray-700 hover:text-blue-600">
    Login
  </Link>

  <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-lg">
    Register
  </Link>
</div>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-600 font-semibold mb-4">
            Smart Hospital Queue Management
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Avoid long hospital queues with smart token booking
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Book your token online, track live queue status, and reach the
            hospital only when your turn is near.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 text-white px-7 py-4 rounded-xl">
              Book Appointment
            </button>

            <button className="border-2 border-blue-600 text-blue-600 px-7 py-4 rounded-xl">
              View Live Queue
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="bg-blue-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">
              Live Queue Preview
            </h2>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-xl flex justify-between">
                <span>General Medicine</span>
                <b className="text-blue-600">Token 24</b>
              </div>

              <div className="bg-white p-4 rounded-xl flex justify-between">
                <span>Cardiology</span>
                <b className="text-green-600">Token 12</b>
              </div>

              <div className="bg-white p-4 rounded-xl flex justify-between">
                <span>Orthopedics</span>
                <b className="text-orange-500">Token 18</b>
              </div>
            </div>
          </div>
        </div>
      </section>
     <SearchBox />
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-4xl font-bold text-blue-700">100+</h2>
          <p className="text-gray-600 mt-2">Hospitals</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-4xl font-bold text-blue-700">10K+</h2>
          <p className="text-gray-600 mt-2">Patients Served</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-4xl font-bold text-blue-700">24/7</h2>
          <p className="text-gray-600 mt-2">Queue Support</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Why Choose Smart Care Queue?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon="🏥" title="Trusted Hospitals" description="Find nearby hospitals and book appointments easily." />
          <FeatureCard icon="🎫" title="Online Token" description="Book your hospital token before reaching the hospital." />
          <FeatureCard icon="📊" title="Live Queue" description="Track your queue position in real time." />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Popular Hospitals
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <HospitalCard name="Apollo Hospital" location="Chennai" rating="4.8" />
          <HospitalCard name="Kauvery Hospital" location="Trichy" rating="4.7" />
          <HospitalCard name="Ganga Hospital" location="Coimbatore" rating="4.9" />
        </div>
      </section>
    </div>
  );
}

export default Home;