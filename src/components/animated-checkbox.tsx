import React, {useEffect, memo} from 'react';
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming, interpolateColor} from 'react-native-reanimated';
import Svg, {Path, Defs, ClipPath, G} from 'react-native-svg';
import AnimatedStroke from './animated-stroke';

const MARGIN = 10;
const vWidth = 64 + MARGIN;
const vHeight = 64 + MARGIN;
const outlineBoxPath = "M 48 63.5 L 16 63.5 C 15.96487045288086 63.49967956542969 12.04551029205322 63.44352722167969 8.194589614868164 61.49388885498047 C 5.95782995223999 60.36145782470703 4.177969932556152 58.81771087646484 2.904439926147461 56.905517578125 C 1.308969974517822 54.50991821289062 0.5 51.51366806030273 0.5 48 L 0.5 15.99999904632568 C 0.5000600218772888 15.9613094329834 0.528439998626709 12.04286861419678 2.463890075683594 8.193099021911621 C 3.58801007270813 5.957129001617432 5.129650115966797 4.177848815917969 7.04596996307373 2.904659032821655 C 9.447609901428223 1.309049010276794 12.46018028259277 0.4999989867210388 16 0.4999989867210388 L 48 0.4999989867210388 L 48.01026153564453 0.4999689757823944 C 48.17554092407227 0.4999689757823944 52.10235977172852 0.5225789546966553 55.94820022583008 2.488668918609619 C 58.14802169799805 3.613269090652466 59.89707183837891 5.155319213867188 61.14677047729492 7.071999073028564 C 62.70825958251953 9.466889381408691 63.5 12.47069931030273 63.5 15.99999904632568 L 63.5 48 C 63.49969100952148 48.03524780273438 63.44451141357422 51.9545783996582 61.495361328125 55.80546951293945 C 60.36322021484375 58.04219818115234 58.81954956054688 59.82204055786133 56.90721130371094 61.09555053710938 C 54.51139831542969 62.6910285949707 51.51457977294922 63.5 48 63.5 Z";

const checkMarkPath = "M9,22.109s18.136,8.363,18.136,29.478C27.136,37.594,35.582,18.633,69.4,0";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  checked?: boolean
  highlightColor: string
  checkmarkColor: string
  outlineboxColor: string
}
const AnimatedCheckbox = (props: Props) => {
  const {checked, checkmarkColor, highlightColor,outlineboxColor} = props;

  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear,
    })
  }, [checked]);

  const animatedBoxProps = useAnimatedProps(() => ({
    stroke: interpolateColor(
      (Easing.bezier(0.16, 1, 0.3, 1).factory)()(progress.value),
      [0,1],
      [outlineboxColor, highlightColor],
      'RGB'
    ),
    fill: interpolateColor(
      (Easing.bezier(0.16, 1, 0.3, 1).factory)()(progress.value),
      [0,1],
      ['rgba(0,0,0,0)', highlightColor],
      'RGB'
    )
  }),
    [highlightColor, outlineboxColor]
  )

  return (
    <Svg viewBox={[-MARGIN, -MARGIN,  vWidth + MARGIN, vHeight + MARGIN].join(' ')}>
      <Defs>
        <ClipPath id="clipPath">
          <Path
            fill="white"
            stroke="gray"
            strokeLinejoin="round"
            strokeLinecap="round"
            d={outlineBoxPath}
          />
        </ClipPath>
      </Defs>
      <AnimatedStroke 
        progress={progress} 
        d={checkMarkPath} 
        stroke={highlightColor} 
        strokeWidth={10} 
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeOpacity={checked || false ? 1 : 0}
      />
      <AnimatedPath 
        d={outlineBoxPath} 
        strokeWidth={7} 
        strokeLinejoin="round" 
        strokeLinecap="round" 
        animatedProps={animatedBoxProps} 
      />
      <G clipPath="url(#clipPath)">
        <AnimatedStroke 
          progress={progress} 
          d={checkMarkPath} 
          stroke={checkmarkColor} 
          strokeWidth={10} 
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeOpacity={checked || false ? 1 : 0}
        />
      </G>
    </Svg>
  )
}

export default AnimatedCheckbox;