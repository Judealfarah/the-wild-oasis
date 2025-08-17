import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: "checked-in",
        is_paid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      toast.success("Check in success");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err);
    },
  });

  return { isCheckingIn, checkIn };
}
