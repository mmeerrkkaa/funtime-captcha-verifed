// Minecraft map color palette
// https://minecraft.wiki/w/Map_item_format
const minecraftColors = [
    [0, 0, 0, 0],           // 0: transparent
    [127, 178, 56, 255],    // 1: grass
    [247, 233, 163, 255],   // 2: sand
    [199, 199, 199, 255],   // 3: wool
    [255, 0, 0, 255],       // 4: fire
    [160, 160, 255, 255],   // 5: ice
    [167, 167, 167, 255],   // 6: metal
    [0, 124, 0, 255],       // 7: plant
    [255, 255, 255, 255],   // 8: snow
    [164, 168, 184, 255],   // 9: clay
    [151, 109, 77, 255],    // 10: dirt
    [112, 112, 112, 255],   // 11: stone
    [64, 64, 255, 255],     // 12: water
    [143, 119, 72, 255],    // 13: wood
    [255, 252, 245, 255],   // 14: quartz
    [216, 127, 51, 255],    // 15: color_orange
    [178, 76, 216, 255],    // 16: color_magenta
    [102, 153, 216, 255],   // 17: color_light_blue
    [229, 229, 51, 255],    // 18: color_yellow
    [127, 204, 25, 255],    // 19: color_light_green
    [242, 127, 165, 255],   // 20: color_pink
    [76, 76, 76, 255],      // 21: color_gray
    [153, 153, 153, 255],   // 22: color_light_gray
    [76, 127, 153, 255],    // 23: color_cyan
    [127, 63, 178, 255],    // 24: color_purple
    [51, 76, 178, 255],     // 25: color_blue
    [102, 76, 51, 255],     // 26: color_brown
    [102, 127, 51, 255],    // 27: color_green
    [153, 51, 51, 255],     // 28: color_red
    [25, 25, 25, 255],      // 29: color_black
    [250, 238, 77, 255],    // 30: gold
    [92, 219, 213, 255],    // 31: diamond
    [74, 128, 255, 255],    // 32: lapis
    [0, 217, 58, 255],      // 33: emerald
    [129, 86, 49, 255],     // 34: podzol
    [112, 2, 0, 255],       // 35: nether
    [209, 177, 161, 255],   // 36: terracotta_white
    [159, 82, 36, 255],     // 37: terracotta_orange
    [149, 87, 108, 255],    // 38: terracotta_magenta
    [112, 108, 138, 255],   // 39: terracotta_light_blue
    [186, 133, 36, 255],    // 40: terracotta_yellow
    [103, 117, 53, 255],    // 41: terracotta_light_green
    [160, 77, 78, 255],     // 42: terracotta_pink
    [57, 41, 35, 255],      // 43: terracotta_gray
    [135, 107, 98, 255],    // 44: terracotta_light_gray
    [87, 92, 92, 255],      // 45: terracotta_cyan
    [122, 73, 88, 255],     // 46: terracotta_purple
    [76, 62, 92, 255],      // 47: terracotta_blue
    [76, 50, 35, 255],      // 48: terracotta_brown
    [76, 82, 42, 255],      // 49: terracotta_green
    [142, 60, 46, 255],     // 50: terracotta_red
    [37, 22, 16, 255],      // 51: terracotta_black
    [189, 48, 49, 255],     // 52: crimson_nylium
    [148, 63, 97, 255],     // 53: crimson_stem
    [92, 25, 29, 255],      // 54: crimson_hyphae
    [22, 126, 134, 255],    // 55: warped_nylium
    [58, 142, 140, 255],    // 56: warped_stem
    [86, 44, 62, 255],      // 57: warped_hyphae
    [20, 180, 133, 255],    // 58: warped_wart_block
];

function getExtendedPalette() {
    const palette = [];

    for (let i = 0; i < minecraftColors.length; i++) {
        const [r, g, b, a] = minecraftColors[i];

        palette.push([
            Math.floor(r * 180 / 255),
            Math.floor(g * 180 / 255),
            Math.floor(b * 180 / 255),
            a
        ]);

        palette.push([
            Math.floor(r * 220 / 255),
            Math.floor(g * 220 / 255),
            Math.floor(b * 220 / 255),
            a
        ]);

        palette.push([r, g, b, a]);

        palette.push([
            Math.floor(r * 135 / 255),
            Math.floor(g * 135 / 255),
            Math.floor(b * 135 / 255),
            a
        ]);
    }

    return palette;
}

const extendedPalette = getExtendedPalette();

function getColorFromIndex(index) {
    if (index < 0 || index >= extendedPalette.length) {
        return [0, 0, 0, 255];
    }
    return extendedPalette[index];
}

module.exports = { getColorFromIndex, extendedPalette };
