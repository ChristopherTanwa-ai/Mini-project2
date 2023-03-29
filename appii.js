const mainData = require('./data.json');

export function randomPosters(){
    const posters = mainData.Posters;
    const posterKeys = Object.keys(posters);
    const selectedPosters = [];
  
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * posterKeys.length);
      const posterKey = posterKeys[randomIndex];
      const poster = posters[posterKey];
      selectedPosters.push({...poster, id: posterKey});
    }

    return selectedPosters;
}