"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { parcel } from "@prisma/client";

interface ParcelInfoModalProps {
  parcel: parcel | null;
  open: boolean;
  onClose: () => void;
}

export const ParcelInfoModal: React.FC<ParcelInfoModalProps> = ({
  parcel,
  open,
  onClose,
}) => {
  if (!parcel) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Détails du Colis</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p>
            <strong>Numéro de Suivi:</strong> {parcel.trackingNumber}
          </p>
          <p>
            <strong>Description:</strong> {parcel.description}
          </p>
          <p>
            <strong>Type:</strong> {parcel.parcelType}
          </p>
          <p>
            <strong>Statut:</strong> {parcel.status}
          </p>
          <p>
            <strong>Expéditeur:</strong> {parcel.senderCommune}
          </p>
          <p>
            <strong>Destinataire:</strong> {parcel.recipientName}
          </p>
          <p>
            <strong>Téléphone du Destinataire:</strong> {parcel.recipientPhone}
          </p>
          <p>
            <strong>Paiement à la Livraison:</strong>{" "}
            {parcel.feeAtDoor ? `${parcel.feeAtDoor} GNF` : "Non applicable"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
