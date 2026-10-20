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

const stepOne=document.querySelector('.customize-step-one');
const stepTwo=document.querySelector('.customize-step-two');
const embedCode=document.getElementById('embedCode');
const copyCodeButton=document.getElementById('copyCodeButton');
const copyCodeLabel=copyCodeButton.querySelector('span');
const upgradeOverlay=document.getElementById('upgradeOverlay');
const upgradeExplore=document.getElementById('upgradeExplore');
const upgradeDismiss=document.getElementById('upgradeDismiss');
let upgradeTimer;
const escapeHtml=value=>value.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

function makeEmbedCode(){
  const number=phoneInput.value.replace(/\D/g,'')||'15551234567';
  const title=escapeHtml(titleInput.value.trim()||'Chat with me on WhatsApp!');
  const message=encodeURIComponent(messageInput.value.trim()||'Hi! I have a question.');
  const side=document.querySelector('input[name="position"]:checked')?.value==='left'?'left':'right';
  const demoNote=phoneInput.value.replace(/\D/g,'')?'':'<!-- Demo number: add your WhatsApp number in Step 1 before publishing. -->\n';
  return `${demoNote}<a class="getchatapp-whatsapp-button"
   href="https://wa.me/${number}?text=${message}"
   target="_blank" rel="noopener noreferrer"
   aria-label="${title}">
  <img src="https://alesoldato.github.io/getchatapp/assets/imgGroup63.svg"
       width="148" height="148" alt="">
</a>
<style>
  .getchatapp-whatsapp-button {
    position: fixed; ${side}: 24px; bottom: 24px;
    width: 80px; height: 80px; z-index: 2147483647;
    transition: transform .3s ease;
  }
  .getchatapp-whatsapp-button:hover { transform: translateY(-3px); }
  .getchatapp-whatsapp-button:focus-visible { outline: 2px solid #008e62; outline-offset: 5px; }
  .getchatapp-whatsapp-button img {
    position: absolute; left: 50%; top: 50%;
    width: 148px; height: 148px; max-width: none;
    transform: translate(-50%, -50%);
  }
</style>`;
}

function refreshEmbedCode(){embedCode.value=makeEmbedCode();copyCodeLabel.textContent='Copy Code'}
[titleInput,messageInput,phoneInput,...document.querySelectorAll('input[name="position"]')].forEach(input=>input.addEventListener('input',refreshEmbedCode));
refreshEmbedCode();

document.getElementById('nextStepButton').addEventListener('click',()=>{
  refreshEmbedCode();
  stepOne.hidden=true;
  stepTwo.hidden=false;
});
document.getElementById('backStepButton').addEventListener('click',()=>{
  clearTimeout(upgradeTimer);
  stepTwo.hidden=true;
  stepOne.hidden=false;
});
function showUpgrade(){upgradeOverlay.hidden=false;document.body.classList.add('modal-open');upgradeDismiss.focus()}
function closeUpgrade(restoreFocus=true){upgradeOverlay.hidden=true;document.body.classList.remove('modal-open');if(restoreFocus)copyCodeButton.focus({preventScroll:true})}
copyCodeButton.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(embedCode.value)}
  catch{
    embedCode.focus();embedCode.select();
    if(!document.execCommand('copy')){copyCodeLabel.textContent='Select code to copy';return}
  }
  copyCodeLabel.textContent='Code Copied';
  clearTimeout(upgradeTimer);
  upgradeTimer=setTimeout(showUpgrade,650);
});
upgradeDismiss.addEventListener('click',()=>closeUpgrade());
upgradeExplore.addEventListener('click',()=>{closeUpgrade(false);document.getElementById('prices').scrollIntoView({behavior:'smooth',block:'start'})});
upgradeOverlay.addEventListener('click',event=>{if(event.target===upgradeOverlay)closeUpgrade()});
upgradeOverlay.addEventListener('keydown',event=>{
  if(event.key==='Escape'){closeUpgrade();return}
  if(event.key!=='Tab')return;
  if(event.shiftKey&&document.activeElement===upgradeExplore){event.preventDefault();upgradeDismiss.focus()}
  else if(!event.shiftKey&&document.activeElement===upgradeDismiss){event.preventDefault();upgradeExplore.focus()}
});

const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu')});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));
