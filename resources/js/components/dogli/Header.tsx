import React from 'react';

export default function Header() {
    return (
        <>
            <header style={{
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e5e7eb',
                padding: '1rem 0'
            }}>
                <div className="container">
                    <div id="header" style={{
                        backgroundColor: 'transparent',
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div id="user_comments_mobile" className="showOnMobile hidden right"></div>
                    </div>
                </div>
            </header>
            <div className="header-divider"></div>
        </>
    );
}

