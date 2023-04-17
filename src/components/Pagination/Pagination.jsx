import axios from "axios";
import React, { useEffect, useState } from "react";
import PaginationBtn from "./PaginationBtn";

const Pagination = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage] = useState(10);

  const lastItemIndex = currentPage * countPerPage;
  const firstItemIndex = lastItemIndex - countPerPage;
  const currentItem = items.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setItems(res.data), setLoading(false));
  }, []);

  const pageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <button onClick={() => console.log(currentItem)}>123</button>
        {currentItem.map((item, i) => (
          <div key={i}>
            <p>{item.translations.rus.official}</p>
            <img src={item.flags?.png} style={{ width: 120, height: 80 }} />
          </div>
        ))}
        <PaginationBtn
          countPerPage={countPerPage}
          totalItems={items.length}
          pageClick={pageClick}
          currentPage={currentPage}
          perPage={() =>
            setCurrentPage((precState) => (precState == 1 ? 1 : precState - 1))
          }
          nextPage={() =>
            setCurrentPage((precState) =>
              precState == Math.ceil(items.length / countPerPage)
                ? Math.ceil(items.length / countPerPage)
                : precState + 1
            )
          }
        />
        <div></div>
      </div>
    );
  }
};

export default Pagination;
