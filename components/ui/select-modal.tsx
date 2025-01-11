// SelectModal.tsx

"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface SelectModalProps {
  title: string;
  options: Option[];
  onSelect: (value: string) => void;
  open: boolean;
  onClose: () => void;
}

const SelectModal: React.FC<SelectModalProps> = ({
  title,
  options,
  onSelect,
  open,
  onClose,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
  };

  const handleConfirm = () => {
    if (selectedValue) {
      onSelect(selectedValue);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Dropdown Select */}
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full mt-4">
            {selectedValue
              ? options.find((option) => option.value === selectedValue)?.label
              : "Select an option"}
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-auto">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleConfirm} className="mt-4 w-full">
          Confirm
        </Button>
        <Button variant="outline" onClick={onClose} className="mt-2 w-full">
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SelectModal;
