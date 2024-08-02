import { database } from "../config/firebase.js";
import {
  addDoc,
  collection,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

for (let i = 1; i < 11; i++) {
  const id = await addUser(i);

  const resourceId = await addResources(id, 1);

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

async function addUser(userNumber) {
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

  const firstNames = [];

  try {
    const docRef = await addDoc(collection(database, "Users"), {
      firstName: "User" + userNumber,
      lastName: "Last Name N#" + userNumber,
      email: "User" + userNumber + "@email.com",
      location: "USA, " + state.name + ", " + state.abbreviation,
      experience: Math.floor(Math.random() * 10),
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
  const types = ["file", "URL", "Image"];
  const disciplines = ["Frontend Developer", "Designer", "Backend Developer"];
  const skillLevels = [
    "Beginner Level",
    "Intermediate Level",
    "Advanced Level",
  ];

  try {
    const docRef = await addDoc(collection(database, "Resources"), {
      userID: userId,
      title: "Resource uploaded N#" + resourceNumber,
      type: types[Math.floor(Math.random() * types.length)],
      discipline: disciplines[Math.floor(Math.random() * disciplines.length)],
      level: skillLevels[Math.floor(Math.random() * skillLevels.length)],
      estDuration: Math.floor(Math.random() * 11),
      description: "A simple description for a resource about an experience",
      url: "http://www.google.com",
      file: {
        name: "baseObject",
        description: "Little Description about the File",
      },
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
  try {
    const docRef = await addDoc(collection(database, "Comments"), {
      userID: userId,
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
