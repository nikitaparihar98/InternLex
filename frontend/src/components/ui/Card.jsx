function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-[#E5E0D8] p-6 ${className}`}>
      {children}
    </div>
  );
}

export default Card;