!function(){
  var d3 = {version: "3.4.1"}; // semver
  var abs = Math.abs;
  

  d3.range = function(start, stop, step) {
    if (arguments.length < 3) {
      step = 1;
      if (arguments.length < 2) {
        stop = start;
        start = 0;
      }
    }
    if ((stop - start) / step === Infinity) throw new Error("infinite range");
    var range = [],
         k = d3_range_integerScale(abs(step)),
         i = -1,
         j;
    start *= k, stop *= k, step *= k;
    if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k);
    else while ((j = start + step * ++i) < stop) range.push(j / k);
    return range;
  };

  function d3_range_integerScale(x) {
    var k = 1;
    while (x * k % 1) k *= 10;
    return k;
  }
  d3.shuffle = function(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.random() * m-- | 0;
      t = array[m], array[m] = array[i], array[i] = t;
    }
    return array;
  };
  if (typeof define === "function" && define.amd) {
    define(d3);
  } else if (typeof module === "object" && module.exports) {
    module.exports = d3;
  } else {
    this.d3 = d3;
  }

}();