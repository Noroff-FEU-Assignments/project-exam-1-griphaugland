const main = document.querySelector('.contact-main');
const nameInput = document.getElementById('nameInput')
const phoneInput = document.getElementById('phoneInput')
const emailInput = document.getElementById('emailInput')
const subjectInput = document.getElementById('subjectInput')
const messageInput = document.getElementById('messageTextArea')

const nameFeedback = document.querySelector('#nameFeedback')
const phoneFeedback = document.querySelector('#phoneFeedback')
const emailFeedback = document.querySelector('#emailFeedback')
const subjectFeedback = document.querySelector('#subjectFeedback')
const messageFeedback = document.querySelector('#messageFeedback')

const nameReg = /^[\x20-\x7E\u00F8\u00E6\u00E5]{5,50}$/;
const phoneReg = /^(\+\d{1,3}\s?)?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{2}$/;
const emailReg =  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const subjectReg = /^[\p{L}\p{M}\p{N}\p{P}\p{S}\p{Zs}]{15,50}$/u;
const messageReg = /^[\p{L}\p{M}\p{N}\p{P}\p{S}\p{Zs}]{25,500}$/u;

const regexTester = (input, rule, inputType) => {
    if (inputType === '') {
      console.log('RegTest:', 'false, empty string');
      feedback.innerHTML = "Du har ikke skrevet noe. Vennligst fyll alle feltene.";
      inputType.style.outline = "1px solid red";
      return false;
    }
    if (inputType.style.outline = "1px solid red") {
        nameFeedback.innerHTML = "Navn (Må være lengre enn 5 bokstaver)"
        phoneFeedback.innerHTML = "Telefon nummer (Norsk telefonnummer på 8 tall)"
        emailFeedback.innerHTML = "Email adresse (f.eks ola@nordmann.no)"
        subjectFeedback.innerHTML = "Årsak til henvendelse (Må være mer enn 15 bokstaver eller tall )"
        messageFeedback.innerHTML = "Melding (Må være mer 25 enn bokstaver eller tall)"
      }
    else {
        nameFeedback.innerHTML = "Navn"
    
        phoneFeedback.innerHTML = "Telefon nummer"
   
        emailFeedback.innerHTML = "Email adresse"
    
        subjectFeedback.innerHTML = "Årsak til henvendelse"

        messageFeedback.innerHTML = "Melding"
    }
  
    const isValid = rule.test(input);
    console.log('RegTest:', `${inputType} ${isValid}`);
  
    if (!isValid) {
      inputType.style.outline = "1px solid red";
      feedback.innerHTML = ""
    } else {
      inputType.style.outline = "";
    }
    return isValid;
  };

const buttonFeedbackWrap = document.querySelector('.button-feedback-wrap');

const form = document.querySelector('.contactForm');
const submit = document.querySelector('#formButton');
const feedback = document.createElement('div');
feedback.style.position = "absolute";
feedback.style.left = "0";
feedback.style.color = "red";
buttonFeedbackWrap.appendChild(feedback);

form.onsubmit = (e) => {
    e.preventDefault();
    if(!regexTester(nameInput.value, nameReg, nameInput) || !regexTester(phoneInput.value, phoneReg, phoneInput) || !regexTester(emailInput.value, emailReg, emailInput) || !regexTester(subjectInput.value, subjectReg, subjectInput) || !regexTester(messageInput.value, messageReg, messageInput)) {
        feedback.innerHTML = "Feil format, sjekk at alt er riktig og prøv igjen.";
        return;
    }
    form.classList.add('hide');
    doneFunc();
};
const doneFunc = () => {
    const successMsg = document.createElement('div');
    successMsg.classList.add('successMsg')
    main.appendChild(successMsg);   
    const successMsgHeader = document.createElement('h3')
    const successMsgText = document.createElement('p')
    successMsgHeader.classList.add('successMsgHeader');
    successMsgText.classList.add('successMsgText');
    successMsgHeader.innerHTML = "Melding sendt!";
    successMsgText.innerHTML = "Takk for at du tar kontakt. Vi prøver å svare deg fortest mulig men kommer uansett tilbake til deg innen 2 arbeidsdager! Ha en super dag :)";
    successMsg.appendChild(successMsgHeader);
    successMsg.appendChild(successMsgText);
/*     successMsg.innerHTML = `Takk for at du tar kontakt! Vi kommer tilbake til deg innen 2 arbeidsdager.`; */
  };
