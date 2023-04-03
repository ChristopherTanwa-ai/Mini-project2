var artists = [];
var styles = [];
var formats = [];

function filterObjects(c, t) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");

  switch (t) {
    case "Artist":
      if (artists.indexOf(c) == -1) {
        artists.push(c);
      } else {
        artists.splice(artists.indexOf(c), 1);
      }
      break;
    case "Style":
      if (styles.indexOf(c) == -1) {
        styles.push(c);
      } else {
        styles.splice(styles.indexOf(c), 1);
      }
      break;
    case "Format":
      if (formats.indexOf(c) == -1) {
        formats.push(c);
      } else {
        formats.splice(formats.indexOf(c), 1);
      }
      break;
  }

  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "hide");

    var artistRemove = true;
    var styleRemove = true;
    var formatRemove = true;

    if (artists.length === 0) {
      artistRemove = false;
    }
    if (styles.length === 0) {
      styleRemove = false;
    }
    if (formats.length === 0) {
      formatRemove = false;
    }

    x[i].className.split(" ").forEach((element) => {
      if (artists.includes(element)) {
        artistRemove = false;
      }
    });
    x[i].className.split(" ").forEach((element) => {
      if (styles.includes(element)) {
        styleRemove = false;
      }
    });
    x[i].className.split(" ").forEach((element) => {
      if (formats.includes(element)) {
        formatRemove = false;
      }
    });

    if (artistRemove || styleRemove || formatRemove) addClass(x[i], "hide");
  }
}

function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}
