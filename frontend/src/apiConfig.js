const SERVER_PORTS = {
    food: 5000,
    sports: 5001
};

export const getApiBaseUrl = () => {
    const selectedServer = localStorage.getItem('server') || 'food';
    const port = SERVER_PORTS[selectedServer] || 5000;
    return `http://localhost:${port}/api`;
};
