document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin-btn');
    const result = document.getElementById('result');
    
    // Eidi amounts and colors for each section
    const sections = [
        { amount: '10 Taka', color: '#FF6384' },
        { amount: '2 Taka', color: '#36A2EB' },
        { amount: '5 Taka', color: '#FFCE56' },
        { amount: '20 Taka', color: '#4BC0C0' },
        { amount: '50 Taka', color: '#9966FF' },
        { amount: '40 Taka', color: '#FF9F40' },
        { amount: '6 Taka', color: '#8AC249' },
        { amount: '9 Taka', color: '#EA5F89' }
    ];
    
    // Create wheel sections
    function createWheel() {
        const sectionAngle = 360 / sections.length;
        
        sections.forEach((section, index) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'section';
            sectionElement.textContent = section.amount;
            sectionElement.style.backgroundColor = section.color;
            sectionElement.style.transform = `rotate(${index * sectionAngle}deg)`;
            
            // Position the text correctly
            const textAngle = index * sectionAngle + sectionAngle / 2;
            sectionElement.style.transform = `rotate(${index * sectionAngle}deg) skewY(${90 - sectionAngle}deg)`;
            
            wheel.appendChild(sectionElement);
        });
    }
    
    createWheel();
    
    let isSpinning = false;
    let currentRotation = 0;
    
    spinBtn.addEventListener('click', function() {
        if (isSpinning) return;
        
        isSpinning = true;
        result.textContent = '';
        spinBtn.disabled = true;
        
        // Random rotation (between 2-5 full rotations plus a random section)
        const spinDegrees = 720 + Math.floor(Math.random() * 1080) + (360 / sections.length) * Math.floor(Math.random() * sections.length);
        currentRotation += spinDegrees;
        
        wheel.style.transform = `rotate(${-currentRotation}deg)`;
        
        // Determine the winning section after spinning
        setTimeout(() => {
            const normalizedRotation = currentRotation % 360;
            const sectionAngle = 360 / sections.length;
            const winningIndex = Math.floor((360 - normalizedRotation) / sectionAngle) % sections.length;
            const winningAmount = sections[winningIndex].amount;
            
            result.textContent = `You won: ${winningAmount}`;
            isSpinning = false;
            spinBtn.disabled = false;
        }, 4000);
    });
});