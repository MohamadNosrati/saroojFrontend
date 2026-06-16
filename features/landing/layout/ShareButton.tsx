"use client";

import { ShareIcon } from "@/components/icons";
import useShare from "@/lib/hooks/share";
import { Button } from "@heroui/button";

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
      onPress={() => shareHandler()}
      className="min-w-0 size-8 !p-0"
      color="secondary"
    >
      <ShareIcon width={20} height={20} className="text-dark" />
    </Button>
  );
};

export default ShareButton;
