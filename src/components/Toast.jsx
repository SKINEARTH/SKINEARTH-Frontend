import {
  ToastContainer,
  ToastTitle,
  ToastDescription,
} from "../styles/Toast.styles";

const Toast = ({
  title,
  description,
}) => {
  return (
    <ToastContainer>
      <ToastTitle>
        {title}
      </ToastTitle>

      <ToastDescription>
        {description}
      </ToastDescription>
    </ToastContainer>
  );
};

export default Toast;