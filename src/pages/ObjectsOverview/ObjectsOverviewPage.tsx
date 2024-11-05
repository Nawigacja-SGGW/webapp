import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useTranslation } from 'react-i18next';
import { demo_places, Place } from '../../mocks/places.ts';
import { useState } from 'react';
import { Object } from './components/Object/Object.tsx';
import './ObjectsOverviewPage.scss';

export const ObjectsOverviewPage = () => {
  const { t } = useTranslation();

  const [places, setPlaces] = useState<Place[]>(demo_places);

  return (
    <PageContentWrapper>
      <h1>{t('objectsOverviewPage.title')}</h1>
      <div className="objects-list">
        {places.map((place: Place) => (
          <Object imageUrl={place.imageUrl} name={place.name} description={place.description} />
        ))}
      </div>
    </PageContentWrapper>
  );
};
