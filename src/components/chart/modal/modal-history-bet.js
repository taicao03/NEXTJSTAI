
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Đặt phần tử gốc của ứng dụng Next.js làm phần tử cho modal

const ModalHistoryBet = ({ isOpen, onRequestClose, data }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getHours() + 1}:${date.getMinutes() + 1}  ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          zIndex:100,
        },
        content: {
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#9f9f2d',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
          width:'30%',
          margin: '0 auto',
        }
      }}
    >
        {data.map((item, index) => (
        <div className="grid grid-cols-3 gap-4 content-start mb-2" key={index}>
        <div className='font-semibold text-base'>
        {formatDate(item?.createdAt)}

        </div>
        <div className={`${item?.result === true ? 'text-black' : 'text-white'} font-semibold text-base text-center`}>
        {item?.result === true ? 'Tài' : 'Xỉu'}

        </div>
        <div className={`${item?.bet === item?.result ?'text-green-600' : 'text-red-600'} font-semibold text-base text-end` }>
        {item?.coinChange}

        </div>
        </div>
        ))}
    </Modal>
  );
};

export default ModalHistoryBet;
