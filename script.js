function addToCart(input) {
    let foundUser = users.find((data) => session.userid === data.Username);
    const posters = mainData.Posters;
    let index = poster.get(input)
    const poster = posters[index];
    foundUser.basket.push(poster)
    console.log('User list', users);
}
