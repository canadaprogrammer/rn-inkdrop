import React, {useEffect, memo} from 'react';
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming, interpolateColor} from 'react-native-reanimated';
import Svg, {Path, Defs, ClipPath, G} from 'react-native-svg';
import AnimatedStroke from './animated-stroke';

const MARGIN = 10;
const vWidth = 64 + MARGIN;
const vHeight = 64 + MARGIN;
const outlineBoxPath = "M 16 1.000003814697266 C 11.50931167602539 1.000003814697266 7.934459686279297 2.303993225097656 5.374759674072266 4.875751495361328 C 3.114681243896484 7.146492004394531 2.046501159667969 10.02813339233398 1.548389434814453 12.04567337036133 C 0.9983787536621094 14.27346420288086 0.9999008178710938 15.97699356079102 0.999969482421875 15.99260330200195 L 1 16.00000381469727 L 1 48 C 1 51.43319320678711 1.777229309082031 54.34819412231445 3.310100555419922 56.66401290893555 C 4.529571533203125 58.50635147094727 6.237819671630859 59.99112319946289 8.387401580810547 61.07707214355469 C 12.13222122192383 62.96893310546875 15.96281051635742 62.99991226196289 16 63.00000381469727 L 48 63.00000381469727 C 51.4055290222168 63.00000381469727 54.30319976806641 62.22293090820312 56.61251831054688 60.69038391113281 C 58.45114898681641 59.47019195556641 59.93848037719727 57.7607421875 61.03319931030273 55.60949325561523 C 62.92019653320312 51.90135192871094 62.99821472167969 48.10969543457031 62.99999618530273 47.99512481689453 C 62.99979400634766 47.62334823608398 62.99134826660156 31.70576858520508 63 15.99945449829102 C 63.00189208984375 12.56830215454102 62.22587966918945 9.654644012451172 60.69353866577148 7.339412689208984 C 59.47441101074219 5.497402191162109 57.7659912109375 4.01251220703125 55.61573028564453 2.925971984863281 C 51.86962890625 1.033054351806641 48.03670120239258 1.000114440917969 48 1.000003814697266 L 16 1.000003814697266 M 16 0 C 32.1184196472168 0 48 0 48 0 C 48 0 64.00879669189453 0.00417327880859375 64 16.00000381469727 C 63.99119186401367 31.99583435058594 64 48 64 48 C 64 48 63.88360214233398 64 48 64 C 32.11640167236328 64 16 64 16 64 C 16 64 0 64.00416564941406 0 48 C 0 31.99583435058594 0 16.00000381469727 0 16.00000381469727 C 0 16.00000381469727 -0.1184310913085938 0 16 0 Z";
const checkMarkPath = "M8,24S24.1,38.26,24,48c1.166-3.271,3.654-11.965,8.721-21.113C38.655,16.169,48.431,4.892,64,3.065";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface Props {
  checked?: boolean
}
const AnimatedCheckbox = (props: Props) => {
  const {checked} = props;
  const checkmarkColor = "#000000";
  const highlightColor = "#ff0000";
  const outlineboxColor = "#000000";

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
      ['#000000', highlightColor],
      'RGB'
    )
  }),
    [highlightColor, outlineboxColor]
  )

  return (
    <Svg viewBox={[-MARGIN, -MARGIN,  vWidth + MARGIN, vHeight + MARGIN].join(' ')}>
      <AnimatedPath 
        d={outlineBoxPath} 
        strokeWidth={7} 
        strokeLinejoin="round" 
        strokeLinecap="round" 
        animatedProps={animatedBoxProps} 
      />
      <AnimatedStroke 
        progress={progress} 
        d={checkMarkPath} 
        stroke={checkmarkColor} 
        strokeWidth={10} 
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeOpacity={checked || false ? 1 : 0}
      />
    </Svg>
  )
}

export default AnimatedCheckbox;