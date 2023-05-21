export function PrevArrowSlider(props) {
  const { onClick } = props;
  return (
    <>
      <button onClick={onClick} className="w-[40px] h-[40px] bg-blue absolute -left-[2px] top-[180px] z-50 shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
        <div className="w-0 h-0 border-r-[5px] border-r-white border-t-transparent border-t-[6px] border-b-transparent border-b-[6px] relative left-[17px] top-0" />
      </button>
      <div className="w-0 h-0 border-t-[10px] border-t-blueDark border-l-transparent border-l-[10px] absolute -left-[2px] top-[calc(180px+40px)]" />
    </>
  );
}

export function NextArrowSlider(props) {
  const { onClick } = props;
  return (
    <>
      <button onClick={onClick} className="w-[40px] h-[40px] bg-blue absolute right-[7px] top-[180px] z-50 shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
        <div className="w-0 h-0 border-l-[5px] border-l-white border-t-transparent border-t-[6px] border-b-transparent border-b-[6px] relative left-[18px] top-0" />
      </button>
      <div className="w-0 h-0 border-t-[10px] border-t-blueDark border-r-transparent border-r-[10px] absolute right-[7px] top-[calc(180px+40px)]" />
    </>
  );
}
