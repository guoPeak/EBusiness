
mui('.mui-scroll-wrapper').scroll({
  indicators: false
});

mui('.mui-slider').slider({
  interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
});


//假如search为 ?key=1$username=12&desc=11
function getSearch() {
  var search = location.search;
  search = decodeURI(search).slice(1);
  var arr = search.split('&');
  var obj = {};
  arr.forEach(function (e, i) {
    var k = e.split('=')[0];
    var v = e.split('=')[1];
    obj[k] = v;
  })
  return obj;
}
