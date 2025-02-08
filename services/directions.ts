const BASE_URL = "https://api.mapbox.com/directions/v5/mapbox";

export type Coordinates = [number, number];

export interface RouteLeg {
  distance: number; // in meters
  duration: number; // in seconds
  steps: {
    maneuver: {
      instruction: string;
      location: Coordinates;
    };
  }[];
}

export interface Route {
  geometry: {
    coordinates: Coordinates[];
  };
  legs: RouteLeg[];
  distance: number; // in meters
  duration: number; // in seconds
}

export interface DirectionsApiResponse {
  routes: Route[];
}

export async function getDirections(
  from: Coordinates,
  to: Coordinates
): Promise<DirectionsApiResponse> {
  console.log(from, to);
  const response = await fetch(
    `${BASE_URL}/driving/${from[0]},${from[1]};${to[0]},${to[1]}?alternatives=true&annotations=distance%2Cduration&continue_straight=true&geometries=geojson&overview=full&steps=true&voice_instructions=true&access_token=pk.eyJ1IjoiYmlsbHUtd2hvIiwiYSI6ImNseGhpbDFseTFjYXgya3Iycmo0anIwdWMifQ.8sWurwteOb0WWeMffiUsTA`
  );
  const json = await response.json();
  // console.log(json);

  return json; // Return the full response for further processing
}
