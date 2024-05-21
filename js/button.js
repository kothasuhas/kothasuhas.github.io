setActive(true);

document.getElementById('trueButton').addEventListener('click', function() {
    setActive(true);
});

document.getElementById('falseButton').addEventListener('click', function() {
    setActive(false);
});

function setActive(isTrue) {
    const trueButton = document.getElementById('trueButton');
    const falseButton = document.getElementById('falseButton');

    if (isTrue) {
        trueButton.classList.add('active');
        falseButton.classList.remove('active');
    } else {
        falseButton.classList.add('active');
        trueButton.classList.remove('active');
    }
}