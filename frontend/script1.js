const users = [
    { name: 'Naman', total: 68, easy: 54, medium: 12, hard: 2 },
    { name: 'Parth', total: 96, easy: 90, medium: 5, hard: 1 },
    { name: 'Rahul', total: 75, easy: 60, medium: 10, hard: 5 },
    { name: 'Priya', total: 82, easy: 70, medium: 8, hard: 4 }
];

let selectedUsers = [];

function renderLeaderboard() {
    const tbody = document.querySelector('#leaderboardTable tbody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        if (selectedUsers.includes(user.name)) {
            row.classList.add('selected');
        }

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.total}</td>
            <td>${user.easy}</td>
            <td>${user.medium}</td>
            <td>${user.hard}</td>
        `;

        row.addEventListener('click', () => toggleUserSelection(user.name));
        tbody.appendChild(row);
    });
}

function toggleUserSelection(userName) {
    const index = selectedUsers.indexOf(userName);
    if (index === -1) {
        if (selectedUsers.length < 2) {
            selectedUsers.push(userName);
        }
    } else {
        selectedUsers.splice(index, 1);
    }

    updateSelectedUsersDisplay();
    renderLeaderboard();
}

function updateSelectedUsersDisplay() {
    const selectedUsersDiv = document.getElementById('selectedUsers');
    const compareBtn = document.getElementById('compareBtn');

    if (selectedUsers.length === 0) {
        selectedUsersDiv.textContent = 'Select two users to compare';
        compareBtn.disabled = true;
    } else {
        selectedUsersDiv.textContent = `Selected: ${selectedUsers.join(' vs ')}`;
        compareBtn.disabled = selectedUsers.length !== 2;
    }
}

function compareUsers() {
    if (selectedUsers.length !== 2) return;

    const user1 = users.find(u => u.name === selectedUsers[0]);
    const user2 = users.find(u => u.name === selectedUsers[1]);

    const result = document.getElementById('comparisonResult');
    result.innerHTML = `
        <h3>Comparison Results</h3>
        <p><strong>Total Solved:</strong> 
            ${user1.name} (${user1.total}) ${user1.total > user2.total ? '>' : '<'} 
            ${user2.name} (${user2.total})</p>
        <p><strong>Easy Questions:</strong> 
            ${user1.name} (${user1.easy}) ${user1.easy > user2.easy ? '>' : '<'} 
            ${user2.name} (${user2.easy})</p>
        <p><strong>Medium Questions:</strong> 
            ${user1.name} (${user1.medium}) ${user1.medium > user2.medium ? '>' : '<'} 
            ${user2.name} (${user2.medium})</p>
        <p><strong>Hard Questions:</strong> 
            ${user1.name} (${user1.hard}) ${user1.hard > user2.hard ? '>' : '<'} 
            ${user2.name} (${user2.hard})</p>
    `;
}

// Initialize the page
document.getElementById('compareBtn').addEventListener('click', compareUsers);
renderLeaderboard();

// Initial render
renderLeaderboard();