// Single source of truth for every contact detail shown on the site,
// the CVs, the PDFs and the database seed.
export const CONTACT = {
  name: "Imtius Ahmad",
  email: "h.imtius10@gmail.com",
  phone: "+8801614742777",
  whatsapp: "+8801614742777",
  location: "Dhaka, Bangladesh",
  linkedin: "https://www.linkedin.com/in/imtius10/",
  github: "https://github.com/Imtius10",
} as const;

/** Human-readable line used inside CV headers / sr-only parser text. */
export const CONTACT_LINE = `${CONTACT.email} | ${CONTACT.phone} | ${shortUrl(
  CONTACT.linkedin
)} | ${shortUrl(CONTACT.github)}`;

export function shortUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/** Visible label for a CV project link — the real URL stays in the href. */
export function linkLabel(url: string) {
  return /github\.com/i.test(url) ? "GitHub" : "Live Link";
}
