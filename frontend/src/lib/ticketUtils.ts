import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { VehiculoActivo } from "@/services/vehiculoService";
import type { Ticket } from "@/services/ticketService";

// Helper to format date
// Helper to format date
const formatDate = (dateString: string | Date | undefined | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString();
};

const COMPANY_NAME = "Parqueo Villa Sur S.A.C.";

export const generateEntryTicket = (vehicle: VehiculoActivo) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 200] // Thermal printer width approx 80mm
    });

    // Header
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(COMPANY_NAME, 40, 10, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("TICKET DE INGRESO", 40, 18, { align: "center" });

    // Details
    const startY = 25;
    const lineHeight = 6;

    doc.setFontSize(9);
    doc.text(`TICKET: ${vehicle.codigo_ticket}`, 5, startY);
    doc.text(`FECHA: ${formatDate(new Date())}`, 5, startY + lineHeight);

    doc.line(5, startY + lineHeight * 1.5, 75, startY + lineHeight * 1.5);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`PLACA: ${vehicle.placa}`, 5, startY + lineHeight * 3);
    doc.setFont("helvetica", "normal");
    doc.text(`TIPO: ${vehicle.tipo_vehiculo}`, 5, startY + lineHeight * 4);
    doc.text(`ESPACIO: ${vehicle.espacio}`, 5, startY + lineHeight * 5);
    doc.text(`HORA INGRESO:`, 5, startY + lineHeight * 6);
    doc.text(`${vehicle.hora_ingreso}`, 5, startY + lineHeight * 7);

    // Footer
    const footerY = startY + lineHeight * 9;
    doc.line(5, footerY, 75, footerY);

    doc.setFontSize(8);
    doc.text("Por favor conserve este ticket", 40, footerY + 5, { align: "center" });
    doc.text("para su salida.", 40, footerY + 9, { align: "center" });

    // Auto Print
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
};

export const generateExitTicket = (ticket: Ticket) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 200]
    });

    // Header
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(COMPANY_NAME, 40, 10, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("COMPROBANTE DE PAGO", 40, 18, { align: "center" });

    // Details
    const startY = 25;
    const lineHeight = 6;

    doc.setFontSize(9);
    doc.text(`TICKET: ${ticket.codigo_ticket}`, 5, startY);
    doc.text(`FECHA: ${formatDate(new Date())}`, 5, startY + lineHeight);

    doc.line(5, startY + lineHeight * 1.5, 75, startY + lineHeight * 1.5);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`PLACA: ${ticket.placa}`, 5, startY + lineHeight * 3);
    doc.setFont("helvetica", "normal");
    doc.text(`TIPO: ${ticket.tipo_vehiculo}`, 5, startY + lineHeight * 4);
    doc.text(`ESPACIO: ${ticket.codigo_espacio}`, 5, startY + lineHeight * 5);

    doc.text(`ENTRADA: ${formatDate(ticket.hora_entrada)}`, 5, startY + lineHeight * 6);
    doc.text(`SALIDA: ${formatDate(ticket.hora_salida)}`, 5, startY + lineHeight * 7);

    // Tiempo formatting
    const timeStr = ticket.tiempo_permanencia ? `${Math.floor(ticket.tiempo_permanencia / 60)}h ${ticket.tiempo_permanencia % 60}m` : "0m";
    doc.text(`TIEMPO: ${timeStr}`, 5, startY + lineHeight * 8);

    doc.line(5, startY + lineHeight * 8.5, 75, startY + lineHeight * 8.5);

    // Total
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    const total = ticket.monto_total ? ticket.monto_total.toFixed(2) : "0.00";
    doc.text(`TOTAL: S/. ${total}`, 40, startY + lineHeight * 10, { align: "center" });

    // Footer
    const footerY = startY + lineHeight * 12;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Gracias por su preferencia", 40, footerY, { align: "center" });
    doc.text("Vuelva pronto", 40, footerY + 4, { align: "center" });

    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
};
