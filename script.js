const logoTrack=document.getElementById('logoTrack');
const logoSet=Array.from({length:8},()=>'<span class="logo-mark"><i></i>orbit</span>').join('');
logoTrack.innerHTML=logoSet+logoSet;

const reviews=[
  {name:'Kelly Smith',company:'Adobe',quote:'Constantly chasing the high of creating a new GetChatApp integration in other areas of my life',image:'imgImage13.png'},
  {name:'John Jackson',company:'Decathlon',quote:'Overall I highly recommend this software. I wish more businesses provided this service.',image:'imgImage9.png'},
  {name:'Angela Gasser',company:'Zendesk',quote:'Your small business heart learns there’s a GetChatApp integration that makes your life SO much easier.',image:'imgImage18.png'},
  {name:'Aaron Watson',company:'Super.one',quote:'I literally have my own product running off of GetChatApp. It’s a great and powerful tool!',image:'imgImage11.png'},
  {name:'William Jones',company:'Mowjow',quote:'LiveChat is an amazing way to reach out to your customers.',image:'imgImage19.png'},
  {name:'Ethan McMorris',company:'Decathlon',quote:'Awesome tool to resolve customer requests at all times.',image:'imgImage20.png'},
  {name:'Anna Lee',company:'Decathlon',quote:'I fangirl over GetChatApp on the daily. Actually changes your life.',image:'imgImage12.png'}
];
function card(review){return `<article class="testimonial-card"><div class="testimonial-person"><img src="assets/${review.image}" alt=""><div><strong>${review.name}</strong><span>${review.company}</span></div></div><p>${review.quote}</p><div class="stars" aria-label="Five out of five stars">★★★★★</div></article>`}
const left=[...reviews.slice(0,4),...reviews.slice(0,4)];
const right=[...reviews.slice(3),...reviews.slice(3)];
document.getElementById('testimonialsLeft').innerHTML=left.map(card).join('');
document.getElementById('testimonialsRight').innerHTML=right.map(card).join('');

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach((element,index)=>{element.style.transitionDelay=`${Math.min(index%3,2)*80}ms`;observer.observe(element)});

const titleInput=document.getElementById('customTitle');
const messageInput=document.getElementById('customMessage');
const phoneInput=document.getElementById('mobileNumber');
const previewTitle=document.getElementById('previewTitle');
const previewMessage=document.getElementById('previewMessage');
const previewPhone=document.getElementById('previewPhone');
const previewStage=document.querySelector('.preview-stage');
titleInput.addEventListener('input',()=>{previewTitle.textContent=titleInput.value||'Chat with me on WhatsApp!'});
messageInput.addEventListener('input',()=>{previewMessage.textContent=messageInput.value||'Your message will appear here.'});
phoneInput.addEventListener('input',()=>{previewPhone.textContent=phoneInput.value?`WhatsApp: ${phoneInput.value}`:''});
document.querySelectorAll('input[name="position"]').forEach(input=>input.addEventListener('change',()=>previewStage.classList.toggle('left',input.value==='left'&&input.checked)));

const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu')});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
