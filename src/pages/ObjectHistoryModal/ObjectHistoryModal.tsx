import './ObjectHistoryModal.scss';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { InfoCircle } from '@styled-icons/bootstrap/InfoCircle';
import { PlaceObject } from '../../common/model.ts';
import { useTranslation } from 'react-i18next';

export const ObjectHistoryModal = ({
  isVisible,
  onClose,
  history,
}: {
  isVisible: boolean;
  onClose: () => void;
  history: PlaceObject[];
}) => {
  if (!isVisible) return null;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const handleNavigateToObject = useCallback(
    (address: number) => {
      navigate(`/home/objects/${address}`);
    },
    [navigate]
  );
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {history.length === 0 ? (
          <div className="history-item">{t('objectHistoryModal.noHistory')}</div>
        ) : (
          history.map((item, index) => (
            <div className="history-item" key={index}>
              <div className="history-item-data">
                {item.imageUrl ? (
                  <img src={item.imageUrl} />
                ) : (
                  <div className="history-item-image-placeholder"></div>
                )}
                <div className="history-item-info">
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>{item.description}</p>
                </div>
              </div>
              <InfoCircle size={25} onClick={() => handleNavigateToObject(item.id)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
