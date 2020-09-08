mapboxgl.accessToken =
  "pk.eyJ1IjoiYXVkaXRvcmkiLCJhIjoiY2tlcDVkaGk4MDh2NDJzbm82czg4djR5MCJ9.dH-MrlVpmgzfSkY8wdOZdA";
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 1,
  center: [4.89798, 52.37709],
});

// Fetch event from API
async function getEvent() {
  const res = await axios.get(`${window.location.href}/map-details`);

  const location = res.data;

  map.on("load", function () {
    // Add an image to use as a custom marker
    map.loadImage(
      "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
      function (error, image) {
        if (error) throw error;
        map.addImage("custom-marker", image);
        // Add a GeoJSON source with 2 points
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                // feature for Mapbox DC
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [ location.coordinates[0], location.coordinates[1] ],
                },
                properties: {
                  title: "Event",
                },
              },
            ],
          },
        });

        // Add a symbol layer
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": "custom-marker",
            // get the title name from the source's "title" property
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 1.25],
            "text-anchor": "top",
          },
        });
      }
    );
  });
}


getEvent();
