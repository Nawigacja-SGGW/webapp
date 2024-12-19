import './Object.scss';
import { Button } from '../../../../components/ui/Button/Button.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useCallback } from 'react';
import { PlaceObject } from '../../../../common/model.ts';

export type ObjectProps = { objKey: string | number } & Pick<
  PlaceObject,
  'imageUrl' | 'name' | 'description' | 'address' | 'id'
>;
export const Object = ({
  imageUrl,
  name,
  description,
  id,
  //@ts-ignore
  address,
  objKey,
}: ObjectProps): ReactNode => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateToObject = useCallback(() => {
    const rawSearchHistory = localStorage.getItem('searchHistory');
    const searchHistory = rawSearchHistory ? JSON.parse(rawSearchHistory) : [];
    const newObject = {
      imageUrl,
      name,
      description,
      id,
    };
    const updatedHistory = [
      newObject,
      ...searchHistory.filter((item: ObjectProps) => item.id !== id),
    ];
    const maxHistoryItems = 5;
    if (updatedHistory.length > maxHistoryItems) {
      updatedHistory.pop();
    }
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    navigate(`/home/objects/${id}`);
  }, []);

  return (
    <div className="object-wrapper" key={objKey}>
      <div className="object-wrapper-details">
        <div className="object-wrapper-image">
          <img src={imageUrl || ''} alt="" />
        </div>
        <div className="object-wrapper-data">
          <div className="name">{name}</div>
          <div className="description">{description}</div>
        </div>
      </div>
      <div className="actions">
        <Button label={t('objectsOverviewPage.button.navigate')} onClick={handleNavigateToObject} />
      </div>
    </div>
  );
};
