import ICardProp from "../interfaces/ICardProp";

export default function Card({
  onClick,
  className,
  id,
  isBottomCard = false,
  cardIcon = "🤔",
  cardLabel = "",
  disabled = false,
}: ICardProp) {
  return (
    <>
      <div>
        <div
          onClick={!disabled && onClick}
          id= {id}
          
          className={`card w-auto p-1 rounded-sm   border-cyan-950 ${disabled && isBottomCard?"bg-gray-400 cursor-not-allowed":" bg-base-200 hover:bg-slate-200 cursor-pointer"} card-bordered ${className}`}
        >
          {!isBottomCard && <div className="card-body p-4">{cardIcon}</div>}

          <div
            className={`card-action text-sm font-medium m-auto  ${
              isBottomCard && "py-5 px-2 font-semibold"
            }`}
          >
            {cardLabel}
          </div>
        </div>
      </div>
    </>
  );
}
