function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
}) {
  const styles = {
    primary:
      "bg-[#B8871B] text-white hover:bg-[#9D7417]",

    secondary:
      "border border-[#B8871B] text-[#B8871B] hover:bg-[#B8871B] hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;