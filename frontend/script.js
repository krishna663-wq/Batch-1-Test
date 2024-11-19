let players = [
    { id: 1, name: 'Parth', score: 850, isPinned: false },
    { id: 2, name: 'Naman', score: 920, isPinned: false },
    { id: 3, name: 'Rahul', score: 750, isPinned: false },
    { id: 4, name: 'Priya', score: 890, isPinned: false },
    { id: 5, name: 'Amit', score: 800, isPinned: false }
];

// Pin icon SVG
const pinSVG = `
    <svg class="pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L12 22M12 2L8 6M12 2L16 6" />
    </svg>
`;

// Function to sort players
function sortPlayers() {
    return players.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.score - a.score;
    });
}

// Function to render the leaderboard
function renderLeaderboard() {
    const tbody = document.querySelector('#leaderboardTable tbody');
    tbody.innerHTML = '';

    const sortedPlayers = sortPlayers();

    sortedPlayers.forEach((player, index) => {
        const row = document.createElement('tr');
        if (player.isPinned) row.classList.add('pinned');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.name}</td>
            <td class="score">${player.score}</td>
            <td>
                <button class="pin-button" onclick="togglePin(${player.id})">
                    ${pinSVG}
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Function to toggle pin status
function togglePin(playerId) {
    players = players.map(player => {
        if (player.id === playerId) {
            return { ...player, isPinned: !player.isPinned };
        }
        return player;
    });

    renderLeaderboard();
}

// Initial render
renderLeaderboard();