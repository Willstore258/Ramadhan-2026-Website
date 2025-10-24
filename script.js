// script.js
document.addEventListener('DOMContentLoaded', ()=>{

  const menuButtons = document.querySelectorAll('.menu-btn');
  const quranSection = document.getElementById('quran-section');
  const niatSection = document.getElementById('niat-section');
  const clockSection = document.getElementById('clock-section');
  const contentPanels = [quranSection, niatSection, clockSection];
  const juzListEl = document.getElementById('juz-list');
  const ayatContent = document.getElementById('ayat-content');
  const ayatTitle = document.getElementById('ayat-title');
  const niatTitle = document.getElementById('niat-title');
  const niatContent = document.getElementById('niat-content');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const closeModal = document.getElementById('close-modal');

  // Sample niat content (Arabic + Indonesian)
  const niatData = {
    'niat-puasa':{
      title:'Niat Puasa Ramadhan',
      text:'نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ لِلَّهِ تَعَالَى

Indonesian: Saya niat puasa esok hari karena Allah Ta'ala.'
    },
    'niat-tarawih':{
      title:'Niat Sholat Tarawih',
      text:'نَوَيْتُ أَنْ أُصَلِّيَ سُنَّةَ التَّرَاوِيحِ رَكْعَتَيْنِ لِلَّهِ تَعَالَى

Indonesian: Saya niat sholat Tarawih karena Allah Ta'ala.'
    },
    'niat-witir':{
      title:'Niat Sholat Witir 1 & 2 Rakaat',
      text:'نَوَيْتُ أَنْ أُصَلِّيَ وَتِرًا رَكْعَةً أَوْ رَكْعَتَيْنِ لِلَّهِ تَعَالَى

Indonesian: Saya niat sholat Witir 1 atau 2 rakaat karena Allah Ta'ala.'
    }
  };

  // Build 30 juz list
  for(let i=1;i<=30;i++){
    const btn = document.createElement('button');
    btn.className='juz-item';
    btn.textContent = 'Juz '+i;
    btn.dataset.juz = i;
    btn.addEventListener('click', ()=> openJuz(i));
    juzListEl.appendChild(btn);
  }

  // Example content for a few juz (others placeholders)
  const juzExamples = {
    1:{
      title:'Juz 1 - Al-Fatihah & Al-Baqarah (awal)',
      ayat:`Contoh ayat (placeholder):
بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ
الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ

Indonesian translation (contoh):
Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.
Segala puji bagi Allah, Tuhan semesta alam.`
    },
    30:{
      title:'Juz 30 - Juz Amma (contoh)',
      ayat:`Contoh ayat (placeholder):
إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ
وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا

Indonesian translation (contoh):
Apabila telah datang pertolongan Allah dan kemenangan,
dan kamu lihat manusia memasuki agama Allah berbondong-bondong.`
    }
  };

  function openJuz(n){
    const data = juzExamples[n] || {title:'Juz '+n, ayat:'Ayat untuk juz '+n+' belum diisi. Ganti placeholder ini dengan teks Al-Qur'an dan artinya jika diperlukan.'};
    // Show in modal for better reading
    modalTitle.textContent = data.title;
    modalBody.textContent = data.ayat;
    modal.classList.remove('hidden');
  }

  closeModal.addEventListener('click', ()=> modal.classList.add('hidden'));
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.classList.add('hidden') });

  // Menu actions
  menuButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const action = btn.dataset.action;
      // hide all panels
      contentPanels.forEach(p=>p.classList.add('hidden'));
      if(action === 'quran'){
        quranSection.classList.remove('hidden');
      } else if(action.startsWith('niat')){
        niatSection.classList.remove('hidden');
        const data = niatData[action];
        niatTitle.textContent = data.title;
        niatContent.textContent = data.text;
      } else if(action === 'clock'){
        clockSection.classList.remove('hidden');
      }
      window.scrollTo({top:0,behavior:'smooth'});
    });
  });

  // Digital clock
  function updateClock(){
    const el = document.getElementById('clock');
    const now = new Date();
    const hh = String(now.getHours()).padStart(2,'0');
    const mm = String(now.getMinutes()).padStart(2,'0');
    const ss = String(now.getSeconds()).padStart(2,'0');
    el.textContent = hh + ':' + mm + ':' + ss;
  }
  setInterval(updateClock,1000);
  updateClock();

});
