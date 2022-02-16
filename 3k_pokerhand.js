// https://www.codewars.com/kata/524c74f855025e2495000262

const rsort = arr => [...arr].sort((a,b) => b-a)
const crdValue = cn => (+cn> 0) ? +cn : {'A':14,'K':13,'Q':12,'J':11}[cn] 
const crdName = crd => (crd<11) ? crd+'' : {14:'A',13:'K',12:'Q',11:'J'}[crd]

const _ = (ranks, fr,to) => ranks.slice(fr,to).filter(f=>f>0).map(crdName)
const hand_obj = (type, ranks) => ({type, ranks})

const isStraight = crds => {     
  let grps = [1], rang = 0
  for (var i = 1; i < crds.length; i++) 
    if (crds[i-1]-crds[i]!=1){
      grps.push(1); rang = i 
    } else {
      grps[grps.length-1] += 1  
      if (grps[grps.length-1] >= 5) return rang 
    }   
  return -1
}


function hand(holeCards, communityCards) { // MAIN
  
  let cards = {'♦':[],'♣':[],'♥':[],'♠':[]},  
      allCards=[],
      repetitions = Array(15).fill(0)
  
  holeCards.concat(communityCards).forEach(c=>{
    let c2num = crdValue(c.slice(0,-1))
    cards[c.slice(-1)].push(c2num)
    allCards.push(c2num)
    repetitions[c2num] += 1
  })
  
  const [Frep, Srep] = rsort(repetitions),
  allRCards = rsort([...new Set(allCards)]), // remove dub
    
  five_suit = Object.keys(cards).filter(s=>cards[s].length>=5)[0]
  if (five_suit) {
    let rank_five = rsort(cards[five_suit]), startSt = isStraight(rank_five)
    return (startSt==-1) ? hand_obj("flush", _(rank_five,0,5)) // 4
           : hand_obj("straight-flush", _(rank_five, startSt,startSt+5) ); // 1
  }
  
  let allS = isStraight(allRCards)
  if (allS > -1) return hand_obj("straight", _(allRCards, allS,allS+5) ); // 5
  
  const rep = repetitions // just shoter name
  
  if (Frep==4) {
    let tBr = rep.indexOf(4)
    return hand_obj("four-of-a-kind", [crdName(tBr), ..._(allRCards.filter(f=>f!=tBr),0,1)] ); // 2
  }                                       
  
  if (Frep==3 && Srep==2) 
    return hand_obj("full house", [crdName(rep.indexOf(3)), crdName(rep.indexOf(2))] ); // 3
  
  if (Frep==3) {
    let tBr = rep.indexOf(3)
    return hand_obj("three-of-a-kind", [crdName(tBr), ..._(allRCards.filter(f=>f!=tBr),0,2)] ); // 6
  } 
  
  if (Frep==2 && Srep==2) {
    let tBr1 = rep.lastIndexOf(2),
      tBr2 = rep.lastIndexOf(2, tBr1-1)
    return hand_obj("two pair", [crdName(tBr1), crdName(tBr2),
                                 ..._(allRCards.filter(f=>f!=tBr1 && f!=tBr2),0,1)] ); // 7
  } 

  if (Frep==2) {
    let tBr = rep.indexOf(2)
    return hand_obj("pair", [crdName(tBr), ..._(allRCards.filter(f=>f!=tBr),0,3)] ); // 8
  } 
  
  return  hand_obj("nothing", _(allRCards,0,5));

}