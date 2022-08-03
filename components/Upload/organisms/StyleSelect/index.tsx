import { styleSelectBox } from '#types/info';
import TextInput from '@atoms/TextInput';
import InfoArticle from '@molecules/InfoArticle';
import InfoBtnBox from '@organisms/InfoBtnBox';

import $ from './style.module.scss';

type Props = {
  data: styleSelectBox[];
};

function StyleSelect(styleProps: Props) {
  const { data } = styleProps;
  return (
    <InfoArticle label="스타일 정보" required>
      {data.map((options) => {
        return (
          <InfoBtnBox
            {...options}
            key={options.label}
            compareData={[]}
            // handleFunc={filterUpdate}
          />
        );
      })}
      <InfoArticle label="소재" childrenBox>
        <TextInput
          className={$.material}
          controlled={false}
          placeholder="코튼 등"
          handleChange={() => console.log('clicked')}
        />
      </InfoArticle>
    </InfoArticle>
  );
}

export default StyleSelect;
