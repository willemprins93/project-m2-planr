mapboxgl.accessToken =
  "pk.eyJ1IjoiYXVkaXRvcmkiLCJhIjoiY2tlcDVkaGk4MDh2NDJzbm82czg4djR5MCJ9.dH-MrlVpmgzfSkY8wdOZdA";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 12,
  center: [4.89798, 52.37709]
});


// Fetch event from API
async function getEvent() {
  const res = await fetch(`${window.location.origin}/events/:id`);
  const data = await res.json();
  console.log("CRAZY MAP");
  const event = data.data.map((event) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          event.location.coordinates[0],
          event.location.coordinates[1],
        ],
      },
      properties: {
        eventId: event.eventId,
        icon: "shop",
      },
    };
  });

  loadMap(events);
}

// Load map with eve
function loadMap(event) {
  map.on("load", function () {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: event,
        },
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{eventId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top",
      },
    });
  });
}

getEvent();

// const getEvents = () => {
//     axios
//       .get()
//       .then(response => {
//         const data = response.data;
//         console.log(data);

//       })
//       .catch(err => console.log(`Error while getting the list of characters: ${err}`));
//   };
//   getEvents();
