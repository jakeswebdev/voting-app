$(document).ready(function(){

    console.log('Running client side code');

    class CreatePoll{
        constructor(title,author,creationDate,totalVotes,numberOfOptions,options){
            this.title = title;
            this.author = author;
            this.creationDate = creationDate;
            this.totalVotes = totalVotes;
            this.numberOfOptions = numberOfOptions;
            this.options = options;
        }

    }

    class CreateTitle{
        constructor(text){
            this.text = text;
        }
    }


    /*$('#pollBtn').on('click',createAPoll);*/
    $("#title_submit").on('click',addTitleToDb);

    // Get the modal
    let modal = document.getElementById('myModal');

    // Get the button that opens the modal
    let btn = document.getElementById("pollBtn");

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /*
    const clickMe = document.getElementById('pollBtn');

    clickMe.addEventListener('click',function(e){
        console.log('button clicked');
        fetch('/givemepolls',{method: 'POST'})
            .then(function(response){
                if(response.ok){
                    $('.show_poll').append()
                }
            })
    });*/

    

    function checkTitleValue(){
        let value = document.getElementById('titleInputField').value;
        if(value.length > 0 && isNaN(value)){
            console.log(value);
            return value;
        }
        else{
            return;
        }
    }

    function addTitleToDb(){
        let text = checkTitleValue();
        let newTitle = new CreateTitle(text);
        console.log(newTitle.text);
        $.ajax({
            url: '/addpoll',
            type: 'POST',
            dataType: 'json',
            data: ({title: newTitle.text}),
            contenType: 'application/json',
            success:function(data){
                console.log("added "+ newTitle + " to the db");
            }
        });
    }


})