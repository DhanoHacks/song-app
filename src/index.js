import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SongGenreRow extends React.Component {
    render() {
        const genre = this.props.genre;
        return (
            <tr>
                <th colSpan="4" align='center'>
                    {genre}
                </th>
            </tr>
        );
    }
}

class SongRow extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlayMusic = this.handlePlayMusic.bind(this);
    }

    handlePlayMusic(e) {
        this.props.onPlayMusic(e.target.id);
    }

    render() {
        const song = this.props.song;

        return (
            <tr>
                <td align='center'>{song.name}</td>
                <td align='center'>{song.duration}</td>
                <td align='center'>{song.artist}</td>
                <td align='center'><input type="button" id={song.name} onClick={this.handlePlayMusic} value="Play"></input></td>
            </tr>
        );
    }
}

class SongTable extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlayMusic = this.handlePlayMusic.bind(this);
    }

    handlePlayMusic(song) {
        this.props.onPlayMusic(song);
    }

    render() {
        const filterText = this.props.filterText;
        const searchSong = Boolean(this.props.search==="song");
        const searchArtist = Boolean(this.props.search==="artist");
        const searchGenre = Boolean(this.props.search==="genre");

        const rows = [];
        let lastGenre = null;

        this.props.songs.forEach((song) => {
            if (searchSong && song.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }
            if (searchArtist && song.artist.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }
            if (searchGenre && song.genre.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                return;
            }
            if (song.genre !== lastGenre) {
                rows.push(
                    <SongGenreRow
                        genre={song.genre}
                        key={song.genre} />
                );
            }
            rows.push(
                <SongRow
                    song={song}
                    key={song.name}
                    onPlayMusic={this.handlePlayMusic} />
            );
            lastGenre = song.genre;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th align='center'>Name</th>
                        <th align='center'>Duration</th>
                        <th align='center'>Artist</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleCategoryChange(e) {
        this.props.onCategoryChange(e.target.id);
    }

    render() {
        const string="Search "+this.props.search+"...";
        const searchSong = Boolean(this.props.search==="song");
        const searchArtist = Boolean(this.props.search==="artist");
        const searchGenre = Boolean(this.props.search==="genre");
        
        return (
            <form>
                <input
                    type="text"
                    placeholder={string}
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange} />
                <br></br>
                <input
                    type="radio"
                    id="song"
                    name="search_attribute"
                    value={searchSong}
                    onChange={this.handleCategoryChange} />
                Song
                <input
                    type="radio"
                    id="artist"
                    name="search_attribute"
                    value={searchArtist}
                    onChange={this.handleCategoryChange} />
                Artist
                <input
                    type="radio"
                    id="genre"
                    name="search_attribute"
                    value={searchGenre}
                    onChange={this.handleCategoryChange} />
                Genre
            </form>
        );
    }
}

class FilterableSongTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: "",
            search: "song",
            now_Playing: "Megalovania",
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handlePlayMusic = this.handlePlayMusic.bind(this);
    }

    handleFilterTextChange(filterText){
        this.setState({
            filterText: filterText
        });
    }

    handleCategoryChange(id){
        this.setState({
            search: id
        });
    }

    handlePlayMusic(id){
        this.setState({
            now_Playing: id
        });
        document.getElementById("image").src="disc-music.jpg";
    }

    render() {
        return (
            <div className='app'>
                <div className='search-and-list'>
                    <div className='search-bar'>
                        <SearchBar
                            filterText={this.state.filterText}
                            search={this.state.search}
                            onFilterTextChange={this.handleFilterTextChange}
                            onCategoryChange={this.handleCategoryChange}
                        />
                    </div>
                    <SongTable
                        songs={this.props.songs}
                        filterText={this.state.filterText}
                        search={this.state.search}
                        onPlayMusic={this.handlePlayMusic}
                    />
                </div>
                <div className='music-player'>
                    <MusicPlayer nowPlaying={this.state.now_Playing}/>
                </div>
            </div>
        );
    }
}

class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
    }
    handlePause(e){
        document.getElementById("image").src="disc-music.jpg";
        
    }
    handlePlay(e){
        document.getElementById("image").src="disc-music.gif";
    }
    render(){
        const current_song="Songs\\"+this.props.nowPlaying+".mp3";
        return(
            <div>
            <p align="center" className='music-player-title'>Now playing</p>
            <img id="image" src="disc-music.jpg" ></img>
            <h3 align="center" className='music-name'>♫{this.props.nowPlaying}</h3>
            <div className="audio-container">
                <audio src={current_song} controls onPause={this.handlePause} onPlay={this.handlePlay}> 
                    Your browser does not support the audio element.
                </audio>
            </div>
            </div>
        );
    }
}

const SONGS = [
    { genre: 'Game OST', duration: '2:58', artist: 'Worlds 2017 LOL', name: 'Legends Never Die' },
    { genre: 'Game OST', duration: '3:27', artist: 'Worlds 2019 LOL', name: 'Phoenix' },
    { genre: 'Game OST', duration: '2:36', artist: 'Undertale/Toby Fox', name: 'Megalovania' },
    { genre: 'Rap', duration: '4:50', artist: 'Dr. Dre ft. Snoop Dogg', name: 'Still D.R.E' },
    { genre: 'Rap', duration: '3:19', artist: 'Dr. Dre ft. Snoop Dogg', name: 'The Next Episode' },
    { genre: 'Rap', duration: '5:23', artist: 'Eminem', name: 'Lose Yourself'},
    { genre: 'Rap', duration: '3:48', artist: 'Fort Minor', name: 'Remember The Name'},
    { genre: 'EDM', duration: '3:32', artist: 'Alan Walker', name: 'Faded' },
    { genre: 'EDM', duration: '3:26', artist: 'Alan Walker', name: 'Spectre' },
    { genre: 'Pop', duration: '2:37', artist: 'Lil Nas X', name: 'Old Town Road'},
    { genre: 'Pop', duration: '4:21', artist: 'Imagine Dragons', name: 'Radioactive'},
];

ReactDOM.render(
    <FilterableSongTable songs={SONGS} />,
    document.getElementById('container')
);