import FeatureCard from "../components/FeatureCard";
import HospitalCard from "../components/HospitalCard";

function Home() {
  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🏥 Smart Care Queue</h1>

          <div className="space-x-6">
            <button className="text-gray-700 hover:text-blue-600">Home</button>
            <button className="text-gray-700 hover:text-blue-600">Login</button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">Register</button>
          </div>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center mt-28 px-6">
        <h1 className="text-6xl font-bold text-blue-700">Smart Care Queue</h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          Book hospital appointments online and avoid waiting in long queues.
          Experience a smarter healthcare journey.
        </p>

        <div className="mt-10 flex gap-6">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-xl">Book Appointment</button>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl">Live Queue</button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-24 px-6 pb-20">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
          Why Choose Smart Care Queue?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard icon="🏥" title="Trusted Hospitals" description="Find nearby hospitals and book appointments easily." />
          <FeatureCard icon="🎫" title="Online Token" description="Book your hospital token before reaching the hospital." />
          <FeatureCard icon="📊" title="Live Queue" description="Track your queue position in real time." />
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-20 px-6">
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