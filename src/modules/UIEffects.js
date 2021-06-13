export const performUIEffects = function () {
  (function dropDownEffect () {
    const dataProjectsDropdown = document.querySelector('[data-projects-dropdown]')
        const caret = dataProjectsDropdown.querySelector('i')

        dataProjectsDropdown.addEventListener('click', () => {
      caret.classList.toggle('fa-caret-down')
            caret.classList.toggle('fa-caret-up')
        })
  })();

  (function navEffect () {
    const aside = document.querySelector('aside')
        document.querySelector('.openNav').addEventListener('click', () => {
      if (aside.style.marginLeft === '-250px') {
        aside.style.marginLeft = '0';
      } else {
        aside.style.marginLeft = '-250px';
      }
    })

        const mq = window.matchMedia('(max-width: 950px)')
    document.querySelector('section').addEventListener('click', () => {
      if (mq.matches) {
        aside.style.marginLeft = '-250px';
      }
    })

    function checkMediaWidthAndDoTasks (x) {
      if (x.matches) { aside.style.marginLeft = '-250px'; } else { aside.style.marginLeft = '0px'; }
    }
    checkMediaWidthAndDoTasks(mq)
        mq.addListener(() => {
      checkMediaWidthAndDoTasks(mq)
        })
  })()

};
