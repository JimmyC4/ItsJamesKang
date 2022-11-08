console.log("JavaScript is working!")

// var d = document.getElementById("div1");
// d.className += " otherclass";

// Navigation Hide
var scroll1 = window.pageYOffset;
document.querySelector('nav').style.top = "-110px"; //hide nav on start

var delayInMilliseconds = 1400; //1 second

setTimeout(function() {
    document.querySelector('nav').style.top = "0"; //hide nav on start
}, delayInMilliseconds);

window.onscroll = function(){
    var scroll2 = window.pageYOffset;
    if (scroll1 > scroll2){
        document.querySelector('nav').style.top = "0";
    }
    else{
        document.querySelector('nav').style.top = "-110px";
    }
    scroll1 = scroll2;

    // Fading content
    reveal();
    highlight();
}
// window.addEventListener('scroll', reveal);

function reveal()
    {
        var reveals = document.querySelectorAll('.reveal');

        for(var i = 0; i < reveals.length; i++)
        {
            var windowheight = window.innerHeight;
            var revealtop = reveals[i].getBoundingClientRect().top;
            var revealpoint = 100; //150normal
            if(revealtop < windowheight - revealpoint)
            {
                reveals[i].classList.add('active');
            }
            else if (reveals[i].classList.contains('reactivate'))
            {
                reveals[i].classList.remove('active');
            }
        }
    }

//TWITSTING TEXT
const menuItems = [...document.querySelectorAll('.menu-item')];

menuItems.forEach(item => {

    let word = item.children[0].children[0].innerText.split('');
    // console.log(word)
    item.children[0].innerHTML = '';
    word.forEach((letter, idx) => {
        item.children[0].innerHTML += `<span style="--index: ${idx};">${letter}</span>`;
    })

    let cloneDiv = item.children[0].cloneNode(true);
    cloneDiv.style.position = 'absolute';
    cloneDiv.style.left = '0';
    cloneDiv.style.top = '0'
    item.appendChild(cloneDiv);

    //Reference: https://www.youtube.com/watch?v=pk14lE-IcIM
})

//smooth scroll
let current = 0;
let target = 0;
let ease = .06;

let windowWidth, containerHeight, imageHeight, skewDiff;

let container = document.querySelector('.container_smooth');
let images = Array.from(document.querySelectorAll('.img_wrap'));
console.log(images)

// images.forEach((image, idx) =>{
//     image.style.backgroundImage = `url(./images/${idx + 1}.jpg)`
// })

function lerp(start, end, t){
    return start * (1-t) + end * t;
}

function setTransform(el, transform){
    el.style.transform = transform;
}

function setupAnimation(){
    windowWidth = window.innerWidth;
    containerHeight = container.getBoundingClientRect().height;
    imageHeight = containerHeight / (windowWidth > 760 ? images.length / 2 : images.length);

    document.body.style.height = `${containerHeight}px`;
    smoothScroll()
}

function smoothScroll(){
    current = lerp(current, target, ease)
    current = parseFloat(current.toFixed(2));
    target = window.scrollY
    skewDiff = (target - current) * .03

    setTransform(container, `translateY(${-current}px) skewY(${skewDiff}deg)`);
    // updateImages()
    requestAnimationFrame(smoothScroll)
}

function updateImages(){
    let ratio = current / imageHeight;
    let intersectionRatioIndex, intersectionRatioValue;

    images.forEach((image, idx) =>{
        intersectionRatioIndex = windowWidth > 760 ? parseInt(idx / 2) : idx;
        intersectionRatioValue = ratio - intersectionRatioIndex;
        setTransform(image, `translateY(${intersectionRatioValue * 100}px)`)
    })
}

setupAnimation();

// text animate in
let listItems = [...document.querySelectorAll('li.animated-text')];

let options = {
    rootMargin: '-10%', //-10% means when the screen hits bottom 10% it will appear
    threshhold: .5 // 1 means whole item must be viewable to apply animation
}

let observer = new IntersectionObserver(showItem, options);

function showItem(entries){
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            let letters = [...entry.target.querySelectorAll('span')];
            letters.forEach((letter,idx) => {
                setTimeout(()=>{
                    letter.classList.add('active'); 
                }, idx * 15) //in milliseconds
            })
            entry.target.children[0].classList.add('active');
        }
    })
}

listItems.forEach(item =>{
    
    let newString = '';
    let itemText = item.children[0].innerText.split('');
    itemText.map(letter => (newString += letter == ' ' ? `<span class='gap'></span>` : `<span>${letter}</span>`))
    item.innerHTML = newString;

    observer.observe(item)
})

//Clipboard copy

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", "jameskang99@outlook.com");
  }

//Scrollbar
function disableScrolling() {
    setTimeout(function() {
        document.body.style.overflow = 'hidden';
    }, 1000);
}
  
function enableScrolling() {
    document.body.style.overflow = '';
}

//Lottie anim
var animation = bodymovin.loadAnimation({
    container: document.getElementById("anim"),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'anim-logo.json',
})
var animation2 = bodymovin.loadAnimation({
    container: document.getElementById("anim2"),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'anim-logo.json',
})
animation.setSpeed(1.8);
animation2.setSpeed(1.8);

let iconMenu = document.querySelector('.bodymovinanim');

    var directionMenu = 1;
        iconMenu.addEventListener('mouseenter', (e) => {
        animation.setDirection(directionMenu);
        animation.play();
    });
        iconMenu.addEventListener('mouseleave', (e) => {
        animation.setDirection(-directionMenu);
        // animation.play();
        animation.stop();
    });
    
let iconMenu2 = document.querySelector('.bodymovinanim2');

    var directionMenu = 1;
        iconMenu2.addEventListener('mouseenter', (e) => {
        animation2.setDirection(directionMenu);
        animation2.play();
    });
        iconMenu2.addEventListener('mouseleave', (e) => {
        animation2.setDirection(-directionMenu);
        // animation.play();
        animation2.stop();
    });

    // Hover Effect ---------

    class HoverButton {
        constructor(el) {
          this.el = el;
          this.hover = false;
          this.calculatePosition();
          this.attachEventsListener();
        }
        
        attachEventsListener() {
          window.addEventListener('mousemove', e => this.onMouseMove(e));
          window.addEventListener('resize', e => this.calculatePosition(e));
        }
        
        calculatePosition() {
          gsap.set(this.el, {
            x: 0,
            y: 0,
            scale: 1
          });
          const box = this.el.getBoundingClientRect();
          this.x = box.left + (box.width * 0.5);
          this.y = box.top + (box.height * 0.5);
          this.width = box.width;
          this.height = box.height;
        }
        
        onMouseMove(e) {
          let hover = false;
          let hoverArea = (this.hover ? 0.7 : 0.5);
          let x = e.clientX - this.x;
          let y = e.clientY - this.y;
          let distance = Math.sqrt( x*x + y*y );
          if (distance < (this.width * hoverArea)) {
             hover = true;
              if (!this.hover) {
                this.hover = true;
              }
              this.onHover(e.clientX, e.clientY);
          }
          
          if(!hover && this.hover) {
            this.onLeave();
            this.hover = false;
          }
        }
        
        onHover(x, y) {
          gsap.to(this.el,  {
            x: (x - this.x) * 0.4,
            y: (y - this.y) * 0.4,
            scale: 1.15,
            ease: 'power2.out',
            duration: 0.4
          });
          this.el.style.zIndex = 10;
        }
        onLeave() {
          gsap.to(this.el, {
            x: 0,
            y: 0,
            scale: 1,
            ease: 'elastic.out(1.2, 0.4)',
            duration: 0.7
          });
          this.el.style.zIndex = 1;
        }
      }
      
      const btn1 = document.querySelector('li:nth-child(1) button');
      new HoverButton(btn1);
      
      const btn2 = document.querySelector('li:nth-child(2) button');
      new HoverButton(btn2);
      
      const btn3 = document.querySelector('li:nth-child(3) button');
      new HoverButton(btn3);

      // Email Toast

      function showToast(text){
        var x=document.getElementById("toast");
        x.classList.add("show");
        x.innerHTML=text;
        setTimeout(function(){
          x.classList.remove("show");
        },3000);
    }

    // Sticky text boxes

    // window.addEventListener('scroll', stickyBoxes);

    function highlight()
        {
            var boxes = document.querySelectorAll('.box');

            for(var i = 0; i < boxes.length; i++)
            {
                var windowheight = window.innerHeight;
                var revealtop = boxes[i].getBoundingClientRect().top;
                var revealpoint = 150; //150normal
                if(revealtop < windowheight - revealpoint)
                {
                    boxes[i].classList.add('highlight');
                }
                else if (boxes[i].classList.contains('deactivate'))
                {
                    boxes[i].classList.remove('highlight');
                }
            }
        }

//TOOLTIP
function initTooltip() {
	const tooltips = Array.from(document.querySelectorAll('[data-tooltip-container]'));

	tooltips.map(tooltip => {
		tooltip.addEventListener('mouseover', handleMouseOver);
	})

	function handleMouseOver() {
		const tooltipbox = createTooltipBox(this);

		handleMouseMove.tooltipbox = tooltipbox;
		this.addEventListener('mousemove', handleMouseMove);

		handleMouseLeave.tooltipbox = tooltipbox;
		handleMouseLeave.element = this;
		this.addEventListener('mouseleave', handleMouseLeave);
	}

	const handleMouseLeave = {
		handleEvent() {
			this.tooltipbox.remove();
			this.element.removeEventListener('mousemove', handleMouseMove);
			this.element.removeEventListener('mouseleave', handleMouseLeave);
		}
	}

	const handleMouseMove = {
		handleEvent(e) {
			this.tooltipbox.style.top = e.clientY + 25 + 'px';
			this.tooltipbox.style.left = e.clientX + 13 +'px';
		}
	}

	function createTooltipBox(el) {
		let tooltip = document.createElement('div');
		tooltip.innerText = el.getAttribute('data-tooltip-label');
		tooltip.classList.add('tooltip');

		document.body.appendChild(tooltip);
		
		return tooltip;

	}
}

initTooltip();

var camera = window.FontAwesome.icon({ prefix: 'fas', iconName: 'camera' })