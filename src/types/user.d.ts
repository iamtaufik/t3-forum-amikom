import { type Profile } from "./profile";

export type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  profile?: Profile | null | undefined;
};
