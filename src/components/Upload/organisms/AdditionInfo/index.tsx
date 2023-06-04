import { AdditionalInfo, UploadState } from '#types/storeType/upload';
import { UploadUpdateProps } from '#types/upload';
import TextArea from '@atoms/TextArea';
import InfoArticle from '@molecules/InfoArticle';
import TextInput from '@molecules/TextInput';
import useDebounceInput from 'src/hooks/useDebounceInput';
import { useUploadUpdateStore } from 'src/hooks/useUploadUpdateStore';

import $ from './style.module.scss';

type Props = {
  data: {
    placeholder: string;
    label: string;
    type: keyof UploadState;
    subType: keyof AdditionalInfo;
  }[];
} & UploadUpdateProps;

function AdditionInfo({ isUpdate, data }: Props) {
  const useStore = useUploadUpdateStore(isUpdate);
  const opinion = useStore((states) => states.opinion);
  const additionalInfo = useStore((states) => states.additionalInfo);
  const onChange = useStore((states) => states.updateUpload);
  const handleInput = useDebounceInput(onChange, 200);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    subType?: keyof AdditionalInfo,
  ) => handleInput(e.target.value, 'additionalInfo', subType);

  const handleOpinionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => handleInput(e.target.value, 'opinion');

  return (
    <>
      <InfoArticle label="구매시기와 구매처">
        {data.map(({ label, placeholder, subType }) => {
          return (
            <TextInput
              key={label}
              className={$.addition}
              controlled={false}
              value={additionalInfo[subType]}
              {...{ label, placeholder, subType }}
              onChange={handleChange}
            />
          );
        })}
      </InfoArticle>
      <InfoArticle label="판매자의 한마디">
        <TextArea
          className={$.textarea}
          color="#e3e1e1"
          placeholder="판매자님의 설명은 구매에 도움이 됩니다.(최대 300자)"
          value={opinion}
          onChange={handleOpinionChange}
        />
      </InfoArticle>
    </>
  );
}

export default AdditionInfo;
