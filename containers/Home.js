import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import Pagination from "react-js-pagination";

import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../redux/actions/roomAction";
import { RoomItem } from "../components/Room/RoomItem";

export const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    rooms: allRooms,
    resPerPage,
    roomsCount,
    filteredRoomsCount,
    error,
  } = useSelector((state) => state.allRooms);

  // const [currentPage,setCurrentPage] = useState('')

  let { page = 1 } = router.query;
  page = Number(page);

  const handlePagination = (pageNum) => {
    router.push(`/?page=${pageNum}`);
  };

  useEffect(() => {
    if (error) {
      toast.error(`🦄 ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(clearError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">Stays in New York</h2>

        <a href="#" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left" /> Back to Search
        </a>
        <div className="row">
          {allRooms && allRooms.length === 0 ? (
            <div className="alert alert-danger">No Rooms Available.</div>
          ) : (
            allRooms.map((room) => {
              const { _id: id } = room;
              return <RoomItem key={id} id={id} {...room} />;
            })
          )}
        </div>
      </section>

      {resPerPage < roomsCount && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={resPerPage}
            totalItemsCount={roomsCount}
            onChange={handlePagination}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </>
  );
};