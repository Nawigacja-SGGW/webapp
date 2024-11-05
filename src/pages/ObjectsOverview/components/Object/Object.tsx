import './Object.scss';

export type ObjectProps = {
  imageUrl: string;
  name: string;
  description: string;
};
export const Object = ({ imageUrl, name, description }: ObjectProps) => {
  return (
    <div className="object-wrapper">
      <div className="image">
        <img src={imageUrl} alt="" />
      </div>
      <div className="name">{name}</div>
      <div className="description">{description}</div>
    </div>
  );
};
