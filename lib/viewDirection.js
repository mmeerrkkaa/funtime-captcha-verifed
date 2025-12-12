const directionMap = new Map([
    ['0_-90', 'up'],
    ['0_90', 'down'],
    ['0_0', 'south'],
    ['180_0', 'north'],
    ['-180_0', 'north'],
    ['90_0', 'west'],
    ['-90_0', 'east'],
]);

const oppositeDirections = {
    up: 'down',
    down: 'up',
    north: 'south',
    south: 'north',
    east: 'west',
    west: 'east',
};

function getViewDirection(yaw, pitch) {
    const roundedYaw = Math.round(yaw);
    const roundedPitch = Math.round(pitch);

    const key = `${roundedYaw}_${roundedPitch}`;
    const direction = directionMap.get(key);

    if (direction) {
        return oppositeDirections[direction];
    }

    if (Math.abs(roundedPitch) > 45) {
        return roundedPitch < 0 ? 'down' : 'up';
    }

    if (roundedYaw >= -45 && roundedYaw <= 45) {
        return 'north';
    } else if (roundedYaw >= 45 && roundedYaw <= 135) {
        return 'east';
    } else if (roundedYaw >= 135 || roundedYaw <= -135) {
        return 'south';
    } else {
        return 'west';
    }
}

module.exports = { getViewDirection };
