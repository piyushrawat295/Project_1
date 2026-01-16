"use client";

import { useMemo, useState } from "react";
import type { MapNGO } from "@/actions/get-map-ngos";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";

interface NGOListClientProps {
  ngos: MapNGO[];
}

export default function NGOListClient({ ngos }: NGOListClientProps) {
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("All");

  const uniqueCities = useMemo(
    () =>
      [
        "All",
        ...Array.from(new Set(ngos.map((n) => n.city)))
          .filter((c): c is string => !!c)
          .sort(),
      ],
    [ngos]
  );

  const filteredNgos = useMemo(
    () =>
      ngos.filter((ngo) => {
        const matchesQuery =
          ngo.name.toLowerCase().includes(query.toLowerCase()) ||
          ngo.city?.toLowerCase().includes(query.toLowerCase());

        const matchesCity = cityFilter === "All" || ngo.city === cityFilter;

        return matchesQuery && matchesCity;
      }),
    [ngos, query, cityFilter]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Find an NGO
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Search for verified NGOs across the globe and contribute to a cause.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              placeholder="Search by name, city, or pincode"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="block w-full max-w-xs rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
          >
            {uniqueCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNgos.map((ngo) => (
            <Link
              key={ngo.id}
              href={`/ngos/${ngo.slug}`}
              className="flex flex-col overflow-hidden rounded-lg bg-white shadow transition hover:shadow-lg"
            >
              <div className="flex-1 p-6">
                <h3 className="text-xl font-semibold text-gray-900">{ngo.name}</h3>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {ngo.city}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Reliable partner in {ngo.city}. Connecting donors to real impact.
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View Details &rarr;
                </span>
              </div>
            </Link>
          ))}

          {filteredNgos.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No NGOs found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
