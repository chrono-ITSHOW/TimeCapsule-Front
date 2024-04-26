import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

function Write() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
      };

    return (
        <div>
            
        </div>
    );
}

export default Write;
