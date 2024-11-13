import { useParams } from 'react-router-dom';
import { demo_places, Place } from '../../mocks/places.ts';
import { useEffect, useState } from 'react';
import { TextObject } from './components/TextObject.tsx';

import './ObjectDetails.scss';

export const ObjectDetails = () => {
  const { id } = useParams();
  const [placeData, setPlaceData] = useState<Place>();

  useEffect(() => {
    if (
      !Number.isFinite(Number(id)) ||
      (Number.isFinite(Number(id)) &&
        !demo_places.find((place) => place.addressId === parseInt(id!)))
    ) {
      console.log('invalid param');
    } else {
      setPlaceData(demo_places.find((place) => place.addressId === parseInt(id!)));
    }
  }, [placeData?.addressId, id]);

  return (
    <div>
      <div className="image">
        <img src={placeData?.imageUrl} alt="" />
      </div>
      <div className="details">
        <div>
          <TextObject
            title="Dziekanat Wydziału Zastosowań Informatyki i Matematyki"
            link="https://student.wzim.sggw.pl/"
            address="ul. Nowoursynowska 159"
            city="02-776 Warszawa"
            buildingInfo="Budynek 34, III piętro, pokój 3/35 i 3/36 B"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum leo quis lectus commodo, sit amet pellentesque leo scelerisque. Sed quis orci quis leo tempor finibus. Fusce fringilla, dui nec mollis faucibus, enim sapien gravida risus, eu tempor metus sapien ut nibh. Cras id nunc nec ligula tempor ultrices nec nec neque. Curabitur elit justo, ultrices sed orci sit amet, scelerisque maximus est. Nunc egestas metus libero, in accumsan diam bibendum a. Cras malesuada metus justo, in malesuada nulla faucibus eget. Nam iaculis mauris non nibh volutpat, sit amet molestie lorem condimentum. Duis egestas mauris ut scelerisque iaculis. Ut suscipit in risus at finibus. Etiam congue magna id lorem dignissim, at lobortis ante semper. Nunc lacinia ullamcorper libero eget euismod. Sed in lacus volutpat, ultrices lorem et, varius erat. Phasellus laoreet diam vitae ante pellentesque hendrerit."
          />
        </div>
        <div>
          <div className="map"></div>
        </div>
      </div>
    </div>
  );
};
