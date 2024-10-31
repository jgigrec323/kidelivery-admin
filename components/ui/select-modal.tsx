// components/SelectModal.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SelectModalProps {
  title: string;
  options: string[];
  onSelect: (value: string) => void;
  open: boolean;
  onClose: () => void;
}

export const SelectModal: React.FC<SelectModalProps> = ({
  title,
  options,
  onSelect,
  open,
  onClose,
}) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Select onValueChange={(value) => setSelected(value)}>
          <SelectItem value="">Select an option</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </Select>
        <Button
          onClick={() => {
            onSelect(selected);
            onClose();
          }}
          className="mt-4"
        >
          Confirmer
        </Button>
      </DialogContent>
    </Dialog>
  );
};
