$(document).ready(async function () {
    await renderFirstContent();


    $(document).on('click', '#aite-performlogin', async function () {
        let email = $(document).find('#aite-loginemail').val();
        let password = $(document).find('#aite-loginpassword').val();
        let remember_me = $(document).find('#aite-loginremember').is(':checked');

        clearErrors();

        const authToken = await performlogin(email, password);
        if(authToken.valid === false){
            displayFormErrors(authToken.errors);
            return;
        }
        const is_connected = await is_user_authenticated();

        if (is_connected === true) {
            await drawContent('home');
            console.log("logged in!!");
        }
    });


    // $(document).on('mouseup', async function(e){
    //     console.log('mouseup');
    //     await displayActionsTooltip(e);
    // });

    // $(document).on('mousedown', async function(e){
    //     console.log('mousedown');
    //     await displayActionsTooltip(e);
    // });
});



// document.addEventListener("DOMContentLoaded", function () {
//     console.info("Extension Loaded!!");

//     drawContent('login');




//     // login user
//     document.getElementById('aite-performlogin').addEventListener('click', function () {
//         alert('heyy');
//         // let email = document.getElementById('aite-loginemail').value;
//         // let password = document.getElementById('aite-loginpassword').value;
//         // let remember_me = document.getElementById('aite-loginremember').value;

//         // alert({
//         //     email,
//         //     password,
//         //     remember_me
//         // }.toJSON());
//     });
// });


