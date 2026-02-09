import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import ServerHeader from '../components/ServerHeader';
import ServerList from '../components/ServerList';
import { servers, categories as initialCategories } from '../data/data';

const pageStyles = {
    '--bg-main': '#17171c',
    '--bg-card': 'rgba(255,255,255,0.05)',
    '--card-bg': '#1e1e24',
    '--text-main': '#ffffff',
    '--text-muted': 'rgba(255,255,255,0.6)',
    '--primary': '#5865f2',
    '--primary-hover': '#4752c4',
    '--radius': '12px',
    '--border-color': 'rgba(255,255,255,0.1)',
    '--shadow-md': '0 8px 24px rgba(0,0,0,0.3)',
    background: '#17171c',
    minHeight: '100vh',
    color: '#ffffff',
};

function Home() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Calculate counts dynamically based on servers list
    const categoriesWithCounts = useMemo(() => {
        return initialCategories.map(cat => {
            let count = 0;
            if (cat.id === 'all') {
                count = servers.length;
            } else {
                count = servers.filter(s => s.category === cat.id).length;
            }
            return { ...cat, count };
        });
    }, []);

    const filteredServers = selectedCategory === 'all'
        ? servers
        : servers.filter(server => server.category === selectedCategory);

    return (
        <div style={pageStyles}>
            <div style={{ display: 'flex', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto' }}>
                <Sidebar
                    categories={categoriesWithCounts}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                <main style={{ flex: 1, padding: '48px 64px' }}>
                    <ServerHeader />
                    <ServerList servers={filteredServers} />
                </main>
            </div>
        </div>
    );
}

export default Home;

