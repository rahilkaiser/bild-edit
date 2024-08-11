"use client";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import {formUrlQuery} from "@/lib/utils";

const SearchComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>("");

  function removeKeysFromQuery(searchParams: string, keysToRemove: string[]) {
    const currentUrl = qs.parse(searchParams);

    keysToRemove.forEach((key) => {
      delete currentUrl[key];
    });

    // Remove null or undefined values
    Object.keys(currentUrl).forEach(
      (key) => currentUrl[key] == null && delete currentUrl[key]
    );

    return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
  }

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (query) {
        const newUrl = formUrlQuery(searchParams.toString(), "query", query);

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery(searchParams.toString(), ["query"]);

        router.push(newUrl, { scroll: false });

      }
    }, 400);

    return () => clearTimeout(debounceFn);
  }, [query, router, searchParams]);

  return (
    <div className="flex  items-center gap-2 m-6">
      <SearchIcon className="w-6 h-6" />
      <Input
        className="bg-primary/40 focus-visible:ring-accent transition-shadow duration-300 px-10"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
