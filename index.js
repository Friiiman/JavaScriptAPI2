const sliderEl = document.querySelector('.slider');
const prevButtonEl = sliderEl.querySelector('.slider__prev-button');
const nextButtonEl = sliderEl.querySelector('.slider__next-button');
const sliderImagesEl = sliderEl.querySelector('.slider__images');
const sliderTemplateEl = sliderImagesEl.querySelector('.slider__template');
const sliderDotEl = sliderEl.querySelector('.slider__dots');

const slides = [
    'https://i.postimg.cc/nhsTGkLQ/1.png',
    'https://i.postimg.cc/cLVh9nKk/2.png"',
    'https://i.postimg.cc/4NxWmZkP/3.png',
    'https://i.postimg.cc/FFZPrzq1/8.png',
    'https://i.postimg.cc/jd3Zf9Rb/7.png'
];



addImagesOnPage();
hideOtherSlide();
addDotsOnPage();
bindDotsToImages();
prevButtonEl.addEventListener('click', showPreviousSlide);
nextButtonEl.addEventListener('click', showNextSlide);



function addImagesOnPage() {
    let imgId = 0;
    const imageElements = slides.map((imgSrc) => {
        const templateHtml = sliderTemplateEl.content.cloneNode(true);
        templateHtml.querySelector(".slider__img").setAttribute('src', imgSrc);
        templateHtml.querySelector(".slider__img").setAttribute('data-id', imgId);
        imgId += 1;
        return templateHtml;
    });

    sliderImagesEl.innerHTML = "";
    sliderImagesEl.append(...imageElements);
};

function hideOtherSlide() {
    const sliderImageEls = sliderImagesEl.querySelectorAll('.slider__img');
    sliderImageEls.forEach((slide) => {
        slide.classList.add('hidden');
    });
    sliderImagesEl.firstElementChild.classList.remove('hidden');
    sliderImagesEl.firstElementChild.classList.add('active');
};

function showPreviousSlide() {
    const currentSlide = sliderImagesEl.querySelector('.active');
    const sliderDotsEls = sliderDotEl.querySelectorAll('.slider__dot');
    currentSlide.classList.remove('active');
    currentSlide.classList.add('hidden');
    if (currentSlide.previousElementSibling) {
        currentSlide.previousElementSibling.classList.remove('hidden');
        currentSlide.previousElementSibling.classList.add('active');
    } else {
        const newCurrentSlide = currentSlide.parentNode.lastElementChild;
        newCurrentSlide.classList.remove('hidden');
        newCurrentSlide.classList.add('active');
    };
    sliderDotsEls.forEach((dot) => {
        if (dot.getAttribute('data-id') === currentSlide.getAttribute('data-id') && dot.previousElementSibling) {
            dot.classList.remove('slider__dot--active');
            dot.previousElementSibling.classList.add('slider__dot--active');
        } else if (dot.getAttribute('data-id') === currentSlide.getAttribute('data-id') && !dot.previousElementSibling) {
            dot.classList.remove('slider__dot--active');
            const newCurrentDot = dot.parentNode.lastElementChild;
            newCurrentDot.classList.add('slider__dot--active');
        };
    });
};

function showNextSlide() {
    const currentSlide = sliderImagesEl.querySelector('.active');
    const sliderDotsEls = sliderDotEl.querySelectorAll('.slider__dot');
    currentSlide.classList.remove('active');
    currentSlide.classList.add('hidden');
    if (currentSlide.nextElementSibling) {
        currentSlide.nextElementSibling.classList.remove('hidden');
        currentSlide.nextElementSibling.classList.add('active');
    } else {
        const newCurrentSlide = currentSlide.parentNode.firstElementChild;
        newCurrentSlide.classList.remove('hidden');
        newCurrentSlide.classList.add('active');
    };
    sliderDotsEls.forEach((dot) => {
        if (dot.getAttribute('data-id') === currentSlide.getAttribute('data-id') && dot.nextElementSibling) {
            dot.classList.remove('slider__dot--active');
            dot.nextElementSibling.classList.add('slider__dot--active');
        } else if (dot.getAttribute('data-id') === currentSlide.getAttribute('data-id') && !dot.nextElementSibling) {
            dot.classList.remove('slider__dot--active');
            const newCurrentDot = dot.parentNode.firstElementChild;
            newCurrentDot.classList.add('slider__dot--active');
        };
    });
};

function addDotsOnPage() {
    for (let i = 0; i < slides.length; i++) {
        sliderDotEl.insertAdjacentHTML('beforeEnd',
            `<span class="slider__dot" data-id="${i}"></span>`);
    }
    sliderDotEl.firstElementChild.classList.add('slider__dot--active');
};

function bindDotsToImages() {
    const sliderDotsEls = sliderDotEl.querySelectorAll('.slider__dot');
    const sliderImageEls = sliderImagesEl.querySelectorAll('.slider__img');

    sliderDotsEls.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            sliderDotsEls.forEach((dot) => { dot.classList.remove('slider__dot--active') });
            sliderImageEls.forEach((img) => {
                if (img.classList.contains('active')) {
                    img.classList.remove('active');
                    img.classList.add('hidden');
                }
                if (img.getAttribute('data-id') === e.target.getAttribute('data-id')) {
                    img.classList.remove('hidden');
                    img.classList.add('active');
                }
            });
            e.target.classList.add('slider__dot--active');
        });
    });
};
