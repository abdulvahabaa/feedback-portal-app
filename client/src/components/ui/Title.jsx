function Title({ children, rightComponent }) {
  return (
    <div className="flex justify-between items-center font-bold text-2xl text-amber-500 mb-2">
      <div>{children}</div>
      <div>{rightComponent}</div>
    </div>
  );
}

export default Title;
