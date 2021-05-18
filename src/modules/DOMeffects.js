export const performAllEffects = function() {
    (function dropDownEffect() {
        const dataProjectsDropdown = document.querySelector('[data-projects-dropdown]');
        const caret = dataProjectsDropdown.querySelector('i');

        dataProjectsDropdown.addEventListener('click', () => {
            caret.classList.toggle(`fa-caret-down`);
            caret.classList.toggle(`fa-caret-up`);
        })
    })();

    (function navEffect() {
        const aside = document.querySelector('aside');
        document.querySelector('.openNav').addEventListener('click', () => {
            if (aside.style.marginLeft === "-250px") {
                aside.style.marginLeft = "0";
            } else {
                aside.style.marginLeft = "-250px";
            }
        });

        const mq = window.matchMedia('(max-width: 850px)')
        document.querySelector('section').addEventListener('click', () => {
            if (mq.matches) {
                aside.style.marginLeft = "-250px";
            }
        })

        function checkMediaWidthAndDoTasks(x) {
            if (x.matches) { aside.style.marginLeft = "-250px"; } else { aside.style.marginLeft = "0px"; }
        }
        checkMediaWidthAndDoTasks(mq);
        mq.addListener(() => {
            checkMediaWidthAndDoTasks(mq);
        })
    })();

    (function sortSelectEffect() {
        const dataSorts = document.querySelectorAll('[data-sort]');
        const sortBy = document.querySelector('[sort-by]');
        dataSorts.forEach(e => e.addEventListener('click', () => {
            sortBy.innerText = e.innerText;
        }))
    })();

    (function deleteProjectEffect() {
        const dataProjectNames = document.querySelectorAll('[data-project-name]');
        dataProjectNames.forEach(e => e.addEventListener('mouseover', () => {
            const icon = e.querySelector('i');
            icon.style.cssText = "color:rgba(0, 0, 0, 0.2);"
            icon.classList.replace('fa-tasks', 'fa-trash-alt');

        }))
        dataProjectNames.forEach(e => e.addEventListener('mouseout', () => {
            const icon = e.querySelector('i');
            icon.classList.replace('fa-trash-alt', 'fa-tasks');
            icon.style.color = "black"
        }))
    })();

    (function countCharacterEffect() {
        const xyz = document.querySelectorAll('[xyz]');
        xyz.forEach(e => e.addEventListener('input', () => {
            if (e.getAttribute('id') === "title") {
                checkLength(30, "title");
            }
            if (e.getAttribute('id') === "description") {
                checkLength(120, "description");
            };

            function checkLength(x, a) {
                if (e.value.length < x) {
                    document.querySelector(`[${a}-limit]`).style.color = "rgba(0, 0, 0, 0.5)";
                    document.querySelector(`[${a}-count]`).innerText = e.value.length;
                } else if (e.value.length === x) {
                    document.querySelector(`[${a}-limit]`).style.color = "red";
                    document.querySelector(`[${a}-count]`).innerText = e.value.length;
                } else if (e.value.length > x) {
                    e.value = e.value.slice(0, x);
                }
            }
        }));
    })();
};