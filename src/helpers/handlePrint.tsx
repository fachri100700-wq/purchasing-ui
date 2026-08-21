import { pdf } from "@react-pdf/renderer";
import SppDocument from "../app/spp/pdf/SppDocument";

export const handlePrint = async () => {
  const blob = await pdf(<SppDocument />).toBlob();

  const url = URL.createObjectURL(blob);

  const printWindow = window.open(url);

  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  }
};