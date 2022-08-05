import $ from './style.module.scss';

type Props = {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function PageHeader({ title, left, right }: Props) {
  return (
    <header className={$['page-header']}>
      <div role="button">{left}</div>
      <h1 className={$.title}>{title}</h1>
      <div role="button" className={$.right}>
        {right}
      </div>
    </header>
  );
}
