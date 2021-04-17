/*jshint esversion: 6 */
const nav_toggle = document.getElementById("nav-toggle");
const sub_menu = document.getElementsByClassName("sub-menu");
const sub_menuL = 1;
for (i = 0; i <= sub_menuL - 1; i++) {
    var elem = sub_menu[i];
    sub_menu[0].addEventListener('mouseover', function(event) {
        sub_menu[0].classList.add("is-active");
    }, false);
}
for (i = 0; i <= sub_menuL - 1; i++) {
    var elem = sub_menu[i];
    elem.addEventListener("mouseleave", function(event) {
        elem.classList.remove("is-active");
    }, false);
}
nav_toggle.addEventListener('click', function() {
    document.body.classList.toggle("open");
}, false);
overlay.addEventListener('click', function() {
    document.body.classList.toggle("open");
}, false);

barba.hooks.beforeEnter((data) => {
    replaceHead(data);
});
barba.init();


const replaceHead = function(data) {
    document.body.classList.remove("open");
    window.scroll(0, 0);
    const head = document.head;
    const newPageRawHead = data.next.html.match(/]*>([\s\S.]*)<\/head>/i)[0];
    const newPageHead = document.createElement('head');
    newPageHead.innerHTML = newPageRawHead;
    const removeHeadTags = [
        "meta[name='keywords']", "meta[name='description']", "meta[property^='og']", "meta[name^='twitter']"
    ].join(',');

    head.removeChild(head.querySelector("link[rel='canonical']"));
    const el = document.createElement("link");
    let href = data.next.url.href;
    if (href == "https://reapt.jp/index.php") {
        href = "https://reapt.jp/";
    }
    el.rel = "canonical";
    el.href = href;
    head.appendChild(el);

    const headTags = head.querySelectorAll(removeHeadTags);
    for (let i = 0; i < headTags.length; i++) {
        head.removeChild(headTags[i]);
    }
    const newHeadTags = newPageHead.querySelectorAll(removeHeadTags);
    for (let i = 0; i < newHeadTags.length; i++) {
        head.appendChild(newHeadTags[i]);
    }
};