function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center">
      <div className="text-5xl mb-4">{icon}</div>

      <h2 className="text-xl font-bold text-blue-700">
        {title}
      </h2>

      <p className="text-gray-600 mt-3">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;