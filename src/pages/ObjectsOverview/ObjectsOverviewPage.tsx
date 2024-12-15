import { PageContentWrapper } from '../../layouts/PageContentWrapper/PageContentWrapper.tsx';
import { useTranslation } from 'react-i18next';
import { Place } from '../../mocks/places.ts';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Object } from './components/Object/Object.tsx';
import { Input } from '../../components/ui/Input/Input.tsx';
import { CheckboxIcon } from './components/icons.tsx';
import { Sliders } from '@styled-icons/bootstrap/Sliders';
import { ClockHistory } from '@styled-icons/bootstrap/ClockHistory';
import { ObjectHistoryModal } from '../ObjectHistoryModal/ObjectHistoryModal.tsx';
import { debounce } from 'lodash';
import './ObjectsOverviewPage.scss';

export const ObjectsOverviewPage = () => {
  const { t } = useTranslation();

  const [places, setPlaces] = useState<Place[]>([]);
  const [initialPlaces, setInitialPlaces] = useState<Place[]>([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [searchHistory, setSearchHistory] = useState<Place[]>([]);

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
    fetch('/objects')
      .then((data) => data.json())
      .then((data) => {
        setInitialPlaces(data);
        setPlaces(sortPlaces(data, sortOrder, searchQuery));
      });
  }, []);

  const sortPlaces = (data: Place[], sortOrder: 'az' | 'za', searchQuery: string) => {
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
      <ObjectHistoryModal
        isVisible={isHistoryModalVisible}
        onClose={() => setIsHistoryModalVisible(false)}
        history={searchHistory}
      />
    </PageContentWrapper>
  );
};
