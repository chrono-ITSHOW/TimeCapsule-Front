import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Glass from '../commponents/\bGlass';
import BackgroundImg from '../commponents/BackgroundImg';

function Write() {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
      };

    return (
        <div>
            <Glass />
            <BackgroundImg />
        </div>
    );
}

export default Write;
