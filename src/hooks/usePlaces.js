import { useState } from "react";
import { places } from "../dados";
import { filterPlaces } from "../validacao";
export function usePlaces() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const filtered = filterPlaces(places, query, category, selectedFeatures);
  const toggleFeature = (id) =>
    setSelectedFeatures((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id],
    );
  const reset = () => {
    setQuery("");
    setCategory("Todos");
    setSelectedFeatures([]);
  };
  return {
    query,
    setQuery,
    category,
    setCategory,
    selectedFeatures,
    toggleFeature,
    filtered,
    reset,
  };
}
