"use client";

import { ActionIcon, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { RxCross1 } from "react-icons/rx";

export default function SearchDrawings() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchValue, setSearchValue] = useState<string>(searchParams.get("search") ?? "");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    handleSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  return (
    <TextInput
      size="lg"
      value={searchValue}
      placeholder='Search Drawings'
      leftSection={<FaMagnifyingGlass />}
      rightSection={
        <ActionIcon variant='subtle' radius="xl" onClick={() => setSearchValue("")}>
          <RxCross1 />
        </ActionIcon>
      }
      onChange={(event) => setSearchValue(event.currentTarget.value)}
    />
  );
}
