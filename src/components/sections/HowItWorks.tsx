function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-500 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Browse Available Pets
            </h3>
            <p className="text-gray-600">
              Search through our database of adorable pets looking for their
              forever homes.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-500 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Apply to Adopt</h3>
            <p className="text-gray-600">
              Fill out a simple application to express your interest in adopting
              a pet.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-500 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Meet Your New Friend</h3>
            <p className="text-gray-600">
              Schedule a meet-and-greet with your potential new family member.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
