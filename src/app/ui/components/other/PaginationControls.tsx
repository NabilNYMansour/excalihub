"use client";

import { Group, Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaginationControls = ({ currentPage, numberOfPages }: { currentPage: number, numberOfPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (newPage: number, scroll: boolean) => {
    const params = new URLSearchParams(searchParams);
    // minimum of 1 and maximum of numberOfPages
    const page = Math.max(Math.min(newPage, numberOfPages), 1);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    replace(`${pathname}?${params.toString()}`, { scroll });
  }

  useEffect(() => {
    handlePageChange(currentPage, false);
  });

  return <Pagination.Root disabled={numberOfPages === 0} total={numberOfPages} value={currentPage}
    onChange={(newPage) => {
      handlePageChange(newPage, true);
    }}>
    <Group justify="center" gap={5}>
      <Pagination.First />
      <Pagination.Previous />
      <Pagination.Items />
      <Pagination.Next />
      <Pagination.Last />
    </Group>
  </Pagination.Root>;
};

export default PaginationControls;
