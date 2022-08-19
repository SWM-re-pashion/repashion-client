const styles = [
  { name: '전체', code: 'all' },
  { name: '트레디셔널', code: 'traditional' },
  { name: '매니시', code: 'manish' },
  { name: '페미닌', code: 'feminine' },
  { name: '에스닉', code: 'ethnic' },
  { name: '컨템포러리', code: 'contemporary' },
  { name: '내추럴', code: 'natural' },
  { name: '젠더리스', code: 'genderless' },
  { name: '서브컬쳐', code: 'subculture' },
  { name: '캐주얼', code: 'casual' },
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

const measures = [
  { name: '총장', code: 'length' },
  { name: '어깨너비', code: 'shoulderWidth' },
  { name: '가슴단면', code: 'chestSection' },
  { name: '소매길이', code: 'sleeveLength' },
  { name: '허리단면', code: 'waistSection' },
  { name: '허벅지단면', code: 'thighSection' },
  { name: '밑위', code: 'rise' },
  { name: '밑단단면', code: 'bottomSection' },
];

export { styles, fits, lengths, measures };
