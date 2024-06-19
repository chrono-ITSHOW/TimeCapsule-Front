import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StartPageRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 18000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 취소
  }, []);

  return <div></div>;
}

export default StartPageRedirect;
