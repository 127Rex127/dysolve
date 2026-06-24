export * from './types'
export { iqTest } from './iq'
export { eqTest } from './eq'
export { mathTest } from './math'
export { englishTest } from './english'
export { logicTest } from './logic'
export { mbtiTest, MBTI_DESCRIPTIONS } from './mbti'
export { bigFiveTest, BIG_FIVE_TRAIT_INFO } from './bigFive'
export { phq9Test } from './phq9'
export { gad7Test } from './gad7'
export { sbtiTest, SBTI_TYPE_INFO } from './sbti'
export { wechslerTest } from './wechsler'
export { ravensTest } from './ravens'
export { stanfordBinetTest } from './stanfordBinet'
export { mocaTest } from './moca'
export { trailMakingTest } from './trailMaking'
export { stroopTest } from './stroop'
export { iatTest } from './iat'
export { discTest } from './disc'
export { enneagramTest } from './enneagram'
export { hollandCodeTest } from './hollandCode'
export { attachmentStyleTest } from './attachmentStyle'
export { varkTest } from './vark'
export { sixteenPFTest } from './sixteenPF'
export { mmpiTest } from './mmpi'
export { empathyEQiTest } from './empathyEQi'
export { adhdAsrsTest } from './adhdAsrs'
export { pcl5Test } from './pcl5'
export { beckDepressionTest } from './beckDepression'

import type { TestDefinition } from './types'
import { iqTest } from './iq'
import { eqTest } from './eq'
import { mathTest } from './math'
import { englishTest } from './english'
import { logicTest } from './logic'
import { mbtiTest } from './mbti'
import { bigFiveTest } from './bigFive'
import { phq9Test } from './phq9'
import { gad7Test } from './gad7'
import { sbtiTest } from './sbti'
import { wechslerTest } from './wechsler'
import { ravensTest } from './ravens'
import { stanfordBinetTest } from './stanfordBinet'
import { mocaTest } from './moca'
import { trailMakingTest } from './trailMaking'
import { stroopTest } from './stroop'
import { iatTest } from './iat'
import { discTest } from './disc'
import { enneagramTest } from './enneagram'
import { hollandCodeTest } from './hollandCode'
import { attachmentStyleTest } from './attachmentStyle'
import { varkTest } from './vark'
import { sixteenPFTest } from './sixteenPF'
import { mmpiTest } from './mmpi'
import { empathyEQiTest } from './empathyEQi'
import { adhdAsrsTest } from './adhdAsrs'
import { pcl5Test } from './pcl5'
import { beckDepressionTest } from './beckDepression'

export const ALL_TESTS: TestDefinition[] = [
  // Cognitive
  iqTest,
  logicTest,
  wechslerTest,
  ravensTest,
  stanfordBinetTest,
  mocaTest,
  trailMakingTest,
  stroopTest,
  iatTest,
  // Personality
  mbtiTest,
  bigFiveTest,
  sixteenPFTest,
  enneagramTest,
  mmpiTest,
  // Emotional
  eqTest,
  empathyEQiTest,
  attachmentStyleTest,
  // Behavioral
  sbtiTest,
  discTest,
  hollandCodeTest,
  varkTest,
  adhdAsrsTest,
  // Academic
  mathTest,
  englishTest,
  // Mental Health
  phq9Test,
  gad7Test,
  beckDepressionTest,
  pcl5Test,
]

export const COMING_SOON_TESTS: Array<{ id: string; name: string; tagline: string; icon: string; category: string }> = []
