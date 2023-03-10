const wrapper = document.querySelector(".wrapper")
searchip = document.querySelector("input")
synonyms = wrapper.querySelector(".synonyms .list")
infotxt = wrapper.querySelector(".info")
example = wrapper.querySelector(".example .details")
volumeicon = wrapper.querySelector(".word i")
removeicon = wrapper.querySelector(".search button")
let audio;

function operation(result, word) {
    if (result.title) {
        infotxt.innerHTML = `cannot find the meaning of the word "${word}"`
    } else {
        wrapper.classList.add("active")
        let definitions = result[0].meanings[0].definitions[0];
        let syn = result[0].meanings[0];
        phonetics = `${result[0].meanings[0].partOfSpeech}/${result[0].phonetics[0].text}/`
        document.querySelector(".word p").innerHTML = result[0].word;
        document.querySelector(".word span").innerHTML = phonetics;
        audio - new Audio("https:" + result[0].phonetics[0].audio)
        document.querySelector(".meaning span").innerHTML = definitions.definition;
        document.querySelector(".example span").innerHTML = definitions.example;
        if (definitions.example == undefined) {
            example.parentElement.style.display = "none";
        }

        if (syn.synonyms[0] == undefined) {
            synonyms.parentElement.style.display = "none"
        } else {
            synonyms.innerHTML = ""
            for (let i = 0; i < 5; i++) {
                let tag = `<span onclick=search('${syn.synonyms[i]}')>${syn.synonyms[i]},  </span>`
                synonyms.insertAdjacentHTML("beforeend", tag);
            }
        }






    }
}

function search(word) {
    searchip.value = word;
    fetchapi(word)
    wrapper.classList.remove("active")

}


function fetchapi(word) {
    wrapper.classList.remove("active")
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(res => res.json()).then(result => operation(result, word))
}

searchip.addEventListener("keyup", e => {
    if (e.key == "Enter" && e.target.value) {
        fetchapi(e.target.value)
    }
})

volumeicon.addEventListener("click", () => {
    utterance = new SpeechSynthesisUtterance(searchip.value);
    speechSynthesis.speak(utterance)
})

removeicon.addEventListener("click", () => {
    searchip.value = ""
    searchip.focus()

    wrapper.classList.remove("active")

})

