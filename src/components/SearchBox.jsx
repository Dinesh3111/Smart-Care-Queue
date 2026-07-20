function SearchBox() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 -mt-8 relative z-10">
      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search hospital name"
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Enter location"
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
        />

        <button className="bg-blue-600 text-white rounded-xl px-6 py-3">
          Search Hospital
        </button>
      </div>
    </div>
  );
}

export default SearchBox;