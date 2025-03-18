import "../App.css";

interface SideBarItemProperties {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SideBarItem: React.FC<SideBarItemProperties> = ({
  label,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center px-5 py-5 ${
        isSelected ? "bg-secondary-dark" : "bg-main-dark hover:bg-nav-hover"
      }`}
      onClick={onClick}
    >
      <span className="text-xl font-bold text-main-text">{label}</span>
    </div>
  );
};
