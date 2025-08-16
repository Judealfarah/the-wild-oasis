import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentlySelected = searchParams.get("sort-by") || "";

  function handleChange(e) {
    searchParams.set("sort-by", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={currentlySelected}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
