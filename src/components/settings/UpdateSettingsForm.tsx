import { useGetSettings } from "@/components/settings/hooks/useGetSettings";
import Form from "@/components/authentication/form/Form";
import FormRow from "@/components/authentication/form/FormRow";
import Input from "@/ui/Input";
import Spinner from "@/ui/Spinner";
import { useUpdateSetting } from "@/components/settings/hooks/useUpdateSetting";
import { Settings } from "@/components/settings/types";

const UpdateSettingsForm: React.FC = () => {
  const { settings, isLoading } = useGetSettings();
  const { isUpdating, updateSettingMutate } = useUpdateSetting();

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Settings
  ) => {
    const { value } = e.target;
    if (!value) return;
    updateSettingMutate({
      [field]: Number(value),
    } as Partial<Settings>);
  };

  if (isLoading) return <Spinner />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  return (
    <Form>
      <FormRow label="Minimum nights/booking" name="minBookingLength">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking" name="maxBookingLength">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking" name="maxGuestsPerBooking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>

      <FormRow label="Breakfast price" name="breakfastPrice">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
};

export default UpdateSettingsForm;
