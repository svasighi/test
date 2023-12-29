'use client';
import React, { useState, useRef, useEffect } from 'react';
import {} from '@neshan-maps-platform/ol';

import NeshanMap, {
  NeshanMapRef,
} from '@neshan-maps-platform/react-openlayers';

const MyMap = ({ userInfo }) => {
  const mapRef = useRef(null);

  const onInit = (map) => {
    let marker = L.marker([35.702163, 51.400671])
      .addTo(map)
      .bindPopup('موقعیت مکانی برحسب آیپی');
    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([35.702163, 51.400671])
            ),
          }),
        ],
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          color: '#BADA55',
          crossOrigin: 'anonymous',
          src: 'https://openlayers.org/en/latest/examples/data/square.svg',
        }),
      }),
    });
    var layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [
          new ol.Feature({
            geometry: new ol.geom.Point(
              ol.proj.fromLonLat([35.702163, 51.400671])
            ),
          }),
        ],
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          color: '#BADA55',
          crossOrigin: 'anonymous',
          src: 'https://openlayers.org/en/latest/examples/data/square.svg',
        }),
      }),
    });
    map.addLayer(layer);
  };

  useEffect(() => {
    if (mapRef.current?.map) {
      mapRef.current?.map.switchTrafficLayer(true);
      mapRef.current?.map.setMapType('standard-night');
    }
  }, []);

  return (
    <NeshanMap
      mapKey="web.8269ae1efaee442aac942c23eb9df7f7"
      defaultType="neshan"
      center={{
        latitude:
          userInfo?.ipInfo?.country.iso_code == 'IR'
            ? 35.702163
            : userInfo?.ipInfo?.location?.latitude,
        longitude:
          userInfo?.ipInfo?.country.iso_code == 'IR'
            ? 51.400671
            : userInfo?.ipInfo?.location?.longitude,
      }}
      style={{ height: '48vh', width: '100%' }}
      onInit={onInit}
      zoom={userInfo?.ipInfo?.country.iso_code != 'IR' ? 5 : 17}
      traffic={false}
      poi={false}></NeshanMap>
  );
};
export default MyMap;
