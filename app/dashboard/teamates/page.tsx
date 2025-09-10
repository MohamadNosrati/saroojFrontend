"use client";
import CustomContainer from "@/components/ui/CustomContainer";
import CustomModal from "@/components/ui/CustomModal";
import CustomInput from "@/components/ui/CustomInput";
import CustomTextArea from "@/components/ui/customTextArea";
import CustomImageLoader from "@/components/ui/CustomImageLoader";

const TeamatesPage = () => {
  return (
    <CustomContainer className="h-full">
      <div className="flex items-center justify-between">
        <div></div>
        <div>
          <CustomModal buttonTitle="افزودن هم تیمی" modalTitle="ساخت هم تیمی">
            <CustomInput labelPlacement="outside" label="نام و نام خانوادگی" />
            <CustomTextArea />
            <CustomImageLoader/>
          </CustomModal>
        </div>
      </div>
    </CustomContainer>
  );
};

export default TeamatesPage;
