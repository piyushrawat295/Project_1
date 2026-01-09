import type { NGOLocation } from "@/context/GlobeContext";

/* 🏢 NGO Data (used by search, pins, labels) */
export type NGO = NGOLocation & {
  id: number;
};

export const ngos: NGO[] = [
  // 🇮🇳 India
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
  {
    id: 3,
    name: "DaanPitara Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    city: "Bengaluru",
    pincode: "560001",
  },
  {
    id: 4,
    name: "DaanPitara Kolkata",
    lat: 22.5726,
    lng: 88.3639,
    city: "Kolkata",
    pincode: "700001",
  },
  {
    id: 5,
    name: "DaanPitara Jaipur",
    lat: 26.9124,
    lng: 75.7873,
    city: "Jaipur",
    pincode: "302001",
  },

  // 🇿🇦 South Africa
  {
    id: 6,
    name: "DaanPitara Johannesburg",
    lat: -26.2041,
    lng: 28.0473,
    city: "Johannesburg",
    pincode: "2000",
  },
  {
    id: 7,
    name: "DaanPitara Cape Town",
    lat: -33.9249,
    lng: 18.4241,
    city: "Cape Town",
    pincode: "8001",
  },
  {
    id: 8,
    name: "DaanPitara Durban",
    lat: -29.8587,
    lng: 31.0218,
    city: "Durban",
    pincode: "4001",
  },

  // 🇪🇺 Europe
  {
    id: 9,
    name: "DaanPitara London",
    lat: 51.5074,
    lng: -0.1278,
    city: "London",
    pincode: "EC1A",
  },
  {
    id: 10,
    name: "DaanPitara Berlin",
    lat: 52.52,
    lng: 13.405,
    city: "Berlin",
    pincode: "10115",
  },
  {
    id: 11,
    name: "DaanPitara Paris",
    lat: 48.8566,
    lng: 2.3522,
    city: "Paris",
    pincode: "75001",
  },
  {
    id: 12,
    name: "DaanPitara Amsterdam",
    lat: 52.3676,
    lng: 4.9041,
    city: "Amsterdam",
    pincode: "1012",
  },

  // 🇨🇦 Canada
  {
    id: 13,
    name: "DaanPitara Toronto",
    lat: 43.6532,
    lng: -79.3832,
    city: "Toronto",
    pincode: "M5H",
  },
  {
    id: 14,
    name: "DaanPitara Vancouver",
    lat: 49.2827,
    lng: -123.1207,
    city: "Vancouver",
    pincode: "V5K",
  },
  {
    id: 15,
    name: "DaanPitara Montreal",
    lat: 45.5017,
    lng: -73.5673,
    city: "Montreal",
    pincode: "H1A",
  },
];
