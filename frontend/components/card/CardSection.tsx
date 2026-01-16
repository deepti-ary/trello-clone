import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

export default function CardSection({ icon, title, children }: Props) {
  return (
    <div className="flex gap-3 mb-6">
      <div className="text-gray-600 mt-1">{icon}</div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
