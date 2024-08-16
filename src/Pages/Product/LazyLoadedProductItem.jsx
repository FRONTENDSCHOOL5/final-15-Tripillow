import ProductItem from 'Components/common/ProductItem';
import ProductItemSkeleton from 'Components/common/Skeleton/ProductItemSkeleton';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

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

      image.onerror = () => {
        setLoading(false);
      };
    }
  }, [inView, product]);

  if (!inView) {
    return <div ref={ref}></div>;
  }

  if (loading) {
    return (
      <div ref={ref}>
        <ProductItemSkeleton />
      </div>
    );
  }

  return <ProductItem product={product} />;
};

export default LazyLoadedProductItem;
