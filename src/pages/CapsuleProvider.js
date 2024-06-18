import React, { createContext, useState } from 'react';

export const CapsuleContext = createContext();

export const CapsuleProvider = ({ children }) => {
    const [capsulePath, setCapsulePath] = useState();
    const [capsuleId, setCapsuleId] = useState();

    const getCapsule = (capsulePath) => {
        setCapsulePath(capsulePath);
    }
    const getId = (capsuleId) => {
        setCapsuleId(capsuleId);
    }

    return (
        <CapsuleContext.Provider value={{ capsulePath, getCapsule, capsuleId, getId }}>
            {children}
        </CapsuleContext.Provider>
    );
};