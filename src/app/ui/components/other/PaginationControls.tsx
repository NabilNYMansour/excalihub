"use client";

import { Group, Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaginationControls = ({ currentPage, numberOfPages }: { currentPage: number, numberOfPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', Math.min(Math.max(newPage, 1), numberOfPages).toString()); // minimum of 1 and maximum of numberOfPages
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    handlePageChange(currentPage);
  });

  return <Pagination.Root disabled={numberOfPages === 0} total={numberOfPages} value={currentPage}
    onChange={(newPage) => {
      handlePageChange(newPage);
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
