import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkOut } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-out",
      }),
    onSuccess: () => {
      toast.success("Checked out success");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { isCheckingOut, checkOut };
}
