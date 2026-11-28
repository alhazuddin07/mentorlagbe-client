import React from 'react';

const AuthLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        // Auth pages hardcode light colors, so pin color-scheme + autofill
        // light even when the site theme is dark (see globals.css).
        <div className="auth-light">
            {children}
        </div>
    );
};

export default AuthLayout;