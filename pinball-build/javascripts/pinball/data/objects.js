(function() {
  Pinball.DATA = {
    objects: [
      {
        name: 'balloutTrigger',
        type: 'trigger',
        position: [236 + 146 / 2, 970 - 30 / 2],
        dimensions: [146, 30]
      }, {
        name: 'laneInTrigger',
        type: 'trigger',
        position: [160, 375],
        radius: 20
      }, {
        name: 'laneOutTrigger',
        type: 'trigger',
        position: [320, 125],
        radius: 20
      }, {
        name: 'slingshotLeft',
        type: 'slingshot',
        position: [185, 760],
        frame: 'entities/slingshot_left.png',
        fixture: 'slingshot_left'
      }, {
        name: 'slingshotRight',
        type: 'slingshot',
        position: [435, 758],
        frame: 'entities/slingshot_right.png',
        fixture: 'slingshot_right'
      }, {
        name: 'fliptarget1',
        type: 'fliptarget',
        position: [183, 400],
        frame: 'entities/block_1.png',
        fixture: 'block_1'
      }, {
        name: 'fliptarget2',
        type: 'fliptarget',
        position: [194, 417],
        frame: 'entities/block_1.png',
        fixture: 'block_1'
      }, {
        name: 'fliptarget3',
        type: 'fliptarget',
        position: [207, 435],
        frame: 'entities/block_1.png',
        fixture: 'block_1'
      }, {
        name: 'fliptarget4',
        type: 'fliptarget',
        position: [278, 122],
        frame: 'entities/block_2.png',
        fixture: 'block_2'
      }, {
        name: 'fliptarget5',
        type: 'fliptarget',
        position: [552, 658],
        frame: 'entities/block_1.png',
        fixture: 'block_1'
      }, {
        name: 'fliptarget6',
        type: 'fliptarget',
        position: [397, 78],
        frame: 'entities/block_3.png',
        fixture: 'block_3'
      }, {
        name: 'fliptarget7',
        type: 'fliptarget',
        position: [434, 84],
        frame: 'entities/block_3.png',
        fixture: 'block_3'
      }, {
        name: 'fliptarget8',
        type: 'fliptarget',
        position: [308, 931],
        frame: 'entities/flipper_block.png',
        fixture: 'flipper_block'
      }, {
        name: 'holeBL',
        type: 'hole',
        frame: 'entities/hole.png',
        fixture: 'hole',
        position: [98, 516]
      }, {
        name: 'holeBR',
        type: 'hole',
        frame: 'entities/hole.png',
        fixture: 'hole',
        position: [516, 553]
      }, {
        name: 'holeTR',
        type: 'hole',
        frame: 'entities/hole.png',
        fixture: 'hole',
        position: [548, 270]
      }, {
        name: 'holeRamp',
        type: 'hole',
        frame: 'entities/hole.png',
        fixture: 'hole_ramp',
        position: [480, 435],
        onramp: true
      }, {
        name: 'target1',
        type: 'target',
        position: [312, 318],
        frame: 'entities/bracket_1.png',
        fixture: 'bracket_1'
      }, {
        name: 'target2',
        type: 'target',
        position: [336, 324],
        frame: 'entities/bracket_1.png',
        fixture: 'bracket_1'
      }, {
        name: 'target3',
        type: 'target',
        position: [361, 330],
        frame: 'entities/bracket_1.png',
        fixture: 'bracket_1'
      }, {
        name: 'target4',
        type: 'target',
        position: [397, 465],
        frame: 'entities/bracket_2.png',
        fixture: 'bracket_2'
      }, {
        name: 'target5',
        type: 'target',
        position: [417, 485],
        frame: 'entities/bracket_2.png',
        fixture: 'bracket_2'
      }, {
        name: 'target6',
        type: 'target',
        position: [220, 199],
        frame: 'entities/bracket_3.png',
        fixture: 'bracket_3',
        light: 'topleft_1'
      }, {
        name: 'target7',
        type: 'target',
        position: [242, 193],
        frame: 'entities/bracket_3.png',
        fixture: 'bracket_3',
        light: 'topleft_2'
      }, {
        name: "bumperRed1",
        type: "bumper",
        fixture: 'bumper_red',
        position: [467, 184],
        frame: 'entities/bumper_red.png',
        frameLightened: 'entities/bumper_red_lighted.png'
      }, {
        name: "bumperRed2",
        type: "bumper",
        fixture: 'bumper_red',
        position: [397, 244],
        frame: 'entities/bumper_red.png',
        frameLightened: 'entities/bumper_red_lighted.png'
      }, {
        name: "bumperRed3",
        type: "bumper",
        fixture: 'bumper_red',
        position: [347, 184],
        frame: 'entities/bumper_red.png',
        frameLightened: 'entities/bumper_red_lighted.png'
      }, {
        name: "bumperBlue1",
        type: "bumper",
        fixture: 'bumper_blue',
        onramp: true,
        position: [481, 395],
        frame: 'entities/bumper_blue.png',
        frameLightened: 'entities/bumper_blue_lighted.png'
      }, {
        name: "bumperBlue2",
        type: "bumper",
        fixture: 'bumper_blue',
        onramp: true,
        position: [465, 337],
        frame: 'entities/bumper_blue.png',
        frameLightened: 'entities/bumper_blue_lighted.png'
      }, {
        name: "bumperBlue3",
        type: "bumper",
        fixture: 'bumper_blue',
        onramp: true,
        position: [522, 352],
        frame: 'entities/bumper_blue.png',
        frameLightened: 'entities/bumper_blue_lighted.png'
      }, {
        name: 'rollover1',
        type: 'rollover',
        position: [62, 738],
        frame: 'entities/rollover_1.png',
        fixture: 'rollover_1',
        light: 'leftLaneOut'
      }, {
        name: 'rollover2',
        type: 'rollover',
        position: [131, 737],
        frame: 'entities/rollover_4.png',
        fixture: 'rollover_4',
        light: 'leftLaneInside'
      }, {
        name: 'rollover3',
        type: 'rollover',
        position: [496, 737],
        frame: 'entities/rollover_3.png',
        fixture: 'rollover_3',
        light: 'rightLaneInside'
      }, {
        name: 'rollover4',
        type: 'rollover',
        position: [558, 743],
        frame: 'entities/rollover_2.png',
        fixture: 'rollover_2'
      }, {
        name: 'rollover5',
        type: 'rollover',
        position: [133, 98],
        frame: 'entities/rollover_5.png',
        fixture: 'rollover_5'
      }, {
        name: 'rollover6',
        type: 'rollover',
        position: [380, 76],
        frame: 'entities/rollover_6.png',
        fixture: 'rollover_6',
        light: 'trippleRollover1'
      }, {
        name: 'rollover7',
        type: 'rollover',
        position: [415, 80],
        frame: 'entities/rollover_6.png',
        fixture: 'rollover_6',
        light: 'trippleRollover2'
      }, {
        name: 'rollover8',
        type: 'rollover',
        position: [457, 86],
        frame: 'entities/rollover_6.png',
        fixture: 'rollover_6',
        light: 'trippleRollover3'
      }
    ],
    lights: [
      {
        name: 'missionLight1',
        type: 'light',
        position: [0, 0],
        alpha: 1,
        frame: 'lights/mission_light_1_off.png',
        frameLightened: 'lights/mission_light_1_on.png'
      }, {
        name: 'missionLight2',
        type: 'light',
        position: [36, 28],
        alpha: 1,
        frame: 'lights/mission_light_2_off.png',
        frameLightened: 'lights/mission_light_2_on.png'
      }, {
        name: 'missionLight3',
        type: 'light',
        position: [74, -10],
        alpha: 1,
        frame: 'lights/mission_light_3_off.png',
        frameLightened: 'lights/mission_light_3_on.png'
      }, {
        name: 'missionLight4',
        type: 'light',
        position: [120, 0],
        alpha: 1,
        frame: 'lights/mission_light_4_off.png',
        frameLightened: 'lights/mission_light_4_on.png'
      }, {
        name: 'missionLight5',
        type: 'light',
        position: [150, 25],
        alpha: 1,
        frame: 'lights/mission_light_5_off.png',
        frameLightened: 'lights/mission_light_5_on.png'
      }, {
        name: 'missionLaneLight1',
        type: "light",
        position: [95, 401],
        frame: 'lights/orange_lane_arrow2.png'
      }, {
        name: 'missionLaneLight2',
        type: "light",
        position: [89, 384],
        frame: 'lights/orange_lane_arrow2.png'
      }, {
        name: 'missionLaneLight3',
        type: "light",
        position: [82, 367],
        frame: 'lights/orange_lane_arrow2.png'
      }, {
        name: 'missionLaneLight4',
        type: "light",
        position: [77, 220],
        frame: 'lights/get_mission.png'
      }, {
        name: 'missionLaneLight5',
        type: "light",
        position: [187, 72],
        frame: 'lights/orange_lane_arrow.png'
      }, {
        name: 'missionLaneLight6',
        type: "light",
        position: [203, 65],
        frame: 'lights/orange_lane_arrow.png'
      }, {
        name: 'missionLaneLight7',
        type: "light",
        position: [220, 60],
        frame: 'lights/orange_lane_arrow.png'
      }, {
        name: 'leftLaneInside',
        type: "light",
        position: [133, 689],
        frame: 'lights/red_dot_off.png',
        frameLightened: 'lights/red_dot_on.png'
      }, {
        name: 'rightLaneInside',
        type: "light",
        position: [487, 689],
        frame: 'lights/red_dot_off.png',
        frameLightened: 'lights/red_dot_on.png'
      }, {
        name: 'topleft_1',
        type: "light",
        position: [226, 213],
        frame: 'lights/orange_dot_off.png',
        frameLightened: 'lights/orange_dot_on.png'
      }, {
        name: 'topleft_2',
        type: "light",
        position: [249, 207],
        frame: 'lights/orange_dot_off.png',
        frameLightened: 'lights/orange_dot_on.png'
      }, {
        name: 'center_1_a',
        type: "light",
        position: [304, 338],
        frame: 'lights/orange_dot_off.png',
        frameLightened: 'lights/orange_dot_on.png'
      }, {
        name: 'center_1_b',
        type: "light",
        position: [297, 355],
        frame: 'lights/orange_dot_off.png',
        frameLightened: 'lights/orange_dot_on.png'
      }, {
        name: 'center_2_a',
        type: "light",
        position: [328, 346],
        frame: 'lights/red_dot_off.png',
        frameLightened: 'lights/red_dot_on.png'
      }, {
        name: 'center_2_b',
        type: "light",
        position: [322, 363],
        frame: 'lights/red_dot_off.png',
        frameLightened: 'lights/red_dot_on.png'
      }, {
        name: 'center_3_a',
        type: "light",
        position: [354, 354],
        frame: 'lights/yellow_dot_off.png',
        frameLightened: 'lights/yellow_dot_on.png'
      }, {
        name: 'center_3_b',
        type: "light",
        position: [346, 370],
        frame: 'lights/yellow_dot_off.png',
        frameLightened: 'lights/yellow_dot_on.png'
      }, {
        name: 'right_1_a',
        type: "light",
        position: [386, 470],
        frame: 'lights/orange_dot_off.png',
        frameLightened: 'lights/orange_dot_on.png'
      }, {
        name: 'right_1_b',
        type: "light",
        position: [372, 484],
        frame: 'lights/orange_dot_off.png',
        frameLightened: 'lights/orange_dot_on.png'
      }, {
        name: 'right_2_a',
        type: "light",
        position: [405, 489],
        frame: 'lights/orange_dot_off.png',
        frameLightened: 'lights/orange_dot_on.png'
      }, {
        name: 'right_2_b',
        type: "light",
        position: [390, 502],
        frame: 'lights/orange_dot_off.png',
        frameLightened: 'lights/orange_dot_on.png'
      }, {
        name: 'leftLaneOut',
        type: 'light',
        position: [63, 676],
        alpha: 0.5,
        alphaLightened: 1,
        frame: 'lights/left_lane_arrow_off.png',
        frameLightened: 'lights/left_lane_arrow_on.png'
      }, {
        type: 'light',
        name: 'trippleRollover1',
        position: [387, 45],
        frame: 'lights/smalllane_arrow_small_top.png'
      }, {
        type: 'light',
        name: 'trippleRollover2',
        position: [426, 51],
        frame: 'lights/smalllane_arrow_small_top.png'
      }, {
        type: 'light',
        name: 'trippleRollover3',
        position: [469, 59],
        frame: 'lights/smalllane_arrow_small_top.png'
      }, {
        type: 'light',
        name: 'holeArrow1',
        position: [120, 543],
        frame: "lights/hole_arrow_yellow.png",
        angle: 145
      }, {
        type: 'light',
        name: 'holeArrow2',
        position: [528, 240],
        frame: "lights/hole_arrow_orange.png",
        angle: 145 + 180
      }, {
        type: 'light',
        name: 'holeArrow3',
        position: [468, 605],
        frame: "lights/hole_arrow_blue.png",
        angle: 145 - 90
      }, {
        type: 'light',
        name: 'holeArrow4',
        position: [491, 581],
        frame: "lights/hole_arrow_blue.png",
        angle: 145 - 90
      }, {
        name: 'redArrowLeftSmall',
        type: 'light',
        position: [156, 491],
        frame: 'lights/red_arrow_left_small.png'
      }, {
        name: 'redArrowLeftBig',
        type: 'light',
        position: [181, 527],
        frame: 'lights/red_arrow_left_big.png'
      }, {
        name: 'redArrowRightSmall',
        type: 'light',
        position: [449, 541],
        frame: 'lights/red_arrow_right_small.png'
      }, {
        name: 'redArrowRightBig',
        type: 'light',
        position: [425, 573],
        frame: 'lights/red_arrow_right_big.png'
      }, {
        name: 'x4',
        type: 'light',
        position: [224, 474],
        frame: 'lights/x4_on.png'
      }, {
        name: 'x2',
        type: 'light',
        position: [447, 635],
        frame: 'lights/x2_on.png'
      }, {
        name: 'plungerArrow1',
        type: 'light',
        position: [611, 729],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow2',
        type: 'light',
        position: [611, 729 - 30 * 1],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow3',
        type: 'light',
        position: [611, 729 - 30 * 2],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow4',
        type: 'light',
        position: [611, 729 - 30 * 3],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow5',
        type: 'light',
        position: [611, 729 - 30 * 4],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow6',
        type: 'light',
        position: [611, 560],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow7',
        type: 'light',
        position: [611, 560 - 35 * 1],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow8',
        type: 'light',
        position: [611, 560 - 35 * 2],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow9',
        type: 'light',
        position: [611, 560 - 35 * 3],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow10',
        type: 'light',
        position: [611, 400],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow11',
        type: 'light',
        position: [611, 400 - 40 * 1],
        frame: 'lights/plunger_lane_arrow.png'
      }, {
        name: 'plungerArrow12',
        type: 'light',
        position: [611, 400 - 40 * 2],
        frame: 'lights/plunger_lane_arrow.png'
      }
    ],
    lightgroups: [
      {
        name: 'holeBottomRightArrow',
        type: "lightgroup",
        patterns: {
          line: '~#0#50'
        },
        lights: ['holeArrow3', 'holeArrow4']
      }, {
        name: 'missionProgressLights',
        type: "lightgroup",
        useCustomClass: true,
        patterns: {
          line: '03060#250#50'
        },
        lights: ['missionLight1', 'missionLight2', 'missionLight3', 'missionLight4', 'missionLight5']
      }, {
        name: 'trippleRollovers',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['trippleRollover1', 'trippleRollover2', 'trippleRollover3']
      }, {
        name: 'enterMissionLaneLights',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['redArrowLeftSmall', 'redArrowLeftBig']
      }, {
        name: 'missionEnterRampLights',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['redArrowRightSmall', 'redArrowRightBig']
      }, {
        name: 'missionLaneLights',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['missionLaneLight1', 'missionLaneLight2', 'missionLaneLight3', 'missionLaneLight4', 'missionLaneLight5', 'missionLaneLight6', 'missionLaneLight7']
      }, {
        name: 'plungerLaneLights',
        type: "lightgroup",
        patterns: {
          line: '~',
          rain: '~#150#250',
          longline: '~#850#50',
          walking: '0F#250#50',
          grouped: '333336666999#150#50'
        },
        lights: ['plungerArrow1', 'plungerArrow2', 'plungerArrow3', 'plungerArrow4', 'plungerArrow5', 'plungerArrow6', 'plungerArrow7', 'plungerArrow8', 'plungerArrow9', 'plungerArrow10', 'plungerArrow11', 'plungerArrow12']
      }, {
        name: 'targetLightsCenter1',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['center_1_a', 'center_1_b']
      }, {
        name: 'targetLightsCenter2',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['center_2_a', 'center_2_b']
      }, {
        name: 'targetLightsCenter3',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['center_3_a', 'center_3_b']
      }, {
        name: 'targetLightsRight1',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['right_1_a', 'right_1_b']
      }, {
        name: 'targetLightsRight2',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['right_2_a', 'right_2_b']
      }, {
        name: 'holeArrowBottomRight',
        type: "lightgroup",
        patterns: {
          line: '~#250#50'
        },
        lights: ['holeArrow3', 'holeArrow4']
      }, {
        name: 'otherLights',
        type: "lightgroup",
        patterns: {
          line: '036#250#50'
        },
        lights: ['leftLaneInside', 'rightLaneInside', 'topleft_1', 'topleft_2', 'leftLaneOut', 'holeArrow1', 'holeArrow2', 'x4', 'x2']
      }
    ]
  };

}).call(this);
