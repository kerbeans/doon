/**
 * Created by heiya on 2016/12/25.
 */
var board=new Array();
var score=0;
var hasConflicted =new Array();
$(document).ready(function() {
        newGame();
});
function newGame(){
    init();
    randomOneNumber();
    randomOneNumber();
    randomOneNumber();
    randomOneNumber();
    randomOneNumber();
    updateScore();
}
function init(){
    for(var i=0;i<6;i++)
        for(var j=0;j<6;j++){
            var gridCell=$("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    for( i=0;i<6;i++) {
        board[i] = new Array();
        hasConflicted[i]=new Array();
        for( j=0;j<6;j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }
    score=0;
    updateBoardView();
}
function updateBoardView(){
    $(".number-cell").remove();
    for(var i =0;i<6;i++)
        for(var j=0;j<6;j++){
            $(".grid-container").append("<div class='number-cell' id='number-cell-"+i+'-'+j+"'></div>")
            var theNumberCell=$("#number-cell-"+i+"-"+j);
            if(board[i][j]==0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }
            else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getBackgroundColor(board[i][j]));
                theNumberCell.text(board[i][j]);
                changeFontSize(i,j);
            }
            hasConflicted[i][j]=false;
        }
}
function randomOneNumber(){
    if(noSpace())
        return false;
    var RX=parseInt(Math.floor(Math.random()*6));
    var RY=parseInt(Math.floor(Math.random()*6));
    while(true){
        if(board[RX][RY]==0)
            break;
        RX=parseInt(Math.floor(Math.random()*6));
        RY=parseInt(Math.floor(Math.random()*6));
    }
    var RN=Math.random()<0.5?2:4;
    board[RX][RY]=RN;
    showNumberAnimation(RX,RY,RN);
    return true;
}
$(document).keydown(function(event){
    event.preventDefault();
    switch(event.keyCode){
        case 37:
            if(moveLeft()){
                setTimeout('randomOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 38:
            if(moveUp()){
                setTimeout('randomOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 39:
            if(moveRight()){
                setTimeout('randomOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 40:
            if(moveDown()){
                setTimeout('randomOneNumber()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        default:
            break;
    }
});
function moveLeft() {
    if(!canMoveLeft())
        return false;
    for(var i =0;i<6;i++)
        for(var j=1;j<6;j++)
            if(board[i][j]!=0)
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noRowBlock(i,k,j)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        // continue;
                    }
                    else if(board[i][k]==board[i][j]&&noRowBlock(i,k,j)&&!hasConflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore();
                        hasConflicted[i][k]=true;
                    }
                }
    setTimeout('updateBoardView()',200);
    return true;
}
function moveUp(){
    if(!canMoveUp())
        return false;
    for(var i =1;i<6;i++)
        for(var j=0;j<6;j++)
            if(board[i][j]!=0)
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noColBlock(j,k,i)) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[k][j]==board[i][j]&&noColBlock(j,k,i)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore();
                        hasConflicted[k][j]=true;
                    }

                }
    setTimeout('updateBoardView()',200);
    return true;
}
function moveRight(){
    if(!canMoveRight())
        return false;
    for(var i =0;i<6;i++)
        for(var j=4;j>=0;j--)
            if(board[i][j]!=0)
                for(var k=5;k>j;k--){
                    if(board[i][k]==0&&noRowBlock(i,j,k)) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[i][k]==board[i][j]&&noRowBlock(i,j,k)&&!hasConflicted[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore();
                        hasConflicted[i][k]=true;
                    }
                }
    setTimeout('updateBoardView()',200);
    return true;
}
function moveDown(){
    if(!canMoveDown())
        return false;
    for(var i=4;i>=0;i--)
        for(var j=0;j<6;j++)
            if(board[i][j]!=0)
                for(var k=5;k>i;k--){
                    if(board[k][j]==0&&noColBlock(j,i,k)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[k][j]==board[i][j]&&noColBlock(j,i,k)&&!hasConflicted[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore();
                        hasConflicted[k][j]=true;
                    }
                }
    setTimeout('updateBoardView()',200);
    return true;
}
function isGameOver(){
    if(noSpace()&&noMove())
        alert("GG");
}
function noMove(){
    if(canMoveUp()||canMoveDown()||canMoveLeft()||canMoveRight())
        return false;
    return true;
}






                            /*2016 12 25 Merry Christmas*/



                            

function getPosTop(i,j){
    return 20+i*120;
}
function getPosLeft(i,j){
    return 20+j*120;
}
function getBackgroundColor(number){
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
    return "black";
}
function getNumberColor(number){
    if(number<=4)
        return "#776e65";
    return "#ffffff";
}
function noSpace() {
    for(var i=0;i<6;i++)
        for(var j=0;j<6;j++)
            if(board[i][j]==0)
                return false;
    return true;
}
function canMoveLeft(){
    for(var i=0;i<6;i++)
        for(var j=1;j<6;j++)
            if(board[i][j]!=0)
                if(board[i][j-1]==0||board[i][j-1]==board[i][j])
                    return true;
    return false;
}
function canMoveRight(){
    for(var i=0;i<6;i++)
        for(var j=0;j<5;j++)
            if(board[i][j]!=0)
                if(board[i][j+1]==0||board[i][j+1]==board[i][j])
                    return true;
    return false;
}
function canMoveUp(){
    for(var i=1;i<6;i++)
        for(var j=0;j<6;j++)
            if(board[i][j]!=0)
                if(board[i-1][j]==0||board[i-1][j]==board[i][j])
                    return true;
    return false;
}
function canMoveDown(){
    for(var i=0;i<5;i++)
        for(var j=0;j<6;j++)
            if(board[i][j]!=0)
                if(board[i+1][j]==0||board[i+1][j]==board[i][j])
                    return true;
    return false;
}
function noRowBlock(row,col1,col2) {
    for(var i=col1+1;i<col2;i++)
        if(board[row][i]!=0)
            return false;
    return true;
}
function noColBlock(col,row1,row2){
    for(var i=row1+1;i<row2;i++)
        if(board[i][col]!=0)
            return false;
    return true;
}
function updateScore(){
    $('#score').text(score);
}
function showNumberAnimation(i ,j,randNumber){
    var numberCell=$('#number-cell-'+i+"-"+j);
    numberCell.css('background-color',getBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);
    numberCell.animate({width:'100px',height:'100px',top:getPosTop(i,j),left:getPosLeft(i,j)},50);
}
function showMoveAnimation(fx,fy,tx,ty){
    var numberCell=$('#number-cell-'+fx+"-"+fy);
    numberCell.animate({top:getPosTop(tx,ty),left:getPosLeft(tx,ty)},200);
}
function changeFontSize(i,j){
    var temp=board[i][j];
    for(var k=0;temp>=1;temp/=10)
        k++;
    var revise=$("#number-cell-"+i+"-"+j);
    switch (k){
        case 1:
            revise.css('font-size','60px');
            break;
        case 2:
            revise.css('font-size','60px');
            break;
        case 3:
            revise.css('font-size',"50px");
            break;
        case 4:
            revise.css('font-size','43px');
            break;
        default:
            revise.css('font-size','35px');
            break;
    }

}



/*2016  12 25  good day         */



var Grid_object = document.getElementById("Grid_container"), Start_x, Start_y, documentWidth = window.screen.availWidth;

Grid_object.addEventListener('touchstart', function(event){
    Start_x = event.touches[0].pageX;
    Start_y = event.touches[0].pageY;
});

Grid_object.addEventListener('touchmove', function(event){
    event.preventDefault();
});

Grid_object.addEventListener('touchend', function(event){
    End_x = event.changedTouches[0].pageX;
    End_y = event.changedTouches[0].pageY;
    var Delta_x = End_x - Start_x, Delta_y = End_y - Start_y;
    if ((Math.abs(Delta_x) < 0.03 * documentWidth) && (Math.abs(Delta_y) < 0.03 * documentWidth)) return;
    if (Math.abs(Delta_x) >= Math.abs(Delta_y)){
        if (Delta_x > 0){
            if (moveRight()){
                setTimeout("randomOneNumber()", 210);
            }
        }
        else{
            if (moveLeft()){
                setTimeout("randomOneNumber()", 210);
            }
        }
    }
    else{
        if (Delta_y > 0){
            if (moveDown()){
                setTimeout("randomOneNumber()", 210);
            }
        }
        else{
            if (moveUp()){
                setTimeout("randomOneNumber()", 210);
            }
        }
    }
    setTimeout("isGameOver()", 300);
});