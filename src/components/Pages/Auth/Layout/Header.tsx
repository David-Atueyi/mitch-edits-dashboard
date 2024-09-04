export const Header = () => {
  return (
    <div className="w-full flex justify-center items-center gap-2  py-5 text-white">
      <div className="mobile:w-14 mobile:h-14 pc:w-24 pc:h-24">
        <img
          src="/image/mitchLogo.jpg"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <span className="tracking-wider mobile:text-xl pc:text-3xl font-bold">MitchEdits</span>
    </div>
  );
};
