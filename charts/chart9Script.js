const chart9 = document.getElementById('chart-9');

d3.csv('./data/top_100_youtubers.csv').then((data) => {
    const updateData = data.map((row) => ({
        channel: row['ChannelName'],
        likes: row['Likes']
    }))

    const sortedData = d3.sort(updateData, (d) => Number(d.likes));

    mostChannelName = sortedData[84].channel;
    mostChannelLikes = sortedData[84].likes;

    let h2 = document.createElement("h2");
    h2.textContent = 'Channel with the Most Likes';
    let p = document.createElement("p");
    p.textContent = `The channel is ${mostChannelName} with ${mostChannelLikes} likes.`;
    chart9.appendChild(h2);
    chart9.appendChild(p);
})