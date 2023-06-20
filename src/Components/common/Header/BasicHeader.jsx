import React, { useState } from 'react';
import prev from '../../../Assets/icons/icon-arrow-back.svg';
import more from '../../../Assets/icons/icon-more-vertical.svg';
import styled from 'styled-components';
import HeaderLayout from '../../../Styles/HeaderLayout';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import { useRecoilState } from 'recoil';
import userToken from '../../../Recoil/userToken/userToken';
import isLogin from '../../../Recoil/isLogin/isLogin';
import accountName from '../../../Recoil/accountName/accountName';
import AlertModal from '../AlertModal';
import ProductDeleteAPI from '../../../Utils/ProductDeleteAPI';

const BasicHeader = (props) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [token, setToken] = useRecoilState(userToken);
  const [login, setLogin] = useRecoilState(isLogin);
  const [name, setName] = useRecoilState(accountName);
  // const productDelete = ProductDeleteAPI(props.isDelete);
  const deleteId = props.deleteId;

  const handleMorebutton = () => {
    setModal(!modal);
  };

  const handleLogoutbutton = () => {
    setAlertModal(!alertModal);
  };

  const handleCancel = () => {
    setAlertModal(false);
    setModal(false);
  };

  const handleLogout = () => {
    setToken('');
    setLogin(false);
    setName('');
    navigate('/');
  };

  const { handleProductDelete } = ProductDeleteAPI(deleteId);

  const handleDelete = async () => {
    await handleProductDelete();
    navigate('/product');
  };

  return (
    <HeaderLayout>
      <ContentLayout>
        <PrevButton
          onClick={() => {
            navigate(-1);
          }}
        />
        {props.children && <div>{props.children}</div>}
      </ContentLayout>
     {props.empty? null : <MoreButton onClick={handleMorebutton} />}
      {modal && (
        <Modal
          btn1={props.btn1}
          btn2={props.btn2}
          handleMorebutton={handleMorebutton}
          handleLogoutbutton={handleLogoutbutton}
        />
      )}
      {alertModal && (
        <AlertModal
          txt={props.txt}
          rightbtn={props.rightbtn}
          logout={deleteId ? handleDelete : handleLogout}
          handleCancel={handleCancel}
        />
      )}
    </HeaderLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  align-items: center;
`;
const PrevButton = styled.button`
  width: 22px;
  height: 22px;
  margin-right: 8px;
  background-image: url(${prev});
`;

const MoreButton = styled.button`
  width: 24px;
  height: 24px;
  background-image: url(${more});
`;

export default BasicHeader;
