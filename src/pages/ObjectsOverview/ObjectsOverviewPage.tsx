import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Object as ObjectComponent } from './components/Object/Object.tsx';
import { Input } from '../../components/ui/Input/Input.tsx';
import { CheckboxIcon } from './components/icons.tsx';
import { Sliders } from '@styled-icons/bootstrap/Sliders';
import { useLocation } from 'react-router-dom';

import { ClockHistory } from '@styled-icons/bootstrap/ClockHistory';
import { ObjectHistoryModal } from '../ObjectHistoryModal/ObjectHistoryModal.tsx';
import { camelCase, debounce } from 'lodash';
import axios from 'axios';
import {
  AreaObject,
  mapObjKeys,
  ObjectsOverviewResponseDTO,
  PlaceObject,
} from '../../common/model.ts';

import './ObjectsOverviewPage.scss';

export const ObjectsOverviewPage = () => {
  const { t } = useTranslation();
  const state = useLocation().state;
  const statePathEndChosen = state?.pathEndChosen;
  const statePoints = state?.points;
  const statePlaces = state?.places;

  const [places, setPlaces] = useState<PlaceObject[]>([]);
  const [initialPlaces, setInitialPlaces] = useState<PlaceObject[]>([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState<'az' | 'za' | 'num'>('az');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState<PlaceObject[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleSectionVisibility = () => {
    setIsSectionVisible((prev) => !prev);
  };
  const toggleHistorySearchSectionVisibility = () => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(history);
    setIsHistoryModalVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchObjects = async (): Promise<PlaceObject[]> => {
      try {
        const { data } = await axios.get<ObjectsOverviewResponseDTO>(
          `${import.meta.env.VITE_MAIN_API_URL}/objects`
        );
        return mapObjKeys(
          [...data.point_objects, ...data.area_objects],
          camelCase
        ) as PlaceObject[];
      } catch (e) {
        throw e as Error;
      }
    };
    fetchObjects().then((data) => {
      setPlaces(sortPlaces(data, 'az', searchQuery));
      setInitialPlaces(data);
    });
  }, []);

  const sortPlaces = (data: PlaceObject[], sortOrder: 'az' | 'za' | 'num', searchQuery: string) => {
    const filteredData = data.filter((place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredData.sort((a, b) => {
      if (sortOrder === 'az') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'za') {
        return b.name.localeCompare(a.name);
      } else if (sortOrder === 'num') {
        const numberA = (a as AreaObject).number ?? Number.MAX_VALUE;
        const numberB = (b as AreaObject).number ?? Number.MAX_VALUE;
        return numberA - numberB;
      }
      return 0;
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

  const handleSortToggle = (type: 'az' | 'za' | 'num') => {
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
          <div className="search-icons">
            <ClockHistory
              className="search-icon"
              size="20"
              onClick={toggleHistorySearchSectionVisibility}
              style={{ cursor: 'pointer' }}
            />
            <Sliders
              className="search-icon"
              size="20"
              onClick={toggleSectionVisibility}
              style={{ cursor: 'pointer' }}
            />
          </div>
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
              <label onClick={() => handleSortToggle('num')}>
                <CheckboxIcon checked={sortOrder === 'num'} />
                {t('objectsOverviewPage.sort.num')}
              </label>
            </div>
          </div>
        </div>
      )}
      <section className="objects-list">
        {places.map((place: PlaceObject, idx) => (
          <ObjectComponent
            key={idx}
            objKey={idx}
            imageUrl={place.imageUrl}
            name={place.name}
            description={place.description}
            id={place.id}
            address={place.address}
            statePathEndChosen={statePathEndChosen}
            statePoints={statePoints}
            statePlaces={statePlaces}
          />
        ))}
      </section>
      <ObjectHistoryModal
        isVisible={isHistoryModalVisible}
        onClose={() => setIsHistoryModalVisible(false)}
        history={searchHistory}
      />
    </PageContentWrapper>
  );
};
