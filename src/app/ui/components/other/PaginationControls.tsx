"use client";

import { Group, Pagination } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PaginationControls = ({ currentPage, numberOfPages }: { currentPage: number, numberOfPages: number }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(`?page=${currentPage}`);
  });

  return <Pagination.Root disabled={numberOfPages === 0} total={numberOfPages} onChange={(newPage) => router.push(`?page=${newPage}`)
  } value={currentPage} >
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