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
    velocity: BASIC_SHIP_SPEED - 50,
    angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY + 80,
    damage: 5,
    maxHealth: 20,
    currentHealth: 20,
    maxFuel: 35,
    currentFuel: 35,
    price: 10000,
    repairPrice: 10,
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
}

export const whaleParams = {
    velocity: BASIC_SHIP_SPEED + 150,
    angularVelocity: BASIC_SHIP_ANGULAR_VELOCITY - 30,
    damage: 150,
    maxHealth: 700,
    currentHealth: 700,
    maxFuel: 500,
    currentFuel: 500,
    price: 100000,
    repairPrice: 80,
}
