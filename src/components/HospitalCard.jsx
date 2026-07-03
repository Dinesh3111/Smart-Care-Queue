function HospitalCard({ name, location, rating }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300">

      <div className="text-5xl text-center mb-4">
        🏥
      </div>

      <h2 className="text-2xl font-bold text-blue-700 text-center">
        {name}
      </h2>

      <p className="text-gray-600 text-center mt-2">
        📍 {location}
      </p>

      <p className="text-yellow-500 text-center mt-2">
        ⭐ {rating}
      </p>

      <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
        Book Appointment
      </button>

    </div>
  );
}

export default HospitalCard;