"use client";

import React, { useEffect, useState } from "react";
import { Carousel } from "primereact/carousel";
import data from "./data/data.json";

const Page = () => {
  const videoItems = data.videos.video.map((filename: string) => ({
    src: `/resources/resources/${filename}`,
  }));

  const imageItems = data.images.map((filename: string) => ({
    src: `/resources/resources/${filename}`,
  }));

  const videoTemplate = (item: { src: string }) => (
    <video className="w-full" controls loop muted autoPlay playsInline>
      <source src={item.src} type="video/mp4" />
    </video>
  );

  const groupSize = 5;

  const [currentNormalGroup, setCurrentNormalGroup] = useState(0);
  const [currentSpecialGroup, setCurrentSpecialGroup] = useState(0);

  const normal = data.products.normales;
  const special = data.products.especiales;

  useEffect(() => {
    const normalInterval = setInterval(() => {
      setCurrentNormalGroup(
        (prev) => (prev + 1) % Math.ceil(normal.length / groupSize)
      );
    }, 5000);

    const specialInterval = setInterval(() => {
      setCurrentSpecialGroup((prev) => (prev + 1) % special.length);
    }, 10000);

    return () => {
      clearInterval(normalInterval);
      clearInterval(specialInterval);
    };
  }, [normal.length, special.length]);

  const normalGroup = normal.slice(
    currentNormalGroup * groupSize,
    (currentNormalGroup + 1) * groupSize
  );

  const specialProduct = special[currentSpecialGroup];

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-center p-6 gap-6">
      <div className="w-full md:w-1/3 min-h-[520px] flex flex-col justify-start">
        <h2 className="text-2xl font-bold mb-4">Productos Normales</h2>
        <ul className="flex flex-col gap-4">
          {normalGroup.map((prod, i) => (
            <li
              key={i}
              className="border p-4 rounded shadow text-center hover:shadow-lg transition-shadow"
            >
              <p className="font-semibold">{prod.product}</p>
              <p className="text-gray-700">${prod.price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <Carousel
          value={videoItems}
          itemTemplate={videoTemplate}
          numVisible={1}
          numScroll={1}
          circular
          autoplayInterval={8000}
          className="md:w-2/3"
        />
        <div className="w-full flex flex-row items-center justify-center mt-6 md:px-60">
          <div className="w-full">
            <Carousel
              value={imageItems}
              itemTemplate={(item) => (
                <img src={item.src} className="w-full h-full object-cover" />
              )}
              numVisible={1}
              numScroll={1}
              circular
              autoplayInterval={10000}
              className="md:w-[250px]"
            />
          </div>

          <div className="md:w-[500px]  p-4 border rounded-lg shadow-lg text-center flex flex-col justify-center">
            <p className="text-md md:text-lg font-bold mb-2">
              Producto Especial
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-between px-2">
              <p className="text-sm font-semibold">{specialProduct.product}</p>
              <p className="text-sm text-gray-700">
                ${specialProduct.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
