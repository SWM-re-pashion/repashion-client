import $ from './style.module.scss';

type Props = {
  htmlFor: string;
  text: string;
};

function InputLabel(labelProps: Props) {
  const { htmlFor, text } = labelProps;

  return (
    <label htmlFor={htmlFor} className={$.label} aria-label={text}>
      {text}
    </label>
  );
}

export default InputLabel;
