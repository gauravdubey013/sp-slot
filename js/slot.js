let isGreen = false;

function handleSlotClick(slot) {
    if (isGreen) {
        slot.style.backgroundColor = 'red';
    } else {
        slot.style.backgroundColor = 'green';
    }
    
    isGreen = !isGreen;
}