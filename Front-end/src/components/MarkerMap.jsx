import L from "leaflet";
import markerIcon from "/images/marker.png";

export const IconLocation = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "Leaflet-venue-icon",
});
