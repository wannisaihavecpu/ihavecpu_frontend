// Pagination component
import { FC } from "react";
import ReactPaginate from "react-paginate";
import { SpaceProps } from "styled-system";
import Icon from "../icon/Icon";
import { Button } from "../buttons";
import { StyledPagination } from "./styled";

export interface PaginationProps extends SpaceProps {
  pageCount: number;
  currentPage: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onPageChange?: (selectedPage: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  onPageChange,
  pageCount,
  currentPage,
  pageRangeDisplayed,
  marginPagesDisplayed,
  ...props
}) => {
  const handlePageChange = (page: { selected: number }) => {
    if (onPageChange) onPageChange(page.selected + 1);
  };

  const PREVIOUS_BUTTON = (
    <Button
      height="auto"
      padding="6px"
      color="primary"
      overflow="hidden"
      borderRadius="50%"
      className="control-button"
    >
      <Icon defaultcolor="currentColor" variant="small">
        chevron-left
      </Icon>
    </Button>
  );

  const NEXT_BUTTON = (
    <Button
      height="auto"
      padding="6px"
      color="primary"
      overflow="hidden"
      borderRadius="50%"
      className="control-button"
    >
      <Icon defaultcolor="currentColor" variant="small">
        chevron-right
      </Icon>
    </Button>
  );

  const BREAK_LABEL = (
    <Icon defaultcolor="currentColor" variant="small">
      triple-dot
    </Icon>
  );

  return (
    <StyledPagination {...props}>
      <ReactPaginate
        pageCount={pageCount}
        nextLabel={NEXT_BUTTON}
        breakLabel={BREAK_LABEL}
        activeClassName="active"
        disabledClassName="disabled"
        containerClassName="pagination"
        previousLabel={PREVIOUS_BUTTON}
        onPageChange={handlePageChange}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
      />
    </StyledPagination>
  );
};

export default Pagination;
