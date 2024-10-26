import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {IconLocation} from "./MarkerMap";

function MapView(){
    const position = [-12.075567979194808, -76.93524270695112]

    return <MapContainer attributionControl={false} center = {position} zoom = {17} touchZoom = "center" style={{ height: "400px", width: "100%", zIndex: "-9999999" }}>
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={IconLocation}>
            <Popup>
                Centro de Inspección Técnica Vehicular JP S.A.C
            </Popup>
        </Marker>
    </MapContainer>
}

export default MapView;