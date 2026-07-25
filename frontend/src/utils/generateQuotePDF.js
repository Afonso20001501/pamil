import jsPDF from 'jspdf';
import PamilLogo from '../assets/pamil.png'; // ajusta este caminho para o mesmo que usas na Navbar
import { loadImageAsBase64 } from './loadImageBase64.js';

const BRAND = { forest: '#0E3B2E', spotlight: '#F5B700', ink: '#10140F' };

const CONTACTS = {
  phone: '+244 952 670 003',
  email: 'sensacaional@gmail.com',
  instagram: '@pamilproducoes',
};

export async function generateQuotePDF(form, availableServices, requestedArtist) {
  const doc = new jsPDF();
  const marginX = 20;
  let y = 25;

  // Cabeçalho
  doc.setFillColor(BRAND.forest);
  doc.rect(0, 0, 210, 35, 'F');

  // Logótipo
  try {
    const logoBase64 = await loadImageAsBase64(PamilLogo);
    doc.addImage(logoBase64, 'PNG', marginX, 6, 24, 24);
    doc.setTextColor('#F6F4EC');
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Comprovativo de Pedido de Orçamento', marginX + 30, 26);
  } catch (err) {
    console.error('Não foi possível carregar o logótipo no PDF:', err);
    doc.setTextColor('#F6F4EC');
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('PAMIL', marginX, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Comprovativo de Pedido de Orçamento', marginX, 28);
  }

  y = 48;
  doc.setTextColor(BRAND.ink);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumo do Pedido', marginX, y);
  y += 3;
  doc.setDrawColor(BRAND.spotlight);
  doc.line(marginX, y, 190, y);
  y += 10;

  const serviceNames =
    form.services.length > 0
      ? availableServices
          .filter((s) => form.services.includes(s.id))
          .map((s) => s.title)
          .join(', ')
      : '—';

  const rows = [
    ['Nome', form.full_name || '—'],
    ['E-mail', form.email || '—'],
    ['Telefone', form.phone || '—'],
    ['Empresa', form.company || '—'],
    ...(requestedArtist ? [['Artista solicitado', requestedArtist]] : []),
    ['Tipo de evento', form.event_type || '—'],
    ['Serviços', serviceNames],
    ['Data prevista', form.event_date || 'A definir'],
    ['Nº de convidados', form.guests_estimate || '—'],
    ['Local', form.location || '—'],
    ['Faixa de orçamento', form.budget_range || 'A definir'],
  ];

  doc.setFontSize(11);
  rows.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, marginX, y);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(String(value), 110);
    doc.text(lines, marginX + 55, y);
    y += 8 * lines.length;
  });

  if (form.message) {
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.text('Mensagem:', marginX, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    const msgLines = doc.splitTextToSize(form.message, 165);
    doc.text(msgLines, marginX, y);
    y += 8 * msgLines.length;
  }

  // Rodapé — linha separadora + nota + contactos
  const footerY = 270;
  doc.setDrawColor('#cccccc');
  doc.line(marginX, footerY - 14, 190, footerY - 14);

  doc.setFontSize(9);
  doc.setTextColor('#666666');
  doc.text(
    `Pedido gerado em ${new Date().toLocaleString('pt-PT')}. A nossa equipa entrará em contacto.`,
    marginX,
    footerY - 8,
    { maxWidth: 170 }
  );

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(BRAND.forest);
  doc.setFontSize(9);
  doc.text(
    `${CONTACTS.phone}   ·   ${CONTACTS.email}   ·   ${CONTACTS.instagram}`,
    marginX,
    footerY
  );

  doc.save(`comprovativo-pedido-${Date.now()}.pdf`);
}