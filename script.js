const n = 50; 

  
const array=[];
init();

let audioCtx =null;
function playNote(freq){
    if(audioCtx==null){
        audioCtx=new(
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        ) ();
    }
    const dur=0.1;
    const osc=audioCtx.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audioCtx.currentTime+dur);
    const node =audioCtx.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(
       0, audioCtx.currentTime+dur

    );
    osc.connect(node);
    node.connect(audioCtx.destination);
}





function init(){

    for(let i=0;i<n; i++ ){
        array[i] =Math.random();
    }
    showBars();
}


function play1(){
    const copy =[...array];
    const moves = bubbleSort(copy);
    animate(moves);
}
function play2(){
    const copy =[...array];
    const moves = selectionSort(copy);
    animate(moves);
}
function play3(){
    const copy =[...array];
    const moves = insertionSort(copy);
    animate(moves);
}
function play4(){
    const copy =[...array];
    const moves = quickSort(copy);
    animate(moves);
}
function play5(){
    const copy =[...array];
    const moves = mergeSort(copy);
    animate(moves);
}
function play6(){
    const copy =[...array];
    const moves = heapSort(copy);
    animate(moves);
}
//add other also


function animate(moves){
    if(moves.length==0){
        showBars();
        return;
    }
    const move =moves.shift();
    const [i,j] =move.indices;
    if(move.type =="swap"){

        [array[i], array[j]] = [array[j], array[i]];
    }
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);

    showBars(move);
    setTimeout(function(){
        animate(moves);

    }, 50);
}
//BUBBLE SORTING
function bubbleSort(array){
     const moves =[];
    do{
        var swapped =false;
        for(let i=1; i<array.length; i++){
            // moves.push({indices:[i-1,i], type:"comp"});
            if(array[i-1]>array[i]){
                swapped=true;
                moves.push({indices:[i-1,i], type:"swap"});
                [array[i-1], array[i]] =[array[i], array[i-1]];
                
            }
        }
    }while(swapped);
    return moves;
}
//SELECTION SORTING
function selectionSort(array) {
    const moves = [];
  
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
  
      if (minIndex !== i) {
        moves.push({ indices: [i, minIndex], type: "swap" });
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
    }
  
    return moves;
  }
  
  //INSERTION SORTING
  function insertionSort(array) {
    const moves = [];
  
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
  
      while (j >= 0 && array[j] > key) {
        moves.push({ indices: [j, j + 1], type: "swap" });
        array[j + 1] = array[j];
        j--;
      }
  
      array[j + 1] = key;
    }
  
    return moves;
  }
  //QUICK SORTING
  function quickSort(array) {
    const moves = [];
  
    function partition(low, high) {
      let pivot = array[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
          i++;
  
          // Swap array[i] and array[j]
          moves.push({ indices: [i, j], type: "swap" });
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
  
      // Swap array[i+1] and array[high] (or pivot)
      moves.push({ indices: [i + 1, high], type: "swap" });
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
  
      return i + 1;
    }
  
    function sort(low, high) {
      if (low < high) {
        let pi = partition(low, high);
  
        sort(low, pi - 1);
        sort(pi + 1, high);
      }
    }
  
    sort(0, array.length - 1);
  
    return moves;
  }
  //MERGE SORTING
  
  
  
  
   
  
  //HEAP SORTING
  function heapify(array, n, i, moves) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
  
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      moves.push({ indices: [i, largest], type: "comp" });
  
      const temp = array[i];
      array[i] = array[largest];
      array[largest] = temp;
  
      moves.push({ indices: [i, largest], type: "swap" });
  
      heapify(array, n, largest, moves);
    }
  }
  
  function heapSort(array) {
    const moves = [];
  
    const n = array.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, moves);
    }
  
    for (let i = n - 1; i > 0; i--) {
      const temp = array[0];
      array[0] = array[i];
      array[i] = temp;
  
      moves.push({ indices: [0, i], type: "swap" });
  
      heapify(array, i, 0, moves);
    }
  
    return moves;
  }
  
 
  
  
  
  
  
  
 
  
  

 
  
 


function showBars(move){
container.innerHTML ="";
    
    for(let i=0; i<array.length; i++){
        const bar = document.createElement("div");
        bar.style.height=array[i]*100 + "%";
        bar.classList.add("bar");

        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=
            move.type=="swap"?"red":"black";
        }
        container.appendChild(bar);
    }
}

