import { Filter } from '@atoms/icon';

import $ from './style.module.scss';

function FilterSkeleton() {
  return (
    <div className={$['skeleton-filter']}>
      <Filter className={$.filter} />
    </div>
  );
}

export default FilterSkeleton;
