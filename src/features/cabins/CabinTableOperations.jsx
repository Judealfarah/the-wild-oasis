import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name A-Z" },
          { value: "name-desc", label: "Sort by name Z-A" },
          { value: "regular_price-asc", label: "Sort by price (low - high)" },
          { value: "regular_price-desc", label: "Sort by price (high - low)" },
          {
            value: "max_capacity-asc",
            label: "Sort by max capacity (low - high)",
          },
          {
            value: "max_capacity-desc",
            label: "Sort by max capacity (high - low)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
