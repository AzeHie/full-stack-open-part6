import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, isVisible }= useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: isVisible ? 'block' : 'none'
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
