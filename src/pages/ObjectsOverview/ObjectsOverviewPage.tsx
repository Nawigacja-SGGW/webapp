import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useTranslation } from 'react-i18next';
import { Place } from '../../mocks/places.ts';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Object } from './components/Object/Object.tsx';
import { Input } from '../../components/ui/Input/Input.tsx';
import { debounce } from 'lodash';

import './ObjectsOverviewPage.scss';

export const ObjectsOverviewPage = () => {
  const { t } = useTranslation();

  const [places, setPlaces] = useState<Place[]>([]);
  const [initialPlaces, setInitialPlaces] = useState<Place[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch('/objects')
      .then((data) => data.json())
      .then((data) => {
        setPlaces(data);
        setInitialPlaces(data);
      });
  }, []);

  const handleFilterPlaces = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current && (inputRef.current as HTMLInputElement).value === '') {
      setPlaces(initialPlaces);
    } else {
      const filteredPlaces = initialPlaces.filter((place) =>
        place.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setPlaces(filteredPlaces);
    }
  };

  const debounceFilterPlaces = debounce(handleFilterPlaces, 200);

  useEffect(() => {
    return () => debounceFilterPlaces.cancel();
  }, [debounceFilterPlaces]);

  return (
    <PageContentWrapper noHorizontalPadding noPadding>
      <div className="objects-overview-heading">
        <Input
          placeholder={t('objectsOverviewPage.search.placeholder')}
          onChange={debounceFilterPlaces}
          ref={inputRef}
        />
      </div>
      <section className="objects-list">
        {places.map((place: Place, idx) => (
          <Object
            key={idx}
            imageUrl={place.imageUrl}
            name={place.name}
            description={place.description}
            addressId={place.addressId}
          />
        ))}
      </section>
    </PageContentWrapper>
  );
};
