import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Jollof Rice',
    description: 'Most delicious Nigerian party jollof rice',
    price: 2000,
  },
  {
    id: 'm2',
    name: 'Ewa Agoyin',
    description: 'A Lagos specialty!',
    price: 1000,
  },
  {
    id: 'm3',
    name: 'Tomato Stew',
    description: 'A must have banger that goes with anything carbs',
    price: 1200,
  },
  {
    id: 'm4',
    name: 'Pepper Soup',
    description: 'Garnished with fresh fish, it\'s a nutritous way to relax',
    price: 2000,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => <MealItem 
  id={meal.id}
  key={meal.id}
  name={meal.name}
  description={meal.description}
  price={meal.price}/>);

  return (
    <section className={classes.meals}>
        <Card>
         <ul>{mealsList}</ul>
        </Card>
    </section>
  );
};

export default AvailableMeals;