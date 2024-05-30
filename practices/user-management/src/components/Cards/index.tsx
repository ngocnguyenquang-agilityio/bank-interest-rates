import { ReactNode } from 'react';

interface CardProps {
  value?: string;
  title: number | string;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Card = ({ title, value, icon, children }: CardProps) => {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4 items-center">
        {icon}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      {value && <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">{value}</p>}
      {children}
    </div>
  );
};
