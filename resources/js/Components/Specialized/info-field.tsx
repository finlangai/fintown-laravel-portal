interface InfoFieldInterface {
  name: string;
  value: any;
}

export const InfoField = ({ name, value }: InfoFieldInterface) => (
  <p className="font-bold text-base text-slate-600">
    <span className="font-medium text-slate-500 text-sm">{name}: </span>
    {value}
  </p>
);
