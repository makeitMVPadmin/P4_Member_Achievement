import { database } from "../config/firebase.js";
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

for (let i = 1; i <= 3; i++) {
  const id = await addUser(i);

  const resourceId = await addResources(id, i);

  await addComments(id, resourceId);

  await addBookmarkedResources(id, resourceId);

  const rewardId = await addReward(id);

  await addRedemption(id, rewardId);

  await addPoint(id);
}

function getRandomDate(startYear, endYear) {
  const year =
    Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = Math.floor(Math.random() * 12);
  let day = Math.floor(Math.random() * 31) + 1;

  if (month === 1 && day > 28) {
    day = 28;
  } else if (
    (month === 3 || month === 5 || month === 8 || month === 10) &&
    day > 30
  ) {
    day = 30;
  }

  return new Date(year, month, day);
}

async function addUser() {
  const disiplines = [
    "data analytics",
    "database administration",
    "web design",
    "data engineering",
    "solution architect",
    "software development",
  ];

  const industries = [
    "technology",
    "manufacturing",
    "healthcare",
    "hospitality",
    "retail",
    "entertainment",
  ];

  const expertises = [
    "C#",
    "SQL",
    "python",
    "Scala",
    "JavaScript",
    "Rust",
    "Ruby",
    "Go",
    "TypeScript",
    "Matlab",
    "Kotlin",
    "Perl",
    "PHP",
    "java",
  ];

  const states = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
    { name: "California", abbreviation: "CA" },
    { name: "Colorado", abbreviation: "CO" },
    { name: "Connecticut", abbreviation: "CT" },
    { name: "Delaware", abbreviation: "DE" },
    { name: "Florida", abbreviation: "FL" },
    { name: "Georgia", abbreviation: "GA" },
    { name: "Hawaii", abbreviation: "HI" },
    { name: "Idaho", abbreviation: "ID" },
    { name: "Illinois", abbreviation: "IL" },
    { name: "Indiana", abbreviation: "IN" },
    { name: "Iowa", abbreviation: "IA" },
    { name: "Kansas", abbreviation: "KS" },
    { name: "Kentucky", abbreviation: "KY" },
    { name: "Louisiana", abbreviation: "LA" },
    { name: "Maine", abbreviation: "ME" },
    { name: "Maryland", abbreviation: "MD" },
    { name: "Massachusetts", abbreviation: "MA" },
    { name: "Michigan", abbreviation: "MI" },
    { name: "Minnesota", abbreviation: "MN" },
    { name: "Mississippi", abbreviation: "MS" },
    { name: "Missouri", abbreviation: "MO" },
    { name: "Montana", abbreviation: "MT" },
    { name: "Nebraska", abbreviation: "NE" },
    { name: "Nevada", abbreviation: "NV" },
    { name: "New Hampshire", abbreviation: "NH" },
    { name: "New Jersey", abbreviation: "NJ" },
    { name: "New Mexico", abbreviation: "NM" },
    { name: "New York", abbreviation: "NY" },
    { name: "North Carolina", abbreviation: "NC" },
    { name: "North Dakota", abbreviation: "ND" },
    { name: "Ohio", abbreviation: "OH" },
    { name: "Oklahoma", abbreviation: "OK" },
    { name: "Oregon", abbreviation: "OR" },
    { name: "Pennsylvania", abbreviation: "PA" },
    { name: "Rhode Island", abbreviation: "RI" },
    { name: "South Carolina", abbreviation: "SC" },
    { name: "South Dakota", abbreviation: "SD" },
    { name: "Tennessee", abbreviation: "TN" },
    { name: "Texas", abbreviation: "TX" },
    { name: "Utah", abbreviation: "UT" },
    { name: "Vermont", abbreviation: "VT" },
    { name: "Virginia", abbreviation: "VA" },
    { name: "Washington", abbreviation: "WA" },
    { name: "West Virginia", abbreviation: "WV" },
    { name: "Wisconsin", abbreviation: "WI" },
    { name: "Wyoming", abbreviation: "WY" },
  ];

  const state = states[Math.floor(Math.random() * states.length)];

  const firstNames = ["Virgilio", "Christian", "Taylor", "Jason", "Rachell"];
  const lastNames = ["Macero", "OCampo", "Allen", "Matos", "Borgonovo"];
  const interestss = [
    "Play the piano",
    "Playing Games",
    "Yoga",
    "Reading a Book",
    "Swiming",
  ];

  try {
    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];

    const docRef = await addDoc(collection(database, "Users"), {
      firstName: name,
      lastName: last,
      email: name + "." + last + "@email.com",
      interests: interestss[Math.floor(Math.random() * interestss.length)],
      bio: "I am a person who loves to be a person and being a person allows me to grow as a person",
      locationCountry: "USA",
      locationState: state.name,
      locationCity: "Respective City",
      experience: Math.floor(Math.random() * 10),
      gitHub: "https://github.com/" + name + "-" + last,
      linkedin: "https://linkedin.com/" + name + "-" + last,
      portfolioLink: "https://" + last + ".com/" + name + "-" + last,
      expertise: expertises[Math.floor(Math.random() * expertises.length)],
      discipline: disiplines[Math.floor(Math.random() * disiplines.length)],
      industry: industries[Math.floor(Math.random() * industries.length)],
      dob: Timestamp.fromDate(getRandomDate(1970, 2005)),
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      lastLogin: Timestamp.fromDate(getRandomDate(2023, 2024)),
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      interests: ["machine learning", "photography"],
      skills: ["Time Management", "Leadership", "Problem-solving"],
    });

    const id = docRef.id;

    await updateDoc(doc(database, "Users", id), {
      id: id,
    });

    console.log("The User ID is: " + docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error.message);
  }
}

async function addPoint(userId) {
  try {
    const docRef = await addDoc(collection(database, "Points"), {
      userID: userId,
      pointsBalance: Math.floor(Math.random() * 5),
    });

    const id = docRef.id;

    await updateDoc(doc(database, "Points", id), {
      pointsID: id,
    });

    console.log("Points for User ID " + userId + " created");
  } catch (error) {
    console.error(error);
  }
}

async function addResources(userId, resourceNumber) {
  const types = ["file", "Article", "Course"];
  const disciplines = ["Frontend Developer", "Designer", "Backend Developer"];
  const skillLevels = [
    "Beginner Level",
    "Intermediate Level",
    "Advanced Level",
  ];
  const firstNames = ["Virgilio", "Christian", "Taylor", "Jason", "Rachell"];
  const lastNames = ["Macero", "OCampo", "Allen", "Matos", "Borgonovo"];

  const resources = [
    {
      type: "Course",
      duration: "8 min",
      title: "Build a Machine Learning Model",
      level: "Intermediate Level",
      preview:
        "Learn to build machine learning models using regression, classification, and clustering.",
      discipline: "Software Engineering",
      description:
        "Learn to build machine learning models using regression, classification, and clustering. For many, Python isn’t a language of the past, but one of the present and future. Although Python was created in the 80s, it’s very prominent in web development and industries that depend on flexible, and simple programming languages. Python fits that bill better than many other languages. In fact, Python is such a simple language to learn and use that it’s often one of the first languages those new to programming work with. What makes Python so easy to use? First off, it’s an interpreted language, which means you don’t have to compile code in order to execute it: you simply write and run your code. Python also adheres to a philosophy that makes it possible to write very few lines of code to complete a task. And with so many available modules, classes, exceptions, data types, and libraries, there’s very little this language can’t do. Although Python’s specialty is web and web applications, it has a number of other tricks up its sleeve. One such trick is Machine Learning. For those that don’t know, Machine Learning is a subset of Artificial Intelligence where computer algorithms automatically improve through experience. In other words, making a computer perform some task without actually programming for said task. And considering Machine Learning has become widespread, with companies like Google, Amazon, LinkedIn, and Facebook depending on it, ML is making it possible for exponential leaps in modern technological advances. Let’s take a look at why you should consider Python for your machine learning needs. Is Python fast enough for machine learning? Although Python isn’t the fastest programming language available, it has already proved itself more than capable enough to handle the demands made by Machine Learning. To overcome what some might consider a downfall, Python has a number of tools available to compensate. For example, Pandas is a tool used in data science for cleaning, transforming, manipulating, and analyzing data. With such tools, you can ensure the data you use with Machine Learning is better optimized for usage. Which Python version is best for machine learning? At one point, the best version of Python to use for Machine Learning was 2.7. However, the 2.x iteration of Python has been sunsetted, which means you will have to use a version of Python 3.0 or newer. As of this writing, the most recent stable release of Python is 3.9.0. If you want to have the most recent features and security updates, your best bet is to use that or more recent versions (if available).",
      contributor: "Anna Lei",
      tag1: "Python",
      tag2: "Machine Learning",
      tag3: "Regression",
      tag4: "Big Data",
      url: "https://www.codecademy.com/learn/paths/machine-learning",
    },
    {
      type: "Article",
      duration: "5 min",
      title: "Create React App vs. Vite: A Comparative Overview",
      level: "Beginner Level",
      preview:
        "When embarking on a new React project, developers often face the decision of which tool to use for bootstrapping their application.",
      discipline: "Software Engineering",
      description:
        "When embarking on a new React project, developers often face the decision of which tool to use for bootstrapping their application. Two popular choices are Create React App (CRA) and Vite. Both have their own strengths and cater to different needs, making it crucial to understand their differences and use cases. Create React App (CRA) Overview: Create React App is a well-established tool created by Facebook to simplify the process of setting up a new React project. It provides a boilerplate with a predefined structure and configuration, allowing developers to start coding without worrying about the build setup. Vite Overview: Vite, developed by Evan You (creator of Vue.js), is a newer build tool that aims to provide a faster and leaner development experience. It leverages native ES modules and modern JavaScript capabilities to enhance performance. Choosing between Create React App and Vite depends largely on the specific needs of your project. If you prioritize ease of use and a well-established ecosystem, CRA is a reliable choice. However, if performance and modern build capabilities are critical for your project, Vite offers a compelling alternative with its speed and flexibility. As the landscape of web development tools continues to evolve, both tools will likely continue to improve, providing even more options for developers in the future.",
      contributor: "Jon H",
      tag1: "Create-React-App",
      tag2: "Vite",
      tag3: "React",
      tag4: "Web Development",
      url: "https://medium.com/@randularj97/comparing-create-react-app-and-vite-react-app-advantages-disadvantages-performance-and-63193ea4cd14",
    },
    {
      type: "Course",
      duration: "7 min",
      title: "The Interactive Guide to Rendering in React",
      level: "Advanced Level",
      preview:
        "React, in its purest form, is a library for building user interfaces.",
      discipline: "UX/UI Design",
      description:
        "React, in its purest form, is a library for building user interfaces. It's so simple that the entire mental model can be represented as a formula, v = f(s) – where your view is simply a function of your state. When React renders a component, two things happen. First, React creates a snapshot of your component which captures everything React needs to update the view at that particular moment in time. props, state, event handlers, and a description of the UI (based on those props and state) are all captured in this snapshot. From there, React takes that description of the UI and uses it to update the View. In order to get the starting UI for your application, React will do an initial render, starting at the root of your application. Of course, this initial render is the most uninteresting one. Without the ability to re-render, React would be mostly useless. It's how React treats all subsequent renders that's what makes it more interesting. That naturally leads us to our next question, when exactly does React re-render a component? Looking back to our v = f(s) equation, your intuition might be that f is invoked whenever s changes. That would make sense. We wouldn't want to recalculate the View unless the State had changed. In fact, it's as simple as that. When does React re-render? React will only re-render when the state of a component changes. This may be surprising, but it's true. The only thing that can trigger a re-render of a component in React is a state change. With that, we now have our final interrogative, how does React actually know when the state of a component has changed? At this point it's fairly trivial and, once again, it has to do with our snapshot. When an event handler is invoked, that event handler has access to the props and state as they were in the moment in time when the snapshot was created. From there, if the event handler contains an invocation of useState's updater function and React sees that the new state is different than the state in the snapshot, React will trigger a re-render of the component – creating a new snapshot and updating the view.",
      contributor: "Bella M",
      tag1: "React",
      tag2: "Rendering",
      tag3: "State",
      tag4: "Event Handler",
      url: "https://ui.dev/why-react-renders",
    },
  ];

  try {
    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];

    const docRef = await addDoc(collection(database, "Resources"), {
      userID: userId,
      title: resources[resourceNumber - 1].title,
      duration: resources[resourceNumber - 1].duration,
      firstName: name,
      lastName: last,
      type: types[Math.floor(Math.random() * types.length)],
      discipline: resources[resourceNumber - 1].discipline,
      // discipline: disciplines[Math.floor(Math.random() * disciplines.length)],
      level: resources[resourceNumber - 1].level,
      preview: resources[resourceNumber - 1].preview,
      estDuration: Math.floor(Math.random() * 11),
      description: resources[resourceNumber - 1].description,
      url: resources[resourceNumber - 1].url,
      file: {
        name: "baseObject",
        description: "Little Description about the File",
      },
      tag1: resources[resourceNumber - 1].tag1,
      tag2: resources[resourceNumber - 1].tag2,
      tag3: resources[resourceNumber - 1].tag3,
      tag4: resources[resourceNumber - 1].tag4,
      upvote: Math.floor(Math.random() * 5000),
      downvote: Math.floor(Math.random() * 1500),
      likedByUser: [],
    });

    const id = docRef.id;

    await updateDoc(doc(database, "Resources", id), {
      resourceID: id,
    });
    console.log("Resources for User ID " + userId + " created");
    return id;
  } catch (error) {
    console.error(error);
  }
}

async function addComments(userId, resourceId) {
  const firstNames = ["Virgilio", "Christian", "Taylor", "Jason", "Rachell"];
  const lastNames = ["Macero", "OCampo", "Allen", "Matos", "Borgonovo"];

  try {
    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    const docRef = await addDoc(collection(database, "Comments"), {
      userID: userId,
      firstName: name,
      lastName: last,
      resourceID: resourceId,
      createdAt: Timestamp.fromDate(new Date()),
      content: "Small or large Message about the resources and all about it",
      likes: Math.floor(Math.random() * 5000),
      likedByUser: [],
    });

    const id = docRef.id;

    await updateDoc(doc(database, "Comments", id), {
      commentID: id,
    });

    console.log("Comments for User ID " + userId + " created");
  } catch (error) {
    console.error(error);
  }
}

async function addReward(userId) {
  try {
    const docRef = await addDoc(collection(database, "Rewards"), {
      rewardName: "Reward Generic Name",
      description: "Description about the reward and all that contains",
      pointsRequired: Math.floor(Math.random() * 40),
    });

    const id = docRef.id;

    await updateDoc(doc(database, "Rewards", id), {
      rewardID: id,
    });

    console.log("Reward for User ID " + userId + " created");
    return id;
  } catch (error) {
    console.error(error);
  }
}

async function addRedemption(userId, rewardId) {
  try {
    const docRef = await addDoc(collection(database, "Redemptions"), {
      userID: userId,
      rewardID: rewardId,
      redemptionDate: Timestamp.fromDate(getRandomDate(2023, 2024)),
      pointsRedeemed: Math.floor(Math.random() * 20),
    });

    const id = docRef.id;

    await updateDoc(doc(database, "Redemptions", id), {
      redemptionID: id,
    });

    console.log("Redemption for User ID " + userId + " created");
  } catch (error) {
    console.error(error);
  }
}

async function addBookmarkedResources(userId, resourceId) {
  try {
    const docRef = await addDoc(collection(database, "Bookmarked_Resources"), {
      userId: userId,
      resourceID: resourceId,
      createdAt: Timestamp.fromDate(new Date()),
    });

    const id = docRef.id;

    await updateDoc(doc(database, "Bookmarked_Resources", id), {
      bookmarkID: id,
    });

    console.log("Bookmarked_Resources for User ID " + userId + " created");
  } catch (error) {
    console.error(error);
  }
}
