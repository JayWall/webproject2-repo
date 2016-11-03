var puzzleP;
var wSY = '300px'; /*White Spaces*/
var wSX = wSY;
var party;
var timer;

/*Feature implemented: End-of-game notification (modification of the page when the puzzle has been solved)*/

window.onload = function(){ /*Function that runs when the page is loaded*/
    var puzzleArea = document.getElementById('puzzlearea');    
    puzzleP = puzzleArea.getElementsByTagName('div');

    for (var i=0; i<puzzleP.length; i++){ /*For loop that takes care of the physical layout of the puzzle*/
        puzzleP[i].className = 'puzzlepiece';
        puzzleP[i].style.backgroundImage ="url('background.jpg')";
        puzzleP[i].style.left = (parseInt(i%4)*100)+'px';
        puzzleP[i].style.top = (parseInt(i/4)*100) +'px';
        puzzleP[i].style.backgroundPosition = '-' + puzzleP[i].style.left + ' ' + '-' + puzzleP[i].style.top;
        
        puzzleP[i].onmouseover = function(){ /*Changing the color of a tile's border and its color on mouse hover*/
            if (canMove(parseInt(this.innerHTML))){
                this.style.border = "red 2px solid";
                this.style.color = "#006600";
            }
        };
        puzzleP[i].onmouseout = function(){ /*Changing the tile's border and color back to its original colors*/
            this.style.border = "black 2px solid";
            this.style.color = "#000000";
        };

        puzzleP[i].onclick = function(){ /*Moves tile and checks if the puzzle is finished*/
            if (canMove(parseInt(this.innerHTML))){
                swap(this.innerHTML-1);
                if (checkFinish()){
                    winnings();
                }
                return;
            }
        };
    }

    var shufflebutton = document.getElementById('shufflebutton');

    shufflebutton.onclick = function(){ /*Gives the sufflebutton life and functionality*/
        for (var i=0; i<250; i++){
            var rand = parseInt(Math.random()* 100) %4;
           
            if (rand == 0){
                var tmp = findUp(wSX, wSY);
                if ( tmp != -1){
                    swap(tmp);
                }
            }
            if (rand == 1){
                var tmp = findDown(wSX, wSY);
                if ( tmp != -1) {
                    swap(tmp);
                }
            }

            if (rand == 2){
                var tmp = findLeft(wSX, wSY);
                if ( tmp != -1){
                    swap(tmp);
                }
            }

            if (rand == 3){
                var tmp = findRight(wSX, wSY);
                if (tmp != -1){
                    swap(tmp);
                }
            }
        }
    };
};

function swap(where){ /*Swapping X,Y coordinates in a temporary variable*/
    var temp = puzzleP[where].style.top;
    puzzleP[where].style.top = wSY;
    wSY = temp;

    temp = puzzleP[where].style.left;
    puzzleP[where].style.left = wSX;
    wSX = temp;
}


function canMove(position){ /*Function that checks if tile can move*/
    if (findRight(wSX, wSY) == (position-1)){
        return true;
    }

    if (findLeft(wSX, wSY) == (position-1)){
        return true;
    }

    if (findUp(wSX, wSY) == (position-1)){
        return true;
    }

    if (findDown(wSX, wSY) == (position-1)){
        return true;
    }
}

/*Following functions "" will */

function findUp(x, y){
    var a = parseInt(x);
    var b = parseInt(y);
    if (b > 0){
        for (var i=0; i<puzzleP.length; i++){
            if (parseInt(puzzleP[i].style.top) + 100 == b && parseInt(puzzleP[i].style.left) == a){
                return i;
            }
        } 
    }
    else{
        return -1;
    }
}

function findDown(x, y){
    var a = parseInt(x);
    var b = parseInt(y);
    if (b < 300){
        for (var i=0; i<puzzleP.length; i++){
            if (parseInt(puzzleP[i].style.top) - 100 == b && parseInt(puzzleP[i].style.left) == a){
                return i;
            }
        }
    }
    else{
        return -1;
    } 
}

function findLeft(x, y){
    var a = parseInt(x);
    var b = parseInt(y);

    if (a > 0){
        for (var i = 0; i < puzzleP.length; i++){
            if (parseInt(puzzleP[i].style.left) + 100 == a && parseInt(puzzleP[i].style.top) == b){
                return i;
            } 
        }
    }
    else{
        return -1;
    }
}

function findRight(x, y){
    var a = parseInt(x);
    var b = parseInt(y);
    if (a < 300){
        for (var i =0; i<puzzleP.length; i++){
            if (parseInt(puzzleP[i].style.left) - 100 == a && parseInt(puzzleP[i].style.top) == b){
                return i;
            }
        }
    }
    else{
        return -1;
    } 
}


function winnings(){ /*Function that is called when the puzzle is solved*/
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#FF0000";
    party = 10;
    timer = setTimeout(someColors, 300);
}

function checkFinish(){ /*Checks the puzzle to see if all the tiles are in the correct location*/
    var flag = true;
    for (var i = 0; i < puzzleP.length; i++){
    	var x = parseInt(puzzleP[i].style.left);
    	var y = parseInt(puzzleP[i].style.top);

        if (x != parseInt(i%4*100) || y != parseInt(i/4)*100){
            flag = false;
            break;
        }
    }

    return flag;
}

function someColors(){ /*Decorates page with 3 colors*/
    party --;

    if (party % 2){
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#c71585";    
    }
    else{
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#ffa500";
    }

    if (party == 0){
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundColor = "#FFFFFF";
        alert('CONGRATULATIONS! You solved the 15 puzzle!');
        return;
    }

    timer = setTimeout(someColors, 300);
}





