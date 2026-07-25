const BUSINESS_WHATSAPP = '244952670003'; // sem "+", sem espaços

export function openWhatsAppWithQuote(form, availableServices, requestedArtist) {
  const serviceNames =
    form.services.length > 0
      ? availableServices
          .filter((s) => form.services.includes(s.id))
          .map((s) => s.title)
          .join(', ')
      : 'A definir';

  const lines = [
    '*Novo Pedido de Orçamento — Pamil*',
    '',
    `*Nome:* ${form.full_name}`,
    `*Telefone:* ${form.phone}`,
    `*E-mail:* ${form.email}`,
    form.company ? `*Empresa:* ${form.company}` : null,
    requestedArtist ? `*Artista solicitado:* ${requestedArtist}` : null,
    `*Tipo de evento:* ${form.event_type}`,
    `*Serviços:* ${serviceNames}`,
    `*Data prevista:* ${form.event_date || 'A definir'}`,
    `*Local:* ${form.location || 'A definir'}`,
    `*Orçamento:* ${form.budget_range || 'A definir'}`,
    form.message ? `*Mensagem:* ${form.message}` : null,
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  const url = `https://wa.me/${BUSINESS_WHATSAPP}?text=${text}`;
  window.open(url, '_blank');
}