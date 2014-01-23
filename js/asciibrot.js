
var normal = ("!\"#$%&'()*+,-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”").split('');
var weird = ("ԵԶԷԸԹԺԻԼԽԾԿՀՁʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿ͰͱͲͳʹ͵Ͷͷͺͻͼͽ;΄΅ՂՃՄՅ:;[\\]^ՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖ՛՜՝՞՟աբգդեզէըթժիլխծկհձղճմյնշոչպջռսվտրցւփքօֆև։֏֑֖֛֚֒֓֔֕֗֘֙֜֝+,-./_€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ְֱֲֳִֵֶַָֻּֽ֢֣֤֥֦֧֪֭֮֞֟֠֡֨֩֫֬֯־ֿ׀ׁׂ׃ׅׄ׆ׇאבגדהוזחטיךכלםמןנסעףפץצקרשתװױײ׳״؀؁؂؃؄؆؇؈؉؊؋،؍؎؏ؐؑؒؓؔؕ؛؜؞؟ؠءآأؤإئابةتثج`{|}~حخدذرزسشصضطظعغػؼؽؾؿـفقكلمنهوىيًٌٍَُِّْٕٖٜٓٔٗ٘ٙٚٛٝٞ٠١٢٣٤٥٦٧٨٩٪٫٬٭ٮ").split('');


function Mandelbrot(charArray, index, randomize){
  var matrix;
  var characters = (function(){
    return charArray.slice((index*10)%charArray.length)
      .concat(charArray.slice(0, charArray.length));
  })();
  var maxIterations = 200,
    cx = [-2.2, 0.8],
    cy = [-1, 1],
    z = 1;
  return function mandelbrot(h,w){
    characters.unshift(characters.pop());
    var chars = randomize ? d3.shuffle(characters) : characters;
    if(!matrix) {
      matrix = d3.range(0,w).map(function(px){
        return d3.range(0,h).map(function(py){
          var x0 = (px / w * (cx[1] - cx[0]) + cx[0]),// / 300,
              y0 = (py / h * (cy[1] - cy[0]) + cy[0]),// / 300,
              x = 0.0,
              y = 0.0,
              i = 0,
              tx;
          while(x*x*z + y*y*z < 2*2 && i++ < maxIterations){
            tx = x*x*z - y*y*z + x0;
            y = x* y*z + x*y*z + y0;
            x = tx;
          }
          return i;
        });
      });
    }
    return matrix.map(function(row){
      return row.map(function(i){
        return chars[i % chars.length];
      });
    });
  };
}

var snowman = function(crazy,i){
  var div = document.createElement('div');
  div.classList.add('snowman');
  if(crazy) div.classList.add('crazy');
  document.body.appendChild(div);
  var mandelbrot = Mandelbrot(crazy ? weird : normal, i, crazy);
  function render(){
    div.innerHTML = mandelbrot(80,80)
        .map(function(row){ return row.join('') })
        .join('<br>');
    return render;
  }
  div.addEventListener('mousemove', render);
  return render;
};

var snowmen = d3.range(0,9).map(function(d,i){
  return snowman(d==3,i)();
});
var prevTime = 0;
window.requestAnimationFrame(function frame(time){
  if(time - prevTime > 60){
    snowmen[3]();
    prevTime = time;
  }
  window.requestAnimationFrame(frame);
});