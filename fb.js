/// fbads.js
(function() {
  const urls = [
      {
        link: 'https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.slim.min.js',
        done: false
      },
      {
        link: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
        done: false
      },
  ]
  urls.forEach((url) => {
      const script = document.createElement("script");
      const { link } = url
      script.src = link;
      script.type = 'text/javascript';
      script.addEventListener('load', () => {
        url.done = true;
        console.log(`${link} has been loaded successfully!`);
        if (!urls.some(u => !u.done)) {
            console.log('all done')
            function gtfo() {
                window.$( "span:contains('Suggested for you')" ).parent().parent().parent().parent().parent().parent().parent().parent().hide();
                window.$( "span:contains('Sponsored')" ).parent().parent().parent().parent().parent().parent().parent().parent().hide();
            }
            window.$(window).scroll(_.debounce(gtfo, 150));
        }
      });
      document.head.appendChild(script);
  })
})();


/// test.js
(function() {
  setInterval(() => {
    document.body.style.background = 'yellow';
  }, 2000);
})();
