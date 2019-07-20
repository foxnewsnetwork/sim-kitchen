# SimKitchen

Software engineer application interview problem from City Storage Systems.

## Product Solution Design Overview

The [product specs](./Software_Engineering_Challenge.pdf) demand a simulation software attempts to emulate the kitchen of a resturaunt that

- takes orders from the outside
- transforms orders to deliverable dishes
- stores deliverable dishes until they can be delivered

## Real World Model Overview

We are asked by the spec docs to build a simulation of a feasibly real-world restauraunt ordering / delivery system. This breaks down into two parts:

- Listing requirements
- Organizing APIs (business model)

### Software Requirements
  
As per many software design principles (like this [one](https://www.intertech.com/Blog/principles-of-good-software-design/)), we'll need to list out requirements for our software before we can go into modeling and designing

SCENARIO: I am a reality-bond business intelligence analyst
FEATURE: I would like an intuitive visualization of the order -> kitchen -> delivery process holistically in time
FEATURE: I would like to be able to run interventions in the model in places where our company can sensibly intervene in real life for the purposes of testing features prior to real world implementation

### Business Model

The business model should closely mirror the real world, this means:

- employs the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) (that is, someone in the business should find this intuitive)
- interfaces (aka classes for java people) [should be deep](https://web.stanford.edu/~ouster/cgi-bin/cs190-winter18/lecture.php?topic=modularDesign) (that is, few points of contact, but does a lot)
- normalize for [data-oriented design](http://www.dataorienteddesign.com/dodbook/)

```typescript
interface Kitchen {
  cookFoodFromOrder(order: OrderItem): Promise<FoodPlate>
}

interface ServiceCounter {
  assembleDishFromFood(plate: FoodPlate): DeliverableDish
}

interface DeliverableDish {
  quality(time: Time): number
}

interface Delivery {
  scheduleDelivery(dish: DeliverableDish, deliveryBoy: Summonable): Delivery
}

interface Summonable {
  summon(worker: Employee): Promise<Summonable>
}

/**
 * types for Employee, DeliveryReceipt, OrderItem, FoodPlate, Time
 * are omitted here (we say "ryaku" at my current firm)
 */
```

>Sidebar: What is the design process behind the above business models?

- Reference research (see the reference section on restaurants in the appendix)
- Asking myself "Is this the simplest API I can do?"
- and, as per John Ousterhaut, trying to solve the "slightly more general problem"

## Simulation Software Model

Now that we have the "cross-functional" world of the business model down, we can move onto putting together the purely software side of putting together the simulation software. 

> Philiosphical note: The distinction between putting together 
> - the structure of a real-world restaurant delivery system 
> - the structure for a software simulation
> 
>is that one uses the language of the restaurant business while the other uses the language of computer software

The tools and frameworks we will use are as follows:

- react (via create-react-app)
  - industry standard
  - engineering familiarity
- graphql (via apollo-link)
  - community best practice for server-side communication


# Appendix

## Plan of Attack

As is usual for attempting to solve a problem of systems design and software modeling, I will follow the below process:

- Research the business domain
  - Objective: have a basic understanding of the terminology and systems that encompass the business (aka build context)
  - Objective: list down common problems faced in the business
  - Objective: list down existing solutions
- Diagram the software design
  - Objective: Breakdown the business domain into software layers
  - Objective: Attempt to uncover best APIs at each layer
- Implement initial POC

For the purposes of this assignment, we'll skip the additional steps of QA, product buy-in, etc.,

## Notes on Restauraunts

- margins can be thin
- starting out is expensive
- location is critical
- lots of administrative & management work
- chef + location + concept
- menu is most important asset
- small scandals can be deadly
- 60% of restaurants fail in 1st year (85% within first 5 years) 
- influencers help a lot
- watch your costs (e.g. avoid fancy food vendor)

## Q&A

Here, I pose and answer 

## References

### On Restaurants
- [15 things about running a restauraunt](https://www.youtube.com/watch?v=fG0SMjbwU9c)
- [start-ups changing food delivery business](https://www.youtube.com/watch?v=GISuXBG-GQQ)
- [how lemongen resturaunt app works](https://www.youtube.com/watch?v=q8mvILXJzyk)

## Original ReadMe

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
