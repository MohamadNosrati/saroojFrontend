"use client";

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
import Image from "next/image";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";

import { dateConvertor } from "@/lib/tools/dateConvertor";
import { uploadUrl } from "@/lib/tools/upload";

import { DeleteIcon, EditIcon } from "../icons";

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
                alt={item?.id || "image"}
                className="rounded-full size-20 min-w-20 object-cover"
                height={100}
                src={uploadUrl(cellValue?.image)}
                width={100}
              />
            ) : (
              <div className="w-20 rounded-full h-20 bg-dark" />
            )}
          </div>
        );
      case "mobilePictureId":
        return (
          <div className="flex justify-center">
            {cellValue ? (
              <Image
                alt={item?.id || "image"}
                className="rounded-full size-20 min-w-20 object-cover"
                height={100}
                src={uploadUrl(cellValue?.image)}
                width={100}
              />
            ) : (
              <div className="w-20 rounded-full h-20 bg-dark" />
            )}
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col max-w-20 truncate">
            <p className="text-bold text-sm max-w-full truncate capitalize  line-clamp-1">
              {cellValue}
            </p>
          </div>
        );
      case "link":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize  line-clamp-1">
              {cellValue}
            </p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col max-w-20">
            <p className="text-bold text-sm max-w-full truncate capitalize  line-clamp-1">
              {cellValue}
            </p>
          </div>
        );
      case "categoryId":
        return (
          <div className="flex flex-col max-w-20">
            <p className="text-bold text-sm max-w-full truncate capitalize  line-clamp-1">
              {cellValue?.title}
            </p>
          </div>
        );
      case "artitectureStyle":
        return (
          <div className="flex flex-col max-w-20">
            <p className="text-bold text-sm max-w-full truncate capitalize  line-clamp-1">
              {cellValue}
            </p>
          </div>
        );
      case "area":
        return (
          <div className="flex flex-col max-w-20">
            <p className="text-bold text-sm max-w-full truncate capitalize  line-clamp-1">
              {cellValue}
            </p>
          </div>
        );
      case "link":
        return (
          <div className="flex flex-col max-w-20">
            <p className="text-bold text-sm text-dark max-w-full truncate capitalize  line-clamp-1">
              {cellValue}
            </p>
          </div>
        );
      case "url":
        return (
          <div className="flex flex-col max-w-20">
            <p className="text-bold text-sm max-w-full truncate capitalize  line-clamp-1">
              {cellValue}
            </p>
          </div>
        );
      case "title":
        return (
          <div className="flex flex-col max-w-20 truncate">
            <p className="text-bold text-sm max-w-full truncate capitalize  line-clamp-1">
              {cellValue}
            </p>
          </div>
        );
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {dateConvertor(cellValue)}
            </p>
          </div>
        );
      case "endDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {dateConvertor(cellValue)}
            </p>
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
      case "fullName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "text":
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
      case "startDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              {dateConvertor(cellValue)}
            </p>
          </div>
        );
      case "endDate":
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
                color="warning"
                onPress={() => editHandler && editHandler(item.id)}
              >
                <EditIcon height={20} width={20} />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <Button
                color="danger"
                onPress={() => deleteHandler && deleteHandler(item.id)}
              >
                <DeleteIcon height={20} width={20} />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return null;
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
        items={items || []}
        loadingContent={<Spinner size="lg" />}
      >
        {(item: Item) => (
          <TableRow key={item.id}>
            {(columnKey: Key) => (
              <TableCell className="text-dark dark:text-white">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
