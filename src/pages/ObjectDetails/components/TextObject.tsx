import './TextObject.scss';

export type TextObjectProps = {
  title: string;
  link: string;
  address: string;
  city: string;
  buildingInfo: string;
  description: string;
};

export const TextObject = ({
  title,
  link,
  address,
  city,
  buildingInfo,
  description,
}: TextObjectProps) => {
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
