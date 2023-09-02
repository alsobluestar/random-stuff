async function fetchData(user_id) {
    const url = 'https://guardiantracking.vercel.app/user/' + user_id;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('bruh :(');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

async function displayRecords(user_id) {
    try {
        const results = await fetchData(user_id);



        const title = `
                   <div id="title">${results.userinfo.handle}'s status log</div>
              
                `;

        const formattedRecords = results.records
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(data => `
                <div class="card">
                    <div class="status">${data.status}</div>
                    <div class="date">${formatUnixTimestamp(data.timestamp)}</div>
                </div>
            `)
            .join('');


        document.getElementById("records").innerHTML = formattedRecords;
        document.getElementById("title").innerHTML = title;

    } catch (error) {
        console.error('Error displaying records:', error);
    }
}

function formatUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleString(undefined, {
        hour12: true,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
}

const userIDInput = document.getElementById("userIDinput");
userIDInput.addEventListener("input", function(event) {
    displayRecords(event.target.value);
});
