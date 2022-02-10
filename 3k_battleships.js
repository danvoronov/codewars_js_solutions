// https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7

const si = (f , i, j) => (i<10 && i>=0 && j<10 && j>=0) ? f[i][j] : 0

let ships = ['_',4,3,2,1]
const findShips = ar => ar.join('').replace(/0+/g, ' ').split(' ').forEach(e=>{
      if (e.length>1) ships[e.length]--
    })

function validateBattlefield(field) {
  
  let OneSum = field.reduce((a,b)=> a.concat(b)).reduce((a,b)=> a+(b==1) )
  if  (OneSum !== 20) return false 
  
  for (var i = 10-1; i >= 0; i--) {
    for (var j = 10-1; j >= 0; j--) {  if (!field[i][j]) continue 
      
      if (si(field, i+1, j+1) || si(field, i-1, j-1)
         || si(field, i+1, j-1) || si(field, i-1, j+1)) return false 
        
      let okr = si(field, i, j+1) + si(field, i, j-1)
          + si(field, i+1, j) + si(field, i-1, j)
      
      ships[1] -= (okr===0) // test for 1 cell ships
      if (ships[1]<0) return false                                                                                
      
    }
    
    findShips(field[i])
    if (ships[1]<0 || ships[2]<0 || ships[3]<0 || ships[4]<0) return false   
    
  }
  
  for (var j = 10-1; j >= 0; j--) 
    findShips(field.map(e=>e[j]))
  
  if (ships[1]<0 || ships[2]<0 || ships[3]<0 || ships[4]<0) return false   

  return true
}