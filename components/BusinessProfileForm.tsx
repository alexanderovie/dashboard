'use client';

import { useState, useEffect } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const BusinessProfileForm = () => {
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadScript = (url: string) => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      };

      loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`);
    }
  }, []);

  useEffect(() => {
    const autocompleteInput = document.getElementById('address') as HTMLInputElement;

    if (autocompleteInput && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput, {
        types: ['geocode'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setAddress(place.formatted_address || "");
          // Puedes manejar más detalles aquí si los necesitas, como latitud y longitud
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Aquí, puedes agregar la lógica para enviar los datos a tu backend o almacenarlos en la base de datos
    // Ejemplo con Supabase:
    // const { data, error } = await supabase.from('businesses').insert([
    //   { name: businessName, address, phone, website, category, description }
    // ]);

    // Resetear el formulario después del envío (opcional)
    setBusinessName("");
    setAddress("");
    setPhone("");
    setWebsite("");
    setCategory("");
    setDescription("");
    setIsSubmitting(false);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Create Your Business Profile
      </h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
        Fill in the details below to set up your Google business profile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Campo para el nombre del negocio */}
        <div>
          <label htmlFor="businessName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Enter your business name"
            required
          />
        </div>

        {/* Campo para la dirección (autocompletado) */}
        <div>
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Start typing your business address"
            required
          />
        </div>

        {/* Campo para el teléfono */}
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Campo para el sitio web */}
        <div>
          <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Website
          </label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Enter your business website"
          />
        </div>

        {/* Campo para la categoría */}
        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Enter the business category"
          />
        </div>

        {/* Campo para la descripción */}
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Business Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Provide a brief description of your business"
            required
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Submitting..." : "Submit Business Profile"}
        </button>
      </form>
    </section>
  );
};

export default BusinessProfileForm;