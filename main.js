document.getElementById('search_lyrics').addEventListener('click',function(){
    document.getElementById('search_reault').innerHTML = ''

    const inputText = document.getElementById('input_text').value
    searchResult(inputText)
})

function searchResult(songTitle) {
    fetch(`https://api.lyrics.ovh/suggest/${songTitle}`)
    .then(res => res.json())
    .then(data => {

        for (let i = 0; i < data.data.length; i++) {
            
            const title  = (data.data[i].title)
            const artist =(data.data[i].artist.name)
            console.log(title)
            
            document.getElementById('search_reault').innerHTML += `
            <div  class="search-result col-md-8 mx-auto py-4">
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${title}</h3>
                        <p class="author lead">Album by <span>${artist}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="findLyrics()" id="showLyrics"  class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>
               
            </div>`
            
            if(i==9){
                break
            }
        }
    })
}

function findLyrics() {
    const titleName = document.querySelector('.search-result .single-result h3').innerText
    const artistName = document.querySelector('.search-result .single-result span').innerText
    console.log(titleName)
    console.log(artistName)
    fetch(`https://api.lyrics.ovh/v1/${artistName}/${titleName}`)
    .then(res => res.json())
    .then(data => {
        songLyrics = data.lyrics
        document.getElementById('showLyrics').innerHTML = songLyrics
        console.log(songLyrics)
    })
}
