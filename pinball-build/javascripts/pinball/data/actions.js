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
