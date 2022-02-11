class Song {
    constructor(name, artist) {
        this.name = name;
        this.artist = artist;
        //this.id = id; (this was redundent and was causing id to == null)
    }
}
class Mixtape {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.songs = [];
    }
    addSong(song) {
        this.songs.push(song);
    }
    deleteSong(song) {
        let index = this.songs.indexOf(song);
        this.songs.splice(index, 1);
    }
}
let mixtapes = [];
let mixtapeId = 0;
onClick('new-mixtape', () => {
    mixtapes.push(new Mixtape(mixtapeId++, getValue('new-mixtape-name')));
    drawDOM();
});
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}
function getValue(id) {
    console.log('item ',document.getElementById(id));
    console.log('id',(id));
   
    return document.getElementById(id).value;
}
function drawDOM() {
    let mixtapeDiv = document.getElementById("mixtapes");
    clearElement(mixtapeDiv);
    for (mixtape of mixtapes) {
        let table = createMixtapeTable(mixtape);
        let title = document.createElement('h2');
        title.innerHTML = mixtape.name;
        title.appendChild(createDeleteMixtapeButton(mixtape));
        mixtapeDiv.appendChild(title);
        mixtapeDiv.appendChild(table);
        for (song of mixtape.songs) {
            createSongRow(mixtape, table, song);
        }
    }
}
function createSongRow(mixtape, table, song) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = song.name;
    row.insertCell(1).innerHTML = song.artist;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteSongButton(mixtape, song.artist));
    //originally had only mixtape,artist. rewriting causes the appendage of the delete song button to pull the mixtape alog with it's
    //song AND it's artist
    //as opposed to only the mixtape and artist.
}
function createDeleteSongButton(mixtape, song) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-outline-danger btn-lg';
    btn.innerHTML = 'Delete Song';
    btn.onclick = () => {
        let index = mixtape.songs.indexOf(song);
        mixtape.songs.splice(index, 1);
        drawDOM();
    };
    return btn;
}
function createDeleteMixtapeButton(mixtape) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-lg';
    btn.innerHTML = 'Delete Mixtape';
    btn.onclick = () => {
        let index = mixtapes.indexOf(mixtape);
        mixtapes.splice(index, 1);
        drawDOM();
    };
    return btn;
}
function createNewSongButton(mixtape) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-warning btn-lg';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        console.log(`mixtape`);
        mixtape.songs.push(new Song(getValue(`song-input-${mixtape.id}`), getValue(`artist-input-${mixtape.id}`)));
        drawDOM();
    };
    return btn;
}
function createMixtapeTable(mixtape) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered table-hover table-info table-striped');
    let row = table.insertRow(0);
    let songColumn = document.createElement('th');
    let artistColumn = document.createElement('th');
    songColumn.innerHTML = 'Song';
    artistColumn.innerHTML = 'Artist';
    row.appendChild(songColumn);
    row.appendChild(artistColumn);
    let formRow = table.insertRow(1);
    let songTh = document.createElement('th');
    let artistTh = document.createElement('th');
    let createTh = document.createElement('th');
    let songInput = document.createElement('input');
    songInput.setAttribute('id', `song-input-${mixtape.id}`);
    songInput.setAttribute('type', 'text');
    songInput.setAttribute('class', 'form-control');
    let artistInput = document.createElement('input');
    artistInput.setAttribute('id', `artist-input-${mixtape.id}`);
    artistInput.setAttribute('type', 'text');
    artistInput.setAttribute('class', 'form-control');
    let newSongButton = createNewSongButton(mixtape);
    songTh.appendChild(songInput);
    artistTh.appendChild(artistInput);
    createTh.appendChild(newSongButton);
    formRow.appendChild(songTh);
    formRow.appendChild(artistTh);
    formRow.appendChild(createTh);
    return table;
}
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}