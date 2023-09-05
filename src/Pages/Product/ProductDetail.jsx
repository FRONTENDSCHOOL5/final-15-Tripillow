import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import accountName from 'Recoil/accountName/accountName';
import ProductDetailAPI from 'Api/Product/ProductDetailAPI';
import { LayoutStyle } from 'Styles/Layout';
import BasicHeader from 'Components/common/Header/BasicHeader';
import hearticon from 'Assets/icons/icon-heart.svg';
import heartfill from 'Assets/icons/icon-heart-fill.svg';
import more from 'Assets/icons/icon-more-pc.svg';
import Button from 'Components/common/Button';
import User from 'Components/common/User';
import chatLists from 'Mock/chatLists';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import MyPillowings from 'Components/Home/MyPillowings';
import PCModal from 'Components/common/Modal/PCModal';
import ProductDeleteAPI from 'Api/Product/ProductDeleteAPI';
import PCAlertModal from 'Components/common/Modal/PCAlertModal';
import useIsWideView from 'Components/SideNav/useIsWideView';

const ProductDetail = () => {
  const [productId, setProductId] = useState('');
  const [isClick, setIsClick] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const $Root = document.getElementById('root');
  const userName = useRecoilValue(accountName);
  const isPCScreen = useRecoilValue(isDesktop);
  const isWideView = useIsWideView();

  const getProductDetail = ProductDetailAPI(params.id);
  // const  productDetail  = ProductDetailAPI(params.id);
  // console.log(productDetail)
  const [productDetail, setProductDetail] = useState();

  useEffect(() => {
    const handleDetail = async () => {
      const details = await getProductDetail();

      setProductDetail(details.product);
      console.log('details : ' , details);
    };
    handleDetail();
  }, []);
  console.log(productDetail);
  const userImg = productDetail?.author?.image;
  const isMine = userName === productDetail?.author?.accountname;
  const [userCheck, setUserCheck] = useState(false);
  const [showImg, setShowImg] = useState(false);

  const [randomMessage, setRandomMessage] = useState('');

  const [isModalOn, setIsModalOn] = useState(false);
  const [isAlertModalOn, setIsAlertModalOn] = useState(false);
  //FIXME - 임의로 해둔 것 수정필요합니다.
  //eslint-disable-next-line
  const [modal, setModal] = useState(false);
  //eslint-disable-next-line
  const [alertModal, setAlertModal] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chatLists.length);
    const selectedMessage = chatLists[randomIndex];
    setRandomMessage(selectedMessage);
  }, []);

  const username = productDetail?.author?.username;

  useEffect(() => {
    setProductId(params.id);
  }, [params.id]);

  const trimContent = (content) => {
    const match = content?.match(/^\[(P|M)\]/);
    if (match) {
      return content.slice(3);
    } else return content;
  };

  const handleMoreBtn = () => {
    setIsModalOn(!isModalOn);
  };

  const handleModify = () => {
    navigate('/modifyproduct', { state: params.id });
  };

  const handleProductDelete = ProductDeleteAPI(params.id);

  const handleDelete = async () => {
    await handleProductDelete();
    navigate('/profile', {
      state: {
        isDeleted: true,
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOn(false);
    setIsAlertModalOn(false);
  };

  const handleAlertModal = (e) => {
    e.stopPropagation();
    setIsAlertModalOn(true);
  };

  useEffect(() => {
    if (userName === productDetail?.author?.accountname) setUserCheck(true);
  }, [userName, productDetail?.author?.accountname]);

  return (
    <>
      {productDetail && (
        <Layout $isWideView={isWideView}>
          {!isWideView && (
            <BasicHeader
              empty={!userCheck}
              userId={productId}
              btn1='수정'
              btn2='삭제'
              txt='정말 삭제 하시겠습니까?'
              rightbtn='확인'
            >
              판매 중인 상품
            </BasicHeader>
          )}
          <main style={{ position: 'relative' }}>
            <Image src={productDetail.itemImage} onClick={() => setShowImg(true)} alt={productDetail?.itemName} />

            {isWideView && <MoreBtn onClick={handleMoreBtn} aria-label='사진 더 보기' />}

            {isModalOn &&
              isWideView &&
              createPortal(
                <PCModal
                  isMine={isMine}
                  setIsModalOn={setIsModalOn}
                  handleModify={handleModify}
                  closeModal={handleCloseModal}
                  handleAlertModal={handleAlertModal}
                  handleDelete={handleDelete}
                />,
                $Root,
              )}
            {isAlertModalOn && (
              <PCAlertModal
                txt='정말 삭제하시겠습니까?'
                rightClick={handleDelete}
                setIsAlertModalOn={setIsAlertModalOn}
              />
            )}

            {showImg && (
              <ModalBg onClick={() => setShowImg(false)} $isWideView={isWideView}>
                <ModalImg src={productDetail.itemImage} $isWideView={isWideView} alt={productDetail.itemName} />
              </ModalBg>
            )}

            <User
              accountname={productDetail.author?.accountname}
              userImg={productDetail.author?.image}
              username={productDetail.author?.username}
              content={'@' + productDetail.author?.accountname}
            />
            <ProductContent size='var(--xl)' weight='700'>
              {trimContent(productDetail?.itemName)}
            </ProductContent>
            <ProductButtonLayout $isWideView={isWideView}>
              <div>
                {!isWideView && (
                  <Icon
                    src={isClick === false ? hearticon : heartfill}
                    onClick={() => {
                      setIsClick(!isClick);
                    }}
                    alt='좋아요'
                  />
                )}
                <ProudctPrice>{productDetail.price?.toLocaleString()}원</ProudctPrice>
              </div>
              <Button
                onClick={() => {
                  navigate(`/chat/${username}`, { state: { username, userImg, randomMessage } });
                }}
                right='12px'
                position={isWideView ? 'static' : 'absolute'}
                margin={isWideView ? '0 0 5px 260px' : '0 0 5px 0'}
              >
                채팅하기
              </Button>
            </ProductButtonLayout>
            <ProductContent size='var(--lg)' height='1.4' style={{ whiteSpace: 'pre-wrap' }}>
              {productDetail?.link}
            </ProductContent>
          </main>
          <MyPillowings $on={isPCScreen} />
        </Layout>
      )}
    </>
  );
};

const Layout = styled.div`
  ${LayoutStyle}
  padding: 48px 12px 73px 16px;
  ${(props) =>
    props.$isWideView ||
    css`
      position: relative;
    `}
`;

const Image = styled.img`
  width: calc(100% + 16px + 12px);
  margin-left: -16px;
  margin-right: -12px;
  margin-bottom: 13px;
  height: 232px;
  object-fit: cover;
  cursor: pointer;
`;

const MoreBtn = styled.button`
  position: absolute;
  right: 5px;
  width: 24px;
  height: 24px;
  padding: 20px;
  margin-right: -12px;
  background: url(${more}) no-repeat center;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  width: ${(props) => (props.$isWideView ? '100%' : '390px ')};

  left: ${(props) => (props.$isWideView ? 0 : '50%')};
  transform: ${(props) => (props.$isWideView ? '' : 'translate(-50%)')};
  min-height: 60px;
  /* margin-bottom: 13px; */
  height: 100%;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  cursor: pointer;
`;

const ModalImg = styled.img`
  width: ${(props) => (props.$isWideView ? '50%' : '100%')};
  margin: auto;
`;

const ProductContent = styled.p`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight || '400'};
  margin-bottom: ${(props) => props.mb || '4px'};
  margin-top: 29px;
  line-height: ${(props) => props.height};
  word-break: break-all;
`;

const ProductButtonLayout = styled.div`
  display: flex;
  width: ${(props) => (props.$isWideView ? '480px' : '390px')};
  margin: 0 auto;
  align-items: center;
  padding: 25px 0 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  background-color: white;

  ${(props) =>
    props.$isWideView &&
    css`
      position: static;
      padding: 10px 0 0;
    `}

  div {
    display: flex;
    margin-left: ${(props) => (props.$isWideView ? '0' : '20px')};
  }

  button {
    margin-top: ${(props) => (props.$isWideView ? '-200px' : '0')};
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
  cursor: pointer;
`;

const ProudctPrice = styled.p`
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
`;

export default ProductDetail;
