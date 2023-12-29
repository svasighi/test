'use client';

import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ userInfo }) => {
  return (
    <MapContainer
      center={[
        userInfo?.ipInfo?.country.iso_code == 'IR'
          ? 35.702163
          : userInfo?.ipInfo?.location?.latitude,
        userInfo?.ipInfo?.country.iso_code == 'IR'
          ? 51.400671
          : userInfo?.ipInfo?.location?.longitude,
      ]}
      zoom={18}
      scrollWheelZoom={false}
      className="h-[400px]">
      <TileLayer
        attribution="&copy;  contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[
          userInfo?.ipInfo?.country.iso_code == 'IR'
            ? 35.702163
            : userInfo?.ipInfo?.location?.latitude,
          userInfo?.ipInfo?.country.iso_code == 'IR'
            ? 51.400671
            : userInfo?.ipInfo?.location?.longitude,
        ]}
        pathOptions={{ color: 'red' }}
        radius={50}>
        <Popup>موقعیت مکانی برحسب ip</Popup>
      </CircleMarker>
      <Marker
        // icon={myIcon}
        position={[
          userInfo?.ipInfo?.country.iso_code == 'IR'
            ? 35.702163
            : userInfo?.ipInfo?.location?.latitude,
          userInfo?.ipInfo?.country.iso_code == 'IR'
            ? 51.400671
            : userInfo?.ipInfo?.location?.longitude,
        ]}></Marker>
    </MapContainer>
  );
};

export default Map;
