import './ObjectHistoryModal.scss';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { InfoCircle } from '@styled-icons/bootstrap/InfoCircle';
import { Place } from '../../mocks/places.ts';

export const ObjectHistoryModal = ({
  isVisible,
  onClose,
  history,
}: {
  isVisible: boolean;
  onClose: () => void;
  history: Place[];
}) => {
  if (!isVisible) return null;
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

  if (!isVisible) return null;
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {history.map((item, index) => (
          <p key={index}>
            <div className="history-item">
              <img src={item.imageUrl} />
              <div>
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>{item.description}</p>
                <InfoCircle size={20} onClick={() => handleNavigateToObject(item.addressId)} />
              </div>
            </div>
          </p>
        ))}
      </div>
    </div>
  );
};
