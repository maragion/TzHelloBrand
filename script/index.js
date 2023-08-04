function burger() {
    let x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

let toggle = document.getElementById("toggleButton")

toggle.addEventListener("click", burger)


// Slider
let swiper = new Swiper(".mySwiper", {

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
        }
    }
});

// form

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formModal");

    const close = document.getElementById("close")
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const request = formData.get("request");


        if (error === 0) {
            form.classList.add("sending");
            let response = await fetch("https://handsome-ruby-pinafore.cyclic.app/requests", {
                method: "Post",
                body: JSON.stringify(
                    {
                        "name": name,
                        "mail": email,
                        "request": request,
                    }),
                headers: {"Content-Type": "application/json"}

            })
            if (response.ok) {
                console.log(name, email, request);

                let result = await response.json();
                console.log(result)
                form.reset();
                form.classList.remove("sending")
                close.click()
                myModal2.open("#myModal2")
            } else {
                alert("Ошибка")
                form.classList.remove("sending")

            }
        } else {
            alert("Заполните все поля!")
        }
    }


    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            removeError(input);

            if (input.classList.contains("_email")) {
                if (checkEmail(input)) {
                    addError(input);
                    error++
                }
            } else {
                if (input.value === '') {
                    addError(input);
                    error++;
                }
            }

        }
        return error;
    }

    function addError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function removeError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function checkEmail(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

})

// Modal

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
});
const myModal2 = new HystModal({
    linkAttributeName: "data-hystmodal",
});












