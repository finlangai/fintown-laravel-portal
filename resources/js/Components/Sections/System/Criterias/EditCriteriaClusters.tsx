import { SaveButton } from "@/Components/Specialized/crud-button";
import { useCriteriaCard } from "@/Contexts/CriteriaCardContext";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

const EditCriteriaClusters = () => {
  const {
    criteriaInfo: { id },
    clusters,
  } = useCriteriaCard();

  const { patch } = useForm({
    group: clusters,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    patch(route("system.criterias.update-clusters", id), {
      preserveScroll: true,
      preserveState: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <SaveButton asDiv={true} onClick={handleSubmit}>
        Lưu thay đổi
      </SaveButton>
    </form>
  );
};

export default EditCriteriaClusters;
