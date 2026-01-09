import type { NGOLocation } from "@/context/GlobeContext";

/* 🏢 NGO Data (used by search, pins, labels) */
export type NGO = NGOLocation & {
  id: number;
};

export const ngos: NGO[] = [
  {
    id: 1,
    name: "DaanPitara Delhi",
    lat: 28.6139,
    lng: 77.209,
    city: "Delhi",
    pincode: "110001",
  },
  {
    id: 2,
    name: "DaanPitara Mumbai",
    lat: 19.076,
    lng: 72.8777,
    city: "Mumbai",
    pincode: "400001",
  },
];
