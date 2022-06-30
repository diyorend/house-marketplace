import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase.config";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Spinner from "./Spinner";
import { async } from "@firebase/util";

const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const listingRef = collection(db, "listing");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));

      const querySnap = await getDocs(q);

      let listing = [];
      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListing(listing);
      console.log(listing);
      setLoading(false);
    };
    fetchListing();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    listing && (
      <>
        <p className="exploreHeading">Recommended</p>

        <Swiper
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
        >
          {listing.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls[0]})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "20rem",
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{data.name}</p>
                <div className="swiperSlidePrice">
                  ${data.discountedPrice ?? data.regularPrice}
                  {data.type === "rent" && " / Month"}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
