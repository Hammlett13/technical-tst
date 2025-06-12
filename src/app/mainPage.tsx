'use client'

import React from 'react';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import data from "../app/data/data.json";

const mainPage = () => {
  // Convertimos los nombres de los videos a objetos con ruta completa
  const videoItems = data.videos.video.map((filename: string) => ({
    src: `/resources/resources/${filename}`
  }));

  const videoTemplate = (item: { src: string }) => {
    return (
      <div className="flex justify-center">
        <video width="750" height="500" controls>
          <source src={item.src} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </div>
    );
  };

  return (
    <div className="card p-4">
      <Carousel
        value={videoItems}
        itemTemplate={videoTemplate}
        numVisible={1}
        numScroll={1}
        circular
        autoplayInterval={8000}
      />
    </div>
  );
};

export default mainPage;
