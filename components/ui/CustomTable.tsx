import type { Key, SVGProps } from "react";

import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { DeleteIcon, EditIcon } from "../icons";
import Image from "next/image";
import { dateConvertor } from "@/lib/tools/dateConvertor";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { uploadUrl } from "@/lib/tools/upload";

interface IProps {
  items: any[];
  columns: { name: string; uid: string }[];
  isLoading?: boolean;
  isPending?: boolean;
  deleteHandler?: (id: string) => void;
  editHandler?: (id: string) => void;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export default function CustomTable({
  items,
  columns,
  deleteHandler,
  isLoading,
  isPending,
  editHandler,
}: IProps) {
  type Item = (typeof items)[0];
  const renderCell = React.useCallback((item: Item, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Item];

    switch (columnKey) {
      case "pictureId":
        return (
          <div className="flex justify-center">
            {cellValue ? (
              <Image
                src={uploadUrl(cellValue?.image)}
                width={100}
                height={100}
                className="rounded-full size-20 min-w-20 object-cover"
                alt={item?.id || "image"}
              />
            ) : (
              <div className="w-20 rounded-full h-20 bg-dark"></div>
            )}
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dateConvertor(cellValue)}</p>
          </div>
        );
      case "endDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dateConvertor(cellValue)}</p>
          </div>
        );
      case "area":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "position":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "alt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "isActive":
        return (
          <Chip
            className="capitalize"
            color={cellValue ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {cellValue ? "فعال" : "غیرفعال"}
          </Chip>
        );
      case "createdAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {dateConvertor(cellValue)}
            </p>
          </div>
        );
      case "updatedAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {dateConvertor(cellValue)}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip color="warning" content="Edit">
              <Button
                onPress={() => editHandler && editHandler(item.id)}
                color="warning"
              >
                <EditIcon width={20} height={20} />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <Button
                onPress={() => deleteHandler && deleteHandler(item.id)}
                color="danger"
              >
                <DeleteIcon width={20} height={20} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table fullWidth aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column: Item) => (
          <TableColumn key={column.uid} align={"center"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        isLoading={isLoading || isPending}
        loadingContent={<Spinner size="lg" />}
        items={items}
      >
        {(item: Item) => (
          <TableRow key={item.id}>
            {(columnKey: Key) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
