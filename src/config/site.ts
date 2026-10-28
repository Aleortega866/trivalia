/** Datos de contacto de Triviala. PENDIENTE: poner el WhatsApp real (10 dígitos). */
export const SALES_WHATSAPP = '5500000000';
export const SALES_MESSAGE = 'Hola, vi Triviala y quiero una trivia para mi negocio.';
export const salesWhatsappUrl = `https://wa.me/52${SALES_WHATSAPP}?text=${encodeURIComponent(SALES_MESSAGE)}`;

/**
 * Datos legales de Triviala para el aviso de privacidad y los términos.
 * PENDIENTE: llenar con tus datos reales antes de vender. La ley pide identidad y domicilio del responsable.
 */
export const LEGAL = {
  owner: 'PENDIENTE: nombre completo o razón social',
  address: 'PENDIENTE: domicilio para oír y recibir notificaciones',
  email: 'PENDIENTE: correo para privacidad',
  city: 'Atizapán de Zaragoza, Estado de México',
  updated: '28 de octubre de 2026',
} as const;
