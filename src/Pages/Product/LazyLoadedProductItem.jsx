import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ProductItem from 'Components/common/ProductItem';
import ProductItemSkeleton from 'Components/common/Skeleton/ProductItemSkeleton';

const LazyLoadedProductItem = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      const image = new Image();
      image.src = product?.itemImage;

      image.onload = () => {
        setLoading(false);
      };
    }
  }, [inView, product]);

  //9.4MB -> 23
  // if (inView || !loading) {
  //   return <ProductItem product={product} />;
  // }

  // 15MB -> 23
  if (!loading) {
    return <ProductItem product={product} />;
  }

  return (
    <div ref={ref}>
      <ProductItemSkeleton />
    </div>
  );
};

export default LazyLoadedProductItem;
