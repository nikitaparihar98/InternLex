function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-sm bg-[#F3E7C8] text-[#8A650F] text-xs font-semibold uppercase tracking-wide">
      {children}
    </span>
  );
}

export default Badge;