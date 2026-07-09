function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-12">
      <h2 className="text-5xl font-semibold text-[#111111]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[#6B7280] max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;