/* BASE ENGINE SETTINGS */
export const LEVEL_WIDTH = window.innerWidth
export const LEVEL_HEIGHT = window.innerHeight

/* PLAYER SETTINGS */
export const BASIC_SHIP_SPEED = 200
export const BASIC_SHIP_ANGULAR_VELOCITY = 180
export const BASIC_SHIP_SCALE = 0.7
export const START_PLAYER_GOLD = 10000

/* GAMEPLAY SETTINGS */
export const TARGET_TOLERANCE = 2
export const TARGET_HIDE_DISTANCE = 50
export const FUEL_PRICE = 100
export const FUEL_CONSUMPTION = 0.1
export const HEALTH_CONSUMPTION = 0.01
export const FIRE_BUTTON = "space"
export const BULLET_VELOCITY = 1000

/* PIRATES SETTINGS */
export const PIRATE_VELOCITY = 150
export const PIRATE_ANGULAR_VELOCITY = 150
export const PIRATE_STOP_TOLERANCE = 500
export const PIRATE_FIRE_DELAY = 1500
export const PIRATE_START_FIRE_DELAY = 1500
export const PIRATE_FIRE_DISTANCE = 1000
export const PIRATE_DAMAGE = 20
export const PIRATE_MAX_HEALTH = 150
export const PIRATE_SPAWN_PROBABILITY = 0.5
export const PIRATE_AWARD_VALUE = 10000

/* Town Settings */
export const TOWN_SIZE = 1024

/* Trade Settings */
export const UPDATE_MARKETS_INTERVAL = 3000
export const UPDATE_MARKETS_VALUE = 10

/* SHIPS PARAMS */

export const seagullParams = {
    velocity: BASIC_SHIP_SPEED,
    angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY + 80,
    damage: 5,
    maxHealth: 20,
    currentHealth: 20,
    maxFuel: 50,
    currentFuel: 50,
    price: 10000,
    repairPrice: 10,
    description:
        '<p>Что такое храбрость, люди, пережившие Катаклизм, знают не понаслышке. Когда гигантский материк взмыл в небо и раскололся на куски, выжившие остались на небольшом острове, позже названом <b style="color:#4CAF50;"><strong>Брайвиль</strong></b>. &nbsp;</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p>Среди тех, кто выжил, была группа изобретателей. Понимая, что невозможно оставаться на маленьком острове, они собрали простенький летающий корабль буквально из подручных материалов и назвали его <b style="color:#6658cd;"><strong>Храброй чайкой</strong></b> в честь отважных птиц, обитавших в море, и о которых осталась только память.</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p>Современные <b style="color:#6658cd;"><strong>Чайки</strong></b> гораздо более совершенные, чем их прародитель. На них разместили полноценные двигатели и они стали быстрее. Для боя <b style="color:#6658cd;"><strong>Чайка</strong></b> совсем не годится, да и запаса топлива хватит только для полетов между <b style="color:#4CAF50;"><strong>Брайвилем</strong></b> и <b style="color:#4CAF50;"><strong>Дальним Берегом</strong></b>. Тем не менее это самый манёвренный корабль из всех.</p>\n',
    name: "Храбрая чайка",
}

export const albatrossParams = {
    velocity: BASIC_SHIP_SPEED + 80,
    angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY + 30,
    damage: 20,
    maxHealth: 100,
    currentHealth: 100,
    maxFuel: 60,
    currentFuel: 60,
    price: 20000,
    repairPrice: 30,
    description:
        '<p>Наглость — счастье дураков, гласит известная пословица. Только вот торговцы, выбирающие <b style="color:#23628e;"><strong>Наглый альбатрос</strong></b>, так не считают. Чтобы прорваться через <b style="color:#474c5e;"><strong>пиратов</strong></b> между <b style="color:#4CAF50;"><strong>Брайвилем</strong></b> и <b style="color:#4CAF50;"><strong>Мидлгардом</strong></b>, нужно обладать порядочной долей наглости, которая будет щедро вознаграждена.&nbsp;</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p><b style="color:#23628e;"><strong>Наглый альбатрос</strong></b> — главный корабль Королевства Зелёных Островов. Он является основой флота и главным торговым кораблем. Созданный в <b style="color:#4CAF50;"><strong>Мидлгарде</strong></b>, этот корабль позволил наладить торговлю в Королевстве, соединив все острова.&nbsp;</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p><b style="color:#474c5e;"><strong>Пираты</strong></b> используют изменённую версию этого корабля, называемую <b style="color:#474c5e;"><strong>Чёрной Акулой</strong></b>. У неё больший запас топлива, но во всём остальном она уступает оригиналу. Поэтому <b style="color:#23628e;"><strong>Наглый альбатрос</strong></b> может дать достойный отпор <b style="color:#474c5e;"><strong>пиратам</strong></b>.</p>\n' +
        "<p>&nbsp;</p>\n" +
        "<p>К сожалению, запаса топлива у корабля недостаточно, чтобы совершать полёты в дальние города.</p>\n",
    name: "Наглый альбатрос",
}

export const pelicanParams = {
    velocity: BASIC_SHIP_SPEED + 120,
    angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY - 30,
    damage: 50,
    maxHealth: 300,
    currentHealth: 300,
    maxFuel: 250,
    currentFuel: 250,
    price: 50000,
    repairPrice: 50,
    description:
        '<p><b style="color:#febe0c;"><strong>Золотой Пеликан</strong></b> — шедевр инженеров <b style="color:#BF360C;"><strong>Нордвиля</strong></b>, названный в честь королевской птицы. Из-за большой удалённости города, необходимо было создать корабль, способный долететь до любого уголка в Небесах Трёх Дорог.&nbsp;</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p>Серьёзное вооружение не оставляет шансов для <b style="color:#474c5e;"><strong>пиратов</strong></b>, отважившихся напасть на <b style="color:#febe0c;"><strong>Золотого Пеликана</strong></b>.&nbsp;</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p>Тем не менее у корабля есть и свои недостатки. Больший запас топлива и уровень брони сделали его достаточно тяжёлым. Поэтому корабль уступает в маневренности <b style="color:#6658cd;"><strong>Чайке</strong></b> или <b style="color:#23628e;"><strong>Альбатросу</strong></b>.</p>\n' +
        "<p>&nbsp;</p>\n" +
        "<p>Также стоимость корабля делает его доступным только для самых успешных торговцев.</p>\n",
    name: "Золотой пеликан",
}

export const whaleParams = {
    velocity: BASIC_SHIP_SPEED + 250,
    angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY - 30,
    damage: 150,
    maxHealth: 700,
    currentHealth: 700,
    maxFuel: 500,
    currentFuel: 500,
    price: 100000,
    repairPrice: 80,
    description:
        '<p>Кто знает, откуда появился культ поклонения китам. Может быть, действительно, кто-то видел гигантских, летающих по небу рыб размером с город, а может быть, речь идет про остров <b style="color:#E65100;"><strong>Южный Кит</strong></b>, по форме сильно напоминающий гигантскую рыбу. Когда в <b style="color:#E65100;"><strong>Южном Ките</strong></b> был изобретен новый корабль, то его решили назвать в честь величественного существа. Подразумевалась ли мифическая рыба или речь шла о родном острове, инженеры умолчали.</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p><b style="color:#325ceb;"><strong>Небесный Кит</strong></b> является самым совершенным кораблем, созданным в Небесах Трех Дорог. За основу был взят корабль <b style="color:#febe0c;"><strong>Золотой Пеликан</strong></b>, созданный в <b style="color:#BF360C;"><strong>Нордвиле</strong></b>. Используя всю промышленную мощь своего города, инженеры <b style="color:#E65100;"><strong>Южного Кита</strong></b> серьёзно увеличили все характеристики корабля.&nbsp;</p>\n' +
        "<p>&nbsp;</p>\n" +
        "<p>К сожалению, корабль унаследовал от прародителя и его неповоротливость, однако этот недостаток легко нивелируется огромной скоростью.</p>\n" +
        "<p>&nbsp;</p>\n" +
        '<p>Такие значительные улучшения серьёзно увеличили стоимость, сделав <b style="color:#325ceb;"><strong>Небесного Кита</strong></b> недоступной мечтой для большинства торговцев.&nbsp;</p>\n',
    name: "Небесный кит",
}
