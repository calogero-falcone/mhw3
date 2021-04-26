for(let i=0;i<8;i++){

    const article=document.querySelector('article.main');
    const section=document.createElement('section');
    const box_titolo=document.createElement('div');
    const title=document.createElement('h1');
    const img=document.createElement('img');
    const descr=document.createElement('p');


    article.appendChild(section);
    section.appendChild(box_titolo);
    box_titolo.appendChild(title);
    box_titolo.appendChild(img);
    section.appendChild(descr);

    img.classList.add('cliccabile');
}

//senza autenticazione
const api_endpoint1='https://wger.de/api/v2/exerciseinfo/'

const url1= api_endpoint1

const titoli=document.querySelectorAll('article.main section div h1');
const immagini_piu=document.querySelectorAll('article.main section div img');
const paragrafi=document.querySelectorAll('article.main section p');
const categorie=[];

for(i=0;i<8;i++){
    immagini_piu[i].src='più.png';
}

function onJson1(json){
    const results=json.results; 
    console.log(results);
    let i=0;
    for(result of results){
    if(result.language.id===2){
    titoli[i].textContent=result.name;
    paragrafi[i].innerHTML=result.description;
    categorie[i]=result.category.name;
    i++;
    }
    }
}

function onResponse(response){
    return response.json();
}

function aggiungiAScheda(event){
    for(i=0;i<8;i++){
        if(immagini_piu[i]===event.target){
            immagini_piu[i].src='verde.png';
            immagini_piu[i].classList.remove('cliccabile');
            immagini_piu[i].removeEventListener('click', aggiungiAScheda);
            
            const section_scheda=document.querySelector('article.scheda section');
            const scritta_scheda=document.createElement('div');

            section_scheda.appendChild(scritta_scheda);

            scritta_scheda.textContent=immagini_piu[i].parentNode.textContent + ' (' + categorie[i] + ')';

            const article_preferiti=document.querySelector('article.scheda');
            article_preferiti.classList.remove('hidden');

        }
    }
}

fetch(url1).then(onResponse).then(onJson1)

for(i=0;i<8;i++){
    immagini_piu[i].addEventListener('click', aggiungiAScheda);
}

//con api key
const api_key='BioBVFN6sfzZ6KR33SJkyxAYIPLKyynjB5yYtJx9'
const api_endpoint2='https://api.nal.usda.gov/fdc/v1/foods/search'

function onSubmit(event){
    event.preventDefault();
    const content=document.querySelector('#cerca').value;
    if(content){
        const text=encodeURIComponent(content);
        const url2= api_endpoint2 + '?api_key=' + api_key + '&query=' + text + '&sortBy=fdcId' + '&pageSize=20';
        fetch(url2).then(onResponse).then(onJson2);
    }
    else alert('Inserisci qualcosa da ricercare.');
}

function onJson2(json){
    console.log(json);
    if(json.totalHits===0){
        console.log('Nessun risultato');
    }
    else{
    const view=document.querySelector('#view');
    view.innerHTML='';
    view.classList.remove('hidden');
    for(food of json.foods){
        for(nutrient of food.foodNutrients){
            if(nutrient.nutrientName==="Protein"){
            const info=document.createElement('span');
            info.textContent=food.description + ' => ' + nutrient.value + ' ' + nutrient.unitName.toLowerCase()
             + ' di proteine per 100 g di prodotto';
            view.appendChild(info);
            }
    }
    }
}
}


const submit=document.querySelector('#cerca_contenuto')
submit.addEventListener('submit',onSubmit)





