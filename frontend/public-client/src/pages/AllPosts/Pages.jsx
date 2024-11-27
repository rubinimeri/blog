import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination.jsx";
import PropTypes from "prop-types";

function Pages({ currentPage, totalPages }) {
  const nextPageUrl =
    currentPage + 1 <= totalPages
      ? `/all-posts/${currentPage + 1}`
      : `/all-posts/${currentPage}#`;

  const prevPageUrl =
    currentPage - 1 > 0
      ? `/all-posts/${currentPage - 1}`
      : `/all-posts/${currentPage}#`;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={prevPageUrl} />
        </PaginationItem>
        {Array.apply(null, Array(totalPages)).map((val, index) => (
          <PaginationItem key={index}>
            {currentPage === index + 1 ? (
              <PaginationLink to={`/all-posts/${index + 1}`} isActive>
                {index + 1}
              </PaginationLink>
            ) : (
              <PaginationLink to={`/all-posts/${index + 1}`}>
                {index + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext to={nextPageUrl} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

Pages.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

export default Pages;
