const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");

const amounts = [10, 2, 5, 20, 50, 40, 6, 9];
let isSpinning = false;

spinBtn.addEventListener("click", () => {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;
    result.textContent = "Spinning...";

    const randomAngle = Math.floor(Math.random() * 360) + 720; // At least 2 full spins
    wheel.style.transform = `rotate(${randomAngle}deg)`;

    setTimeout(() => {
        const normalizedAngle = randomAngle % 360;
        const sectionIndex = Math.floor((360 - normalizedAngle) / 45) % 8;
        const wonAmount = amounts[sectionIndex];
        result.textContent = `You won ${wonAmount}৳!`;
        isSpinning = false;
        spinBtn.disabled = false;
    }, 4000); // Match with CSS transition duration
});