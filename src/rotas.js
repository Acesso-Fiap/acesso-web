const cache = new Map();
let nextRequest = 0;

export async function getWalkingRoute(origin, destination, signal) {
  const points = [origin, destination]
    .map(([lat, lng]) => `${lng},${lat}`)
    .join(";");
  if (cache.has(points)) return cache.get(points);
  const wait = Math.max(0, nextRequest - Date.now());
  nextRequest = Date.now() + wait + 1100;
  if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
  signal?.throwIfAborted();
  const response = await fetch(
    `https://routing.openstreetmap.de/routed-foot/route/v1/foot/${points}?overview=full&geometries=geojson`,
    { signal },
  );
  if (!response.ok)
    throw new Error("O serviço de rotas está indisponível. Tente novamente.");
  const data = await response.json();
  const route = data.routes?.[0];
  if (data.code !== "Ok" || !route?.geometry?.coordinates?.length) {
    throw new Error("Não foi encontrado um caminho a pé entre esses pontos.");
  }
  const result = {
    coordinates: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    distance: route.distance,
  };
  cache.set(points, result);
  return result;
}
