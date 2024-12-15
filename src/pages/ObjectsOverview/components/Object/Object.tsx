import './Object.scss';
import { Button } from '../../../../components/ui/Button/Button.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useCallback } from 'react';
import { PlaceObject } from '../../../../common/model.ts';

export type ObjectProps = { key: string | number } & Pick<
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
  key,
}: ObjectProps): ReactNode => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateToObject = useCallback(() => {
    navigate(`/home/objects/${id}`);
  }, []);

  return (
    <div className="object-wrapper" key={key}>
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
