const iconMoon = document.querySelector('.night');
const iconSun = document.querySelector('.day');

const body = document.body;

/**
 * Initial states of the icons
 */
iconMoon.style.display = 'block';
iconSun.style.display = 'none';

const btnMode = document.querySelector('.btn');
btnMode.addEventListener('click', () => {
    /**
     * Add/Remove the 'active' class depending on
     * the Day/Night Mode
     */
    body.classList.toggle('active');

    /**
     * Change the text of the button
     */
    changeText(body.classList.contains('active') ? 'Day Mode' : 'Night Mode');

    /**
     * Switch the icon
     */
    switchIcon(body.classList.contains('active'));
});

/**
 * Function to change the text of the button
 */
function changeText(mode) {
    const textElement = document.querySelector('.text-mode');
    textElement.innerText = mode;
    textElement.style.color = mode === 'Day Mode' ? '#333' : 'white';
}

/**
 * Function to switch the icon
 */
function switchIcon(isDayMode) {
    if (isDayMode) {
        iconMoon.style.display = 'none';
        iconSun.style.display = 'block';
    } else {
        iconMoon.style.display = 'block';
        iconSun.style.display = 'none';
    }
}

/**
 * Optional: apply default mode on load
 */
document.addEventListener('DOMContentLoaded', () => {
    const isDayMode = body.classList.contains('active');
    changeText(isDayMode ? 'Day Mode' : 'Night Mode');
    switchIcon(isDayMode);
});