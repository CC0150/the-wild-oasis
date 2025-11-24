import Form from "@/components/authentication/form/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import Input from "@/ui/Input";
import { StyledFormRow } from "./style";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import toast from "react-hot-toast";
import FormRow from "@/components/authentication/form/FormRow";
import { Cabin, FormValues, CreateCabinFormProps } from "./types";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useEditCabin } from "./hooks/useEditCabin";

const CreateCabinForm: React.FC<CreateCabinFormProps> = ({
  cabinToEdit = {} as Cabin,
  onClose,
}) => {
  const isEditSession = Boolean(cabinToEdit.id);

  const { id: editId, ...editValues } = cabinToEdit;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isCreating, createCabinMutate } = useCreateCabin();
  const { isEditing, editCabinMutate } = useEditCabin();

  const isWorking = isCreating || isEditing;

  //表单提交成功的回调函数
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isEditSession) {
      editCabinMutate(
        { newCabinData: data, id: editId! },
        {
          onSuccess: () => {
            // 编辑成功后，重置表单为更新后的数据
            reset();
            // 编辑成功后，关闭表单
            onClose?.();
          },
          onError: () => {
            // 编辑失败时，重置表单为原始数据
            reset(editValues);
          },
        }
      );
    } else {
      createCabinMutate(
        { newCabinData: data },
        {
          onSuccess: () => {
            // 创建成功后，清空表单
            reset();
            // 创建成功后，关闭表单
            onClose?.();
          },
          onError: () => {
            // 创建失败时，重置表单为空
            reset();
          },
        }
      );
    }
  };

  //表单提交失败的回调函数
  const onError: SubmitErrorHandler<FormValues> = () => {
    toast.error("Form submission failed");
  };

  //自定义表单验证
  const validateDiscount = (value: number) => {
    const { price } = getValues();
    return value < price ? true : "Discount must be less than price";
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      $type={onClose ? "modal" : "default"}
    >
      <FormRow name="name" label="Cabin name" errors={errors}>
        <Input
          type="text"
          disabled={isWorking}
          // id="name"
          {...register("name", { required: "Cabin name is required" })}
        />
      </FormRow>

      <FormRow name="maxCapacity" label="Maximum capacity" errors={errors}>
        <Input
          type="number"
          disabled={isWorking}
          // id="maxCapacity"
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "The capacity must be at least 1" },
            max: { value: 10, message: "The capacity must be at most 10" },
          })}
        />
      </FormRow>

      <FormRow name="price" label="Price" errors={errors}>
        <Input
          type="number"
          disabled={isWorking}
          // id="price"
          {...register("price", {
            required: "Price is required",
            min: {
              value: 1,
              message: "The price must be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow name="discount" label="Discount" errors={errors}>
        <Input
          type="number"
          disabled={isWorking}
          // id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            validate: validateDiscount,
          })}
        />
      </FormRow>

      <FormRow
        name="description"
        label="Description for website"
        errors={errors}
      >
        <Textarea
          disabled={isWorking}
          // id="description"
          defaultValue=""
          {...register("description", { required: "Description is required" })}
        />
      </FormRow>

      <FormRow name="image" label="Cabin photo" errors={errors}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "Image is required",
          })}
        />
      </FormRow>

      <StyledFormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Add new cabin"}
        </Button>
      </StyledFormRow>
    </Form>
  );
};

export default CreateCabinForm;
