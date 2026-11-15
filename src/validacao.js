export const reportTypes = [
  "Calçada e travessia",
  "Entrada do local",
  "Banheiro",
  "Comunicação e cardápio",
  "Outro recurso",
];
export function today() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
}
export function validateReport(data) {
  const errors = {};
  if (!["masp", "trianon", "shopping"].includes(data.placeId))
    errors.placeId = "Escolha um dos locais do projeto.";
  if (!reportTypes.includes(data.type))
    errors.type = "Selecione o tipo de observação.";
  if (!data.description || data.description.trim().length < 15)
    errors.description = "Descreva a observação com pelo menos 15 caracteres.";
  if (data.description?.length > 600)
    errors.description = "Use no máximo 600 caracteres.";
  const parsedDate = new Date(data.observedAt);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(data.observedAt || "") ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== data.observedAt ||
    data.observedAt > today()
  )
    errors.observedAt = "Informe uma data válida, até hoje.";
  return errors;
}
export function filterPlaces(places, query, category, selectedFeatures) {
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  return places.filter(
    (place) =>
      normalize(`${place.name} ${place.address}`).includes(normalize(query)) &&
      (category === "Todos" || place.category === category) &&
      selectedFeatures.every(
        (feature) => place.resources[feature] === "institution",
      ),
  );
}
