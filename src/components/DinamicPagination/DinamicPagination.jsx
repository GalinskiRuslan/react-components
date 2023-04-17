import React, { useEffect, useState } from "react";
import axios from "axios";

const DinamicPagination = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, serFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (fetching) {
      console.log("featcing");
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
        )
        .then(
          (response) => (
            setPhotos([...photos, ...response.data]),
            setCurrentPage((precState) => precState + 1),
            setTotalCount(response.headers[`x-total-count`])
          )
        )
        .finally(() => serFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      serFetching(true);
    }
  };
  return (
    <div>
      <button onClick={() => console.log(photos.length < Number(totalCount))}>
        123
      </button>
      {photos.map((photo) => (
        <div key={photo.id}>
          <p>{photo.title}</p>
          <img src={photo.thumbnailUrl} />
        </div>
      ))}
    </div>
  );
};

export default DinamicPagination;
