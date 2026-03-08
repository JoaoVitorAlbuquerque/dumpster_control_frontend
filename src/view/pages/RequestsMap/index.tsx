import { useEffect, useMemo, useState } from "react";
import Map, { Layer, Marker, Popup, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { httpClient } from "../../../app/services/httpClient";

import cityGeoJson from "../../../assets/city.geojson?url";

type MapPoint = {
  id: string;
  protocol: string;
  title: string;
  lat: number;
  lng: number;
  deliveryDate?: string | null;
  activity?: string;
  priority?: string;
};

export function RequestsMap() {
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [selected, setSelected] = useState<MapPoint | null>(null);
  const [cityData, setCityData] = useState<any>(null);

  const cityFillLayer = {
    id: "city-area",
    type: "fill",
    paint: {
      "fill-color": "#2563eb",
      "fill-opacity": 0.15,
    },
  } as const;

  const cityBorderLayer = {
    id: "city-border",
    type: "line",
    paint: {
      "line-color": "#2563eb",
      "line-width": 3,
    },
  } as const;

  const token = import.meta.env.VITE_MAPBOX_TOKEN as string;

  useEffect(() => {
    (async () => {
      const res = await httpClient.get("/requests/map/delivered");
      const data = await res.data;
      setCityData(data);

      // garante number
      const normalized = (data as any[]).map((p) => ({
        ...p,
        lat: Number(p.lat),
        lng: Number(p.lng),
      }));

      setPoints(normalized);
    })();
  }, []);

  // Centraliza no primeiro ponto; se não existir, usa centro aproximado do município
  const initialViewState = useMemo(() => {
    if (points.length > 0) {
      return { latitude: points[0].lat, longitude: points[0].lng, zoom: 12 };
    }
    // Moreira Sales (ajuste se quiser)
    return { latitude: -24.06, longitude: -53.02, zoom: 11 };
  }, [points]);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Map
        mapboxAccessToken={token}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
      >
        {cityData && (
          <Source id="city" type="geojson" data={cityGeoJson}>
            <Layer {...cityFillLayer} />
            <Layer {...cityBorderLayer} />
          </Source>
        )}

        {points.map((p) => (
          <Marker
            key={p.id}
            longitude={p.lng}
            latitude={p.lat}
            anchor="bottom"
            onClick={(e: any) => {
              e.originalEvent.stopPropagation();
              setSelected(p);
            }}
          >
            {/* Pin simples */}
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "2px solid white",
                background: "red",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                cursor: "pointer",
              }}
              title={p.protocol}
            />
          </Marker>
        ))}

        {selected && (
          <Popup
            longitude={selected.lng}
            latitude={selected.lat}
            anchor="top"
            onClose={() => setSelected(null)}
            closeOnClick={false}
          >
            <div style={{ maxWidth: 240 }}>
              <div style={{ fontWeight: 700 }}>{selected.protocol}</div>
              <div style={{ fontSize: 12, marginTop: 6 }}>{selected.title}</div>
              {selected.deliveryDate && (
                <div style={{ fontSize: 12, marginTop: 6 }}>
                  Entregue em:{" "}
                  {new Date(selected.deliveryDate).toLocaleDateString("pt-BR")}
                </div>
              )}
              {selected.activity && (
                <div style={{ fontSize: 12 }}>
                  Atividade: {selected.activity}
                </div>
              )}
              {selected.priority && (
                <div style={{ fontSize: 12 }}>
                  Prioridade: {selected.priority}
                </div>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
