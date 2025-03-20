import NormalLink from "./Link";

interface ContainerCardSmallProperties {
  boldLabelA: string;
  boldLabelB?: string;
  linkText: string;
  onClick: () => void;
}

const ContainerCardSmall: React.FC<ContainerCardSmallProperties> = ({
  boldLabelA,
  boldLabelB,
  linkText,
  onClick,
}) => {
  return (
    <div className="flex flex-col max-md:w-90 md:w-xl bg-secondary-dark rounded-3xl border-[1px] border-main-blue p-4">
      <span className="text-2xl font-bold self-start">{boldLabelA}</span>
      <span className="text-2xl font-bold self-start">{boldLabelB}</span>
      <NormalLink text={linkText} onClick={onClick} />
    </div>
  );
};

export default ContainerCardSmall;
