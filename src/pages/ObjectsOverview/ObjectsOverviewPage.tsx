import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useTranslation } from 'react-i18next';
import { Place } from '../../mocks/places.ts';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Object } from './components/Object/Object.tsx';
import { Input } from '../../components/ui/Input/Input.tsx';
import { Sliders } from '@styled-icons/bootstrap/Sliders';
import { debounce } from 'lodash';
import './ObjectsOverviewPage.scss';

export const ObjectsOverviewPage = () => {
  const { t } = useTranslation();

  const [places, setPlaces] = useState<Place[]>([]);
  const [initialPlaces, setInitialPlaces] = useState<Place[]>([]);

  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleSectionVisibility = () => {
    setIsSectionVisible((prev) => !prev);
  };

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

  const handleSort = (criteria: 'az' | 'za') => {
    const sortedPlaces = [...places].sort((a, b) => {
      if (criteria === 'az') {
        return a.name.localeCompare(b.name);
      }
      if (criteria === 'za') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    setPlaces(sortedPlaces);
  };

  return (
    <PageContentWrapper noHorizontalPadding noPadding>
      <div className="objects-overview-heading">
        <div className="search-container">
          <Input
            placeholder={t('objectsOverviewPage.search.placeholder')}
            onChange={debounceFilterPlaces}
            ref={inputRef}
          />
          <Sliders
            className="search-icon"
            size="20"
            onClick={toggleSectionVisibility}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      {isSectionVisible && (
        <div className="set-section">
          <div className="sort-section">
            <p className="sort-title">{t('objectsOverviewPage.sortBy')}</p>
            <div className="sort-options">
              <label>
                <input type="checkbox" onChange={() => handleSort('az')} />
                {t('objectsOverviewPage.sort.az')}
              </label>
              <label>
                <input type="checkbox" onChange={() => handleSort('za')} />
                {t('objectsOverviewPage.sort.za')}
              </label>
            </div>
          </div>
        </div>
      )}
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
