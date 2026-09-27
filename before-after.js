/* ZeeFrames — Before / After block */
(function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    function init(root) {
        var buttons = root.querySelectorAll('.zba-seg-btn');
        var value = root.querySelector('.zba-stat-val');
        var state = 'before';
        var touched = false;
        var timer = null;

        function count(to) {
            clearInterval(timer);
            var current = parseInt(value.textContent, 10) || 0;
            if (reduce.matches || current === to) {
                value.textContent = to;
                return;
            }
            // up: in step with the cells lighting one by one; down: fast
            timer = setInterval(function () {
                current += to > current ? 1 : -1;
                value.textContent = current;
                if (current === to) clearInterval(timer);
            }, to > current ? 110 : 45);
        }

        function set(next) {
            if (next === state) return;
            state = next;
            root.classList.toggle('is-after', next === 'after');
            buttons.forEach(function (b) {
                b.setAttribute('aria-pressed', String(b.getAttribute('data-state') === next));
            });
            count(next === 'after' ? 6 : 0);
        }

        buttons.forEach(function (b) {
            b.addEventListener('click', function () {
                touched = true;
                set(b.getAttribute('data-state'));
            });
        });

        // a cell and its pin on the phone light up together
        function focus(i) {
            root.querySelectorAll('.zba-app [data-t]').forEach(function (el) {
                el.classList.toggle('is-focus', el.getAttribute('data-t') === i);
            });
        }

        root.querySelectorAll('.zba-cell').forEach(function (cell) {
            var i = cell.getAttribute('data-i');
            cell.addEventListener('mouseenter', function () { focus(i); });
            cell.addEventListener('focus', function () { focus(i); });
            cell.addEventListener('mouseleave', function () { focus(null); });
            cell.addEventListener('blur', function () { focus(null); });
        });

        // the first time the block is seen, play "today → in ten days" once
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                if (!entries[0].isIntersecting) return;
                io.disconnect();
                setTimeout(function () {
                    if (!touched) set('after');
                }, 1400);
            }, { threshold: 0.45 });
            io.observe(root.querySelector('.zba-grid'));
        }
    }

    document.querySelectorAll('[data-zba]').forEach(init);
})();
