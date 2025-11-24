import { StyledPagination, Buttons, PaginationButton, P } from "./style";
import { PaginationProps } from "./types";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSetSearchParams } from "@/hooks/useSetsearchParams";
import { PAGE_SIZE } from "@/utils/constants";

const Pagination: React.FC<PaginationProps> = ({ count }) => {
  const totalPages = Math.ceil(count / PAGE_SIZE);

  const { searchParams, handleSearchParams } = useSetSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePrevClick = () => {
    const prevPage = currentPage - 1;
    handleSearchParams("page", prevPage.toString());
  };

  const handleNextClick = () => {
    const nextPage = currentPage + 1;
    handleSearchParams("page", nextPage.toString());
  };

  if (totalPages === 1) return null;

  return (
    <StyledPagination>
      <P>
        <span>
          第 <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> -{" "}
          <span>
            {currentPage === totalPages ? count : currentPage * PAGE_SIZE}
          </span>{" "}
          条 / 共 {count} 条
        </span>
      </P>
      <Buttons>
        <PaginationButton
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <HiChevronLeft />
          <span>previous</span>
        </PaginationButton>
        <PaginationButton
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          <span>next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
