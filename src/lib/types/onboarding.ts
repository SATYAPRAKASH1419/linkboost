export type AuthProviderType = "email" | "oauth_google";

export type OnboardingStep = 1 | 2 | 3 | 4;

export interface Phase1Data {
  username: string;
  isUsernameAvailable: boolean;
  authProvider: AuthProviderType;
  email?: string;
  password?: string;
}

export interface Phase2Data {
  displayName: string;
  bio: string;
  category: string;
  keywords: string[]; // slug keywords (e.g., ["design", "tech", "creator"])
}

export interface SocialLinkItem {
  id: string;
  platform:
    | "instagram"
    | "twitter"
    | "youtube"
    | "tiktok"
    | "github"
    | "linkedin"
    | "spotify"
    | "other";
  url: string;
  label?: string;
}

export interface Phase3Data {
  socialLinks: SocialLinkItem[];
  skipped: boolean;
}

export type StoreItemType = "product" | "document" | "service" | "affiliate";

export interface StoreDocItem {
  id: string;
  type: StoreItemType;
  title: string;
  url: string;
  price?: string;
  description?: string;
}

export interface Phase4Data {
  items: StoreDocItem[];
  skipped: boolean;
}
export interface CompleteOnboardingPayload {
  username: string;
  displayName: string;
  bio: string;
  category: string;
  keywords: string[];
  socialLinks: SocialLinkItem[];
  storeItems: StoreDocItem[];
}
