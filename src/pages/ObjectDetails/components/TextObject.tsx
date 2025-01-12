import './TextObject.scss';
import { useAppStore } from '../../../store';

export interface Address {
  city: string;
  city_eng: string;
  id: number;
  postal_code: string;
  street: string;
}

export interface TextObjectProps {
  title: string;
  link: string;
  address: Address;
  buildingInfo: string;
  description: string;
}

export const TextObject = ({
  title,
  link,
  address,
  buildingInfo,
  description,
}: TextObjectProps) => {
  const language = useAppStore((state) => state.preferences.language);

  return (
    <div className="content">
      <h3>
        <a href={link}>{title}</a>
      </h3>
      <p className="address">
        <span>{address.street}</span>
        <span>
          {address.postal_code}, {language === 'en' ? address.city_eng : address.city}
        </span>
        <span>{buildingInfo}</span>
      </p>
      <hr />
      <p className="description">{description}</p>
    </div>
  );
};
