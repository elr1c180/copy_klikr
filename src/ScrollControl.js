import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollControl = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const isBoostPage = location.pathname === '/boost';

    // Устанавливаем overflow в зависимости от текущего маршрута
    document.body.style.overflow = isBoostPage ? 'auto' : 'hidden';

    // Очистка стиля при размонтировании компонента
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);

  return <>{children}</>;
};

export default ScrollControl;
