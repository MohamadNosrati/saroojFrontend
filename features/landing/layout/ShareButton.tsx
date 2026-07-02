"use client";

import { Button } from "@heroui/button";

import { ShareIcon } from "@/components/icons";
import useShare from "@/lib/hooks/share";

interface IProps {
  paylod: {
    title: string;
    text: string;

    image?: string;
    files?: File[];
  };
}

const ShareButton: React.FC<IProps> = ({ paylod }) => {
  const { shareHandler } = useShare(paylod);

  return (
    <Button
      className="min-w-0 sm:size-10 size-8 !p-0"
      color="warning"
      variant="shadow"
      onPress={() => shareHandler()}
    >
      <ShareIcon className="text-dark" height={20} width={20} />
    </Button>
  );
};

export default ShareButton;
