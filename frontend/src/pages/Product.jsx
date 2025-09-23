import { useDispatch, useSelector } from 'react-redux'
import { lazy, Suspense, useEffect, useState } from 'react';
const ProductTemplate = lazy(() => import('../components/ProductTemplate'));
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import { loadlazyproducts } from '../store/reducers/ProductSlice';
import useInfinite from '../utils/useInfinite';
// import { asyncloadpoducts } from '../store/Actions/ProductActions';

const Product = ({query, setQuery}) => {
  const dispatch = useDispatch();

  const { products, hasMore, asyncsmartloadproduct } = useInfinite();

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={asyncsmartloadproduct}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="flex flex-wrap gap-2 justify-around mt-10 w-full">
        {products.filter((product) =>
          product.title.toLowerCase().includes(query)
        )
          .map((p) => (
            <Suspense key={p.id} fallback="Loading......">
              <ProductTemplate p={p} />
            </Suspense>
          ))}
      </div>
    </InfiniteScroll>
  )

}

export default Product
