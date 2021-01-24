window.addEventListener('load',function(){
  document.querySelector('body').classList.add("loaded")  
});

let page = 1;
//Берём данные с API
async function getGamesData(page) {
  let response = await fetch(`https://api.rawg.io/api/games?page=${page}`)
  let data = await response.json()
  console.log(data);
  return data;
}
//Декоратор для загрузки данных с https://api.rawg.io/api/games
function cachingDecorator(func) {
  let cache = new Map();
  return function(data) {
  if (cache.has(data)) {
    return cache.get(data)
  }
  let result = func(data)
  cache.set(data, result)
  return result;
  };
}

getGamesData = cachingDecorator(getGamesData);

//Количество игр в БД
const getCount = function() {
  getGamesData(page).then(function(value) {
    document.getElementById('quantityGames').innerHTML = value.count + ' '
    document.getElementById('gameNumber').placeholder = 'В базе данных ' + value.count + ' игр'
  });
};
getCount();

const updateBlock = function (pageNum) {  
  let nextPage = pageNum //Смена страницы
  let whereToInsert = document.getElementById('row-before') //Ищем, куда добавлять блоки
  let preload = () => document.querySelector('body').classList.add("loaded") //Функция preloaderа
  
  document.querySelector('body').classList.remove("loaded") //Отобразить прелоадер для прогрузки файлов  
  getGamesData(nextPage).then(function(value) {
    //Удаление текущих страниц
    for (key in value.results){
      whereToInsert.removeChild(whereToInsert.childNodes[0])
    }
    for (key in value.results){
      let getPlatforms = function() {
        let gamePlatforms = []
          for (keyS in value.results[key].parent_platforms) {
            let slugValue = value.results[key].parent_platforms[keyS].platform.slug
            switch (slugValue) {
              case 'xbox':
                gamePlatforms = '<div class="platform_xbox platform_display"></div> ' + gamePlatforms
                break;
            
              case 'playstation':
                gamePlatforms = '<div class="platform_playstation platform_display"></div> ' + gamePlatforms
                break;
              
              case 'pc':
                gamePlatforms = '<div class="platform_pc platform_display"></div> ' + gamePlatforms
                break;

              case 'ios':
                gamePlatforms = '<div class="platform_ios platform_display"></div> ' + gamePlatforms
                break;

              case 'mac':
                gamePlatforms = '<div class="platform_mac platform_display"></div> ' + gamePlatforms
                break;

              case 'android':
                gamePlatforms = '<div class="platform_android platform_display"></div> ' + gamePlatforms
                break;

              case 'linux':
                gamePlatforms = '<div class="platform_linux platform_display"></div> ' + gamePlatforms
                break;
              
              case 'nintendo':
                gamePlatforms = '<div class="platform_nintendo platform_display"></div> ' + gamePlatforms
                break;
            
              default:
                gamePlatforms = value.results[key].parent_platforms[keyS].platform.name + ' ' + gamePlatforms
            }
          }
        
        return gamePlatforms
      }

      //-----------Добавление новых данных---------------
      let div = document.createElement('div')
      div.className = 'col'
      div.innerHTML = `
        <div class="card">
          <img src="${value.results[key].background_image}" class="card-img-top" >
          <div class="card-body">
            <h5 class="card-title">${value.results[key].name}</h5>
            <b class="platforms">Платформы: ${getPlatforms()} </b>
            <p class="card-text">Дата выхода: ${value.results[key].released}</p>
          </div>
        </div>`
        whereToInsert.insertBefore(div, whereToInsert.childNodes[0])
        // console.log(value.results[key])
      }
   })
   setTimeout(preload, 500)
}

const createBlock = function() {
  getGamesData(page).then(function(value) {
    for (key in value.results){
      let getPlatforms = function() {
        let gamePlatforms = []
          for (keyS in value.results[key].parent_platforms) {
            let slugValue = value.results[key].parent_platforms[keyS].platform.slug
            switch (slugValue) {

              case 'xbox':
                gamePlatforms = '<div class="platform_xbox platform_display"></div> ' + gamePlatforms
                break;
            
              case 'playstation':
                gamePlatforms = '<div class="platform_playstation platform_display"></div> ' + gamePlatforms
                break;
              
              case 'pc':
                gamePlatforms = '<div class="platform_pc platform_display"></div> ' + gamePlatforms
                break;

              case 'ios':
                gamePlatforms = '<div class="platform_ios platform_display"></div> ' + gamePlatforms
                break;

              case 'mac':
                gamePlatforms = '<div class="platform_mac platform_display"></div> ' + gamePlatforms
                break;

              case 'android':
                gamePlatforms = '<div class="platform_android platform_display"></div> ' + gamePlatforms
                break;

              case 'linux':
                gamePlatforms = '<div class="platform_linux platform_display"></div> ' + gamePlatforms
                break;
              
              case 'nintendo':
                gamePlatforms = '<div class="platform_nintendo platform_display"></div> ' + gamePlatforms
                break;
            
              default:
                gamePlatforms = value.results[key].parent_platforms[keyS].platform.name + ' ' + gamePlatforms
            }
          }
        return gamePlatforms
      }
  //-------Создаём и добавляем данные---------------
      let div = document.createElement('div')
      let whereToInsert = document.getElementById('row-before')
      div.className = 'col'
      div.innerHTML = `
        <div class="card">
          <img src="${value.results[key].background_image}" class="card-img-top" >
          <div class="card-body">
            <h5 class="card-title">${value.results[key].name}</h5>
            <b class="platforms" id="platforms">Платформы: ${getPlatforms()} </b>
            <p class="card-text">Дата выхода: ${value.results[key].released}</p>
          </div>
        </div>`
      whereToInsert.insertBefore(div, whereToInsert.childNodes[0])
      // console.log(value.results[key])
    }
  })
}
createBlock()


/*-------------------------------------TRASH----------------------------------*/
//--------------Старый вывод платформ-------/
            // if (value.results[key].parent_platforms[keyS].platform.slug === 'xbox') {
            //   gamePlatforms = '<div class="platform_xbox platform_display"></div> ' + gamePlatforms
            // }
            // else if(value.results[key].parent_platforms[keyS].platform.slug === 'playstation') {
            //   gamePlatforms = '<div class="platform_playstation platform_display"></div> ' + gamePlatforms
            // }
            // else if(value.results[key].parent_platforms[keyS].platform.slug === 'pc') {
            //   gamePlatforms = '<div class="platform_pc platform_display"></div> ' + gamePlatforms
            // }
            // else if(value.results[key].parent_platforms[keyS].platform.slug === 'mac') {
            //   gamePlatforms = '<div class="platform_apple platform_display"></div> ' + gamePlatforms
            // }
            // else if(value.results[key].parent_platforms[keyS].platform.slug === 'android') {
            //   gamePlatforms = '<div class="platform_android platform_display"></div> ' + gamePlatforms
            // }
            // else if(value.results[key].parent_platforms[keyS].platform.slug === 'linux') {
            //   gamePlatforms = '<div class="platform_linux platform_display"></div> ' + gamePlatforms
            // }
            // else {
            //   gamePlatforms = value.results[key].parent_platforms[keyS].platform.name + ' ' + gamePlatforms
            // }
//-----------------------------------------------/


//--------------------Считывание игры по её номеру-----------------------------------
// const getDataByNumber = function() {
//   let num = document.getElementById('gameNumber').value
//   num = Number(num) - 1
//   console.log(num);
//   getGamesData(page).then(function(value) {
//     console.log(value.results[num]);
//     console.log(value.results[num].background_image)
//
//     document.getElementById('game-name').innerHTML = value.results[num].name;
//     document.getElementById('image-url').src = value.results[num].background_image;
//   });
// };
//-----------------------------------------------------------------------------------

//---------------------Удалить блоки-------------------------------------------------
// const deleteBlock = function () {
//   getGamesData(page).then(function(value) {
//     for (key in value.results){
//       let whereToInsert = document.getElementById('row-before')
//       whereToInsert.removeChild(whereToInsert.childNodes[0])
//     }
//   })
// }
//-----------------------------------------------------------------------------------

// let getPlatform = function() {
//   getGamesData(page).then(function(value) {
//     for (key in value.results) {
//       for (keyS in value.results[key].platforms) {
//        let gamePlatforms = {} 
//        gamePlatforms = value.results[key].platforms[keyS].platform.name
//        return gamePlatforms
//       }
//     }
//   })
// }