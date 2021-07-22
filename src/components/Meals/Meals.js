import { Fragment } from 'react';

import MealsSummary from './MealsWriteup';
import AvailableMeals from './AvailableMeals';

const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;