import type { Config } from "@react-router/dev/config";
import { getContacts } from "app/data";

export default {
  ssr: true,
  async prerender() {
    const contacts = await getContacts();
    return contacts.map(({ id }) => `/products/${id}`);
  },
} satisfies Config;
