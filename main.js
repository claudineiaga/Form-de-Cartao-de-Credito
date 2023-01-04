const card = document.querySelector('#card'),
btnOpenForm = document.querySelector('#btn-open-form'),
form = document.querySelector('#card-form'),
cardNumber = document.querySelector('#card .number'),
cardName = document.querySelector('#card .name'),
brandLogo = document.querySelector('#brand-logo'),
signature = document.querySelector('#card .signature p'),
monthExpDate = document.querySelector('#card .month'),
yearExpDate = document.querySelector('#card .year');
ccv = document.querySelector('#card .ccv');

const flipCard = () => {
  if(card.classList.contains('active')){
    card.classList.remove('active');
  }
}

card.addEventListener('click', () => {
  card.classList.toggle('active');
});

btnOpenForm.addEventListener('click', () => {
  btnOpenForm.classList.toggle('active');
  form.classList.toggle('active');
});

for(let i = 1; i <= 12; i++){
  let option = document.createElement('option');
  option.value = i;
  option.innerText = i;
  form.selectMonth.appendChild(option);
}

const currentYear = new Date().getFullYear();
for(let i = currentYear; i <= currentYear + 8; i++){
  let option = document.createElement('option');
  option.value = i;
  option.innerText = i;
  form.selectYear.appendChild(option);
}

form.inputNumber.addEventListener('keyup', (e) => {
  let inputValue = e.target.value;

  form.inputNumber.value = inputValue
  .replace(/\s/g, '') 
  .replace(/\D/g, '')
  .replace(/([0-9]{4})/g, '$1 ')
  .trim();

  cardNumber.textContent = inputValue;

  if(inputValue == ''){
    cardNumber.textContent = '#### #### #### ####';

    brandLogo.innerHTML = '';
  }

  // Colocar imagem das Bandeiras Visa ou MasterCard
  if(inputValue[0] == 4){
    brandLogo.innerHTML = '';
    const image = document.createElement('img');
    image.src = 'https://raw.githubusercontent.com/falconmasters/formulario-tarjeta-credito-3d/master/img/logos/visa.png';
    brandLogo.appendChild(image);
  } else if(inputValue[0] == 5){
    brandLogo.innerHTML = '';
    const image = document.createElement('img');
    image.src = 'https://raw.githubusercontent.com/falconmasters/formulario-tarjeta-credito-3d/master/img/logos/mastercard.png';
    brandLogo.appendChild(image);
  }

  flipCard();
});

form.inputHolder.addEventListener('keyup', (e) => {
  let inputValue = e.target.value;

  form.inputHolder.value = inputValue.replace(/[0-9]/g, '');
  cardName.textContent = inputValue;
  signature.textContent = inputValue;

  if(inputValue == ''){
    cardName.textContent = 'Clau Gonçalves';
  }

  flipCard();
});

form.selectMonth.addEventListener('change', (e) => {
  monthExpDate.textContent = e.target.value;
  flipCard();
});

form.selectYear.addEventListener('change', (e) => {
  yearExpDate.textContent = e.target.value.slice(2);
  flipCard();
});

form.inputCCV.addEventListener('keyup', () => {
  if(!card.classList.contains('active')){
    card.classList.toggle('active');
  }

  form.inputCCV.value = form.inputCCV.value
  .replace(/\s/g, '')
  .replace(/\D/g, '');

  ccv.textContent = form.inputCCV.value;
});