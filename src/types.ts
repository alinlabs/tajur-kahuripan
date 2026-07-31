export type PricingType = "per_pax" | "per_group" | "per_night";

export interface PackageRoute {
  name: string;
  activities: string[];
}

export interface MainPackage {
  id: string;
  title: string;
  description: string;
  base_price: number;
  pricing_type: PricingType;
  min_pax: number;
  includes: string[];
  routes?: PackageRoute[];
  recreation?: string;
  image_url: string;
}

export interface OptionalAttraction {
  id: string;
  title: string;
  description: string;
  base_price: number;
  pricing_type: PricingType;
  min_pax: number;
  includes: string[];
  image_url: string;
}

export interface Accommodation {
  id: string;
  title: string;
  description: string;
  base_price: number;
  pricing_type: PricingType;
  min_pax: number;
  rooms: number;
  includes: string[];
  general_facilities: string[];
  signature_menu: string;
  check_in_time: string;
  payment_method: string;
  image_url: string;
}

export interface TourismData {
  main_packages: MainPackage[];
  optional_attractions: OptionalAttraction[];
  accommodations: Accommodation[];
}
