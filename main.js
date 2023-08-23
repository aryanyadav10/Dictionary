const input = document.querySelector('input');
const form = document.querySelector('form');
const card = document.querySelector('.card');
const mean = document.querySelector('.mean1');
const head = document.querySelector('.head1');
const gram = document.querySelector('.gram');
const syn = document.querySelector('.syn');
const icon = document.querySelector('.icon1');
const alert = document.querySelector('.alert');
 
let audioPlayer = new Audio();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await call(input.value);
    input.value = '';
});

async function call(x) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${x}`;
    const value = await fetch(url);

    if (value.status === 200) {
        const data = await value.json();
        if (data && data.length > 0) {
            const x1 = data[0].meanings[0]?.definitions[0]?.definition;
            const x2 = data[0].meanings[0]?.partOfSpeech;
            const x3 = data[0].meanings[0]?.synonyms?.[0];
            const audioUrl = data[0]?.phonetics?.find(e => e.audio)?.audio;

            card.style.display = 'block';
            head.innerHTML = x;
            mean.innerHTML = x1 || '';
            gram.innerHTML = x2 || '';
            syn.innerHTML = x3 ? `Synonyms: ${x3}` : '';

            if (audioUrl) {
                audioPlayer.src = audioUrl;
                icon.style.display = 'block';
            } 
            else {
                icon.style.display = 'none';
            }
            setTimeout(()=>{
                card.style.display = 'none';
            },10000);
        }
        else{
            displayNoResultsAlert(x);
        } 
    } 
    else {
        displayNoResultsAlert(x);
    }
}

function displayNoResultsAlert(searchedWord) {
    card.style.display = 'none';
    alert.style.display = 'block';
    setTimeout(()=>{
        alert.style.display = 'none';
    },1500);
}

icon.addEventListener('click', () => {
    if (!audioPlayer.paused) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    audioPlayer.play();
});
