function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function validateForm() {
    //trim elimina gli spazzi all'inizio e alla fine
    var firstname=$('#firstname').val().trim();
    var lastname=$('#lastname').val().trim();
    var username=$('#username').val().trim();                              //creo delle variabili a cui associare il valore(.val()) degli id dell'html 
    var password=$('#password').val().trim();
    var confirmpassword=$('#confirmpassword').val().trim();
    var email = $('#email').val().trim();

                                                                        //eseguo i controlli necessari su ogni dato inserito 

    if(firstname.length < 4){
        return false;
    }

    if(lastname.length < 4){
        return false;
    }

    if(username.length < 4 || username.length > 20){                      //dopo tutti i controlli se nessuno è errato la funzione sarà true e quindi l'utente sarà registrato
        return false;                                                     
    }

    if(password != confirmpassword){
        return false;
    }
    
    if(!validateEmail(email)){
        return false;
    }
                                            
    if($('#form').find('is-invalid').length >= 0){  //- CVU - all'invio del form se il campo presenta la calsse 'is-invalid' restituisci errore
        return false;
    }
    return true;
};
                                                                            //dopo la funzione esegue l'istruzione di bloccare la registrazione se anche solo uno dei campi sopra è errato
$('#form').submit(function (e) {

    if (! validateForm()) {    //il punto esclamatativo vale come not
        e.preventDefault();
        alert("paccone");
    }
});

//C O N T R O L L O - V A L I D I T A' - U S E R N A M E  (CVU)

$('#username').on("blur",function(){  //esegue un istruzione col campo($('username')) dove solo all'intereazione ".on("blur", function())" mi specifica determinate informazioni con una function

    var el=$(this);               //creo un elemento(el), che prende il valore del campo 'username'

    $.ajax({    //con ajax invio i dati
        url:'form/username.php', //nel documento php
        data: {username: el.val()}, //dove gli specifico che la variabile username esistente nel php ha il valore del campo username
        method:"POST",  //con post invio i dati appena specificati
        dataType:'json',
        success: function(result){  //nel caso in cui l'istruzione php dica che non esista ridondanza con l'username esegue la funzione
            if(result.valid){ //valid perchè è stato usato come parametro di risultato all'interno del php
                el.addClass("is-valid");
            }                           
            else {                        //queste istruzioni definiscono il colore del css TRAMITE BOOTSTRAP, se non volessi usufruire di bootsrap dovrei creare un'alra classe su css e aggiungerla nello stesso modo
                el.addClass("is-invalid");  //aggiunta nuova istruzione sulla funzione, vai a controllare
            }
        }
    });

});



