/* BASE ENGINE SETTINGS */
export const LEVEL_WIDTH = window.innerWidth
export const LEVEL_HEIGHT = window.innerHeight

/* PLAYER SETTINGS */
export const BASIC_SHIP_SPEED = 200
export const BASIC_SHIP_ANGULAR_VELOCITY = 180
export const BASIC_SHIP_SCALE = 0.7
export const START_PLAYER_GOLD = 1000000

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
        '<p>Что такое храбрость, люди, пережившие Катаклизм, знают не понаслышке. Когда гигантский материк взмыл в небо и раскололся на куски, выжившие остались на небольшом острове, позже названном <b style="color:#4CAF50;"><strong>Брайвиль</strong></b>. &nbsp;</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p>Среди тех, кто выжил, была группа изобретателей. Понимая, что невозможно оставаться на маленьком острове, они собрали простенький летающий корабль буквально из подручных материалов и назвали его <b style="color:#6658cd;"><strong>“Храброй чайкой”</strong></b> в честь отважных птиц, обитавших в море, и о которых осталась только память.</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p>Современные <b style="color:#6658cd;"><strong>“Чайки”</strong></b> гораздо более совершенные, чем их прародитель. Они стали быстрее, на них разместили оружие и полноценные двигатели. Для боя <b style="color:#6658cd;"><strong>“Чайка”</strong></b> совсем не годится, да и запаса топлива хватит только для полетов между <b style="color:#4CAF50;"><strong>Брайвилем</strong></b> и <b style="color:#4CAF50;"><strong>Дальним Берегом</strong></b>. Тем не менее это самый манёвренный корабль из всех.</p>\n',
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
        '<p>Наглость — счастье дураков, гласит известная пословица. Только вот торговцы, выбирающие <b style="color:#23628e;"><strong>Храбрый альбатрос</strong></b>, так не считают. Чтобы прорваться через <b style="color:#474c5e;"><strong>пиратов</strong></b> между <b style="color:#4CAF50;"><strong>Брайвилем</strong></b> и <b style="color:#4CAF50;"><strong>Мидлгардом</strong></b>, нужно обладать порядочной долей наглости, которая будет щедро вознаграждена.&nbsp;</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p><b style="color:#23628e;"><strong>Храбрый альбатрос</strong></b> — главный корабль Королевства Зелёных Островов. Он является основой флота и главным торговым кораблем. Созданный в <b style="color:#4CAF50;"><strong>Мидлгарде</strong></b>, этот корабль позволил наладить торговлю в Королевстве, соединив все острова.&nbsp;</p>\n' +
        "<p>&nbsp;</p>\n" +
        '<p><b style="color:#474c5e;"><strong>Пираты</strong></b> используют изменённую версию этого корабля, называемую <b style="color:#474c5e;"><strong>Чёрной Акулой</strong></b>. У неё больший запас топлива, но во всём остальном она уступает оригиналу. Поэтому <b style="color:#23628e;"><strong>Храбрый альбатрос</strong></b> может дать достойный отпор <b style="color:#474c5e;"><strong>пиратам</strong></b>.</p>\n' +
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
    description: "",
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
    description: "",
    name: "Небесный кит",
}
