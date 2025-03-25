document.addEventListener('DOMContentLoaded', function() {
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spin-btn');
    const result = document.getElementById('result');
    
    // Eidi amounts and colors for each section
    const sections = [
        { amount: '10', color: '#FF6384' },
        { amount: '2', color: '#36A2EB' },
        { amount: '5', color: '#FFCE56' },
        { amount: '20', color: '#4BC0C0' },
        { amount: '50', color: '#9966FF' },
        { amount: '40', color: '#FF9F40' },
        { amount: '6', color: '#8AC249' },
        { amount: '9', color: '#EA5F89' }
    ];
    
    // Create wheel sections
    function createWheel() {
        const sectionAngle = 360 / sections.length;
        
        sections.forEach((section, index) => {
            const sectionElement = document.createElement('div');
            sectionElement.className = 'section';
            sectionElement.textContent = section.amount;
            sectionElement.style.backgroundColor = section.color;
            
            // Position the text correctly
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
        
        // Calculate the exact stopping position first
        const sectionAngle = 360 / sections.length;
        const targetSection = Math.floor(Math.random() * sections.length);
        
        // Calculate the exact degrees needed to stop at the target section
        // 2-5 full rotations plus alignment to the section
        const fullRotations = 2 + Math.floor(Math.random() * 4); // 2-5 rotations
        const spinDegrees = (fullRotations * 360) + (targetSection * sectionAngle);
        
        currentRotation = spinDegrees;
        
        wheel.style.transform = `rotate(${-currentRotation}deg)`;
        
        // Determine the winning section after spinning
        setTimeout(() => {
            const winningAmount = sections[targetSection].amount;
            result.textContent = `You won: ${winningAmount} Taka`;
            isSpinning = false;
            spinBtn.disabled = false;
        }, 4000);
    });
});