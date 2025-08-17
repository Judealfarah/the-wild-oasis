import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/hooks/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "../bookings/hooks/useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { isCheckingIn, checkIn } = useCheckin();
  const [addBreakast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const moveBack = useMoveBack();

  const { booking, isLoading } = useBooking();

  useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
    is_paid,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfast_price * num_nights * num_guests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakast) {
      checkIn({
        id,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: total_price + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ id, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakast}
            onChange={() => {
              setAddBreakfast((addBreakast) => !addBreakast);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            What to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid}
          id="paidAmount"
        >
          I confirm that {guests.full_name} has paid the total amount{" "}
          {!addBreakast
            ? formatCurrency(total_price)
            : `${formatCurrency(
                total_price + optionalBreakfastPrice
              )} (${formatCurrency(total_price)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{id}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
