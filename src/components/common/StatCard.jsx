function StatCard({ title, value, subtitle, valueColor }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-700">
        {title}
      </h3>

      <p className={`text-5xl font-bold mt-4 ${valueColor}`}>
        {value}
      </p>

      <p className="text-gray-500 mt-3">
        {subtitle}
      </p>
    </div>
  );
}

export default StatCard;