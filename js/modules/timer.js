function timer(timerSelector, deadline) {
  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;

    const total = Date.parse(endtime) - Date.parse(new Date());

    if (total > 0) {
      (days = Math.floor(total / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((total / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((total / (1000 * 60)) % 60)),
        (seconds = Math.floor((total / 1000) % 60));
    } else {
      (days = 0), (hours = 0), (minutes = 0), (seconds = 0);
    }

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerText = getZero(t.days);
      hours.innerText = getZero(t.hours);
      minutes.innerText = getZero(t.minutes);
      seconds.innerText = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(timerSelector, deadline);
}

export default timer;
