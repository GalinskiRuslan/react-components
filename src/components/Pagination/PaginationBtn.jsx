import React from "react";

const PaginationBtn = ({
  countPerPage,
  totalItems,
  pageClick,
  currentPage,
  perPage,
  nextPage,
}) => {
  const pageNum = [];

  for (let i = 1; i <= Math.ceil(totalItems / countPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <div>
      <button onClick={perPage}>Per</button>
      <ul>
        {pageNum.map((page) => (
          <button
            key={page}
            onClick={() => pageClick(page)}
            className={currentPage == page ? "active" : ""}
          >
            {page}
          </button>
        ))}
      </ul>
      <button onClick={nextPage}>next</button>
    </div>
  );
};

export default PaginationBtn;
