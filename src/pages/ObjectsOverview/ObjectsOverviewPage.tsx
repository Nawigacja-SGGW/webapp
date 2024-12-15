import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Object as ObjectComponent } from './components/Object/Object.tsx';
import { Input } from '../../components/ui/Input/Input.tsx';
import { CheckboxIcon } from './components/icons.tsx';
import { Sliders } from '@styled-icons/bootstrap/Sliders';
import { camelCase, debounce, flatten } from 'lodash';
import axios from 'axios';
import { mapObjKeys, ObjectsResponse, PlaceObject } from '../../common/model.ts';
import './ObjectsOverviewPage.scss';

export const ObjectsOverviewPage = () => {
  const { t } = useTranslation();

  const [places, setPlaces] = useState<PlaceObject[]>([]);
  const [initialPlaces, setInitialPlaces] = useState<PlaceObject[]>([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleSectionVisibility = () => {
    setIsSectionVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchObjects = async (): Promise<PlaceObject[]> => {
      try {
        const { data } = await axios.get<ObjectsResponse>('/objects');
        const mappedObject = mapObjKeys(data, camelCase);
        return flatten(Object.values(mappedObject)) as PlaceObject[];
      } catch (e) {
        throw e as Error;
      }
    };
    fetchObjects().then((data) => {
      setPlaces(data);
      setInitialPlaces(data);
    });
  }, []);

  const sortPlaces = (data: PlaceObject[], sortOrder: 'az' | 'za', searchQuery: string) => {
    const filteredData = data.filter((place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredData.sort((a, b) => {
      if (sortOrder === 'az') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  };

  const handleFilterPlaces = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPlaces(sortPlaces(initialPlaces, sortOrder, query));
  };

  const debounceFilterPlaces = debounce(handleFilterPlaces, 200);

  useEffect(() => {
    return () => debounceFilterPlaces.cancel();
  }, [debounceFilterPlaces]);

  const handleSortToggle = (type: 'az' | 'za') => {
    setSortOrder(type);
    setPlaces(sortPlaces(initialPlaces, type, searchQuery));
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
              <label onClick={() => handleSortToggle('az')}>
                <CheckboxIcon checked={sortOrder === 'az'} />
                {t('objectsOverviewPage.sort.az')}
              </label>
              <label onClick={() => handleSortToggle('za')}>
                <CheckboxIcon checked={sortOrder === 'za'} />
                {t('objectsOverviewPage.sort.za')}
              </label>
            </div>
          </div>
        </div>
      )}
      <section className="objects-list">
        {places.map((place: PlaceObject, idx) => (
          <ObjectComponent
            key={idx}
            imageUrl={place.imageUrl}
            name={place.name}
            description={place.description}
            id={place.id}
            address={place.address}
          />
        ))}
      </section>
    </PageContentWrapper>
  );
};
