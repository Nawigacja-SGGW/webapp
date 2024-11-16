import './Object.scss';
import { Button } from '../../../../components/ui/Button/Button.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useCallback } from 'react';

export type ObjectProps = {
  imageUrl: string;
  name: string;
  description: string;
  addressId: number;
  key: number;
};

export const Object = ({ imageUrl, name, description, addressId, key }: ObjectProps): ReactNode => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigateToObject = useCallback(() => {
    navigate(`/home/objects/${addressId}`);
  }, []);

  return (
    <div className="object-wrapper" key={key}>
      <div className="image">
        <img src={imageUrl} alt="" />
      </div>
      <div className="details">
        <div className="name">{name}</div>
        <div className="description">{description}</div>
      </div>
      <div className="actions">
        <Button label={t('objectsOverviewPage.button.navigate')} onClick={handleNavigateToObject} />
      </div>
    </div>
  );
};
