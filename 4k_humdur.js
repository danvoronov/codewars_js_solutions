// https://www.codewars.com/kata/52742f58faf5485cae000b9a

String.prototype.addEnd = function() {
    let index = this.lastIndexOf(',') 
    return (index == -1) ? 
      this.toString() : 
      this.substr(0, index) + ' and ' + this.substr(index+2);
}

function formatDuration (seconds) {
  if(!seconds) return 'now'
  
  let s = seconds%60,
      m = Math.floor(seconds/60)%60,
      h = Math.floor(seconds/(60*60))%24,
      d = Math.floor(seconds/(24*60*60))%365,
      y = Math.floor(seconds/(365*24*60*60)),
      ans = []
  
  if (y) ans.push(y+' year'  + (y>1?'s':''))
  if (d) ans.push(d+' day'   + (d>1?'s':''))
  if (h) ans.push(h+' hour'  + (h>1?'s':''))
  if (m) ans.push(m+' minute'+ (m>1?'s':''))
  if (s) ans.push(s+' second'+ (s>1?'s':''))
  
  return ans.join(', ').addEnd()
}
