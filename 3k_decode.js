// https://www.codewars.com/kata/52cf02cd825aef67070008fa

const ascii = String.fromCharCode(...Array.from({length: 95}, (_,i) => i+32)); 
// base ASCII from 32 to 126 code

device.decode = (w) => w.split('').map((e, ind)=>
               ascii[ascii.split ('').map(
                  a=>device.encode ('_'.repeat(ind)+a)[ind]
                    ).indexOf(e)]
                                      ).join (''); 