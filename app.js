const gameScreen = document.querySelector('.game');
const final = document.querySelector('.FinalScore');
const score = document.querySelector('#score');
const restart = document.querySelector('#restart');
const level_no = document.querySelector('#levelNo');
const nextlevel = document.querySelector('.nextlevel');
const next = document.querySelector('#next');
const level = [1,2,3,4,5,6,7,8,9,10];
const total_bombs = [5,10,15,20,25,30,35,40,45,50];
let current_level = 1;
let boxNo=1;
const bombs = [];
let points = 0;
const currentPoints = document.querySelector('#current_points');
function createRow()
{
    for(let i=1;i<=10;i++)
    {
        const row = document.createElement('div');
        row.classList.add('row');
        gameScreen.appendChild(row);
        for(let i=1;i<=10;i++)
        {
            const box = document.createElement('div');
            box.classList.add('box');
            box.classList.add('b'+boxNo);
            box.classList.add('safe');
            row.appendChild(box);
            boxNo++;
        }
    }
}
function regenerate()
{
    const boxes = document.querySelectorAll('.box');
    for(let box=0;box<boxes.length;box++)
    {
        if(boxes[box].classList.contains('unsafe'))
        {
            boxes[box].classList.remove('unsafe');
        }
        if(boxes[box].classList.contains('right'))
        {
            boxes[box].classList.remove('right');
        }
        if(boxes[box].classList.contains('wrong'))
        {
            boxes[box].classList.remove('wrong');
        }
    }
}
function addBombs(total)
{
    level_no.innerHTML = current_level;
    for(let i=0;i<total;i++)
    {
        const no = Math.floor(Math.random()*100);
        bombs.push(no);
        console.log(no);
        
    }
    bombs.forEach((bomb)=>
    {
        const box = document.querySelector('.b'+bomb);
        box.classList.add('unsafe');
    });
}
function RestartGame(total)
{
    regenerate();
    bombs.splice(0,bombs.length);
    addBombs(total);
    points = 0;
    currentPoints.innerHTML = 0;
    final.style.display = "none";
}
function playGame()
{
    const boxes = document.querySelectorAll('.box');
    for(let i=0;i<100;i++)
    {
        boxes[i].addEventListener('click',()=>
        {
            if(boxes[i].classList.contains('unsafe'))
            {
                boxes[i].classList.add('wrong');
                current_level = 1;
                score.innerHTML = points;
                final.style.display = "block";
            }
            else
            {
                if(!boxes[i].classList.contains('right'))
                {
                    boxes[i].classList.add('right');
                    points++;
                    currentPoints.innerHTML = points;
                    if(points==10)
                    {
                        current_level++;
                        console.log("Total Bombs : "+total_bombs[current_level-1]);
                        nextlevel.style.display = "block";
                        next.innerHTML = "Level "+current_level;
                        next.addEventListener('click',()=>
                        {
                            nextlevel.style.display = "none";
                            RestartGame(total_bombs[current_level-1]);
                        })  
                    }
                }
            }
        })
    }
}
restart.addEventListener('click',()=>
{
    RestartGame(total_bombs[current_level-1]);
});
function StartGame()
{
    createRow();
    addBombs(total_bombs[current_level-1]);
    playGame();
}
StartGame();