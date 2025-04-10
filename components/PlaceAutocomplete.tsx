"use client";

import { useLoadScript } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PlaceAutocomplete() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: ["places"],
  });

  function handlePlaceChanged() {
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current!);
    const place = autocomplete.getPlace();

    if (!place.place_id || !place.geometry?.location) return;

    // Autocompletar los campos del negocio
    const business = {
      place_id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      phone: place.formatted_phone_number || null,
      website: place.website || null,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };

    setBusinessDetails(business);
    setLoading(true);

    supabase
      .from("businesses")
      .insert(business)
      .then(({ error }) => {
        if (error) {
          console.error(error);
          setMessage("❌ Error al guardar el negocio.");
        } else {
          setMessage("✅ Negocio guardado en Supabase.");
        }
        setLoading(false);
      });
  }

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div className="w-full max-w-xl flex flex-col gap-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a business..."
        className="border px-4 py-2 rounded-md shadow"
        onFocus={() => {
          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current!);
          autocomplete.addListener("place_changed", handlePlaceChanged);
        }}
      />
      {loading ? <p className="text-blue-600">Saving...</p> : null}
      {message && <p className="text-sm">{message}</p>}

      {businessDetails && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="font-bold">Business Details</h3>
          <p><strong>Name:</strong> {businessDetails.name}</p>
          <p><strong>Address:</strong> {businessDetails.address}</p>
          <p><strong>Phone:</strong> {businessDetails.phone}</p>
          <p><strong>Website:</strong> {businessDetails.website}</p>
        </div>
      )}
    </div>
  );
}