import React from 'react';

function ServerHeader() {
    return (
        <header style={{ marginBottom: '48px' }}>
            <h1 style={{ fontSize: '36px', margin: '0 0 16px 0', color: 'var(--text-main)', letterSpacing: '-0.03em' }}>
                Find your community
            </h1>
            <p style={{
                fontSize: '16px',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                maxWidth: '680px'
            }}>
                Our platform is made up of independent communities called <strong style={{ color: 'var(--primary)' }}>servers</strong>. Join a server that matches your interests to connect with like-minded people across the network.
            </p>
        </header>
    );
}

export default ServerHeader;
