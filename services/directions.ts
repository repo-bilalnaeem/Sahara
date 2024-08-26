const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox";

export type Coordinates = [number, number];

export async function getDirections(from: Coordinates, to: Coordinates) {
  const response = await fetch(
    `${BASE_URL}/driving/${67.066957},${24.817763};${to[0]},${
      to[1]
    }?alternatives=true&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=true&voice_instructions=true&access_token=pk.eyJ1IjoiYmlsbHUtd2hvIiwiYSI6ImNseGhpbDFseTFjYXgya3Iycmo0anIwdWMifQ.8sWurwteOb0WWeMffiUsTA`
  );
  const json = await response.json();
  return json; // Return the first route
}