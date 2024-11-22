import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.jsx";

function Pages({ metadata }) {
  const { currentPage, totalPages } = metadata;

  const nextPageUrl =
    currentPage + 1 <= totalPages
      ? `/admin/${currentPage + 1}`
      : `/admin/${currentPage}#`;

  const prevPageUrl =
    currentPage - 1 > 0
      ? `/admin/${currentPage - 1}`
      : `/admin/${currentPage}#`;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prevPageUrl} />
        </PaginationItem>
        {Array.apply(null, Array(totalPages)).map((val, index) => (
          <PaginationItem key={index}>
            {currentPage === index + 1 ? (
              <PaginationLink href={`/admin/${index + 1}`} isActive>
                {index + 1}
              </PaginationLink>
            ) : (
              <PaginationLink href={`/admin/${index + 1}`}>
                {index + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={nextPageUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Pages;
