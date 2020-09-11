const wow = () => {
    const wowInit = new WOW(
    {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: false,
      live: true,
    }
  );

  wowInit.init();
};
