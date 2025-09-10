"use client";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";
import { Controller, useForm } from "react-hook-form";
import { responseHandler } from "@/lib/tools/responseHandler";
import { useState } from "react";
import { Button } from "@heroui/button";

type TformValues = {
  fullName: string;
  position: string;
  description: string;
  pictureId: string;
};

const TeamatesPage = () => {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, setValue, watch, control } = useForm<TformValues>();
  const { pictureId } = watch();
  const onSubmit = async (data: TformValues) => {
    try {
      setLoading(true);
    } catch (err) {
      responseHandler.fail(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomContainer className="h-full">
      <div className="flex items-center justify-between">
        <div></div>
        <CustomModal buttonTitle="افزودن هم تیمی" modalTitle="ساخت هم تیمی">
          <form
            className="flex flex-col gap-y-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Controller
                control={control}
                name="fullName"
                render={({ field: { value, onChange } }) => (
                  <CustomInput
                    value={value}
                    onChange={onChange}
                    labelPlacement="outside-top"
                    label="نام و نام خانوادگی"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="position"
                render={({ field: { value, onChange } }) => (
                  <CustomInput
                    value={value}
                    onChange={onChange}
                    labelPlacement="outside-top"
                    label="عنوان شغلی"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="description"
                render={({ field: { value, onChange } }) => (
                  <CustomTextArea value={value} onChange={onChange} />
                )}
              />
            </div>
            <CustomImageLoader
              value={pictureId}
              setValue={(value: string) => setValue("pictureId", value)}
            />
            <div>
              <Button fullWidth type="submit" color="primary">
                ثبت
              </Button>
            </div>
          </form>
        </CustomModal>
      </div>
    </CustomContainer>
  );
};

export default TeamatesPage;
