let time = 0;
const startBtn = document.getElementById('startBtn');

startBtn.addEventListener('click', async () => {
    // Backend'den veriyi çek
    const response = await fetch('http://localhost:8000/schedule');
    const schedule = await response.json();
    
    // Sayaç 3 saniyede 1 artacak şekilde (senin isteğinle)
    let interval = setInterval(() => {
        time++;
        document.getElementById('timer').innerText = `${time} dk`;
        
        // Burada schedule içindeki 'start' ve 'finish' değerlerine göre 
        // DOM üzerindeki .box elemanlarını .busy class'ı ile güncelle
        
        if (time >= 200) clearInterval(interval); // Örnek durma noktası
    }, 3000);
});
