import { useForm } from "react-hook-form";

function OpportunityForm({ onAddOpportunity }) {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const newOpportunity = {
      id: crypto.randomUUID(),
      ...data,
      status: "Published",
    };

    onAddOpportunity(newOpportunity);
    alert("Opportunity added successfully");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#181818] border border-zinc-800 rounded-xl p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-white">Add Opportunity</h2>

      <input
        {...register("title", { required: true })}
        placeholder="Title"
        className="w-full bg-[#0A0A0A] border border-zinc-700 rounded-lg px-4 py-3"
      />

      <select
        {...register("type", { required: true })}
        className="w-full bg-[#0A0A0A] border border-zinc-700 rounded-lg px-4 py-3"
      >
        <option value="">Select Type</option>
        <option value="Internship">Internship</option>
        <option value="Webinar">Webinar</option>
        <option value="Competition">Competition</option>
      </select>

      <input
        {...register("organization")}
        placeholder="Organization"
        className="w-full bg-[#0A0A0A] border border-zinc-700 rounded-lg px-4 py-3"
      />

      <input
        {...register("location")}
        placeholder="Location"
        className="w-full bg-[#0A0A0A] border border-zinc-700 rounded-lg px-4 py-3"
      />

      <input
        {...register("deadline")}
        type="date"
        className="w-full bg-[#0A0A0A] border border-zinc-700 rounded-lg px-4 py-3"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        rows="4"
        className="w-full bg-[#0A0A0A] border border-zinc-700 rounded-lg px-4 py-3"
      />

      <button className="bg-[#F4B400] text-black px-6 py-3 rounded-lg font-semibold">
        Publish Opportunity
      </button>
    </form>
  );
}

export default OpportunityForm;