import './TextObject.scss';

export type ObjectProps = {
  title: string;
  link: string;
  address: string;
  city: string;
  buildingInfo: string;
  description: string;
};

export const TextObject: React.FC<ObjectProps> = ({
  title,
  link,
  address,
  city,
  buildingInfo,
  description,
}) => {
  return (
    <div className="content">
      <h3>
        <a href={link}>{title}</a>
      </h3>
      <p className="address">
        <span>{address}</span>
        <span>{city}</span>
        <span>{buildingInfo}</span>
      </p>
      <hr />
      <p className="description">{description}</p>
    </div>
  );
};
