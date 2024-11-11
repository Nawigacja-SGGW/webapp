import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useTranslation } from 'react-i18next';
import { demo_places, Place } from '../../mocks/places.ts';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Object } from './components/Object/Object.tsx';
import { Input } from '../../components/ui/Input/Input.tsx';
import { debounce } from 'lodash';

import './ObjectsOverviewPage.scss';

export const ObjectsOverviewPage = () => {
  const { t } = useTranslation();

  const [places, setPlaces] = useState<Place[]>(demo_places);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFilterPlaces = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current && (inputRef.current as HTMLInputElement).value === '') {
      setPlaces(demo_places);
    } else {
      const filteredPlaces = demo_places.filter((place) =>
        place.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setPlaces(filteredPlaces);
    }
  };

  const debounceFilterPlaces = debounce(handleFilterPlaces, 500);

  useEffect(() => {
    return () => debounceFilterPlaces.cancel();
  }, [debounceFilterPlaces]);

  return (
    <PageContentWrapper noHorizontalPadding>
      <div className="objects-overview-heading">
        <h1>{t('objectsOverviewPage.title')}</h1>
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
