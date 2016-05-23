(function() {
  window.Pinball = {
    Actions: {},
    Logic: {},
    Base: {},
    Core: {},
    Factories: {},
    Models: {},
    Screens: {},
    Missions: {},
    Entities: {},
    Machine: {},
    Store: {},
    Controller: {}
  };

}).call(this);
(function() {
  var language,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  language = {
    delimiters: {
      thousands: '.',
      decimal: ','
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
    },
    ordinal: function(number) {
      return '.';
    },
    currency: {
      symbol: '€'
    }
  };

  numeral.language('de', language);

  Pinball.ScoreField = (function(_super) {
    __extends(ScoreField, _super);

    function ScoreField() {
      return ScoreField.__super__.constructor.apply(this, arguments);
    }

    ScoreField.prototype.initialize = function(options) {
      numeral.language('de');
      return this.set(options.initialScore || 0);
    };

    ScoreField.prototype.set = function(value) {
      return this.$el.html(numeral(value).format('0,0'));
    };

    return ScoreField;

  })(Backbone.View);

}).call(this);
(function() {
  Pinball.LOGIC = {
    states: [
      {
        target: ['missionLaneLights'],
        event: ['newball', 'endedmisison'],
        transitionEvent: 'switchon'
      }, {
        target: ['missionLaneLights'],
        event: 'newmission',
        transitionEvent: 'switchoff'
      }, {
        target: ['plungerLaneLights'],
        event: 'newball',
        transitionEvent: 'alwaysblink'
      }, {
        targetEntityType: 'lightgroup',
        event: 'newgame',
        transitionEvent: 'helloblink'
      }, {
        targetEntityType: 'rollover',
        event: 'newball',
        transitionEvent: 'turnoff'
      }, {
        targetEntityType: 'target',
        event: 'newball',
        transitionEvent: 'turnoff'
      }, {
        targetEntityType: 'hole',
        event: 'newball',
        transitionEvent: 'reset'
      }, {
        target: 'balloutTrigger',
        event: 'newball',
        transitionEvent: 'turnon'
      }, {
        target: 'enterMissionLaneLights',
        event: 'newmission',
        transitionEvent: 'switchoff'
      }, {
        target: 'enterMissionLaneLights',
        event: ['newball', 'endedmisison'],
        transitionEvent: 'alwaysblink'
      }, {
        target: 'rollover5',
        event: ['endedmisison'],
        transitionEvent: 'turnoff'
      }
    ],
    actions: {
      grouped: {
        messages: [
          {
            target: 'balloutTrigger',
            state: 'activated',
            action: 'display',
            message: 'ball out!',
            blink: true
          }, {
            target: 'plunger',
            state: 'tensed',
            action: 'display',
            message: 'common!'
          }, {
            target: 'plunger',
            state: 'released',
            action: 'display',
            message: '!shoot!'
          }
        ],
        targetsCenter: [
          {
            target: 'target1',
            state: 'enabled',
            action: 'lighten',
            lightState: 'on',
            light: 'targetLightsCenter1'
          }, {
            target: 'target2',
            state: 'enabled',
            action: 'lighten',
            lightState: 'on',
            light: 'targetLightsCenter2'
          }, {
            target: 'target3',
            state: 'enabled',
            action: 'lighten',
            lightState: 'on',
            light: 'targetLightsCenter3'
          }, {
            target: ['target1', 'target2', 'target3'],
            state: 'activated',
            action: 'display',
            message: 'good',
            blink: true
          }, {
            target: 'target1',
            state: ['activated', 'disabled'],
            action: 'lighten',
            lightState: 'off',
            light: 'targetLightsCenter1'
          }, {
            target: 'target2',
            state: ['activated', 'disabled'],
            action: 'lighten',
            lightState: 'off',
            light: 'targetLightsCenter2'
          }, {
            target: 'target3',
            state: ['activated', 'disabled'],
            action: 'lighten',
            lightState: 'off',
            light: 'targetLightsCenter3'
          }
        ],
        targetsRight: [
          {
            target: 'target4',
            state: 'enabled',
            action: 'lighten',
            lightState: 'on',
            light: 'targetLightsRight1'
          }, {
            target: 'target5',
            state: 'enabled',
            action: 'lighten',
            lightState: 'on',
            light: 'targetLightsRight2'
          }, {
            target: 'target4',
            state: ['activated', 'disabled'],
            action: 'lighten',
            lightState: 'off',
            light: 'targetLightsRight1'
          }, {
            target: 'target5',
            state: ['activated', 'disabled'],
            action: 'lighten',
            lightState: 'off',
            light: 'targetLightsRight2'
          }
        ],
        targetsTopLeft: [
          {
            target: 'target6',
            state: 'enabled',
            action: 'lighten',
            lightState: 'on',
            light: 'topleft_1'
          }, {
            target: 'target7',
            state: 'enabled',
            action: 'lighten',
            lightState: 'on',
            light: 'topleft_2'
          }, {
            target: 'target6',
            state: ['activated', 'disabled'],
            action: 'lighten',
            lightState: 'off',
            light: 'topleft_1'
          }, {
            target: 'target7',
            state: ['activated', 'disabled'],
            action: 'lighten',
            lightState: 'off',
            light: 'topleft_2'
          }
        ],
        holeTR: [
          {
            target: 'holeTR',
            state: 'teleporter',
            action: 'teleport',
            holdtime: 2000,
            score: 1750,
            destination: 'holeBR',
            shoot: [230, 20]
          }, {
            target: 'holeTR',
            state: 'teleporter',
            action: 'lighten',
            lightState: 'blink',
            light: 'holeBottomRightArrow'
          }, {
            target: 'holeBR',
            state: 'receiver',
            action: 'lighten',
            lightState: 'off',
            light: 'holeBottomRightArrow'
          }, {
            target: 'holeTR',
            state: 'teleporter',
            action: 'display',
            message: "phewww"
          }
        ],
        holeBR: [
          {
            target: 'holeBR',
            state: 'teleporter',
            action: 'teleport',
            holdtime: 1000,
            score: 5000,
            destination: 'holeTR',
            shoot: [-10, 17]
          }, {
            target: 'holeBR',
            state: 'teleporter',
            action: 'display',
            message: 'scotty!'
          }, {
            target: 'holeBR',
            state: 'enabled',
            action: 'lighten',
            lightState: 'blinkgroup',
            light: 'holeArrowBottomRight'
          }, {
            target: 'holeBR',
            state: ['disabled', 'idle'],
            action: 'lighten',
            lightState: 'off',
            light: 'holeArrowBottomRight'
          }, {
            target: 'holeTR',
            state: 'receiver',
            action: 'lighten',
            lightState: 'blink',
            light: 'holeArrow2'
          }, {
            target: 'holeTR',
            state: ['disabled', 'idle'],
            action: 'lighten',
            lightState: 'off',
            light: 'holeArrow2'
          }
        ],
        holeBL: [
          {
            target: 'holeBL',
            state: 'teleporter',
            action: 'teleport',
            score: 2500,
            holdtime: 3000,
            destination: 'holeBL',
            shoot: [135, 20]
          }, {
            target: 'holeBL',
            state: 'teleporter',
            action: 'display',
            message: "pheww"
          }, {
            target: 'holeBL',
            state: ['enabled', 'receiver'],
            action: 'lighten',
            lightState: 'blink',
            light: 'holeArrow1'
          }, {
            target: 'holeBL',
            state: ['disabled', 'idle'],
            action: 'lighten',
            lightState: 'off',
            light: 'holeArrow1'
          }, {
            target: 'holeBL',
            state: 'receiver',
            action: 'display',
            message: "nice\ntrip"
          }
        ],
        holeRamp: [
          {
            target: 'ramp',
            state: 'centerRamp',
            action: 'statechange',
            stateOf: 'holeRamp',
            transition: 'turnon'
          }, {
            target: 'ramp',
            state: 'disabled',
            action: 'statechange',
            stateOf: 'holeRamp',
            transition: 'turnoff'
          }
        ],
        bumpers: [
          {
            target: ['bumperRed1', 'bumperRed2', 'bumperRed3', 'bumperBlue1', 'bumperBlue2', 'bumperBlue3'],
            state: 'powered',
            action: 'display',
            message: "oops"
          }, {
            target: ['bumperRed1', 'bumperRed2', 'bumperRed3', 'bumperBlue1', 'bumperBlue2', 'bumperBlue3'],
            state: 'powered',
            action: 'sound',
            soundID: 'bumper'
          }, {
            target: ['bumperRed1', 'bumperRed2', 'bumperRed3'],
            state: 'powered',
            action: 'score',
            score: 1000
          }, {
            target: ['bumperBlue1', 'bumperBlue2', 'bumperBlue3'],
            state: 'powered',
            action: 'score',
            score: 2000
          }
        ],
        rollovers: [
          {
            target: 'rollover1',
            state: 'sunken',
            action: 'lighten',
            lightState: 'on',
            light: 'leftLaneOut'
          }, {
            target: 'rollover1',
            state: 'off',
            action: 'lighten',
            lightState: 'off',
            light: 'leftLaneOut'
          }, {
            target: 'rollover1',
            state: 'sunken',
            action: 'score',
            score: 1000
          }, {
            target: ['rollover1'],
            state: 'sunken',
            action: 'display',
            message: "Attention!",
            blink: true
          }, {
            target: ['rollover2', 'rollover3'],
            state: 'sunken',
            action: 'display',
            message: "Risky!"
          }, {
            target: 'rollover2',
            state: 'sunken',
            action: 'lighten',
            lightState: 'on',
            light: 'leftLaneInside'
          }, {
            target: 'rollover2',
            state: 'off',
            action: 'lighten',
            lightState: 'off',
            light: 'leftLaneInside'
          }, {
            target: 'rollover2',
            state: 'sunken',
            action: 'score',
            score: 525
          }, {
            target: 'rollover3',
            state: 'sunken',
            action: 'lighten',
            lightState: 'on',
            light: 'rightLaneInside'
          }, {
            target: 'rollover3',
            state: 'off',
            action: 'lighten',
            lightState: 'off',
            light: 'rightLaneInside'
          }, {
            target: 'rollover3',
            state: 'sunken',
            action: 'score',
            score: 525
          }, {
            target: 'rollover5',
            state: 'sunken',
            action: 'startmission'
          }, {
            target: 'rollover5',
            state: 'sunken',
            action: 'score',
            score: 7000
          }, {
            target: 'rollover6',
            state: 'sunken',
            action: 'lighten',
            lightState: 'on',
            light: 'trippleRollover1'
          }, {
            target: 'rollover6',
            state: 'off',
            action: 'lighten',
            lightState: 'off',
            light: 'trippleRollover1'
          }, {
            target: 'rollover7',
            state: 'sunken',
            action: 'lighten',
            lightState: 'on',
            light: 'trippleRollover2'
          }, {
            target: 'rollover7',
            state: 'off',
            action: 'lighten',
            lightState: 'off',
            light: 'trippleRollover2'
          }, {
            target: 'rollover8',
            state: 'sunken',
            action: 'lighten',
            lightState: 'on',
            light: 'trippleRollover3'
          }, {
            target: 'rollover8',
            state: 'off',
            action: 'lighten',
            lightState: 'off',
            light: 'trippleRollover3'
          }, {
            target: ['rollover1', 'rollover2', 'rollover3', 'rollover5', 'rollover6', 'rollover7', 'rollover8'],
            state: 'sunken',
            action: 'sound',
            soundID: 'rollover'
          }
        ]
      },
      unsorted: [
        {
          target: ['slingshotLeft', 'slingshotRight'],
          state: 'powered',
          action: 'sound',
          soundID: 'slingshot'
        }, {
          target: 'plunger',
          state: 'released',
          action: 'statechange',
          stateOf: 'plungerLaneLights',
          transition: 'switchoff'
        }, {
          target: 'balloutTrigger',
          state: 'activated',
          action: 'endball'
        }, {
          target: 'balloutTrigger',
          state: 'activated',
          action: 'sound',
          soundID: 'ballout'
        }, {
          target: 'plunger',
          state: 'released',
          action: 'sound',
          soundID: 'plunger'
        }, {
          target: 'holeRamp',
          state: 'teleporter',
          action: 'teleport',
          holdtime: 2000,
          score: 2500,
          destination: 'holeBL',
          shoot: [135, 20],
          disableRamp: true
        }, {
          target: 'holeRamp',
          state: 'teleporter',
          action: 'lighten',
          light: 'holeArrow1',
          lightState: 'blink'
        }, {
          target: ['holeRamp', 'holeBL', 'holeBR', 'holeTR'],
          state: 'receiver',
          action: 'sound',
          soundID: 'sinkhole'
        }, {
          target: ['flipperLeft', 'flipperRight', 'flipperRamp'],
          state: 'active',
          action: 'score',
          score: 25
        }
      ]
    }
  };

}).call(this);
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
(function() {
  Pinball.Base.PinballEntityWrapper = (function() {
    function PinballEntityWrapper(object, options) {
      this.object = object;
      this._id = options.name;
    }

    PinballEntityWrapper.prototype.getObject = function() {
      return this.object;
    };

    PinballEntityWrapper.prototype.getType = function() {
      return 'compatibility_wrapper';
    };

    PinballEntityWrapper.prototype.getID = function() {
      return this._id;
    };

    return PinballEntityWrapper;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.PinballEntity = (function(_super) {
    __extends(PinballEntity, _super);

    function PinballEntity(game, options) {
      this.handleStateChanged = __bind(this.handleStateChanged, this);
      if (options.fullFrame) {
        PinballEntity.__super__.constructor.call(this, game, options.position[0], options.position[1], options.fullFrame);
      } else {
        PinballEntity.__super__.constructor.call(this, game, options.position[0], options.position[1], 'sprites', options.frame);
      }
      this.options = options;
      this.anchor.set(0.5);
      this._id = options.name;
      if (options.fixture != null) {
        this.physicsable = new Pinball.Base.ComponentPhysics(this.game, options, this);
      }
      if (this.physicsable) {
        this.collidable = new Pinball.Core.CollideableEntity(this, this.getCollisionShapes());
      }
      this.actionable = new Pinball.Base.ComponentActions();
      this.eventable = new Pinball.Base.ComponentEvents(this);
      this.eventable.register('hit', this.hit);
      this.eventable.register('endball', this.endBall);
      this.eventable.register('newball', this.newBall);
      this.stateChangedSignal = new Phaser.Signal();
    }

    PinballEntity.prototype.getCollisionShapes = function() {
      return this.physicsable.getCollisionShapes();
    };

    PinballEntity.prototype.createFSM = function() {
      this.fsm = StateMachine.create(this.getStateConfig());
      return this.fsm.onenterstate = this.handleStateChanged;
    };

    PinballEntity.prototype.handleStateChanged = function(event, from, to) {
      if (this.actionable) {
        this.actionable.run(to);
      }
      return this.stateChangedSignal.dispatch(event, from, to);
    };

    PinballEntity.prototype.getStateConfig = function() {
      return {};
    };

    PinballEntity.prototype.getBody = function() {
      return this.physicsable.body;
    };

    PinballEntity.prototype.transition = function(event) {
      return this.fsm[event]();
    };

    PinballEntity.prototype.getType = function() {
      return 'entity';
    };

    PinballEntity.prototype.getID = function() {
      return this._id;
    };

    PinballEntity.prototype.hit = function() {
      if (this.fsm && this.fsm['hit'] && this.fsm.can('hit')) {
        return this.fsm.hit();
      }
    };

    PinballEntity.prototype.endBall = function() {};

    PinballEntity.prototype.newBall = function() {};

    return PinballEntity;

  })(Phaser.Sprite);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.PinballGroup = (function(_super) {
    __extends(PinballGroup, _super);

    function PinballGroup(game, options) {
      if (options == null) {
        options = {};
      }
      PinballGroup.__super__.constructor.call(this, game);
      this._id = options.name;
      this.createFSM();
    }

    PinballGroup.prototype.createFSM = function() {
      return this.fsm = StateMachine.create(this.getStateConfig());
    };

    PinballGroup.prototype.transition = function(event) {
      if (this.fsm.can(event)) {
        return this.fsm[event]();
      }
    };

    PinballGroup.prototype.getStateConfig = function() {
      return {};
    };

    PinballGroup.prototype.getType = function() {
      return 'pinball_group';
    };

    PinballGroup.prototype.getID = function() {
      return this._id;
    };

    return PinballGroup;

  })(Phaser.Group);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Base.PinballObject = (function() {
    function PinballObject(game, options, material) {
      this.handleStateChanged = __bind(this.handleStateChanged, this);
      this.game = game;
      this.options = options;
      this._id = options.name;
      this.actionable = new Pinball.Base.ComponentActions();
      this.eventable = new Pinball.Base.ComponentEvents(this);
      this.eventable.register('hit', this.hit);
      this.eventable.register('endball', this.endBall);
      this.eventable.register('newball', this.newBall);
      this.createFSM();
    }

    PinballObject.prototype.createFSM = function() {
      this.stateChangedSignal = new Phaser.Signal();
      this.fsm = StateMachine.create(this.getStateConfig());
      return this.fsm.onenterstate = this.handleStateChanged;
    };

    PinballObject.prototype.handleStateChanged = function(event, from, to) {
      if (this.actionable) {
        this.actionable.run(to);
      }
      return this.stateChangedSignal.dispatch(event, from, to);
    };

    PinballObject.prototype.transition = function(event) {
      return this.fsm[event]();
    };

    PinballObject.prototype.getStateConfig = function() {
      return {};
    };

    PinballObject.prototype.getType = function() {
      return void 0;
    };

    PinballObject.prototype.getID = function() {
      return this._id;
    };

    PinballObject.prototype.hit = function() {
      if (this.fsm && this.fsm['hit'] && this.fsm.can('hit')) {
        return this.fsm.hit();
      }
    };

    PinballObject.prototype.endBall = function() {};

    PinballObject.prototype.newBall = function() {};

    return PinballObject;

  })();

}).call(this);
(function() {
  Pinball.Core.CollideableEntity = (function() {
    function CollideableEntity(entity, shape) {
      this.entity = entity;
      if (shape instanceof Array) {
        this.shapes = shape;
      } else {
        this.shapes = [shape];
      }
    }

    CollideableEntity.prototype.getCollisionShapes = function() {
      return this.shapes;
    };

    CollideableEntity.prototype.getEntity = function() {
      return this.entity;
    };

    CollideableEntity.prototype.hasShape = function(givenShape) {
      var shape, _i, _len, _ref;
      if (this.shapes.length === 1) {
        if (givenShape === this.shapes[0]) {
          return true;
        }
      } else {
        _ref = this.getCollisionShapes();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          shape = _ref[_i];
          if (givenShape === shape) {
            return true;
          }
        }
      }
      return false;
    };

    return CollideableEntity;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Core.ContactCallback = (function() {
    function ContactCallback(entity, enter, leave) {
      this.entity = entity;
      this.enterCallback = enter;
      this.leaveCallback = leave;
    }

    ContactCallback.prototype.leave = function(contact) {
      if (this.leaveCallback != null) {
        return this.leaveCallback.call(void 0, this.entity, contact);
      }
    };

    ContactCallback.prototype.enter = function(contact) {
      if (this.enterCallback != null) {
        return this.enterCallback.call(void 0, this.entity, contact);
      }
    };

    return ContactCallback;

  })();

  Pinball.Core.EntityContactListener = (function() {
    function EntityContactListener(game, entity) {
      this.onEndContact = __bind(this.onEndContact, this);
      this.onBeginContact = __bind(this.onBeginContact, this);
      this.game = game;
      this.entity = entity;
      this.callbacks = [];
      this.game.physics.p2.world.on("beginContact", this.onBeginContact);
      this.game.physics.p2.world.on("endContact", this.onEndContact);
    }

    EntityContactListener.prototype["with"] = function(entity, callbackEnter, callbackLeave) {
      var callback, shape, shapes, _i, _len, _results;
      shapes = entity.getCollisionShapes();
      _results = [];
      for (_i = 0, _len = shapes.length; _i < _len; _i++) {
        shape = shapes[_i];
        callback = new Pinball.Core.ContactCallback(entity, callbackEnter, callbackLeave);
        _results.push(this.callbacks[shape.id] = callback);
      }
      return _results;
    };

    EntityContactListener.prototype.onBeginContact = function(contact) {
      var callback, shape;
      shape = this.identifyOpposite(contact);
      if (shape != null) {
        callback = this.findCallbackForShape(shape);
      }
      if (callback != null) {
        return callback.enter(contact);
      }
    };

    EntityContactListener.prototype.onEndContact = function(contact) {
      var callback, shape;
      shape = this.identifyOpposite(contact);
      if (shape != null) {
        callback = this.findCallbackForShape(shape);
      }
      if (callback != null) {
        return callback.leave(contact);
      }
    };

    EntityContactListener.prototype.identifyOpposite = function(contact) {
      if (this.entity.hasShape(contact.shapeB)) {
        return contact.shapeA;
      }
      if (this.entity.hasShape(contact.shapeA)) {
        return contact.shapeB;
      }
    };

    EntityContactListener.prototype.findCallbackForShape = function(shape) {
      return this.callbacks[shape.id];
    };

    return EntityContactListener;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Base.ComponentActions = (function() {
    function ComponentActions() {
      this.run = __bind(this.run, this);
      this.actions = [];
    }

    ComponentActions.prototype.addAction = function(action) {
      return this.actions.push(action);
    };

    ComponentActions.prototype.run = function(forState) {
      var action, actions, _i, _len, _results;
      actions = _(this.actions).where({
        state: forState
      });
      _results = [];
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        _results.push(action.run());
      }
      return _results;
    };

    return ComponentActions;

  })();

}).call(this);
(function() {
  Pinball.Base.ComponentEvents = (function() {
    function ComponentEvents(entity) {
      this.entity = entity;
      this.events = [];
    }

    ComponentEvents.prototype.register = function(event, callback) {
      return this.events[event] = callback;
    };

    ComponentEvents.prototype.trigger = function(event) {
      if (this.events[event]) {
        return this.events[event].apply(this.entity);
      }
    };

    return ComponentEvents;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Base.ComponentLightable = (function() {
    function ComponentLightable(game, sprite, options) {
      this.toggleLight = __bind(this.toggleLight, this);
      this.handleBlinkComplete = __bind(this.handleBlinkComplete, this);
      this.blinkCompleted = new Phaser.Signal();
      this.game = game;
      this.sprite = sprite;
      this._frame = options.frame;
      this._frameLightened = options.frameLightened;
      this._alphaLightened = options.alphaLightened || 1;
      this._alpha = options.alpha || 0.5;
      this.timer = this.game.time.create(false);
      this.timer.onComplete.add(this.handleBlinkComplete);
      this.powered = false;
      this.lightOff();
    }

    ComponentLightable.prototype.handleBlinkComplete = function() {
      return this.blinkCompleted.dispatch();
    };

    ComponentLightable.prototype.lightOn = function() {
      this.powered = true;
      if (this._frameLightened) {
        this.sprite.frameName = this._frameLightened;
      }
      return this.sprite.alpha = this._alphaLightened;
    };

    ComponentLightable.prototype.lightOff = function() {
      this.powered = false;
      if (this._frameLightened) {
        this.sprite.frameName = this._frame;
      }
      return this.sprite.alpha = this._alpha;
    };

    ComponentLightable.prototype.stopBlink = function() {
      return this.timer.stop(true);
    };

    ComponentLightable.prototype.blink = function(delay, offset, count) {
      if (delay == null) {
        delay = 500;
      }
      if (offset == null) {
        offset = 0;
      }
      if (count == null) {
        count = 3;
      }
      count = count * 2;
      this.timer.stop(true);
      if (count > 0) {
        this.timer.repeat(delay, count, this.toggleLight);
      } else {
        this.timer.loop(delay, this.toggleLight);
      }
      return this.timer.start(offset);
    };

    ComponentLightable.prototype.toggleLight = function() {
      if (this.powered) {
        return this.lightOff();
      } else {
        return this.lightOn();
      }
    };

    return ComponentLightable;

  })();

}).call(this);
(function() {
  Pinball.Base.ComponentPhysics = (function() {
    function ComponentPhysics(game, options, sprite) {
      if (sprite == null) {
        sprite = null;
      }
      this.game = game;
      this.world = this.game.physics.p2;
      this.position = options.position;
      this.options = options;
      this.sprite = sprite;
      this.buildBody();
      this.createFixture();
    }

    ComponentPhysics.prototype.setMaterial = function(material, fixtureKey) {
      if (this.sprite) {
        return this.fixtureGroup.setMaterial(material, fixtureKey);
      }
    };

    ComponentPhysics.prototype.buildBody = function() {
      var phaserBody;
      if (this.sprite) {
        this.game.physics.p2.enable(this.sprite, this.options.debug);
        phaserBody = this.sprite.body;
        phaserBody.clearShapes();
        phaserBody["static"] = !this.options.dynamic;
        phaserBody.allowSleep = true;
        this.body = phaserBody.data;
        return this.phaserBody = phaserBody;
      } else {
        this.body = new p2.Body({
          position: [this.world.pxmi(this.position[0]), this.world.pxmi(this.position[1])]
        });
        this.body.allowSleep = true;
        return this.world.world.addBody(this.body);
      }
    };

    ComponentPhysics.prototype.getCollisionShapes = function(keys) {
      return this.fixtureGroup.getFixtures(keys);
    };

    ComponentPhysics.prototype.setCollisionMask = function(bit) {
      return this.fixtureGroup.setMask(bit);
    };

    ComponentPhysics.prototype.setMass = function(value) {
      this.body.mass = value;
      return this.body.updateMassProperties();
    };

    ComponentPhysics.prototype.createFixture = function() {
      var data, debugBody, fixture, fixtureData, fixtures, _i, _len;
      if (this.sprite && this.options.fixture) {
        fixtures = this.sprite.body.addPhaserPolygon('physics', this.options.fixture);
      } else if (this.options.fixture) {
        data = this.game.cache.getPhysicsData('physics', this.options.fixture);
        fixtures = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          fixtureData = data[_i];
          fixture = Pinball.PhysicsUtils.addFixtureToBody(this.game, this.body, fixtureData);
          fixtures.push(fixture);
        }
      } else {
        if (this.options.dimensions) {
          fixture = new p2.Rectangle(this.world.pxmi(this.options.dimensions[0]), this.world.pxmi(this.options.dimensions[1]));
        } else {
          fixture = new p2.Circle(this.world.pxm(this.options.radius || 20));
        }
        fixture.collisionGroup = Pinball.Bits.TABLE;
        fixture.collisionMask = Pinball.Bits.BALL;
        fixture.sensor = true;
        if (this.options.fixtureOffset) {
          this.body.addShape(fixture, this.options.fixtureOffset[0], this.options.fixtureOffset[1]);
        } else {
          this.body.addShape(fixture);
        }
        if (this.options.debug) {
          debugBody = new Phaser.Physics.P2.BodyDebug(this.game, this.body);
        }
      }
      return this.fixtureGroup = new Phaser.Physics.P2.FixtureList(fixture || fixtures);
    };

    return ComponentPhysics;

  })();

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.ComponentSprite = (function(_super) {
    __extends(ComponentSprite, _super);

    function ComponentSprite(game) {
      ComponentSprite.__super__.constructor.call(this, game);
    }

    return ComponentSprite;

  })(Phaser.Sprite);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Core.StateableEntity = (function() {
    function StateableEntity(states) {
      this.runActions = __bind(this.runActions, this);
      this.handleTransition = __bind(this.handleTransition, this);
      this.actions = [];
      this.states = states;
      this.initFSM();
    }

    StateableEntity.prototype.trigger = function(event, force) {
      if (force) {
        switch (event) {
          case 'endball':
            return this.fsm.transition('ballout');
          case 'newball':
            return this.fsm.transition('idle');
        }
      } else {
        return this.fsm.handle(event);
      }
    };

    StateableEntity.prototype.registerAction = function(action) {
      return this.actions.push(action);
    };

    StateableEntity.prototype.initFSM = function() {
      this.fsm = new machina.Fsm({
        initialState: "ballout",
        states: this.getStates()
      });
      this.fsm.on('run.actions', this.runActions);
      return this.fsm.on('transition', this.handleTransition);
    };

    StateableEntity.prototype.handleTransition = function(options) {
      var newState;
      newState = options.toState;
      console.log('handleTransition', newState);
      return this.runActions(newState);
    };

    StateableEntity.prototype.runActions = function(forState) {
      var action, actions, _i, _len, _results;
      actions = _(this.actions).where({
        state: forState
      });
      _results = [];
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        _results.push(action.run());
      }
      return _results;
    };

    StateableEntity.prototype.getStates = function() {
      return {
        "ballout": {
          "newball": "idle"
        },
        "idle": {
          "hit": "hitted"
        },
        "hitted": {},
        "lightened": {}
      };
    };

    return StateableEntity;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Bumper = (function(_super) {
    __extends(Bumper, _super);

    function Bumper(game, options, material) {
      this.handlePowerOff = __bind(this.handlePowerOff, this);
      this.handlePowerOn = __bind(this.handlePowerOn, this);
      this.switchoff = __bind(this.switchoff, this);
      this.beforeSwitchOn = __bind(this.beforeSwitchOn, this);
      Bumper.__super__.constructor.call(this, game, options);
      this.physicsable.setMaterial(material);
      this.lightable = new Pinball.Base.ComponentLightable(this.game, this, _(options).extend({
        alpha: 1
      }));
      this.createFSM();
    }

    Bumper.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'hit',
            from: '*',
            to: 'powered'
          }, {
            name: 'switchoff',
            from: 'powered',
            to: 'off'
          }
        ],
        callbacks: {
          onpowered: this.handlePowerOn,
          onoff: this.handlePowerOff,
          onbeforeswitchon: this.beforeSwitchOn
        }
      };
    };

    Bumper.prototype.getType = function() {
      return 'bumper';
    };

    Bumper.prototype.beforeSwitchOn = function() {
      if (this.fsm.current === 'powered') {
        return this.startTimer();
      }
    };

    Bumper.prototype.hit = function() {
      return this.fsm.hit();
    };

    Bumper.prototype.switchoff = function() {
      return this.fsm.switchoff();
    };

    Bumper.prototype.startTimer = function() {
      this.game.time.events.remove(this.timeout);
      return this.timeout = this.game.time.events.add(500, this.switchoff);
    };

    Bumper.prototype.handlePowerOn = function() {
      this.lightable.lightOn();
      return this.startTimer();
    };

    Bumper.prototype.handlePowerOff = function() {
      this.game.time.events.remove(this.timeout);
      delete this.timeout;
      return this.lightable.lightOff();
    };

    return Bumper;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.FlipTarget = (function(_super) {
    __extends(FlipTarget, _super);

    function FlipTarget(game, options, material) {
      this.handleDisabled = __bind(this.handleDisabled, this);
      this.handleEnabled = __bind(this.handleEnabled, this);
      FlipTarget.__super__.constructor.call(this, game, options);
      this.createFSM();
    }

    FlipTarget.prototype.getStateConfig = function() {
      return {
        initial: 'disabled',
        error: function() {
          return console.log('bad event in fliptarget ignored');
        },
        events: [
          {
            name: 'turnoff',
            from: '*',
            to: 'disabled'
          }, {
            name: 'turnon',
            from: 'disabled',
            to: 'enabled'
          }, {
            name: 'hit',
            from: 'enabled',
            to: 'activated'
          }, {
            name: 'reset',
            from: '*',
            to: 'disabled'
          }
        ],
        callbacks: {
          onactivated: this.handleEnabled,
          ondisabled: this.handleDisabled
        }
      };
    };

    FlipTarget.prototype.getType = function() {
      return 'fliptarget';
    };

    FlipTarget.prototype.handleEnabled = function() {
      this.visible = false;
      return this.physicsable.setCollisionMask(Pinball.Bits.NOTHING);
    };

    FlipTarget.prototype.handleDisabled = function() {
      this.visible = true;
      return this.physicsable.setCollisionMask(Pinball.Bits.BALL);
    };

    return FlipTarget;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Hole = (function(_super) {
    __extends(Hole, _super);

    function Hole(game, options, material) {
      this.handleTeleporter = __bind(this.handleTeleporter, this);
      Hole.__super__.constructor.call(this, game, options);
      this.createFSM();
    }

    Hole.prototype.getType = function() {
      return 'hole';
    };

    Hole.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        error: function() {
          return console.log('wrong state in hole reqeusted');
        },
        events: [
          {
            name: 'turnoff',
            from: '*',
            to: 'disabled'
          }, {
            name: 'turnon',
            from: '*',
            to: 'enabled'
          }, {
            name: 'hit',
            from: ['idle', 'enabled'],
            to: 'teleporter'
          }, {
            name: 'hit',
            from: 'receiver',
            to: 'idle'
          }, {
            name: 'receive',
            from: '*',
            to: 'receiver'
          }, {
            name: 'reset',
            from: ['*'],
            to: 'idle'
          }
        ],
        callbacks: {
          onteleporter: this.handleTeleporter
        }
      };
    };

    Hole.prototype.resetHole = function() {
      return this.fsm.reset();
    };

    Hole.prototype.receive = function() {
      return this.fsm.receive();
    };

    Hole.prototype.handleTeleporter = function() {
      return this.fsm.reset();
    };

    return Hole;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Light = (function(_super) {
    __extends(Light, _super);

    function Light(game, options) {
      this.handlePowerOn = __bind(this.handlePowerOn, this);
      this.handlePowerOff = __bind(this.handlePowerOff, this);
      this.handleBlinking = __bind(this.handleBlinking, this);
      this.handleHelloBlink = __bind(this.handleHelloBlink, this);
      this.onBlinkCompleted = __bind(this.onBlinkCompleted, this);
      Light.__super__.constructor.call(this, game, options);
      this.angle = options.angle || 0;
      this.blinkCompleted = new Phaser.Signal();
      this.lightable = new Pinball.Base.ComponentLightable(this.game, this, options);
      this.lightable.blinkCompleted.add(this.onBlinkCompleted);
      this.createFSM();
    }

    Light.prototype.onBlinkCompleted = function() {
      this.fsm.switchoff();
      return this.blinkCompleted.dispatch();
    };

    Light.prototype.getStateConfig = function() {
      return {
        initial: this.options.initialState || 'off',
        events: [
          {
            name: 'switchon',
            from: ['blinking', 'off'],
            to: 'powered'
          }, {
            name: 'switchoff',
            from: ['powered', 'blinking'],
            to: 'off'
          }, {
            name: 'blink',
            from: '*',
            to: 'blinking'
          }, {
            name: 'helloblink',
            from: 'off',
            to: 'helloblinking'
          }, {
            name: 'switchoff',
            from: '*',
            to: 'off'
          }
        ],
        callbacks: {
          onpowered: this.handlePowerOn,
          onoff: this.handlePowerOff,
          onbeforeblink: this.handleBlinking,
          onhelloblinking: this.handleHelloBlink
        }
      };
    };

    Light.prototype.handleHelloBlink = function() {
      return this.lightable.blink(250, Math.random() * 150, 3);
    };

    Light.prototype.isOff = function() {
      return this.fsm.is('off');
    };

    Light.prototype.getType = function() {
      return 'light';
    };

    Light.prototype.powerOn = function() {
      if (this.fsm.can('switchon')) {
        return this.fsm.switchon();
      }
    };

    Light.prototype.powerOff = function() {
      if (this.fsm.can('switchoff')) {
        return this.fsm.switchoff();
      }
    };

    Light.prototype.blink = function(delay, offset, count) {
      if (delay == null) {
        delay = 500;
      }
      if (offset == null) {
        offset = 0;
      }
      if (count == null) {
        count = 0;
      }
      return this.fsm.blink(delay, offset, count);
    };

    Light.prototype.handleBlinking = function(name, oldState, newState, delay, offset, count) {
      return this.lightable.blink(delay, offset, count);
    };

    Light.prototype.handlePowerOff = function() {
      this.lightable.stopBlink();
      return this.lightable.lightOff();
    };

    Light.prototype.handlePowerOn = function() {
      this.lightable.stopBlink();
      return this.lightable.lightOn();
    };

    return Light;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.LightGroup = (function(_super) {
    __extends(LightGroup, _super);

    function LightGroup(game, options) {
      this.handleLightBlinkCompleted = __bind(this.handleLightBlinkCompleted, this);
      this.handlePowerOn = __bind(this.handlePowerOn, this);
      this.handlePowerOff = __bind(this.handlePowerOff, this);
      this.handleHelloBlink = __bind(this.handleHelloBlink, this);
      this.handleBlinking = __bind(this.handleBlinking, this);
      this.powerOff = __bind(this.powerOff, this);
      this.powerOn = __bind(this.powerOn, this);
      this.handleLoopBlink = __bind(this.handleLoopBlink, this);
      LightGroup.__super__.constructor.call(this, game, options);
      this.activeLights = 0;
      this.options = options;
      this.lights = [];
      this.createFSM();
    }

    LightGroup.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'switchon',
            from: '*',
            to: 'powered'
          }, {
            name: 'switchoff',
            from: '*',
            to: 'off'
          }, {
            name: 'helloblink',
            from: 'off',
            to: 'helloblinking'
          }, {
            name: 'blink',
            from: 'off',
            to: 'blinking'
          }, {
            name: 'alwaysblink',
            from: '*',
            to: 'loopblinking'
          }
        ],
        callbacks: {
          onpowered: this.handlePowerOn,
          onoff: this.handlePowerOff,
          onhelloblinking: this.handleHelloBlink,
          onloopblinking: this.handleLoopBlink,
          onblinking: this.handleBlinking
        }
      };
    };

    LightGroup.prototype.handleLoopBlink = function() {
      return this.blinkLights('line', 0);
    };

    LightGroup.prototype.getLight = function(id) {
      return _.chain(this.lights).where({
        _id: id
      }).first().value();
    };

    LightGroup.prototype.powerOn = function() {
      return this.fsm.switchon();
    };

    LightGroup.prototype.powerOff = function() {
      if (this.fsm.can('switchoff')) {
        return this.fsm.switchoff();
      }
    };

    LightGroup.prototype.blink = function(patternId, count) {
      return this.fsm.blink(patternId, count);
    };

    LightGroup.prototype.handleBlinking = function() {
      return this.blinkLights('line', 3);
    };

    LightGroup.prototype.handleHelloBlink = function() {
      return this.blinkLights('line', 3);
    };

    LightGroup.prototype.blinkLights = function(pattern, count) {
      var delay, lightPattern;
      lightPattern = new Pinball.LightPattern(this.options.patterns[pattern]);
      delay = lightPattern.getDelay();
      return _(this.lights).each(function(light, index) {
        return light.blink(delay, lightPattern.getOffset(index), count);
      });
    };

    LightGroup.prototype.handlePowerOff = function(event, from, to) {
      if (from === 'blinking') {
        return;
      }
      return _(this.lights).each(function(light) {
        return light.powerOff();
      });
    };

    LightGroup.prototype.handlePowerOn = function() {
      return _(this.lights).each(function(light) {
        return light.powerOn();
      });
    };

    LightGroup.prototype.addLights = function(lights) {
      var light, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = lights.length; _i < _len; _i++) {
        light = lights[_i];
        _results.push(this.addLight(light));
      }
      return _results;
    };

    LightGroup.prototype.addLight = function(light) {
      this.lights.push(light);
      light.blinkCompleted.add(this.handleLightBlinkCompleted);
      return this.add(light);
    };

    LightGroup.prototype.handleLightBlinkCompleted = function() {
      if (this.activeLightsCount() === 0) {
        return this.powerOff();
      }
    };

    LightGroup.prototype.activeLightsCount = function() {
      return _(this.lights).reduce((function(memo, light) {
        return memo + (light.isOff() ? 0 : 1);
      }), 0);
    };

    LightGroup.prototype.getType = function() {
      return 'lightgroup';
    };

    return LightGroup;

  })(Pinball.Base.PinballGroup);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Rollover = (function(_super) {
    __extends(Rollover, _super);

    function Rollover(game, options, material) {
      Rollover.__super__.constructor.call(this, game, options);
      this.createFSM();
    }

    Rollover.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'hit',
            from: '*',
            to: 'sunken'
          }, {
            name: 'turnoff',
            from: "*",
            to: 'off'
          }, {
            name: 'disable',
            from: '*',
            to: 'disabled'
          }
        ]
      };
    };

    Rollover.prototype.getType = function() {
      return 'rollover';
    };

    return Rollover;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Slingshot = (function(_super) {
    __extends(Slingshot, _super);

    function Slingshot(game, options, material) {
      this.handleHit = __bind(this.handleHit, this);
      Slingshot.__super__.constructor.call(this, game, options);
      this.physicsable.setMaterial(material, 'rubber');
      this.createFSM();
    }

    Slingshot.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'hit',
            from: '*',
            to: 'powered'
          }, {
            name: 'reset',
            from: 'powered',
            to: 'off'
          }
        ],
        callbacks: {
          onpowered: this.handleHit
        }
      };
    };

    Slingshot.prototype.handleHit = function() {
      return this.fsm.reset();
    };

    Slingshot.prototype.getCollisionShapes = function() {
      return this.physicsable.getCollisionShapes(['rubber']);
    };

    Slingshot.prototype.hit = function(a, b, c) {
      return this.fsm.hit();
    };

    Slingshot.prototype.getType = function() {
      return 'slingshot';
    };

    return Slingshot;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Target = (function(_super) {
    __extends(Target, _super);

    function Target(game, options, material) {
      Target.__super__.constructor.call(this, game, _({
        debug: false
      }).extend(options));
      this.createFSM();
    }

    Target.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        error: function() {
          return console.log('bad event in target ignored');
        },
        events: [
          {
            name: 'turnoff',
            from: '*',
            to: 'disabled'
          }, {
            name: 'turnon',
            from: 'disabled',
            to: 'enabled'
          }, {
            name: 'hit',
            from: 'enabled',
            to: 'activated'
          }, {
            name: 'complete',
            from: 'activated',
            to: 'completed'
          }, {
            name: 'reset',
            from: '*',
            to: 'disabled'
          }
        ]
      };
    };

    Target.prototype.getType = function() {
      return 'target';
    };

    return Target;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Base.Trigger = (function(_super) {
    __extends(Trigger, _super);

    function Trigger(game, options, material) {
      Trigger.__super__.constructor.call(this, game, options);
      this.physicsable = new Pinball.Base.ComponentPhysics(this.game, options);
      this.collidable = new Pinball.Core.CollideableEntity(this, this.physicsable.getCollisionShapes());
      this.createFSM();
    }

    Trigger.prototype.getStateConfig = function() {
      return {
        initial: 'disabled',
        events: [
          {
            name: 'turnoff',
            from: '*',
            to: 'enabled'
          }, {
            name: 'turnon',
            from: ['activated', 'disabled'],
            to: 'enabled'
          }, {
            name: 'hit',
            from: 'enabled',
            to: 'activated'
          }, {
            name: 'reset',
            from: '*',
            to: 'disabled'
          }
        ]
      };
    };

    Trigger.prototype.getType = function() {
      return 'trigger';
    };

    return Trigger;

  })(Pinball.Base.PinballObject);

}).call(this);
(function() {
  Pinball.Core.EntityList = (function() {
    function EntityList() {
      this.list = {};
      this.listByType = {};
    }

    EntityList.prototype.get = function(id) {
      return this.list[id];
    };

    EntityList.prototype.find = function(options) {
      return _(this.list).where(options);
    };

    EntityList.prototype.each = function(fn) {
      return _(this.list).each(fn);
    };

    EntityList.prototype.getAll = function() {
      var entity, key, list, _ref;
      list = [];
      _ref = this.list;
      for (key in _ref) {
        entity = _ref[key];
        list.push(entity);
      }
      return list;
    };

    EntityList.prototype.register = function(entity) {
      var id, type;
      id = entity.getID();
      type = entity.getType();
      this.list[id] = entity;
      this.listByType[type] = this.listByType[type] || [];
      return this.listByType[type].push(entity);
    };

    EntityList.prototype.getAllFromType = function(type) {
      return this.listByType[type];
    };

    return EntityList;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Gameplay = (function() {
    function Gameplay(game, machine) {
      this.addAction = __bind(this.addAction, this);
      this.handleMissionEnded = __bind(this.handleMissionEnded, this);
      this.handleMissionStarted = __bind(this.handleMissionStarted, this);
      this.game = game;
      this.machine = machine;
      this.playfield = this.machine.playfield;
      this.gameModel = this.machine.gameModel;
    }

    Gameplay.prototype.create = function() {
      this.stateTransitions = new Pinball.Logic.StateTransitions(this.game, this.playfield, this.gameModel, this);
      this.stateTransitions.parse(Pinball.LOGIC.states);
      this.actionFactory = new Pinball.Logic.ActionFactory(this.game, this.machine);
      this.actionList = new Pinball.ActionList(Pinball.LOGIC.actions);
      this.actionList.each(this.addAction);
      this.missions = new Pinball.Logic.MissionManager(this.game, this.machine);
      this.missions.missionStartedSignal.add(this.handleMissionStarted);
      return this.missions.missionEndedSignal.add(this.handleMissionEnded);
    };

    Gameplay.prototype.handleMissionStarted = function(mission) {};

    Gameplay.prototype.handleMissionEnded = function(mission) {};

    Gameplay.prototype.startMission = function() {
      return this.missions.startRandom();
    };

    Gameplay.prototype.startGame = function() {
      this.gameModel.startGame();
      this.stateTransitions.trigger('newgame');
      return this.newBall();
    };

    Gameplay.prototype.addAction = function(actionData) {
      var action, entity;
      action = this.actionFactory.create(actionData);
      entity = this.playfield.get(action.target);
      if (entity && entity.actionable) {
        return entity.actionable.addAction(action);
      }
    };

    Gameplay.prototype.newMission = function() {
      return this.stateTransitions.trigger('newmission');
    };

    Gameplay.prototype.endedMission = function() {
      return this.stateTransitions.trigger('endedmisison');
    };

    Gameplay.prototype.newBall = function() {
      var ball, entities;
      ball = this.playfield.get('ball');
      ball.add();
      entities = this.playfield.getAll();
      this.gameModel.ballActive(true);
      return this.stateTransitions.trigger('newball');
    };

    Gameplay.prototype.endBall = function() {
      var ball;
      this.missions.stop();
      ball = this.playfield.get('ball');
      ball.remove();
      this.gameModel.ballActive(false);
      this.stateTransitions.trigger('endball');
      return this.game.time.events.add(500, (function(_this) {
        return function() {
          return _this.newBall();
        };
      })(this));
    };

    Gameplay.prototype.ballHit = function(entity) {
      if (entity.eventable != null) {
        return entity.eventable.trigger('hit');
      }
    };

    Gameplay.prototype.triggerAll = function(event) {
      var entities, entity, _i, _len, _results;
      entities = this.playfield.getAll();
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entity = entities[_i];
        if (entity.eventable != null) {
          _results.push(entity.eventable.trigger(event));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Gameplay;

  })();

}).call(this);
(function() {
  Pinball.Core.Materials = (function() {
    function Materials(game) {
      this.game = game;
      this.world = this.game.physics.p2;
      this.createMaterials();
      this.createBumperBallContact();
      this.createSlingshotBallContact();
      this.createFlipperBallContact();
    }

    Materials.prototype.createMaterials = function() {
      this.ballMaterial = this.game.physics.p2.createMaterial('ball');
      this.flipperMaterial = this.game.physics.p2.createMaterial('flipper');
      this.bumperMaterial = this.game.physics.p2.createMaterial('bumper');
      return this.slingshotMaterial = this.game.physics.p2.createMaterial('slingshot');
    };

    Materials.prototype.createBumperBallContact = function() {
      this.bumperBallContact = this.world.createContactMaterial(this.bumperMaterial, this.ballMaterial);
      this.bumperBallContact.friction = 1;
      return this.bumperBallContact.restitution = 1.2;
    };

    Materials.prototype.createSlingshotBallContact = function() {
      this.slingshotBallContact = this.world.createContactMaterial(this.slingshotMaterial, this.ballMaterial);
      this.slingshotBallContact.friction = 0;
      return this.slingshotBallContact.restitution = 1.8;
    };

    Materials.prototype.createFlipperBallContact = function() {
      this.flipperBallContact = this.world.createContactMaterial(this.flipperMaterial, this.ballMaterial);
      this.flipperBallContact.friction = 1;
      return this.flipperBallContact.restitution = 0;
    };

    return Materials;

  })();

}).call(this);
(function() {
  Pinball.Sensor = (function() {
    function Sensor(game, fixture, debug) {
      if (debug == null) {
        debug = false;
      }
      this.game = game;
      this.debug = debug;
      this.p2 = this.game.physics.p2;
      this.build(fixture);
      this.collideable = new Pinball.Core.CollideableEntity(this, this.getMainShape());
    }

    Sensor.prototype.addShape = function(shape) {
      return this.body.addShape(shape);
    };

    Sensor.prototype.addFixture = function(fixture) {
      if (fixture == null) {
        return;
      }
      return Pinball.PhysicsUtils.addFixtureToBody(this.game, this.body, fixture);
    };

    Sensor.prototype.build = function(fixture) {
      var debugBody;
      this.body = new p2.Body();
      this.addFixture(fixture);
      this.p2.world.addBody(this.body);
      if (this.debug) {
        return debugBody = new Phaser.Physics.P2.BodyDebug(this.game, this.body);
      }
    };

    Sensor.prototype.getMainShape = function() {
      return this.body.shapes[0];
    };

    return Sensor;

  })();

}).call(this);
(function() {
  Pinball.Bits = {
    NOTHING: 0,
    TABLE: 0x1,
    BALL: 0x2,
    RAMP_UPPER: 0x4,
    RAMP_LOWER: 0x8,
    RAMP_CENTER: 0x10,
    FLIPPER: 0x20,
    RAMP_ACTIVE: 0x40,
    RAMP_INACTIVE: 0x80,
    groups: {
      TABLE: function() {
        return Pinball.Bits.TABLE | Pinball.Bits.FLIPPER | Pinball.Bits.RAMP_INACTIVE;
      },
      RAMP_LOWER: function() {
        return Pinball.Bits.RAMP_ACTIVE | Pinball.Bits.RAMP_LOWER;
      },
      RAMP_UPPER: function() {
        return Pinball.Bits.RAMP_ACTIVE | Pinball.Bits.RAMP_UPPER;
      },
      RAMP_CENTER: function() {
        return Pinball.Bits.RAMP_ACTIVE | Pinball.Bits.RAMP_CENTER;
      }
    }
  };

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Playfield = (function(_super) {
    __extends(Playfield, _super);

    function Playfield(game) {
      Playfield.__super__.constructor.call(this, game);
      this.build();
    }

    Playfield.prototype.build = function() {
      this.entities = new Pinball.Core.EntityList();
      return this.factory = new Pinball.Factories.ComponentFactory(this.game);
    };

    Playfield.prototype.register = function(entity) {
      entity.playfield = this;
      return this.entities.register(entity);
    };

    Playfield.prototype.createPlayfield = function(data) {
      this.buildBase();
      this.buildEntities(data);
      this.buildMissionProgress();
      this.bringToTop(this.ball);
      this.bringToTop(this.rampGroup);
      return this.bringToTop(this.controls);
    };

    Playfield.prototype.buildBase = function() {
      this.buildSurface();
      this.buildBall();
      this.buildAutoPlunger();
      this.buildDisplay();
      this.buildRamp();
      return this.buildControls();
    };

    Playfield.prototype.getGround = function() {
      return this.ground;
    };

    Playfield.prototype.get = function(id) {
      return this.entities.get(id);
    };

    Playfield.prototype.getMultiple = function(ids) {
      return _(ids).map((function(_this) {
        return function(id) {
          return _this.get(id);
        };
      })(this));
    };

    Playfield.prototype.getAll = function() {
      return this.entities.getAll();
    };

    Playfield.prototype.getAllFromType = function(type) {
      return this.entities.getAllFromType(type);
    };

    Playfield.prototype.moveBallOverRamp = function() {
      if (this.getIndex(this.ball) < this.getIndex(this.rampGroup)) {
        return this.swap(this.ball, this.rampGroup);
      }
    };

    Playfield.prototype.moveBallBehindRamp = function() {
      if (this.getIndex(this.ball) > this.getIndex(this.rampGroup)) {
        return this.swap(this.ball, this.rampGroup);
      }
    };

    Playfield.prototype.update = function() {
      return this.controls.update();
    };

    Playfield.prototype.buildSurface = function() {
      this.ground = new p2.Body();
      this.game.physics.p2.world.addBody(this.ground);
      this.surface = new Pinball.Entities.Surface(this.game, this.game.world.centerX, this.game.world.centerY);
      this.register(this.surface);
      return this.add(this.surface);
    };

    Playfield.prototype.buildDisplay = function() {
      this.display = new Pinball.Machine.Display(this.game);
      this.register(this.display);
      return this.add(this.display);
    };

    Playfield.prototype.buildMissionProgress = function() {
      var data;
      data = _.chain(Pinball.DATA.lightgroups).where({
        name: 'missionProgressLights'
      }).first().value();
      this.missionProgress = new Pinball.Entities.MissionProgress(this.game, data);
      this.missionProgress.addLights(this.getMultiple(data.lights));
      this.register(this.missionProgress);
      return this.add(this.missionProgress);
    };

    Playfield.prototype.buildRamp = function() {
      this.rampGroup = this.game.add.group(this);
      this.ramp = new Pinball.Entities.Ramp(this.game, 496, 473, this.ball);
      this.rampGroup.add(this.ramp);
      return this.register(this.ramp);
    };

    Playfield.prototype.buildBall = function() {
      this.ball = this.factory.createBall();
      this.register(this.ball);
      return this.add(this.ball);
    };

    Playfield.prototype.buildAutoPlunger = function() {
      this.autoPlunger = new Pinball.Entities.AutoPlunger(this.game, this.ground);
      this.register(this.autoPlunger);
      return this.add(this.autoPlunger);
    };

    Playfield.prototype.buildControls = function() {
      this.controls = new Pinball.Controls(this.game, this.ground, this.factory.materials.flipperMaterial);
      this.register(this.controls.flippers.flipperLeft);
      this.register(this.controls.flippers.flipperRight);
      this.register(this.controls.flippers.flipperRamp);
      this.register(this.controls.plunger);
      return this.add(this.controls);
    };

    Playfield.prototype.buildEntities = function(data) {
      var entities, entity, entityData, _i, _len, _results;
      entities = _.flatten([data.objects, data.lights, data.lightgroups]);
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entityData = entities[_i];
        if (entityData.useCustomClass) {
          continue;
        }
        entity = this.factory.create(entityData);
        this.register(entity);
        if (entity.options.onramp) {
          _results.push(this.rampGroup.add(entity));
        } else if (entity instanceof Phaser.Sprite) {
          _results.push(this.add(entity));
        } else if (entity instanceof Phaser.Group) {
          _results.push(this.add(entity));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return Playfield;

  })(Phaser.Group);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.ThemeLoader = (function() {
    function ThemeLoader(game, machine) {
      this.loadCompleted = __bind(this.loadCompleted, this);
      this.machine = machine;
      this.game = game;
      this.init();
      this.build();
    }

    ThemeLoader.prototype.init = function() {
      this.themes = {};
      this.loader = new Phaser.Loader(this.game);
      this.loader.onLoadComplete.add(this.loadCompleted);
      this.register(new Pinball.ThemeDefault());
      this.register(new Pinball.ThemeParty());
      return this.register(new Pinball.ThemeBeach());
    };

    ThemeLoader.prototype.build = function() {
      this.preloadScreen = new Pinball.ThemeLoadScreen(this.game);
      return this.game.world.addChild(this.preloadScreen);
    };

    ThemeLoader.prototype.load = function(id) {
      var theme;
      theme = _.first(_.where(this.themes, {
        id: id
      }));
      this.loader.image('table', theme.table);
      this.loader.image('ramp', theme.ramp);
      this.loader.atlasJSONHash('sprites', theme.sprite.texture, theme.sprite.atlas);
      return this.preloadScreen.captureFrame(this.machine.playfield).show().then((function(_this) {
        return function() {
          return _this.loader.start();
        };
      })(this));
    };

    ThemeLoader.prototype.register = function(theme) {
      return this.themes[theme.id] = theme;
    };

    ThemeLoader.prototype.loadCompleted = function() {
      this.refreshAssets();
      return this.preloadScreen.hide();
    };

    ThemeLoader.prototype.refreshAssets = function() {
      var ramp, spriteData, surface;
      spriteData = this.game.cache.getFrameData('sprites');
      _(spriteData._frames).each((function(_this) {
        return function(frame) {
          var sprite;
          sprite = _this.machine.playfield.entities.find({
            key: 'sprites',
            frameName: frame.name
          });
          return _(sprite).each(function(sprite) {
            if (sprite != null) {
              return sprite.loadTexture('sprites', frame.name);
            }
          });
        };
      })(this));
      surface = this.machine.playfield.get('surface');
      surface.loadTexture('table');
      ramp = this.machine.playfield.get('ramp');
      return ramp.loadTexture('ramp');
    };

    return ThemeLoader;

  })();

}).call(this);
(function() {
  Pinball.Theme = (function() {
    function Theme(options) {
      this.id = options.id;
      this.sprite = options.sprite;
      this.table = options.table;
      this.ramp = options.ramp;
    }

    return Theme;

  })();

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeBeach = (function(_super) {
    __extends(ThemeBeach, _super);

    function ThemeBeach() {
      ThemeBeach.__super__.constructor.call(this, {
        id: 'beach',
        sprite: {
          texture: 'gameassets/themes/beach.png',
          atlas: 'gameassets/themes/beach.json'
        },
        table: 'gameassets/themes/beach-images/table.png',
        ramp: 'gameassets/themes/beach-images/ramp.png'
      });
    }

    return ThemeBeach;

  })(Pinball.Theme);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeDefault = (function(_super) {
    __extends(ThemeDefault, _super);

    function ThemeDefault() {
      ThemeDefault.__super__.constructor.call(this, {
        id: 'default',
        sprite: {
          texture: 'gameassets/themes/default.png',
          atlas: 'gameassets/themes/default.json'
        },
        table: 'gameassets/themes/default-images/table.png',
        ramp: 'gameassets/themes/default-images/ramp.png'
      });
    }

    return ThemeDefault;

  })(Pinball.Theme);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeParty = (function(_super) {
    __extends(ThemeParty, _super);

    function ThemeParty() {
      ThemeParty.__super__.constructor.call(this, {
        id: 'party',
        sprite: {
          texture: 'gameassets/themes/party.png',
          atlas: 'gameassets/themes/party.json'
        },
        table: 'gameassets/themes/party-images/table.png',
        ramp: 'gameassets/themes/party-images/ramp.png'
      });
    }

    return ThemeParty;

  })(Pinball.Theme);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.ThemeLoadScreen = (function(_super) {
    __extends(ThemeLoadScreen, _super);

    function ThemeLoadScreen(game) {
      this.fadeIn = __bind(this.fadeIn, this);
      this.fadeOut = __bind(this.fadeOut, this);
      ThemeLoadScreen.__super__.constructor.call(this, game);
      this.build();
    }

    ThemeLoadScreen.prototype.build = function() {
      this.snapshot = this.game.add.renderTexture(this.game.width, this.game.height, 'snapshot');
      this.snapshotImage = this.game.add.image(0, 0, this.snapshot);
      this.add(this.snapshotImage);
      this.waitImage = this.create(0, 0, 'table-wait');
      this.waitImage.alpha = 0.9;
      return this.visible = false;
    };

    ThemeLoadScreen.prototype.captureFrame = function(displayObject) {
      this.snapshot.render(displayObject);
      return this;
    };

    ThemeLoadScreen.prototype.show = function() {
      return this.fadeIn();
    };

    ThemeLoadScreen.prototype.hide = function() {
      return Q.delay(250).then(this.fadeOut);
    };

    ThemeLoadScreen.prototype.fadeOut = function() {
      var deferred, tweenOut;
      deferred = Q.defer();
      tweenOut = this.game.add.tween(this).to({
        alpha: 0
      }, 500).start();
      tweenOut.onComplete.addOnce((function(_this) {
        return function() {
          _this.visible = false;
          return deferred.resolve();
        };
      })(this));
      return deferred.promise;
    };

    ThemeLoadScreen.prototype.fadeIn = function() {
      var deferred, tweenIn;
      deferred = Q.defer();
      this.visible = true;
      this.alpha = 0;
      tweenIn = this.game.add.tween(this).to({
        alpha: 1
      }, 500).start();
      tweenIn.onComplete.addOnce(deferred.resolve);
      return deferred.promise;
    };

    return ThemeLoadScreen;

  })(Phaser.Group);

}).call(this);


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Controller.AutoPlungerController = (function() {
    function AutoPlungerController(game, ballCollisionsListener, playfield) {
      this.handleBallInAutoPlunger = __bind(this.handleBallInAutoPlunger, this);
      this.autoPlunger = playfield.get('autoPlunger');
      this.sensorOut = this.autoPlunger.sensor.collideable;
      this.ball = playfield.get('ball');
      this.ballCollision = ballCollisionsListener;
      this.ballCollision["with"](this.sensorOut, this.handleBallInAutoPlunger);
    }

    AutoPlungerController.prototype.handleBallInAutoPlunger = function(entity) {
      return this.autoPlunger.shootBall(this.ball);
    };

    return AutoPlungerController;

  })();

}).call(this);
(function() {
  Pinball.Controller.DisplayController = (function() {
    function DisplayController(game, display, options) {
      this.game = game;
      this.display = display;
      this.gameModel = options.model;
    }

    return DisplayController;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Controller.EntityHitController = (function() {
    function EntityHitController(ballCollision, gameplay) {
      this.handleBallContact = __bind(this.handleBallContact, this);
      this.ballCollision = ballCollision;
      this.gameplay = gameplay;
    }

    EntityHitController.prototype.register = function(list) {
      var entity, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        entity = list[_i];
        if (entity.collidable) {
          _results.push(this.ballCollision["with"](entity.collidable, this.handleBallContact));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    EntityHitController.prototype.handleBallContact = function(collisionEntity) {
      var entity;
      entity = collisionEntity.getEntity();
      return this.gameplay.ballHit(entity);
    };

    return EntityHitController;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Controller.RampController = (function() {
    function RampController(game, ballCollisionsListener, playfield) {
      this.ballCanEnterCenter = __bind(this.ballCanEnterCenter, this);
      this.handleTransition = __bind(this.handleTransition, this);
      this.handleUpperExit = __bind(this.handleUpperExit, this);
      this.handleLowerExit = __bind(this.handleLowerExit, this);
      this.handleEnterCenter = __bind(this.handleEnterCenter, this);
      this.handleLeaveCenter = __bind(this.handleLeaveCenter, this);
      this.handleEnterRamp = __bind(this.handleEnterRamp, this);
      this.playfield = playfield;
      this.ramp = playfield.get('ramp');
      this.ball = playfield.get('ball');
      this.ballCollision = ballCollisionsListener;
      this.ballCollision["with"](this.ramp.getEnterSensor(), this.handleEnterRamp);
      this.ballCollision["with"](this.ramp.getCenterSensor(), this.handleEnterCenter);
      this.ballCollision["with"](this.ramp.getLowerExitSensor(), this.handleLowerExit);
      this.ballCollision["with"](this.ramp.getUpperExitSensor(), this.handleUpperExit);
      this.ballCollision["with"](this.ramp.getTransitionSensor(), this.handleTransition);
      this.ballCollision["with"](this.ramp.getLeaveCenterSensor(), this.handleLeaveCenter);
    }

    RampController.prototype.enableRamp = function() {
      this.ramp.transition('enable');
      return this.playfield.moveBallOverRamp();
    };

    RampController.prototype.disableRampAfterHole = function() {
      this.ramp.transition('exitHole');
      return this.playfield.moveBallBehindRamp();
    };

    RampController.prototype.disableRamp = function() {
      this.ramp.transition('disable');
      return this.playfield.moveBallBehindRamp();
    };

    RampController.prototype.handleEnterRamp = function(entity, contact) {
      console.log('handleEnterRamp');
      if (this.ballCanEnterRamp(contact)) {
        return this.enableRamp();
      }
    };

    RampController.prototype.handleLeaveCenter = function(entity, contact) {
      return this.ramp.transition('enterUpper');
    };

    RampController.prototype.handleEnterCenter = function(entity, contact) {
      if (this.ballCanEnterCenter(contact)) {
        return this.ramp.transition('enterCenter');
      }
    };

    RampController.prototype.handleLowerExit = function(entity, contact) {
      this.ramp.transition('exitLower');
      return this.playfield.moveBallBehindRamp();
    };

    RampController.prototype.handleUpperExit = function(entity, contact) {
      this.ramp.transition('exitUpper');
      return this.playfield.moveBallBehindRamp();
    };

    RampController.prototype.handleTransition = function() {
      return this.ramp.transition('transitionLowerUpper');
    };

    RampController.prototype.ballCanEnterRamp = function(contact) {
      var eq, normalA, nx, ny;
      if (contact.contactEquations) {
        eq = contact.contactEquations[0];
        normalA = eq.normalA;
        nx = normalA[0];
        ny = normalA[1];
        if (ny > 0) {
          eq.enabled = false;
          return true;
        } else {
          return false;
        }
      }
      return false;
    };

    RampController.prototype.ballCanEnterCenter = function(contact) {
      var eq, normalA, nx, ny;
      if (contact.contactEquations) {
        eq = contact.contactEquations[0];
        normalA = eq.normalA;
        nx = normalA[0];
        ny = normalA[1];
        if (ny > 0) {
          eq.enabled = false;
          return true;
        } else {
          return false;
        }
      }
      return false;
    };

    return RampController;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Controller.TableZonesController = (function() {
    function TableZonesController(game, ballCollisionsListener, playfield) {
      this.enterZone = __bind(this.enterZone, this);
      this.leaveZone = __bind(this.leaveZone, this);
      this.playfield = playfield;
      this.surface = playfield.get('surface');
      this.ball = playfield.get('ball');
      this.ballCollision = ballCollisionsListener;
      this.ballCollision["with"](this.surface.zones.zoneEnityTL, this.enterZone, this.leaveZone);
      this.ballCollision["with"](this.surface.zones.zoneEnityTR, this.enterZone, this.leaveZone);
      this.ballCollision["with"](this.surface.zones.zoneEnityBL, this.enterZone, this.leaveZone);
      this.ballCollision["with"](this.surface.zones.zoneEnityBR, this.enterZone, this.leaveZone);
    }

    TableZonesController.prototype.leaveZone = function(entity, contact) {
      return this.setZone(entity, false);
    };

    TableZonesController.prototype.enterZone = function(entity, contact) {
      return this.setZone(entity, true);
    };

    TableZonesController.prototype.setZone = function(entity, active) {
      switch (entity) {
        case this.surface.zones.zoneEnityTL:
          return this.surface.enableZone1(active);
        case this.surface.zones.zoneEnityTR:
          return this.surface.enableZone2(active);
        case this.surface.zones.zoneEnityBL:
          return this.surface.enableZone3(active);
        case this.surface.zones.zoneEnityBR:
          return this.surface.enableZone4(active);
      }
    };

    return TableZonesController;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Logic.MissionAbstract = (function() {
    MissionAbstract.prototype.score = 100000;

    MissionAbstract.prototype.timeout = 5;

    function MissionAbstract(game, playfield) {
      this.onMissionTimedOut = __bind(this.onMissionTimedOut, this);
      this.onMissionTimeProgress = __bind(this.onMissionTimeProgress, this);
      this.handleExpectationChanged = __bind(this.handleExpectationChanged, this);
      this.timeLeft = -1;
      this.endedSignal = new Phaser.Signal();
      this.timeProgressSignal = new Phaser.Signal();
      this.game = game;
      this.playfield = playfield;
      this.expectations = [];
      this.missionTimer = this.game.time.create(false);
    }

    MissionAbstract.prototype.prepare = function() {};

    MissionAbstract.prototype.createExpectation = function(target, expectedState, expectedEvent) {
      var expectation;
      expectation = new Pinball.Logic.MissionExpectation(target, expectedState, expectedEvent);
      expectation.changed.add(this.handleExpectationChanged);
      this.expectations.push(expectation);
      return expectation;
    };

    MissionAbstract.prototype.handleExpectationChanged = function(expectation) {
      if (this.isFulfilled()) {
        return this.completeMission();
      }
    };

    MissionAbstract.prototype.isFulfilled = function() {
      return _(this.expectations).every(function(e) {
        return e.fulfilled;
      });
    };

    MissionAbstract.prototype.completeMission = function() {
      if (this.isFulfilled()) {

      } else {

      }
      this.tearDown();
      return this.endedSignal.dispatch();
    };

    MissionAbstract.prototype.tearDown = function() {
      this.missionTimer.stop(true);
      _(this.expectations).each(function(expectation) {
        return expectation.destroy();
      });
      return this.expectations = [];
    };

    MissionAbstract.prototype.startTimer = function() {
      this.timeLeft = this.timeout;
      this.missionTimer.add(this.timeout * 1000, this.onMissionTimedOut);
      this.missionTimer.repeat(1000, this.timeout, this.onMissionTimeProgress);
      return this.missionTimer.start();
    };

    MissionAbstract.prototype.onMissionTimeProgress = function() {
      this.timeLeft = this.timeLeft - 1;
      return this.timeProgressSignal.dispatch(this.timeLeft);
    };

    MissionAbstract.prototype.onMissionTimedOut = function() {
      return this.completeMission();
    };

    MissionAbstract.prototype.destroy = function() {
      this.tearDown();
      this.endedSignal.removeAll();
      return this.timeProgressSignal.removeAll();
    };

    MissionAbstract.prototype.start = function() {
      this.prepare();
      return this.startTimer();
    };

    MissionAbstract.prototype.getDescription = function() {
      return void 0;
    };

    MissionAbstract.prototype.getID = function() {
      return void 0;
    };

    MissionAbstract.prototype.getScore = function() {
      return this.score;
    };

    return MissionAbstract;

  })();

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionDoubleTargetsNarrow = (function(_super) {
    __extends(MissionDoubleTargetsNarrow, _super);

    MissionDoubleTargetsNarrow.prototype.score = 100000;

    MissionDoubleTargetsNarrow.prototype.timeout = 30;

    MissionDoubleTargetsNarrow.prototype.targets = ['target4', 'target5'];

    function MissionDoubleTargetsNarrow(game, playfield) {
      MissionDoubleTargetsNarrow.__super__.constructor.call(this, game, playfield);
    }

    MissionDoubleTargetsNarrow.prototype.prepare = function() {
      return _(this.targets).each((function(_this) {
        return function(targetID) {
          var target;
          target = _this.playfield.get(targetID);
          target.transition('turnon');
          return _this.createExpectation(target, {
            expectedState: 'activated',
            exitTransition: 'reset'
          });
        };
      })(this));
    };

    MissionDoubleTargetsNarrow.prototype.getDescription = function() {
      return 'Double\nTargets';
    };

    MissionDoubleTargetsNarrow.prototype.getID = function() {
      return 'doubleTargetNarrow';
    };

    return MissionDoubleTargetsNarrow;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionRamp = (function(_super) {
    __extends(MissionRamp, _super);

    MissionRamp.prototype.score = 100000;

    MissionRamp.prototype.timeout = 60;

    function MissionRamp(game, playfield) {
      MissionRamp.__super__.constructor.call(this, game, playfield);
    }

    MissionRamp.prototype.prepare = function() {
      this.ramp = this.playfield.get('ramp');
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('alwaysblink');
      this.holeRamp = this.playfield.get('holeRamp');
      this.holeRamp.transition('turnon');
      return this.createExpectation(this.ramp, {
        expectedState: 'disabled',
        count: 2,
        expectedEvent: 'exitUpper'
      });
    };

    MissionRamp.prototype.tearDown = function() {
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('switchoff');
      return MissionRamp.__super__.tearDown.apply(this, arguments);
    };

    MissionRamp.prototype.getDescription = function() {
      return 'shoot 2x times through ramp';
    };

    MissionRamp.prototype.getID = function() {
      return 'doubleRampShoot';
    };

    return MissionRamp;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionTrippleTargets = (function(_super) {
    __extends(MissionTrippleTargets, _super);

    MissionTrippleTargets.prototype.score = 100000;

    MissionTrippleTargets.prototype.timeout = 30;

    MissionTrippleTargets.prototype.targets = ['target1', 'target2', 'target3'];

    function MissionTrippleTargets(game, playfield) {
      MissionTrippleTargets.__super__.constructor.call(this, game, playfield);
    }

    MissionTrippleTargets.prototype.prepare = function() {
      return _(this.targets).each((function(_this) {
        return function(targetID) {
          var target;
          target = _this.playfield.get(targetID);
          target.transition('turnon');
          return _this.createExpectation(target, {
            expectedState: 'activated',
            exitTransition: 'reset'
          });
        };
      })(this));
    };

    MissionTrippleTargets.prototype.getDescription = function() {
      return 'Tripple\nTargets';
    };

    MissionTrippleTargets.prototype.getID = function() {
      return 'trippleTarget';
    };

    return MissionTrippleTargets;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionInnerLane = (function(_super) {
    __extends(MissionInnerLane, _super);

    MissionInnerLane.prototype.score = 100000;

    MissionInnerLane.prototype.timeout = 45;

    MissionInnerLane.prototype.fliptargets = ['fliptarget1', 'fliptarget2', 'fliptarget3', 'fliptarget4'];

    MissionInnerLane.prototype.triggers = ['laneInTrigger', 'laneOutTrigger'];

    function MissionInnerLane(game, playfield) {
      MissionInnerLane.__super__.constructor.call(this, game, playfield);
    }

    MissionInnerLane.prototype.prepare = function() {
      var ballIntoLaneExpectation, ballOutLaneExpectation, target;
      _(this.fliptargets).each((function(_this) {
        return function(targetID) {
          var target;
          target = _this.playfield.get(targetID);
          target.transition('turnon');
          return _this.createExpectation(target, {
            expectedState: 'activated',
            activateTransition: 'turnon',
            exitTransition: 'reset'
          });
        };
      })(this));
      target = this.playfield.get('laneInTrigger');
      ballIntoLaneExpectation = this.createExpectation(target, {
        expectedState: 'activated',
        activateTransition: 'turnon',
        exitTransition: 'reset'
      });
      target = this.playfield.get('laneOutTrigger');
      return ballOutLaneExpectation = this.createExpectation(target, {
        required: [ballIntoLaneExpectation],
        expectedState: 'activated',
        activateTransition: 'turnon',
        exitTransition: 'reset'
      });
    };

    MissionInnerLane.prototype.tearDown = function() {
      return MissionInnerLane.__super__.tearDown.apply(this, arguments);
    };

    MissionInnerLane.prototype.getDescription = function() {
      return 'open inner lane and shoot through';
    };

    MissionInnerLane.prototype.getID = function() {
      return 'innerLaneShot';
    };

    return MissionInnerLane;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionPlungerShotAndBack = (function(_super) {
    __extends(MissionPlungerShotAndBack, _super);

    MissionPlungerShotAndBack.prototype.score = 100000;

    MissionPlungerShotAndBack.prototype.timeout = 90;

    function MissionPlungerShotAndBack(game, playfield) {
      MissionPlungerShotAndBack.__super__.constructor.call(this, game, playfield);
    }

    MissionPlungerShotAndBack.prototype.prepare = function() {};

    MissionPlungerShotAndBack.prototype.getDescription = function() {
      return '2x shoots in outer lane';
    };

    MissionPlungerShotAndBack.prototype.getID = function() {
      return 'doublePlungerShoot';
    };

    return MissionPlungerShotAndBack;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionRampFestival = (function(_super) {
    __extends(MissionRampFestival, _super);

    MissionRampFestival.prototype.score = 300000;

    MissionRampFestival.prototype.timeout = 90;

    function MissionRampFestival(game, playfield) {
      MissionRampFestival.__super__.constructor.call(this, game, playfield);
    }

    MissionRampFestival.prototype.prepare = function() {
      this.ramp = this.playfield.get('ramp');
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('alwaysblink');
      return this.createExpectation(this.ramp, {
        expectedState: 'disabled',
        expectedEvent: 'exitHole'
      });
    };

    MissionRampFestival.prototype.tearDown = function() {
      this.arrows = this.playfield.get('missionEnterRampLights');
      this.arrows.transition('switchoff');
      return MissionRampFestival.__super__.tearDown.apply(this, arguments);
    };

    MissionRampFestival.prototype.getDescription = function() {
      return 'enter bonus bumper';
    };

    MissionRampFestival.prototype.getID = function() {
      return 'rampFestival';
    };

    return MissionRampFestival;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionAllTargets = (function(_super) {
    __extends(MissionAllTargets, _super);

    MissionAllTargets.prototype.score = 100000;

    MissionAllTargets.prototype.timeout = 60;

    MissionAllTargets.prototype.targets = ['target1', 'target2', 'target3', 'target4', 'target5', 'target6', 'target7'];

    function MissionAllTargets(game, playfield) {
      MissionAllTargets.__super__.constructor.call(this, game, playfield);
    }

    MissionAllTargets.prototype.prepare = function() {
      return _(this.targets).each((function(_this) {
        return function(targetID) {
          var target;
          target = _this.playfield.get(targetID);
          return _this.createExpectation(target, {
            expectedState: 'activated',
            activateTransition: 'turnon',
            exitTransition: 'reset'
          });
        };
      })(this));
    };

    MissionAllTargets.prototype.getDescription = function() {
      return 'Shoot all\ntargets';
    };

    MissionAllTargets.prototype.getID = function() {
      return 'allTargets';
    };

    return MissionAllTargets;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionHoles = (function(_super) {
    __extends(MissionHoles, _super);

    MissionHoles.prototype.score = 400000;

    MissionHoles.prototype.timeout = 30;

    MissionHoles.prototype.holes = ['holeBL', 'holeBR'];

    function MissionHoles(game, playfield) {
      MissionHoles.__super__.constructor.call(this, game, playfield);
    }

    MissionHoles.prototype.prepare = function() {
      return _(this.holes).each((function(_this) {
        return function(targetID) {
          var target;
          target = _this.playfield.get(targetID);
          return _this.createExpectation(target, {
            expectedState: 'teleporter',
            activateTransition: 'turnon',
            exitTransition: 'reset'
          });
        };
      })(this));
    };

    MissionHoles.prototype.getDescription = function() {
      return 'holes left\and right';
    };

    MissionHoles.prototype.getID = function() {
      return 'holeHits';
    };

    return MissionHoles;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.MissionRampAndPlunger = (function(_super) {
    __extends(MissionRampAndPlunger, _super);

    MissionRampAndPlunger.prototype.score = 300000;

    MissionRampAndPlunger.prototype.timeout = 45;

    function MissionRampAndPlunger(game, playfield) {
      MissionRampAndPlunger.__super__.constructor.call(this, game, playfield);
    }

    MissionRampAndPlunger.prototype.prepare = function() {};

    MissionRampAndPlunger.prototype.getDescription = function() {
      return 'shoot right ramp and outer lane';
    };

    MissionRampAndPlunger.prototype.getID = function() {
      return 'rampAndPlunger';
    };

    return MissionRampAndPlunger;

  })(Pinball.Logic.MissionAbstract);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Logic.MissionExpectation = (function() {
    MissionExpectation.prototype.fulfilled = false;

    function MissionExpectation(target, options) {
      this.handleTargetChangedState = __bind(this.handleTargetChangedState, this);
      this.options = options;
      this.target = target;
      this.count = options.count || 1;
      this.changed = new Phaser.Signal();
      this.expectedState = options.expectedState;
      this.expectedEvent = options.expectedEvent;
      this.otherExpectationsRequired = options.required;
      this.target.stateChangedSignal.add(this.handleTargetChangedState);
      if (this.options.activateTransition) {
        this.target.transition(this.options.activateTransition);
      }
    }

    MissionExpectation.prototype.handleTargetChangedState = function(event, from, to) {
      if ((this.expectedState === to) && (this.expectedEvent === event || !this.expectedEvent) && this.otherExpectationsFulfilled()) {
        return this.complete();
      }
    };

    MissionExpectation.prototype.otherExpectationsFulfilled = function() {
      var result;
      if (!this.otherExpectationsRequired) {
        return true;
      }
      result = _(this.otherExpectationsRequired).every(function(e) {
        return e.fulfilled;
      });
      return result;
    };

    MissionExpectation.prototype.complete = function() {
      this.count = this.count - 1;
      if (this.count === 0) {
        console.log('expectation fulfilled!');
        this.fulfilled = true;
        return this.changed.dispatch(this);
      }
    };

    MissionExpectation.prototype.destroy = function() {
      if (this.options.exitTransition) {
        this.target.transition(this.options.exitTransition);
      }
      return this.target.stateChangedSignal.remove(this.handleTargetChangedState);
    };

    return MissionExpectation;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Logic.MissionManager = (function() {
    MissionManager.prototype.missionTrigger = 'rollover5';

    function MissionManager(game, machine) {
      this.handleMissionStart = __bind(this.handleMissionStart, this);
      this.handleMissionStop = __bind(this.handleMissionStop, this);
      this.handleMissionTimeProgress = __bind(this.handleMissionTimeProgress, this);
      this.handleMissionEnded = __bind(this.handleMissionEnded, this);
      this.missionStartedSignal = new Phaser.Signal();
      this.missionEndedSignal = new Phaser.Signal();
      this.missions = [];
      this.game = game;
      this.machine = machine;
      this.gameplay = this.machine.gameplay;
      this.gameModel = this.machine.gameModel;
      this.playfield = machine.playfield;
      this.display = this.playfield.get('display');
      this.init();
    }

    MissionManager.prototype.init = function() {
      this.fsm = StateMachine.create(this.getStateConfig());
      this.register(new Pinball.Logic.MissionRamp(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionTrippleTargets(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionDoubleTargetsNarrow(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionInnerLane(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionRampFestival(this.game, this.playfield));
      this.register(new Pinball.Logic.MissionHoles(this.game, this.playfield));
      return this.register(new Pinball.Logic.MissionAllTargets(this.game, this.playfield));
    };

    MissionManager.prototype.stop = function() {
      if (this.fsm.can('disable')) {
        return this.fsm.disable();
      }
    };

    MissionManager.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        error: function() {
          return 'Mission is busy';
        },
        events: [
          {
            name: 'start',
            from: 'idle',
            to: 'running'
          }, {
            name: 'disable',
            from: 'running',
            to: 'stopped'
          }, {
            name: 'reset',
            from: '*',
            to: 'idle'
          }
        ],
        callbacks: {
          onrunning: this.handleMissionStart,
          onstopped: this.handleMissionStop,
          onidle: this.handleNoMission
        }
      };
    };

    MissionManager.prototype.register = function(mission) {
      return this.missions.push(mission);
    };

    MissionManager.prototype.startRandom = function() {
      this.currentMission = this.missions[Math.floor(Math.random() * this.missions.length)];
      return this.fsm.start();
    };

    MissionManager.prototype.handleMissionEnded = function() {
      this.display.clear();
      if (this.currentMission.isFulfilled()) {
        this.display.setText('Mission\ncompleted!');
        this.display.blink(100, 0, 10);
        this.gameModel.addScore(this.currentMission.getScore());
      } else {
        this.display.setText('Mission\nTimeout!');
      }
      return this.fsm.disable();
    };

    MissionManager.prototype.handleMissionTimeProgress = function(timeLeft) {
      return this.display.setText2(timeLeft);
    };

    MissionManager.prototype.startCurrentMission = function() {
      this.currentMission.endedSignal.addOnce(this.handleMissionEnded);
      this.currentMission.timeProgressSignal.add(this.handleMissionTimeProgress);
      return this.currentMission.start();
    };

    MissionManager.prototype.handleMissionStop = function() {
      this.currentMission.destroy();
      delete this.currentMission;
      this.gameplay.endedMission();
      return this.fsm.reset();
    };

    MissionManager.prototype.handleMissionStart = function() {
      this.display.clear();
      this.display.setText('Mission\nactivated');
      this.display.blink(100, 0, 10);
      this.display.setText3(this.currentMission.getDescription());
      this.gameplay.newMission();
      return this.startCurrentMission();
    };

    return MissionManager;

  })();

}).call(this);
(function() {


}).call(this);
(function() {
  Pinball.Logic.ActionAbstract = (function() {
    function ActionAbstract(game, options) {
      this.game = game;
      this.target = options.target;
      this.state = options.state;
      this.action = options.action;
      this.payload = options.payload;
    }

    ActionAbstract.prototype.run = function() {
      return 'run action';
    };

    return ActionAbstract;

  })();

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.DisplayAction = (function(_super) {
    __extends(DisplayAction, _super);

    function DisplayAction(game, machine, options) {
      DisplayAction.__super__.constructor.call(this, game, options);
      this.machine = machine;
      this.playfield = this.machine.playfield;
      this.display = this.playfield.get('display');
      this.message = options.message;
      this.blink = options.blink;
    }

    DisplayAction.prototype.run = function() {
      this.display.clear();
      this.display.setText(this.message);
      if (this.blink) {
        return this.display.blink(100);
      }
    };

    DisplayAction.prototype.getType = function() {
      return 'display';
    };

    return DisplayAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.EndBallAction = (function(_super) {
    __extends(EndBallAction, _super);

    function EndBallAction(game, gameplay, playfield, options) {
      EndBallAction.__super__.constructor.call(this, game, options);
      this.gameplay = gameplay;
    }

    EndBallAction.prototype.run = function() {
      return this.gameplay.endBall();
    };

    return EndBallAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.LightenAction = (function(_super) {
    __extends(LightenAction, _super);

    function LightenAction(game, gameModel, playfield, options) {
      LightenAction.__super__.constructor.call(this, game, options);
      this.playfield = playfield;
      this.gameModel = gameModel;
      this.light = options.light;
      this.lightState = options.lightState;
    }

    LightenAction.prototype.run = function() {
      this.lightEntity = this.playfield.get(this.light);
      switch (this.lightState) {
        case 'off':
          return this.lightEntity.powerOff();
        case 'on':
          return this.lightEntity.powerOn();
        case 'blink':
          return this.lightEntity.blink(150, 0, 0);
        case 'blinkgroup':
          return this.lightEntity.transition('alwaysblink');
      }
    };

    LightenAction.prototype.getType = function() {
      return 'lighten';
    };

    return LightenAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.ScoreAction = (function(_super) {
    __extends(ScoreAction, _super);

    function ScoreAction(game, gameModel, options) {
      ScoreAction.__super__.constructor.call(this, game, options);
      this.gameModel = gameModel;
      this.score = options.score;
    }

    ScoreAction.prototype.run = function() {
      return this.gameModel.addScore(this.score);
    };

    ScoreAction.prototype.getType = function() {
      return 'score';
    };

    return ScoreAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.SoundAction = (function(_super) {
    __extends(SoundAction, _super);

    function SoundAction(game, options) {
      SoundAction.__super__.constructor.call(this, game, options);
      this.soundID = options.soundID;
      this.soundEffect = game.add.audio(this.soundID);
    }

    SoundAction.prototype.run = function() {
      return this.soundEffect.play();
    };

    SoundAction.prototype.getType = function() {
      return 'sound';
    };

    return SoundAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.StartMissionAction = (function(_super) {
    __extends(StartMissionAction, _super);

    function StartMissionAction(game, machine, options) {
      StartMissionAction.__super__.constructor.call(this, game, options);
      this.machine = machine;
      this.gameplay = this.machine.gameplay;
    }

    StartMissionAction.prototype.run = function() {
      return this.gameplay.startMission();
    };

    StartMissionAction.prototype.getType = function() {
      return 'startmission';
    };

    return StartMissionAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.StateChangeAction = (function(_super) {
    __extends(StateChangeAction, _super);

    function StateChangeAction(game, machine, options) {
      StateChangeAction.__super__.constructor.call(this, game, options);
      this.playfield = machine.playfield;
      this.transition = options.transition;
      this.stateOf = options.stateOf;
    }

    StateChangeAction.prototype.run = function() {
      var entity;
      entity = this.playfield.get(this.stateOf);
      return entity.transition(this.transition);
    };

    StateChangeAction.prototype.getType = function() {
      return 'stateChange';
    };

    return StateChangeAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Logic.TeleportAction = (function(_super) {
    __extends(TeleportAction, _super);

    function TeleportAction(game, gameModel, playfield, machine, options) {
      this.teleport = __bind(this.teleport, this);
      TeleportAction.__super__.constructor.call(this, game, options);
      this.machine = machine;
      this.playfield = playfield;
      this.gameModel = gameModel;
      this.score = options.score;
      this.destination = options.destination;
      this.holdtime = options.holdtime;
      this.shoot = options.shoot;
      this.disableRamp = options.disableRamp;
    }

    TeleportAction.prototype.run = function() {
      var ball, destination;
      ball = this.playfield.get('ball');
      ball.remove();
      destination = this.playfield.get(this.destination);
      return this.game.time.events.add(this.holdtime || 2000, this.teleport);
    };

    TeleportAction.prototype.teleport = function() {
      var ball, destination;
      destination = this.playfield.get(this.destination);
      destination.receive();
      ball = this.playfield.get('ball');
      ball.add(destination.x, destination.y);
      ball.shoot(this.shoot[0], this.shoot[1]);
      this.gameModel.addScore(this.score);
      if (this.disableRamp) {
        return this.machine.rampController.disableRampAfterHole();
      }
    };

    TeleportAction.prototype.getType = function() {
      return 'score';
    };

    return TeleportAction;

  })(Pinball.Logic.ActionAbstract);

}).call(this);
(function() {
  Pinball.Logic.State = (function() {
    function State(options) {
      this.target = options.target;
      this.targetEntityType = options.targetEntityType;
      this.event = options.event;
      this.transitionEvent = options.transitionEvent;
    }

    State.prototype.transition = function(playfield) {
      var entities, entity, _i, _len, _results;
      entities = [];
      if (this.targetEntityType) {
        entities = playfield.getAllFromType(this.targetEntityType);
      } else if (this.target instanceof Array) {
        entities = playfield.getMultiple(this.target);
      } else if (this.target) {
        entities = [playfield.get(this.target)];
      }
      _results = [];
      for (_i = 0, _len = entities.length; _i < _len; _i++) {
        entity = entities[_i];
        _results.push(entity.transition(this.transitionEvent));
      }
      return _results;
    };

    return State;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.AutoPlunger = (function(_super) {
    __extends(AutoPlunger, _super);

    function AutoPlunger(game, ground) {
      this.shootBallAndReset = __bind(this.shootBallAndReset, this);
      this.updateBody = __bind(this.updateBody, this);
      this.reset = __bind(this.reset, this);
      this.handleEngaged = __bind(this.handleEngaged, this);
      this.handleReset = __bind(this.handleReset, this);
      var fixture;
      AutoPlunger.__super__.constructor.call(this, game, {
        name: 'autoplunger',
        position: [62, 845],
        frame: 'entities/plunger_auto.png',
        fixture: 'plunger_auto',
        debug: false
      });
      fixture = this.game.cache.getPhysicsData('physics', 'table_sensors', 'autoPlunger');
      this.sensor = new Pinball.Sensor(this.game, fixture, false);
      this.anchor.set(0.5, 0);
      this.createFSM();
    }

    AutoPlunger.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        error: function() {
          return console.log('auto plunger is busy, ignore hits');
        },
        events: [
          {
            name: 'hit',
            from: 'idle',
            to: 'engaged'
          }, {
            name: 'reset',
            from: 'engaged',
            to: 'idle'
          }
        ],
        callbacks: {
          onengaged: this.handleEngaged,
          onreset: this.handleReset
        }
      };
    };

    AutoPlunger.prototype.getCollisionShapes = function() {
      return this.physicsable.getCollisionShapes();
    };

    AutoPlunger.prototype.hit = function() {
      console.log('hit');
      return this.fsm.hit();
    };

    AutoPlunger.prototype.handleReset = function() {
      return console.log('handleReset');
    };

    AutoPlunger.prototype.handleEngaged = function() {
      var ball;
      ball = this.playfield.get('ball');
      ball.body.setZeroForce();
      ball.body.setZeroRotation();
      ball.body.setZeroVelocity();
      return this.tenseAndShootBall();
    };

    AutoPlunger.prototype.tenseAndRelease = function(releaseCallback) {
      var tweenTense;
      tweenTense = this.game.add.tween(this.scale).to({
        y: .5
      }, 500, Phaser.Easing.Linear.None).onUpdateCallback(this.updateBody);
      tweenTense.onComplete.addOnce((function(_this) {
        return function() {
          return _this.release(releaseCallback);
        };
      })(this));
      return tweenTense.start();
    };

    AutoPlunger.prototype.release = function(releaseCallback) {
      var tweenRelease;
      this.physicsable.fixtureGroup.setMask(0);
      tweenRelease = this.game.add.tween(this.scale).to({
        y: 1
      }, 100, Phaser.Easing.Linear.None, false).onUpdateCallback(this.updateBody);
      tweenRelease.start();
      tweenRelease.onComplete.add(this.reset);
      if (releaseCallback != null) {
        return releaseCallback.call();
      }
    };

    AutoPlunger.prototype.reset = function() {
      console.log('reset mask', this.physicsable.fixtureGroup);
      return this.physicsable.fixtureGroup.setMask(Pinball.Bits.BALL);
    };

    AutoPlunger.prototype.updateBody = function() {
      return this.body.y = 845 + (1 - this.scale.y) / 0.5 * 30;
    };

    AutoPlunger.prototype.tenseAndShootBall = function() {
      return this.tenseAndRelease(this.shootBallAndReset);
    };

    AutoPlunger.prototype.shootBallAndReset = function() {
      var ball;
      ball = this.playfield.get('ball');
      ball.shoot(0);
      return this.fsm.reset();
    };

    AutoPlunger.prototype.createDoor = function() {
      this.autoPlungerDoor = new Pinball.Entities.DoorAutoPlunger(this.game);
      this.autoPlungerDoor.slideAlong(this.ground, [640 / 2 + -224 - 15, 970 / 2 + 310 + 41]);
      return this.add(this.autoPlungerDoor);
    };

    return AutoPlunger;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Ball = (function(_super) {
    __extends(Ball, _super);

    function Ball(game, options) {
      Ball.__super__.constructor.call(this, game, {
        position: [0, 0],
        frame: 'entities/ball_small.png',
        fixture: 'ball_small',
        dynamic: true
      });
      this.physicsable.setMaterial(options.material);
      this.physicsable.setMass(1.2);
      this.body.fixedRotation = true;
    }

    Ball.prototype.preUpdate = function() {
      return this.constrainVelocity(60);
    };

    Ball.prototype.constrainVelocity = function(maxVelocity) {
      var vx, vy;
      vx = this.body.data.velocity[0];
      vy = this.body.data.velocity[1];
      if (vx > maxVelocity) {
        this.body.data.velocity[0] = maxVelocity;
      } else if (vx < -maxVelocity) {
        this.body.data.velocity[0] = -maxVelocity;
      }
      if (vy > maxVelocity) {
        return this.body.data.velocity[1] = maxVelocity;
      } else if (vy < -maxVelocity) {
        return this.body.data.velocity[1] = -maxVelocity;
      }
    };

    Ball.prototype.getType = function() {
      return 'ball';
    };

    Ball.prototype.getID = function() {
      return 'ball';
    };

    Ball.prototype.add = function(x, y) {
      if (x == null) {
        x = 610;
      }
      if (y == null) {
        y = 610;
      }
      this.visible = true;
      this.game.physics.p2.addBody(this.body);
      return this.body.reset(x, y);
    };

    Ball.prototype.remove = function() {
      this.visible = false;
      return this.game.physics.p2.removeBodyNextStep(this.body);
    };

    Ball.prototype.reset = function(x, y) {
      if (x == null) {
        x = 610;
      }
      if (y == null) {
        y = 610;
      }
      this.body.reset(x, y);
      return this.resetCollisionMask();
    };

    Ball.prototype.setCollisionMask = function(bits) {
      return this.physicsable.setCollisionMask(bits);
    };

    Ball.prototype.resetCollisionMask = function() {
      return this.physicsable.setCollisionMask(Pinball.Bits.groups.TABLE());
    };

    Ball.prototype.shoot = function(angle, power) {
      var p2body;
      if (power == null) {
        power = 60;
      }
      angle = (angle + 90) / 180 * Math.PI;
      p2body = this.body.data;
      p2body.velocity[0] = Math.cos(angle) * power;
      return p2body.velocity[1] = Math.sin(angle) * power;
    };

    return Ball;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Controls = (function(_super) {
    __extends(Controls, _super);

    function Controls(game, ground, flipperMaterial) {
      this.handlePointerDown = __bind(this.handlePointerDown, this);
      this.handlePointerUp = __bind(this.handlePointerUp, this);
      Controls.__super__.constructor.call(this, game);
      this.flipperMaterial = flipperMaterial;
      this.ground = ground;
      this.build();
    }

    Controls.prototype.build = function() {
      this.flipperRectLeft = new Phaser.Rectangle(0, 0, this.game.width / 2, this.game.height);
      this.flipperRectRight = new Phaser.Rectangle(this.game.width / 2, 0, this.game.width / 2, this.game.height);
      this.plungerRect = new Phaser.Rectangle(this.game.width - 80, this.game.height - 200, 80, 200);
      this.buildFlippers();
      this.buildMainPlunger();
      this.game.input.onDown.add(this.handlePointerDown);
      return this.game.input.onUp.add(this.handlePointerUp);
    };

    Controls.prototype.buildFlippers = function() {
      this.flippers = new Pinball.Machine.Flippers(this.game, this.ground, this.flipperMaterial);
      return this.add(this.flippers);
    };

    Controls.prototype.buildMainPlunger = function() {
      var plungerMask;
      this.plunger = new Pinball.Entities.Plunger(this.game, this.ground);
      this.add(this.plunger);
      plungerMask = this.game.add.graphics(0, 0);
      plungerMask.beginFill(0xff0000);
      plungerMask.drawRect(-50, -200, 100, 200);
      plungerMask.x = this.plunger.x;
      plungerMask.y = this.plunger.y;
      this.plunger.mask = plungerMask;
      this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.spacebar.onDown.add(this.plunger.tense);
      return this.spacebar.onUp.add(this.plunger.release);
    };

    Controls.prototype.handlePointerUp = function(activePointer) {
      return this.testPointers(activePointer);
    };

    Controls.prototype.handlePointerDown = function(activePointer) {
      return this.testPointers(activePointer);
    };

    Controls.prototype.testPointers = function() {
      var leftActive, plungerTensed, pointer, rightActive;
      leftActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
      rightActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
      plungerTensed = this.spacebar.isDown;
      if (this.game.input.mousePointer.isDown) {
        pointer = this.game.input.mousePointer;
        leftActive = this.flipperRectLeft.contains(pointer.x, pointer.y) || leftActive;
        rightActive = this.flipperRectRight.contains(pointer.x, pointer.y) || rightActive;
        plungerTensed = this.plungerRect.contains(pointer.x, pointer.y) || plungerTensed;
      }
      if (this.game.input.pointer1.active) {
        pointer = this.game.input.pointer1;
        leftActive = this.flipperRectLeft.contains(pointer.x, pointer.y) || leftActive;
        rightActive = this.flipperRectRight.contains(pointer.x, pointer.y) || rightActive;
        plungerTensed = this.plungerRect.contains(pointer.x, pointer.y) || plungerTensed;
      }
      if (this.game.input.pointer2.active) {
        pointer = this.game.input.pointer2;
        leftActive = this.flipperRectLeft.contains(pointer.x, pointer.y) || leftActive;
        rightActive = this.flipperRectRight.contains(pointer.x, pointer.y) || rightActive;
        plungerTensed = this.plungerRect.contains(pointer.x, pointer.y) || plungerTensed;
      }
      this.flippers.left(leftActive);
      this.flippers.right(rightActive && !plungerTensed);
      if (plungerTensed) {
        return this.plunger.tense();
      } else {
        return this.plunger.release();
      }
    };

    Controls.prototype.update = function() {
      return this.testPointers();
    };

    return Controls;

  })(Phaser.Group);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Machine.Display = (function(_super) {
    __extends(Display, _super);

    function Display(game) {
      this.toggleAlpha = __bind(this.toggleAlpha, this);
      Display.__super__.constructor.call(this, game);
      this.x = 306;
      this.y = 723;
      this.build();
    }

    Display.prototype.build = function() {
      var bg;
      this.timer = this.game.time.create(false);
      bg = this.game.add.sprite(0, 0, 'display_bg');
      bg.anchor.set(0.5);
      this.add(bg);
      this.textfield = this.game.add.group();
      this.add(this.textfield);
      this.mainTextField = new Phaser.BitmapText(this.game, 0, 0, 'ledfont', void 0, 14);
      this.mainTextField.align = 'center';
      this.textfield.add(this.mainTextField);
      this.subTextField = new Phaser.BitmapText(this.game, 0, 0, 'ledfont', void 0, 14);
      this.subTextField.align = 'center';
      this.textfield.add(this.subTextField);
      this.subTextField2 = new Phaser.BitmapText(this.game, 0, 0, 'ledfont', void 0, 9);
      this.subTextField2.align = 'center';
      this.textfield.add(this.subTextField2);
      return this.setText('HELLO!');
    };

    Display.prototype.setText = function(value) {
      var anchor;
      this.mainTextField.text = ("" + value).toUpperCase();
      this.mainTextField.updateText();
      anchor = [0.5, 0];
      this.mainTextField.x = this.mainTextField.textWidth * (anchor[0] - 1);
      return this.mainTextField.y = this.mainTextField.textHeight * (anchor[1] - 1) - 20;
    };

    Display.prototype.setText2 = function(value) {
      var anchor;
      this.subTextField.text = ("" + value).toUpperCase();
      this.subTextField.updateText();
      anchor = [0.5, 0];
      this.subTextField.x = this.subTextField.textWidth * (anchor[0] - 1);
      return this.subTextField.y = this.subTextField.textHeight * (anchor[1] - 1) + 75;
    };

    Display.prototype.setText3 = function(value) {
      var anchor;
      this.subTextField2.text = ("" + value).toUpperCase();
      this.subTextField2.updateText();
      anchor = [0.5, 0];
      this.subTextField2.x = this.subTextField2.textWidth * (anchor[0] - 1);
      return this.subTextField2.y = this.subTextField2.textHeight * (anchor[1] - 1) + 35;
    };

    Display.prototype.clear = function() {
      this.setText('');
      this.setText2('');
      return this.setText3('');
    };

    Display.prototype.getID = function() {
      return 'display';
    };

    Display.prototype.blink = function(delay, offset, count) {
      if (delay == null) {
        delay = 100;
      }
      if (offset == null) {
        offset = 0;
      }
      if (count == null) {
        count = 10;
      }
      count = count * 2;
      this.timer.stop(true);
      if (count > 0) {
        this.timer.repeat(delay, count, this.toggleAlpha);
      } else {
        this.timer.loop(delay, this.toggleAlpha);
      }
      return this.timer.start(offset);
    };

    Display.prototype.toggleAlpha = function() {
      if (this.mainTextField.alpha === 0) {
        return this.mainTextField.alpha = 1;
      } else {
        return this.mainTextField.alpha = 0;
      }
    };

    return Display;

  })(Pinball.Base.PinballGroup);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Door = (function(_super) {
    __extends(Door, _super);

    Door.prototype.pivotCenter = {
      x: 0,
      y: 10
    };

    function Door(game, x, y, spriteKey) {
      this.close = __bind(this.close, this);
      this.open = __bind(this.open, this);
      Door.__super__.constructor.call(this, game, x, y, 'sprites', spriteKey);
      this.build();
    }

    Door.prototype.build = function() {
      this.inputEnabled = true;
      this.events.onInputDown.add(this.open);
      return this.events.onInputUp.add(this.close);
    };

    Door.prototype.open = function() {};

    Door.prototype.close = function() {};

    return Door;

  })(Phaser.Sprite);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.DoorAutoPlunger = (function(_super) {
    __extends(DoorAutoPlunger, _super);

    DoorAutoPlunger.prototype.bodyCenter = {
      x: 20,
      y: 10
    };

    DoorAutoPlunger.prototype.slideWidth = 45;

    function DoorAutoPlunger(game, x, y) {
      this.close = __bind(this.close, this);
      this.open = __bind(this.open, this);
      DoorAutoPlunger.__super__.constructor.call(this, game, x, y, 'entities/door_auto_plunger.png');
      this.build();
    }

    DoorAutoPlunger.prototype.build = function() {
      this.game.physics.p2.enable(this);
      this.body.clearShapes();
      this.body.allowSleep = true;
      this.body.addPhaserPolygon('physics', 'door_auto_plunger');
      this.inputEnabled = true;
      this.events.onInputDown.add(this.open);
      return this.events.onInputUp.add(this.close);
    };

    DoorAutoPlunger.prototype.open = function() {
      this.constraint.upperLimit = this.game.physics.p2.pxm(this.slideWidth);
      this.constraint.enableMotor();
      return this.constraint.motorSpeed = 15;
    };

    DoorAutoPlunger.prototype.close = function() {
      this.constraint.disableMotor();
      return this.constraint.upperLimit = this.game.physics.p2.pxm(0);
    };

    DoorAutoPlunger.prototype.slideAlong = function(ground, offsets) {
      var slope;
      this.body.x = offsets[0] - this.bodyCenter.x;
      this.body.y = offsets[1] - this.bodyCenter.y;
      this.body.fixedRotation = true;
      this.body.mass = 2;
      slope = [1, .735];
      this.constraint = this.game.physics.p2.createPrismaticConstraint(this, ground, true, [this.bodyCenter.x, this.bodyCenter.y], offsets, slope);
      this.constraint.upperLimitEnabled = true;
      this.constraint.lowerLimitEnabled = true;
      this.constraint.upperLimit = this.game.physics.p2.pxm(0);
      return this.constraint.lowerLimit = this.game.physics.p2.pxm(0);
    };

    return DoorAutoPlunger;

  })(Pinball.Entities.Door);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.FlipperBase = (function(_super) {
    __extends(FlipperBase, _super);

    FlipperBase.prototype.pivotCenter = {
      x: 0,
      y: 0
    };

    FlipperBase.prototype.clockwise = false;

    FlipperBase.prototype.amplitude = -35;

    FlipperBase.prototype.rest_amplitude = 35;

    FlipperBase.prototype.active = false;

    FlipperBase.prototype.motorSpeed = 12;

    function FlipperBase(game, options) {
      this.handleBallHit = __bind(this.handleBallHit, this);
      this.handleCooling = __bind(this.handleCooling, this);
      FlipperBase.__super__.constructor.call(this, game, {
        position: [0, 0],
        frame: options.frame,
        fixture: options.fixture,
        dynamic: true
      });
      if (options.material) {
        this.physicsable.setMaterial(options.material);
      }
      this.createFSM();
      if (this.sound) {
        this.soundEffect = game.add.audio(this.sound);
      }
    }

    FlipperBase.prototype.createFSM = function() {
      return this.fsm = StateMachine.create({
        initial: 'idle',
        events: [
          {
            name: 'hit',
            from: 'idle',
            to: 'active'
          }, {
            name: 'cooldown',
            from: 'active',
            to: 'cooling'
          }, {
            name: 'reset',
            from: 'cooling',
            to: 'idle'
          }
        ],
        callbacks: {
          onactive: this.handleBallHit,
          oncooling: this.handleCooling
        }
      });
    };

    FlipperBase.prototype.hit = function() {
      if (this.fsm.can('hit')) {
        return this.fsm.hit();
      }
    };

    FlipperBase.prototype.handleCooling = function() {
      return this.game.time.events.add(500, (function(_this) {
        return function() {
          return _this.fsm.reset();
        };
      })(this));
    };

    FlipperBase.prototype.handleBallHit = function() {
      return this.fsm.cooldown();
    };

    FlipperBase.prototype.setAmplitudes = function(active, rest) {
      this.amplitude = active;
      return this.rest_amplitude = rest;
    };

    FlipperBase.prototype.playSound = function() {
      if (this.soundEffect != null) {
        return this.soundEffect.play();
      }
    };

    FlipperBase.prototype.enable = function(force) {
      if (force == null) {
        force = false;
      }
      if (this.active && !force) {
        return;
      }
      this.playSound();
      this.active = true;
      return this.setLimits(this.amplitude);
    };

    FlipperBase.prototype.disable = function(force) {
      if (force == null) {
        force = false;
      }
      if (!this.active && !force) {
        return;
      }
      this.active = false;
      return this.setLimits(this.rest_amplitude);
    };

    FlipperBase.prototype.setLimits = function(angle) {
      var flag;
      flag = this.clockwise ? 1 : -1;
      this.revoluteConstraint.upperLimit = Phaser.Math.degToRad(angle * flag);
      this.revoluteConstraint.lowerLimit = Phaser.Math.degToRad(angle * flag);
      if (angle === 0) {
        flag = flag * -1;
      }
      return this.revoluteConstraint.setMotorSpeed(this.motorSpeed * flag);
    };

    FlipperBase.prototype.activateMotor = function() {
      var flag;
      flag = this.clockwise ? 1 : -1;
      this.revoluteConstraint.upperLimitEnabled = true;
      this.revoluteConstraint.lowerLimitEnabled = true;
      this.revoluteConstraint.enableMotor();
      return this.disable(true);
    };

    FlipperBase.prototype.revoluteAround = function(ground, offsets) {
      this.body.x = offsets[0] - this.pivotCenter.x;
      this.body.y = offsets[1] - this.pivotCenter.y;
      this.revoluteConstraint = this.game.physics.p2.createRevoluteConstraint(this, [this.pivotCenter.x, this.pivotCenter.y], ground, offsets);
      return this.activateMotor();
    };

    FlipperBase.prototype.debugPivot = function() {
      var g;
      g = this.body.debugBody.canvas;
      g.clear();
      g.lineStyle(1, 0xff0000);
      g.moveTo(0, 0);
      g.lineTo(this.pivotCenter.x, this.pivotCenter.y);
      g.beginFill(0xff0000);
      g.lineStyle(0);
      g.drawCircle(this.pivotCenter.x, this.pivotCenter.y, 5);
      g.drawCircle(this.pivotCenter.x, this.pivotCenter.y, 5);
      return g.drawCircle(this.pivotCenter.x, this.pivotCenter.y, 5);
    };

    return FlipperBase;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.FlipperLeft = (function(_super) {
    __extends(FlipperLeft, _super);

    FlipperLeft.prototype.pivotCenter = {
      x: -32,
      y: -1
    };

    FlipperLeft.prototype.clockwise = false;

    FlipperLeft.prototype.sound = 'flipper';

    function FlipperLeft(game, material) {
      FlipperLeft.__super__.constructor.call(this, game, {
        frame: 'entities/flipper_left.png',
        fixture: 'flipper_left',
        material: material
      });
    }

    FlipperLeft.prototype.getID = function() {
      return 'flipperLeft';
    };

    return FlipperLeft;

  })(Pinball.Entities.FlipperBase);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.FlipperRight = (function(_super) {
    __extends(FlipperRight, _super);

    FlipperRight.prototype.pivotCenter = {
      x: 32,
      y: -1
    };

    FlipperRight.prototype.clockwise = true;

    FlipperRight.prototype.sound = 'flipper';

    function FlipperRight(game, material) {
      FlipperRight.__super__.constructor.call(this, game, {
        frame: 'entities/flipper_right.png',
        fixture: 'flipper_right',
        material: material
      });
    }

    FlipperRight.prototype.getID = function() {
      return 'flipperRight';
    };

    return FlipperRight;

  })(Pinball.Entities.FlipperBase);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.RampFlipper = (function(_super) {
    __extends(RampFlipper, _super);

    RampFlipper.prototype.pivotCenter = {
      x: -15,
      y: -1
    };

    RampFlipper.prototype.clockwise = false;

    function RampFlipper(game) {
      RampFlipper.__super__.constructor.call(this, game, {
        frame: 'entities/mini_flipper.png',
        fixture: 'mini_flipper'
      });
    }

    RampFlipper.prototype.getID = function() {
      return 'flipperRamp';
    };

    return RampFlipper;

  })(Pinball.Entities.FlipperBase);

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Machine.Flippers = (function(_super) {
    __extends(Flippers, _super);

    function Flippers(game, ground, material) {
      Flippers.__super__.constructor.call(this, game);
      this.material = material;
      this.ground = ground;
      this.init();
    }

    Flippers.prototype.init = function() {
      this.buildFlipperLeft();
      this.buildFlipperRight();
      return this.buildFlipperRamp();
    };

    Flippers.prototype.buildFlipperLeft = function() {
      this.flipperLeft = new Pinball.Entities.FlipperLeft(this.game, this.material);
      this.add(this.flipperLeft);
      return this.flipperLeft.revoluteAround(this.ground, [640 / 2 + -96, 970 / 2 + 396]);
    };

    Flippers.prototype.buildFlipperRight = function() {
      this.flipperRight = new Pinball.Entities.FlipperRight(this.game, this.material);
      this.add(this.flipperRight);
      return this.flipperRight.revoluteAround(this.ground, [640 / 2 + 74, 970 / 2 + 396]);
    };

    Flippers.prototype.buildFlipperRamp = function() {
      this.flipperRamp = new Pinball.Entities.RampFlipper(this.game);
      this.add(this.flipperRamp);
      this.flipperRamp.setAmplitudes(0, 70);
      return this.flipperRamp.revoluteAround(this.ground, [640 / 2 + 65, 970 / 2 + -90]);
    };

    Flippers.prototype.left = function(active) {
      if (active) {
        this.flipperLeft.enable();
        return this.flipperRamp.enable();
      } else {
        this.flipperLeft.disable();
        return this.flipperRamp.disable();
      }
    };

    Flippers.prototype.right = function(active) {
      if (active) {
        return this.flipperRight.enable();
      } else {
        return this.flipperRight.disable();
      }
    };

    Flippers.prototype.update = function() {
      if (this.game.input.activePointer && this.game.input.activePointer.isDown) {
        this.flipperLeftActive = Math.floor(this.game.input.activePointer.x / (this.game.width / 2)) === 0;
        this.flipperRightActive = Math.floor(this.game.input.activePointer.x / (this.game.width / 2)) === 1;
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.flipperLeftActive = this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT);
        this.flipperRightActive = this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
      }
      this.left(this.flipperLeftActive);
      this.right(this.flipperRightActive);
      this.flipperLeftActive = false;
      return this.flipperRightActive = false;
    };

    return Flippers;

  })(Phaser.Group);

}).call(this);
(function() {


}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.MissionLight = (function(_super) {
    __extends(MissionLight, _super);

    function MissionLight(game, options) {
      MissionLight.__super__.constructor.call(this, game, options);
    }

    return MissionLight;

  })(Pinball.Base.Light);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.MissionProgress = (function(_super) {
    __extends(MissionProgress, _super);

    function MissionProgress(game, options) {
      this.onOverview = __bind(this.onOverview, this);
      MissionProgress.__super__.constructor.call(this, game, options);
      this.x = 230;
      this.y = 570;
    }

    MissionProgress.prototype.getStateConfig = function() {
      return {
        initial: 'off',
        events: [
          {
            name: 'switchon',
            from: '*',
            to: 'powered'
          }, {
            name: 'switchoff',
            from: 'on',
            to: 'off'
          }, {
            name: 'switchoff',
            from: ['blinking', 'helloblinking'],
            to: 'overview'
          }, {
            name: 'helloblink',
            from: 'off',
            to: 'helloblinking'
          }, {
            name: 'blink',
            from: 'off',
            to: 'blinking'
          }
        ],
        callbacks: {
          onpowered: this.handlePowerOn,
          onoff: this.handlePowerOff,
          onhelloblinking: this.handleHelloBlink,
          onblinking: this.handleBlinking,
          onoverview: this.onOverview
        }
      };
    };

    MissionProgress.prototype.onOverview = function() {
      var light;
      light = this.getLight('missionLight1');
      light.powerOn();
      light = this.getLight('missionLight3');
      light.powerOn();
      light = this.getLight('missionLight4');
      return light.powerOn();
    };

    return MissionProgress;

  })(Pinball.Base.LightGroup);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Plunger = (function(_super) {
    __extends(Plunger, _super);

    function Plunger(game) {
      this.handleTensed = __bind(this.handleTensed, this);
      this.handleReleased = __bind(this.handleReleased, this);
      this.tense = __bind(this.tense, this);
      this.release = __bind(this.release, this);
      Plunger.__super__.constructor.call(this, game, {
        name: 'plunger',
        position: [608, 935],
        frame: 'entities/plunger.png',
        fixture: 'plunger',
        dynamic: true,
        debug: false
      });
      this.build();
      this.constraints();
      this.createFSM();
    }

    Plunger.prototype.getStateConfig = function() {
      return {
        initial: 'idle',
        events: [
          {
            name: 'tense',
            from: 'idle',
            to: 'tensed'
          }, {
            name: 'release',
            from: 'tensed',
            to: 'released'
          }, {
            name: 'disable',
            from: '*',
            to: 'disabled'
          }, {
            name: 'enable',
            from: '*',
            to: 'idle'
          }, {
            name: 'reset',
            from: '*',
            to: 'idle'
          }
        ],
        callbacks: {
          ontensed: this.handleTensed,
          onreleased: this.handleReleased
        }
      };
    };

    Plunger.prototype.build = function() {
      var p2World;
      p2World = this.game.physics.p2;
      this.body.fixedRotation = true;
      this.body.data.gravityScale = -1;
      this.anchorBody = new p2.Body({
        position: [p2World.pxmi(608), p2World.pxmi(935)],
        mass: 0
      });
      this.anchorBody.addShape(new p2.Rectangle(p2World.pxm(20), p2World.pxm(20)));
      return p2World.world.addBody(this.anchorBody);
    };

    Plunger.prototype.constraints = function() {
      this.constraint = this.game.physics.p2.createPrismaticConstraint(this, this.anchorBody, true, [0, this.height / 2], [0, 0], [0, 1]);
      this.constraint.upperLimit = this.game.physics.p2.pxm(this.height);
      this.constraint.lowerLimit = this.game.physics.p2.pxm(this.height);
      this.constraint.upperLimitEnabled = true;
      this.constraint.lowerLimitEnabled = true;
      this.constraint.upperLimit = this.game.physics.p2.pxm(0);
      return this.constraint.lowerLimit = this.game.physics.p2.pxm(0);
    };

    Plunger.prototype.release = function() {
      if (this.fsm.can('release')) {
        return this.fsm.release();
      }
    };

    Plunger.prototype.tense = function() {
      if (this.fsm.can('tense')) {
        return this.fsm.tense();
      }
    };

    Plunger.prototype.handleReleased = function() {
      this.constraint.upperLimit = this.game.physics.p2.pxm(0);
      this.constraint.lowerLimit = this.game.physics.p2.pxm(0);
      this.constraint.disableMotor();
      return this.fsm.reset();
    };

    Plunger.prototype.handleTensed = function() {
      this.constraint.motorSpeed = 5;
      this.constraint.upperLimit = this.game.physics.p2.pxm(this.height - 30);
      this.constraint.lowerLimit = this.game.physics.p2.pxm(0);
      return this.constraint.enableMotor();
    };

    return Plunger;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Ramp = (function(_super) {
    __extends(Ramp, _super);

    function Ramp(game, x, y, ball, debug) {
      if (debug == null) {
        debug = false;
      }
      this.handleCenterRamp = __bind(this.handleCenterRamp, this);
      this.handleUpperRamp = __bind(this.handleUpperRamp, this);
      this.handleLowerRamp = __bind(this.handleLowerRamp, this);
      this.handleEnabled = __bind(this.handleEnabled, this);
      this.handleDisabled = __bind(this.handleDisabled, this);
      Ramp.__super__.constructor.call(this, game, {
        position: [x, y],
        fullFrame: 'ramp'
      });
      this.debug = false;
      this.anchor.set(0.5);
      this.ball = ball;
      this.init();
      this.createFSM();
    }

    Ramp.prototype.getID = function() {
      return 'ramp';
    };

    Ramp.prototype.getType = function() {
      return 'ramp';
    };

    Ramp.prototype.init = function() {
      this.removeNextStep = [];
      this.p2world = this.game.physics.p2;
      this.createRamp();
      this.createSensors();
      return this.createCollisionEntities();
    };

    Ramp.prototype.getStateConfig = function() {
      return {
        initial: 'disabled',
        events: [
          {
            name: 'enable',
            from: '*',
            to: 'enabled'
          }, {
            name: 'enterLower',
            from: ['enabled', 'upperRamp'],
            to: 'lowerRamp'
          }, {
            name: 'enterUpper',
            from: ['centerRamp', 'lowerRamp'],
            to: 'upperRamp'
          }, {
            name: 'enterCenter',
            from: 'upperRamp',
            to: 'centerRamp'
          }, {
            name: 'disable',
            from: '*',
            to: 'disabled'
          }, {
            name: 'transitionLowerUpper',
            from: 'lowerRamp',
            to: 'upperRamp'
          }, {
            name: 'exitLower',
            from: '*',
            to: 'disabled'
          }, {
            name: 'exitHole',
            from: '*',
            to: 'disabled'
          }, {
            name: 'exitUpper',
            from: '*',
            to: 'disabled'
          }
        ],
        callbacks: {
          ondisabled: this.handleDisabled,
          onenabled: this.handleEnabled,
          onlowerRamp: this.handleLowerRamp,
          onupperRamp: this.handleUpperRamp,
          oncenterRamp: this.handleCenterRamp
        }
      };
    };

    Ramp.prototype.handleDisabled = function() {
      return this.disableRamp();
    };

    Ramp.prototype.handleEnabled = function() {
      return this.fsm.enterLower();
    };

    Ramp.prototype.getEnterSensor = function() {
      return this.enterSensorEntity;
    };

    Ramp.prototype.getCenterSensor = function() {
      return this.enterCenterSensorEntity;
    };

    Ramp.prototype.getLeaveCenterSensor = function() {
      return this.leaveCenterSensorEntity;
    };

    Ramp.prototype.getLowerExitSensor = function() {
      return this.lowerExitSensorEntity;
    };

    Ramp.prototype.getUpperExitSensor = function() {
      return this.upperExitSensorEntity;
    };

    Ramp.prototype.getTransitionSensor = function() {
      return this.transitionSensorEntity;
    };

    Ramp.prototype.handleLowerRamp = function() {
      return this.enableLowerRamp();
    };

    Ramp.prototype.handleUpperRamp = function() {
      return this.enableUpperRamp();
    };

    Ramp.prototype.handleCenterRamp = function() {
      return this.enableRampCenter();
    };

    Ramp.prototype.createSensors = function() {
      this.transitionSensor = this.createSensor('transition');
      this.upperExitSensor = this.createSensor('upperExit');
      this.lowerExitSensor = this.createSensor('lowerExit');
      this.enterSensor = this.createSensor('enterRectangle');
      this.enterCenterSensor = this.createSensor('enterCenterRectangle');
      return this.leaveCenterSensor = this.createSensor('leaveCenter');
    };

    Ramp.prototype.createCollisionEntities = function() {
      this.enterSensorEntity = new Pinball.Core.CollideableEntity(this, this.enterSensor.shapes[0]);
      this.enterCenterSensorEntity = new Pinball.Core.CollideableEntity(this, this.enterCenterSensor.shapes[0]);
      this.leaveCenterSensorEntity = new Pinball.Core.CollideableEntity(this, this.leaveCenterSensor.shapes[0]);
      this.lowerExitSensorEntity = new Pinball.Core.CollideableEntity(this, this.lowerExitSensor.shapes[0]);
      this.upperExitSensorEntity = new Pinball.Core.CollideableEntity(this, this.upperExitSensor.shapes[0]);
      return this.transitionSensorEntity = new Pinball.Core.CollideableEntity(this, this.transitionSensor.shapes[0]);
    };

    Ramp.prototype.disableRamp = function() {
      this.ball.resetCollisionMask();
      this.removeFromWorld(this.lowerBodies);
      this.removeFromWorld(this.upperBodies);
      if (this.debug) {
        _(this.lowerBodies).each(function(body) {
          return body.debug.visible = false;
        });
        _(this.upperBodies).each(function(body) {
          return body.debug.visible = false;
        });
        return _(this.centerBodies).each(function(body) {
          return body.debug.visible = false;
        });
      }
    };

    Ramp.prototype.preUpdate = function() {
      var body, _results;
      return this.removeNextStep.length === 0;
      _results = [];
      while (this.removeNextStep.length > 0) {
        body = this.removeNextStep.pop();
        if (body.world != null) {
          _results.push(this.p2world.world.removeBody(body));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Ramp.prototype.enableLowerRamp = function() {
      this.ball.setCollisionMask(Pinball.Bits.groups.RAMP_LOWER());
      this.removeFromWorld(this.upperBodies);
      this.removeFromWorld(this.centerBodies);
      this.addToWorld(this.lowerBodies);
      if (this.debug) {
        _(this.lowerBodies).each(function(body) {
          return body.debug.visible = true;
        });
        _(this.upperBodies).each(function(body) {
          return body.debug.visible = false;
        });
        return _(this.centerBodies).each(function(body) {
          return body.debug.visible = false;
        });
      }
    };

    Ramp.prototype.enableUpperRamp = function() {
      this.ball.setCollisionMask(Pinball.Bits.groups.RAMP_UPPER());
      this.removeFromWorld(this.lowerBodies);
      this.removeFromWorld(this.centerBodies);
      this.addToWorld(this.upperBodies);
      if (this.debug) {
        _(this.lowerBodies).each(function(body) {
          return body.debug.visible = false;
        });
        _(this.centerBodies).each(function(body) {
          return body.debug.visible = false;
        });
        return _(this.upperBodies).each(function(body) {
          return body.debug.visible = true;
        });
      }
    };

    Ramp.prototype.enableRampCenter = function() {
      this.ball.setCollisionMask(Pinball.Bits.groups.RAMP_CENTER());
      this.removeFromWorld(this.lowerBodies);
      this.removeFromWorld(this.upperBodies);
      this.addToWorld(this.centerBodies);
      if (this.debug) {
        _(this.lowerBodies).each(function(body) {
          return body.debug.visible = false;
        });
        _(this.centerBodies).each(function(body) {
          return body.debug.visible = true;
        });
        return _(this.upperBodies).each(function(body) {
          return body.debug.visible = false;
        });
      }
    };

    Ramp.prototype.createSensor = function(key) {
      var body, debugBody, fixture;
      fixture = this.game.cache.getPhysicsData('physics', 'ramp_sensors', key);
      if (fixture == null) {
        return;
      }
      body = new p2.Body({
        position: this.getBodyCenter()
      });
      Pinball.PhysicsUtils.addFixtureToBody(this.game, body, fixture);
      this.p2world.world.addBody(body);
      if (this.debug) {
        debugBody = new Phaser.Physics.P2.BodyDebug(this.game, body);
      }
      return body;
    };

    Ramp.prototype.createRamp = function() {
      this.staticBodies = this.createBodies('ramp_static');
      _(this.staticBodies).each((function(_this) {
        return function(body) {
          return body.debug.visible = _this.debug;
        };
      })(this));
      this.addToWorld(this.staticBodies);
      this.lowerBodies = this.createBodies('ramp_lower');
      this.upperBodies = this.createBodies('ramp_upper');
      return this.centerBodies = this.createBodies('ramp_center');
    };

    Ramp.prototype.addToWorld = function(bodies) {
      var body, index, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = bodies.length; _i < _len; _i++) {
        body = bodies[_i];
        if ((index = this.removeNextStep.indexOf(body)) !== -1) {
          this.removeNextStep.splice(index, 1);
        }
        if (body.world == null) {
          _results.push(this.p2world.world.addBody(body));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Ramp.prototype.removeFromWorld = function(bodies) {
      var body, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = bodies.length; _i < _len; _i++) {
        body = bodies[_i];
        _results.push(this.removeNextStep.push(body));
      }
      return _results;
    };

    Ramp.prototype.createBodies = function(physicsID) {
      var bodies, body, fixture, staticRampData, _i, _len;
      staticRampData = this.game.cache.getPhysicsData('physics', physicsID);
      bodies = [];
      for (_i = 0, _len = staticRampData.length; _i < _len; _i++) {
        fixture = staticRampData[_i];
        body = new p2.Body({
          position: this.getBodyCenter()
        });
        Pinball.PhysicsUtils.addFixtureToBody(this.game, body, fixture);
        body.debug = Pinball.PhysicsUtils.debugBody(this.game, body);
        body.debug.visible = false;
        bodies.push(body);
      }
      return bodies;
    };

    Ramp.prototype.getBodyCenter = function() {
      return [this.p2world.pxmi(this.x - this.width / 2), this.p2world.pxmi(this.y - this.height / 2)];
    };

    return Ramp;

  })(Pinball.Base.PinballEntity);

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Entities.Surface = (function(_super) {
    __extends(Surface, _super);

    function Surface(game, x, y) {
      this.handleZoneUpdate = __bind(this.handleZoneUpdate, this);
      Surface.__super__.constructor.call(this, game, x, y, 'table');
      this.init();
    }

    Surface.prototype.init = function() {
      this.debug = false;
      this.removeNextStep = [];
      this.zones = new Pinball.Entities.SurfaceZones(this.game);
      this.collisionGroup = this.game.physics.p2.createCollisionGroup();
      this.game.physics.p2.enable(this, Pinball.Store.DEBUG_PHYSICS);
      this.body["static"] = true;
      this.body.clearShapes();
      return this.buildZones();
    };

    Surface.prototype.createSensor = function(key, debug) {
      var fixture, sensor;
      if (debug == null) {
        debug = false;
      }
      fixture = this.game.cache.getPhysicsData('physics', 'table_sensors', key);
      sensor = new Pinball.Sensor(this.game, fixture, debug);
      return sensor;
    };

    Surface.prototype.buildZones = function() {
      this.bodyZone1 = this.createBody('physics', 'table_zone_1');
      this.bodyZone2 = this.createBody('physics', 'table_zone_2');
      this.bodyZone3 = this.createBody('physics', 'table_zone_3');
      return this.bodyZone4 = this.createBody('physics', 'table_zone_4');
    };

    Surface.prototype.handleZoneUpdate = function(nr, active) {
      if (nr === 1) {
        this.enableZone1(active);
      }
      if (nr === 2) {
        this.enableZone2(active);
      }
      if (nr === 3) {
        this.enableZone3(active);
      }
      if (nr === 4) {
        return this.enableZone4(active);
      }
    };

    Surface.prototype.preUpdate = function() {
      var body, _results;
      _results = [];
      while (this.removeNextStep.length > 0) {
        body = this.removeNextStep.pop();
        if (body.world != null) {
          _results.push(this.game.physics.p2.world.removeBody(body));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Surface.prototype.enableAllZones = function() {
      this.enableZone1(true);
      this.enableZone2(true);
      this.enableZone3(true);
      return this.enableZone4(true);
    };

    Surface.prototype.enableZone = function(zone, enabled) {
      var index;
      if (enabled) {
        if ((index = this.removeNextStep.indexOf(zone)) !== -1) {
          this.removeNextStep.splice(index, 1);
        }
        if (zone.world == null) {
          return this.game.physics.p2.world.addBody(zone);
        }
      } else {
        return this.removeNextStep.push(zone);
      }
    };

    Surface.prototype.enableZone1 = function(enabled) {
      return this.enableZone(this.bodyZone1, enabled);
    };

    Surface.prototype.enableZone2 = function(enabled) {
      return this.enableZone(this.bodyZone2, enabled);
    };

    Surface.prototype.enableZone3 = function(enabled) {
      return this.enableZone(this.bodyZone3, enabled);
    };

    Surface.prototype.enableZone4 = function(enabled) {
      return this.enableZone(this.bodyZone4, enabled);
    };

    Surface.prototype.createBody = function(key, object) {
      var body, data, debugBody, fixtureData, _i, _len;
      data = this.game.cache.getPhysicsData(key, object);
      body = new p2.Body();
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        fixtureData = data[_i];
        Pinball.PhysicsUtils.addFixtureToBody(this.game, body, fixtureData);
      }
      if (this.debug) {
        debugBody = new Phaser.Physics.P2.BodyDebug(this.game, body);
      }
      return body;
    };

    Surface.prototype.getID = function() {
      return 'surface';
    };

    Surface.prototype.getType = function() {
      return 'surface';
    };

    return Surface;

  })(Phaser.Sprite);

}).call(this);
(function() {
  Pinball.Entities.SurfaceZones = (function() {
    function SurfaceZones(game, ball) {
      this.game = game;
      this.buildTriggerZones();
    }

    SurfaceZones.prototype.buildTriggerZones = function() {
      this.zone_tl = this.createZone(0, 0, 320, 485);
      this.zoneEnityTL = new Pinball.Core.CollideableEntity(this, this.zone_tl);
      this.zone_tr = this.createZone(320, 0, 320, 485);
      this.zoneEnityTR = new Pinball.Core.CollideableEntity(this, this.zone_tr);
      this.zone_bl = this.createZone(0, 485, 320, 485);
      this.zoneEnityBL = new Pinball.Core.CollideableEntity(this, this.zone_bl);
      this.zone_br = this.createZone(320, 485, 320, 485);
      return this.zoneEnityBR = new Pinball.Core.CollideableEntity(this, this.zone_br);
    };

    SurfaceZones.prototype.createZone = function(x, y, w, h) {
      var body, debugBody, shape, world;
      world = this.game.physics.p2;
      body = new p2.Body({
        position: [world.pxmi(x + w / 2), world.pxmi(y + h / 2)]
      });
      shape = new p2.Rectangle(world.pxm(w), world.pxm(h));
      shape.collisionGroup = 1;
      shape.collisionMask = 2;
      shape.sensor = true;
      body.addShape(shape);
      world.world.addBody(body);
      if (this.debug) {
        debugBody = new Phaser.Physics.P2.BodyDebug(this.game, body);
        debugBody.alpha = 0.3;
      }
      return shape;
    };

    return SurfaceZones;

  })();

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Machine.TableLights = (function(_super) {
    __extends(TableLights, _super);

    function TableLights(game, factory) {
      TableLights.__super__.constructor.call(this, game);
      this.factory = factory;
      this.init();
      this.create();
      this.createLightGroups();
    }

    TableLights.prototype.init = function() {
      return this.lightgroups = [];
    };

    TableLights.prototype.create = function() {
      var item, object, _i, _len, _ref, _results;
      _ref = Pinball.DATA.lights;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        object = _ref[_i];
        item = this.factory.create(object);
        _results.push(this.add(item));
      }
      return _results;
    };

    TableLights.prototype.createLightGroups = function() {
      var lightgroup, lightgroupData, _i, _len, _ref, _results;
      _ref = Pinball.DATA.lightgroups;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        lightgroupData = _ref[_i];
        lightgroup = this.factory.createLightGroup(lightgroupData);
        this.add(lightgroup);
        _results.push(this.lightgroups.push(lightgroup));
      }
      return _results;
    };

    TableLights.prototype.getLight = function(id) {
      return this.factory.getObject(id);
    };

    TableLights.prototype.getLights = function(ids) {
      return _(ids).map((function(_this) {
        return function(id) {
          return _this.getLight(id);
        };
      })(this));
    };

    return TableLights;

  })(Phaser.Group);

}).call(this);
(function() {
  Pinball.Screens.Boot = (function() {
    function Boot() {}

    Boot.prototype.preload = function() {
      return this.game.load.atlasJSONHash('preloader-sprites', 'gameassets/preloader.png', 'gameassets/preloader.json');
    };

    Boot.prototype.create = function() {
      if (!window.PINBALL_STANDALONE) {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.minWidth = 503;
        this.game.scale.maxWidth = 503;
        this.game.scale.minHeight = 760;
        this.game.scale.maxHeight = 760;
      } else {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.pageAlignHorizontally = true;
      }
      this.game.scale.setScreenSize(true);
      return this.game.state.start('preloader');
    };

    return Boot;

  })();

}).call(this);
(function() {
  Pinball.Screens.Game = (function() {
    function Game(options) {
      if (options == null) {
        options = {};
      }
    }

    Game.prototype.create = function() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.p2.gravity.y = 350;
      this.game.stage.disableVisibilityChange = true;
      this.game.time.deltaCap = 1 / 30;
      this.game.physics.p2.useElapsedTime = true;
      this.machine = new Pinball.PinballMachine(this.game);
      this.game.world.add(this.machine);
      this.debug = new Pinball.Debug(this.game);
      return Pinball.Store.DEBUG = this.debug;
    };

    Game.prototype.render = function() {
      return this.debug.renderGeneralInfo();
    };

    return Game;

  })();

}).call(this);
(function() {
  Pinball.Screens.Preloader = (function() {
    function Preloader() {}

    Preloader.prototype.preload = function() {
      Pinball.AssetLoader.load(this.game);
      return this.createWheel();
    };

    Preloader.prototype.createWheel = function() {
      this.wheel = this.game.add.sprite(0, 0, 'preloader-sprites');
      this.wheel.scale.x = 0.5;
      this.wheel.scale.y = 0.5;
      this.wheel.anchor.set(0.5);
      this.wheel.x = this.game.world.centerX;
      this.wheel.y = this.game.world.centerY;
      this.wheel.animations.add('spin', void 0, 30, true);
      return this.wheel.animations.play('spin');
    };

    Preloader.prototype.create = function() {
      return this.game.state.start('game');
    };

    return Preloader;

  })();

}).call(this);
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.Models.Game = (function(_super) {
    __extends(Game, _super);

    function Game() {
      return Game.__super__.constructor.apply(this, arguments);
    }

    Game.BALL_PER_GAME = 3;

    Game.prototype.defaults = {
      started: false,
      ballActive: false,
      balls: 3,
      score: 0
    };

    Game.prototype.initialize = function() {};

    Game.prototype.addScore = function(score) {
      return this.set('score', this.get('score') + score);
    };

    Game.prototype.ballActive = function(value) {
      return this.set('ballActive', value);
    };

    Game.prototype.startGame = function() {
      this.set('balls', Pinball.Models.Game.BALL_PER_GAME);
      this.set('score', 0);
      this.set('ballActive', false);
      return this.set('started', true);
    };

    return Game;

  })(Backbone.Model);

}).call(this);
(function() {
  Pinball.ActionList = (function() {
    function ActionList(actions) {
      var action, ungrouped, _i, _len;
      this.list = [];
      ungrouped = _.flatten(_.values(actions.grouped));
      actions = ungrouped.concat(actions.unsorted);
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        action = this.expandGrouping(action);
        action = this.expandTargets(action);
        action = this.expandStates(action);
        this.list.push(action);
      }
      this.list = _(this.list).flatten();
    }

    ActionList.prototype.each = function(callback) {
      return _(this.list).each(callback);
    };

    ActionList.prototype.expandGrouping = function(action) {
      if (_(action).keys().length === 1) {
        console.log(action);
      }
      return action;
    };

    ActionList.prototype.expandTargets = function(action) {
      var actions;
      if (action.target instanceof Array) {
        actions = _(action.target).map(function(target) {
          return _.extend({
            target: target
          }, _(action).omit('target'));
        });
      }
      return actions || action;
    };

    ActionList.prototype.expandStates = function(action) {
      var actions;
      if (action instanceof Array) {
        return _(action).map((function(_this) {
          return function(action) {
            return _this.expandStates(action);
          };
        })(this));
      }
      if (action.state instanceof Array) {
        actions = _(action.state).map(function(state) {
          return _.extend({
            state: state
          }, _(action).omit('state'));
        });
      }
      return actions || action;
    };

    return ActionList;

  })();

}).call(this);
(function() {
  Pinball.AssetLoader = (function() {
    function AssetLoader() {}

    AssetLoader.load = function(game) {
      game.load.physics('physics', 'gameassets/physics.json', null, Phaser.Loader.PHYSICS_PHASER_JSON);
      game.load.bitmapFont('ledfont', 'gameassets/fonts/led.png', 'gameassets/fonts/led.fnt');
      game.load.image('table', 'gameassets/themes/default-images/table.png');
      game.load.image('ramp', 'gameassets/themes/default-images/ramp.png');
      game.load.atlasJSONHash('sprites', 'gameassets/themes/default.png', 'gameassets/themes/default.json');
      game.load.image('display_bg', 'gameassets/images/display_bg.png');
      game.load.audio('slingshot', 'gameassets/sounds/Bumper.wav');
      game.load.audio('flipper', 'gameassets/sounds/DE_Flipper_1.wav');
      game.load.audio('bumper', 'gameassets/sounds/HitBuffersV1.wav');
      game.load.audio('sinkhole', 'gameassets/sounds/TinkleBell01.wav');
      game.load.audio('ballout', 'gameassets/sounds/WeirdBellUp.wav');
      game.load.audio('plunger', 'gameassets/sounds/DE_Plunger_1.wav');
      return game.load.audio('rollover', 'gameassets/sounds/Swipe02.wav');
    };

    return AssetLoader;

  })();

}).call(this);
(function() {
  Pinball.Debug = (function() {
    function Debug(game) {
      this.game = game;
      this.game.time.advancedTiming = true;
      this.fspCounter = 0;
      this.fspSummed = 0;
      this.fpsAverage = 0;
    }

    Debug.prototype.renderGeneralInfo = function() {
      var bodyCount, framesWindowSize, renderer, shapeCount, verticesCount;
      if (this.game.time.fps > 0) {
        this.fspSummed = this.fspSummed + this.game.time.fps;
        this.fspCounter = this.fspCounter + 1;
        framesWindowSize = 10 * 60;
        if (this.fspCounter > framesWindowSize) {
          this.fspSummed = this.fpsAverage;
          this.fspCounter = 1;
        }
        this.fpsAverage = Math.round(this.fspSummed / this.fspCounter);
      }
      this.game.debug.text("" + this.game.time.fps + "(" + this.fpsAverage + ")", 580, 20);
      bodyCount = this.game.physics.p2.world.bodies.length;
      shapeCount = _(this.game.physics.p2.world.bodies).reduce((function(sum, body) {
        return sum + body.shapes.length;
      }), 0);
      verticesCount = _(this.game.physics.p2.world.bodies).reduce((function(sum, body) {
        return sum + (_(body.shapes).reduce((function(sum, shape) {
          return sum + (shape.vertices ? shape.vertices.length : 0);
        }), 0));
      }), 0);
      this.game.debug.text("b: " + bodyCount + ", s: " + shapeCount + " v: " + verticesCount, 20, 20);
      renderer = this.game.renderType === Phaser.WEBGL ? 'webgl' : 'canvas';
      return this.game.debug.text("" + renderer, 20, 40);
    };

    Debug.prototype.placeBallAtMouse = function(ball) {
      return ball.reset(this.game.input.x, this.game.input.y);
    };

    Debug.prototype.shootBallIntoRamp = function(ball) {
      ball.reset(390, 589);
      return this.shootBall(ball, 135, 40);
    };

    Debug.prototype.shootBall = function(ball, angle, speed) {
      var p2body;
      angle = angle / 180 * Math.PI;
      p2body = ball.body.data;
      p2body.velocity[0] = Math.cos(angle) * speed;
      return p2body.velocity[1] = Math.sin(angle) * speed;
    };

    Debug.prototype.shootBallInSlingshot = function(ball) {
      this.ball.reset(280, 690);
      return this.shootBall(ball, -45, 40);
    };

    return Debug;

  })();

}).call(this);
(function() {
  Pinball.LightPattern = (function() {
    function LightPattern(pattern) {
      if (pattern == null) {
        pattern = '~';
      }
      pattern = pattern.split("#");
      this.delay = parseInt(pattern[1]) || 250;
      this.baseOffset = parseInt(pattern[2]) || 50;
      this.pattern = pattern[0].split("");
      this.length = this.pattern.length;
    }

    LightPattern.prototype.getDelay = function() {
      return this.delay;
    };

    LightPattern.prototype.getOffset = function(index) {
      var flag;
      flag = this.getFlag(index);
      return flag * this.baseOffset;
    };

    LightPattern.prototype.getFlag = function(index) {
      var flag;
      flag = this.pattern[index % this.length];
      if (flag === '~') {
        return index;
      }
      return flag = parseInt(flag, 16);
    };

    return LightPattern;

  })();

}).call(this);
(function() {
  Pinball.PhysicsUtils = (function() {
    function PhysicsUtils() {}

    PhysicsUtils.debugBody = function(game, body) {
      var debugBody;
      return debugBody = new Phaser.Physics.P2.BodyDebug(game, body);
    };

    PhysicsUtils.addFixtureToBody = function(game, body, fixtureData) {
      var cm, generatedShapes, i, j, offset, polygons, s, shape, shapes, v, vertices, world, _i, _len;
      world = game.physics.p2;
      generatedShapes = [];
      if (fixtureData.circle) {
        shape = new p2.Circle(world.pxm(fixtureData.circle.radius));
        shape.collisionGroup = fixtureData.filter.categoryBits;
        shape.collisionMask = fixtureData.filter.maskBits;
        shape.sensor = fixtureData.isSensor;
        offset = p2.vec2.create();
        offset[0] = world.pxmi(fixtureData.circle.position[0]);
        offset[1] = world.pxmi(fixtureData.circle.position[1]);
        body.addShape(shape, offset);
        generatedShapes.push(shape);
      } else {
        polygons = fixtureData.polygons;
        cm = p2.vec2.create();
        i = 0;
        for (_i = 0, _len = polygons.length; _i < _len; _i++) {
          shapes = polygons[_i];
          vertices = [];
          s = 0;
          while (s < shapes.length) {
            vertices.push([world.pxmi(shapes[s]), world.pxmi(shapes[s + 1])]);
            s += 2;
          }
          shape = new p2.Convex(vertices);
          j = 0;
          while (j !== shape.vertices.length) {
            v = shape.vertices[j];
            p2.vec2.sub(v, v, shape.centerOfMass);
            j++;
          }
          p2.vec2.scale(cm, shape.centerOfMass, 1);
          shape.updateTriangles();
          shape.updateCenterOfMass();
          shape.updateBoundingRadius();
          shape.collisionGroup = fixtureData.filter.categoryBits;
          shape.collisionMask = fixtureData.filter.maskBits;
          shape.sensor = fixtureData.isSensor;
          body.addShape(shape, cm);
          generatedShapes.push(shape);
        }
      }
      return generatedShapes;
    };

    return PhysicsUtils;

  })();

}).call(this);
(function() {
  Pinball.Utils = (function() {
    function Utils() {}

    Utils.getParameterByName = function(name) {
      var regex, results;
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      results = regex.exec(location.search);
      if (results === null) {
        return void 0;
      } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    };

    return Utils;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Pinball.Utils.ZoomZoomCamera = (function() {
    function ZoomZoomCamera(game, ball) {
      this.updateCamera = __bind(this.updateCamera, this);
      this.zoomInOut = __bind(this.zoomInOut, this);
      this.game = game;
      this.ball = ball;
      this._zoomFactor = 1;
      this.key_z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
      this.key_z.onDown.add(this.zoomInOut, this);
      this.zoomTween = new TweenMax(this, .35, {
        zoomFactor: 1.8,
        ease: Sine.easeInOut,
        repeat: 3,
        yoyo: true,
        delay: 1
      });
      this.zoomTween.pause();
    }

    ZoomZoomCamera.prototype.zoomInOut = function() {
      console.log('@zoomTween', this.zoomTween);
      return this.zoomTween.restart();
    };

    ZoomZoomCamera.prototype.updateCamera = function() {
      var dx, dy, scale, tx, ty;
      scale = this._zoomFactor;
      this.game.camera.bounds.width = this.game.width * scale;
      this.game.camera.bounds.height = this.game.height * scale;
      tx = this.ball.worldTransform.tx;
      ty = this.ball.worldTransform.ty;
      dx = tx * (scale - 1);
      dy = ty * (scale - 1);
      this.game.camera.setPosition(dx, dy);
      this.game.camera.scale.set(scale);
      return this.s = this.s + 1;
    };

    Object.defineProperties(ZoomZoomCamera.prototype, {
      zoomFactor: {
        get: function() {
          return this._zoomFactor;
        },
        set: function(value) {
          this._zoomFactor = value;
          return this.updateCamera();
        }
      }
    });

    return ZoomZoomCamera;

  })();

}).call(this);
(function() {
  Pinball.Logic.ActionFactory = (function() {
    function ActionFactory(game, machine) {
      this.game = game;
      this.machine = machine;
      this.playfield = this.machine.playfield;
      this.gameplay = this.machine.gameplay;
      this.gameModel = this.machine.gameModel;
      this.actions = [];
    }

    ActionFactory.prototype.getActions = function(name) {
      return _(this.actions).where({
        target: name
      });
    };

    ActionFactory.prototype.create = function(options) {
      switch (options.action) {
        case 'sound':
          return this.createSound(options);
        case 'score':
          return this.createScore(options);
        case 'teleport':
          return this.createTeleport(options);
        case 'lighten':
          return this.createLighten(options);
        case 'targetLighten':
          return this.createTargetLighten(options);
        case 'endball':
          return this.createEndBall(options);
        case 'statechange':
          return this.createStateChange(options);
        case 'startmission':
          return this.createStartMission(options);
        case 'display':
          return this.createDisplay(options);
      }
    };

    ActionFactory.prototype.createTargetLighten = function(options) {
      var action;
      action = new Pinball.Logic.TargetLightAction(this.game, this.gameModel, this.playfield, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createLighten = function(options) {
      var action;
      action = new Pinball.Logic.LightenAction(this.game, this.gameModel, this.playfield, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createEndBall = function(options) {
      var action;
      action = new Pinball.Logic.EndBallAction(this.game, this.gameplay, this.playfield, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createSound = function(options) {
      var action;
      action = new Pinball.Logic.SoundAction(this.game, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createScore = function(options) {
      var action;
      action = new Pinball.Logic.ScoreAction(this.game, this.gameModel, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createTeleport = function(options) {
      var action;
      action = new Pinball.Logic.TeleportAction(this.game, this.gameModel, this.playfield, this.machine, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createStateChange = function(options) {
      var action;
      action = new Pinball.Logic.StateChangeAction(this.game, this.machine, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createStartMission = function(options) {
      var action;
      action = new Pinball.Logic.StartMissionAction(this.game, this.machine, options);
      this.actions.push(action);
      return action;
    };

    ActionFactory.prototype.createDisplay = function(options) {
      var action;
      action = new Pinball.Logic.DisplayAction(this.game, this.machine, options);
      this.actions.push(action);
      return action;
    };

    return ActionFactory;

  })();

}).call(this);
(function() {
  Pinball.Factories.ComponentFactory = (function() {
    function ComponentFactory(game, materials) {
      this.game = game;
      this.init();
    }

    ComponentFactory.prototype.init = function() {
      this.objects = {};
      return this.materials = new Pinball.Core.Materials(this.game);
    };

    ComponentFactory.prototype.create = function(object) {
      switch (object.type) {
        case 'light':
          return this.createLight(object);
        case 'bumper':
          return this.createBumper(object);
        case 'rollover':
          return this.createRollover(object);
        case 'target':
          return this.createTarget(object);
        case 'hole':
          return this.createHole(object);
        case 'fliptarget':
          return this.createFlipTarget(object);
        case 'lightgroup':
          return this.createLightGroup(object);
        case 'slingshot':
          return this.createSlingshot(object);
        case 'trigger':
          return this.createTrigger(object);
      }
    };

    ComponentFactory.prototype.get = function(id) {
      return this.objects[id];
    };

    ComponentFactory.prototype.registerObject = function(object) {
      var id;
      id = object.getID();
      this.objects[id] = object;
      return object;
    };

    ComponentFactory.prototype.createBall = function() {
      var ball;
      ball = new Pinball.Entities.Ball(this.game, {
        material: this.materials.ballMaterial
      });
      return this.registerObject(ball);
    };

    ComponentFactory.prototype.createTrigger = function(object) {
      var trigger;
      trigger = new Pinball.Base.Trigger(this.game, object);
      return this.registerObject(trigger);
    };

    ComponentFactory.prototype.createBumper = function(object) {
      var bumper;
      bumper = new Pinball.Base.Bumper(this.game, object, this.materials.bumperMaterial);
      return this.registerObject(bumper);
    };

    ComponentFactory.prototype.createLight = function(object) {
      var light;
      light = new Pinball.Base.Light(this.game, object);
      return this.registerObject(light);
    };

    ComponentFactory.prototype.createRollover = function(object) {
      var rollover;
      rollover = new Pinball.Base.Rollover(this.game, object);
      return this.registerObject(rollover);
    };

    ComponentFactory.prototype.createTarget = function(object) {
      var target;
      target = new Pinball.Base.Target(this.game, object);
      return this.registerObject(target);
    };

    ComponentFactory.prototype.createHole = function(object) {
      var hole;
      hole = new Pinball.Base.Hole(this.game, object);
      return this.registerObject(hole);
    };

    ComponentFactory.prototype.createFlipTarget = function(object) {
      var fliptarget;
      fliptarget = new Pinball.Base.FlipTarget(this.game, object);
      return this.registerObject(fliptarget);
    };

    ComponentFactory.prototype.createLightGroup = function(options) {
      var light, lightGroup, _i, _len, _ref;
      lightGroup = new Pinball.Base.LightGroup(this.game, options);
      _ref = options.lights;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        light = _ref[_i];
        lightGroup.addLight(this.get(light));
      }
      return this.registerObject(lightGroup);
    };

    ComponentFactory.prototype.createSlingshot = function(options) {
      var slingshot;
      slingshot = new Pinball.Base.Slingshot(this.game, options, this.materials.slingshotMaterial);
      return this.registerObject(slingshot);
    };

    return ComponentFactory;

  })();

}).call(this);
(function() {
  Pinball.Logic.StateTransitions = (function() {
    function StateTransitions(game, playfield, gameModel, gameplay) {
      this.game = game;
      this.playfield = playfield;
      this.gameplay = gameplay;
      this.gameModel = gameModel;
      this.states = [];
    }

    StateTransitions.prototype.createState = function(options) {
      var action;
      action = new Pinball.Logic.State(options);
      this.states.push(action);
      return action;
    };

    StateTransitions.prototype.trigger = function(event) {
      var state, states, _i, _len, _results;
      states = _(this.states).where({
        event: event
      });
      _results = [];
      for (_i = 0, _len = states.length; _i < _len; _i++) {
        state = states[_i];
        _results.push(state.transition(this.playfield));
      }
      return _results;
    };

    StateTransitions.prototype.parse = function(list) {
      var stateData, _i, _len, _results;
      list = _(list).map((function(_this) {
        return function(stateData) {
          return _this.expandProperty('event', stateData);
        };
      })(this));
      list = _.flatten(list);
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        stateData = list[_i];
        _results.push(this.createState(stateData));
      }
      return _results;
    };

    StateTransitions.prototype.expandProperty = function(property, item) {
      var items;
      if (item[property] instanceof Array) {
        items = _(item[property]).map(function(propertyValue) {
          var o;
          o = {};
          o[property] = propertyValue;
          return _.extend(o, _(item).omit(property));
        });
      }
      return items || item;
    };

    return StateTransitions;

  })();

}).call(this);
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pinball.PinballMachine = (function(_super) {
    __extends(PinballMachine, _super);

    function PinballMachine(game) {
      this.handleScoreChanged = __bind(this.handleScoreChanged, this);
      this.ballOut = __bind(this.ballOut, this);
      this.handleMouseClick = __bind(this.handleMouseClick, this);
      this.handleChangeTheme = __bind(this.handleChangeTheme, this);
      PinballMachine.__super__.constructor.call(this, game);
      this.init();
    }

    PinballMachine.prototype.handleChangeTheme = function(theme) {
      return this.themeManager.load(theme);
    };

    PinballMachine.prototype.init = function() {
      this.themeManager = new Pinball.ThemeLoader(this.game, this);
      this.game.externalInterface.on('change.theme', this.handleChangeTheme);
      this.gameModel = new Pinball.Models.Game();
      this.gameModel.on('change:score', this.handleScoreChanged);
      this.gameModel.on('newball', this.handleNewBall);
      this.gameModel.on('endball', this.handleEndBall);
      this.playfield = new Pinball.Playfield(this.game);
      this.playfield.createPlayfield(Pinball.DATA);
      this.add(this.playfield);
      this.gameplay = new Pinball.Gameplay(this.game, this);
      this.gameplay.create();
      this.initControllers();
      this.game.input.onTap.add(this.handleMouseClick);
      return this.game.time.events.add(250, (function(_this) {
        return function() {
          return _this.gameplay.startGame();
        };
      })(this));
    };

    PinballMachine.prototype.initControllers = function() {
      this.zoomZoom = new Pinball.Utils.ZoomZoomCamera(this.game, this.playfield.get('ball'));
      this.ballCollisions = new Pinball.Core.EntityContactListener(this.game, this.playfield.get('ball').collidable);
      this.rampController = new Pinball.Controller.RampController(this.game, this.ballCollisions, this.playfield);
      this.tableZonesController = new Pinball.Controller.TableZonesController(this.game, this.ballCollisions, this.playfield);
      this.entityHitController = new Pinball.Controller.EntityHitController(this.ballCollisions, this.gameplay);
      this.entityHitController.register(this.playfield.getAll());
      return this.displayController = new Pinball.Controller.DisplayController(this.game, this.playfield.get('display'), {
        model: this.gameModel
      });
    };

    PinballMachine.prototype.handleMouseClick = function(e, double) {
      if (double) {
        if (this.game.input.x < 50 && this.game.input.y > 500) {
          return Pinball.Store.DEBUG.shootBallIntoRamp(this.playfield.get('ball'));
        } else {
          return Pinball.Store.DEBUG.placeBallAtMouse(this.playfield.get('ball'));
        }
      }
    };

    PinballMachine.prototype.ballOut = function() {};

    PinballMachine.prototype.handleScoreChanged = function() {
      return this.game.externalInterface.trigger('score.changed', this.gameModel.get('score'));
    };

    return PinballMachine;

  })(Phaser.Group);

}).call(this);
(function() {
  Pinball.Game = (function() {
    _(Game.prototype).extend(Backbone.Events);

    function Game(el) {
      this.el = el;
      this.init();
    }

    Game.prototype.init = function() {
      Pinball.Store.DEBUG_PHYSICS = false;
      this.game = new Phaser.Game(640, 970, Phaser.AUTO, this.el);
      this.game.state.add('boot', Pinball.Screens.Boot);
      this.game.state.add('prepreloader', Pinball.Screens.PrePreloader);
      this.game.state.add('preloader', Pinball.Screens.Preloader);
      this.game.state.add('game', Pinball.Screens.Game);
      return this.game.externalInterface = this;
    };

    Game.prototype.start = function() {
      return this.game.state.start('boot');
    };

    Game.prototype.togglePause = function() {
      return this.game.paused = !this.game.paused;
    };

    Game.prototype.toggleSound = function() {
      return this.game.sound.mute = !this.game.sound.mute;
    };

    return Game;

  })();

}).call(this);
(function() {


}).call(this);
