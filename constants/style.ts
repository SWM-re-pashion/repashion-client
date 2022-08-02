const styles = [
  { name: '전체', code: 'all' },
  { name: '힙합', code: 'hiphop' },
  { name: '펑크', code: 'punk' },
  { name: '모던', code: 'modern' },
  { name: '스트리트', code: 'street' },
  { name: '키치/키덜트', code: 'kitsch' },
  { name: '스포티', code: 'sporty' },
  { name: '클래식', code: 'classic' },
  { name: '레트로', code: 'retro' },
  { name: '아방가르드', code: 'avantgarde' },
  { name: '섹시', code: 'sexy' },
  { name: '톰보이', code: 'tomboy' },
  { name: '프레피', code: 'preppy' },
];

const fits = {
  top: [
    { name: '전체', code: 'all' },
    { name: '타이트', code: 'tight' },
    { name: '노멀', code: 'normal' },
    { name: '루즈', code: 'lose' },
    { name: '오버사이즈', code: 'oversize' },
  ],
  bottom: [
    { name: '전체', code: 'all' },
    { name: '스키니', code: 'skinny' },
    { name: '노멀', code: 'normal' },
    { name: '와이드', code: 'wide' },
    { name: '루즈', code: 'lose' },
  ],
};

const lengths = {
  top: [
    { name: '전체', code: 'all' },
    { name: '크롭', code: 'crop' },
    { name: '허리', code: 'waist' },
    { name: '골반', code: 'pelvis' },
    { name: '엉덩이', code: 'hip' },
    { name: '허벅지', code: 'thigh' },
    { name: '정강이', code: 'shin' },
    { name: '발목', code: 'ankle' },
  ],
  bottom: [
    { name: '전체', code: 'all' },
    { name: '미니', code: 'mini' },
    { name: '허벅지', code: 'thigh' },
    { name: '무릎', code: 'knee' },
    { name: '정강이', code: 'shin' },
    { name: '발목', code: 'ankle' },
    { name: '발', code: 'foot' },
  ],
};

export { styles, fits, lengths };
