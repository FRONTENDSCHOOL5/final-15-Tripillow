import DefaultImage from 'Assets/defaultImg.png';
import ProductItem from 'Components/common/ProductItem';
import ProductItemSkeleton from 'Components/common/Skeleton/ProductItemSkeleton';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const LazyLoadedProductItem = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(product?.itemImage || DefaultImage);
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
        setImageUrl(product?.itemImage);
      };

      image.onerror = () => {
        setLoading(false);
        setImageUrl(DefaultImage);
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

  return <ProductItem product={{ ...product, itemImage: imageUrl }} />;
};

export default LazyLoadedProductItem;
