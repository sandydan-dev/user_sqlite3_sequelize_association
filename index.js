const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const { sequelize } = require("./lib/index");
const track = require("./models/track.model.js");
const user = require("./models/user.models");
const like = require("./models/like.model");
const trackData = [
  {
    name: "Raabta",
    genre: "Romantic",
    release_year: 2012,
    artist: "Arijit Singh",
    album: "Agent Vinod",
    duration: 4,
  },
  {
    name: "Naina Da Kya Kasoor",
    genre: "Pop",
    release_year: 2018,
    artist: "Amit Trivedi",
    album: "Andhadhun",
    duration: 3,
  },
  {
    name: "Ghoomar",
    genre: "Traditional",
    release_year: 2018,
    artist: "Shreya Ghoshal",
    album: "Padmaavat",
    duration: 3,
  },
  {
    name: "Bekhayali",
    genre: "Rock",
    release_year: 2019,
    artist: "Sachet Tandon",
    album: "Kabir Singh",
    duration: 6,
  },
  {
    name: "Hawa Banke",
    genre: "Romantic",
    release_year: 2019,
    artist: "Darshan Raval",
    album: "Hawa Banke (Single)",
    duration: 3,
  },
  {
    name: "Ghungroo",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "War",
    duration: 5,
  },
  {
    name: "Makhna",
    genre: "Hip-Hop",
    release_year: 2019,
    artist: "Tanishk Bagchi",
    album: "Drive",
    duration: 3,
  },
  {
    name: "Tera Ban Jaunga",
    genre: "Romantic",
    release_year: 2019,
    artist: "Tulsi Kumar",
    album: "Kabir Singh",
    duration: 3,
  },
  {
    name: "First Class",
    genre: "Dance",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 4,
  },
  {
    name: "Kalank Title Track",
    genre: "Romantic",
    release_year: 2019,
    artist: "Arijit Singh",
    album: "Kalank",
    duration: 5,
  },
];

// middelwares
app.use(cors());
app.use(express.json());

// seeding  tracks data  🟢
app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await track.bulkCreate(trackData);
    res.status(200).json({ message: "Data Seeded Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all tracks data   🟢
// endpoint : http://localhost:3000/tracks
async function getAllTracksData() {
  let query = await track.findAll();

  if (!query) {
    return null;
  } else {
    return { tracks: query };
  }
}
app.get("/tracks", async (req, res) => {
  try {
    let response = await getAllTracksData();
    if (!response) {
      return res.status(404).json({ message: "No tracks found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add new track in database
// endpoint  :  http://localhost:3000/tracks/new
async function addNewTrack(newTrack) {
  let query = await track.create(newTrack);

  if (!query) {
    return null;
  } else {
    return { tracks: query };
  }
}
app.post("/tracks/new", async (req, res) => {
  try {
    let newTrack = req.body.newTrack;
    let response = await addNewTrack(newTrack);

    if (!response) {
      return res.status(404).json({ message: "Track not found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// track delete by id
// endpoint : http://localhost:3000/tracks/delete/11
async function deleteTrackById(id) {
  let query = await track.destroy({ where: { id: id } });
  if (!query) {
    return null;
  } else {
    return { message: "Track deleted successfully", track: query };
  }
}
app.post("/tracks/delete/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await deleteTrackById(id);
    if (!response) {
      return res.status(404).json({ message: "Track id not found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update track by id
async function updateTrackById(id, updatedBody) {
  let query = await track.findOne({ where: { id } });
  if (!query) {
    return null;
  } else {
    query.set(updatedBody);
    let result = await query.save();
    return { message: "track updated ", track: result };
  }
}
app.post("/tracks/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let updatedBody = req.body;
    let response = await updateTrackById(id, updatedBody);
    if (!response) {
      return res.status(404).json({ message: "Track id not found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all users data   🟢
// endpoint : http://localhost:3000/users
async function getAllUsersData() {
  let query = await user.findAll();
  if (!query) {
    return null;
  } else {
    return { uses: query };
  }
}
app.get("/users", async (req, res) => {
  try {
    let response = await getAllUsersData();
    if (!response) {
      return res.status(404).json({ message: "No users found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add new user  🟢
// endpoint : http://localhost:3000/users/new
async function addNewUserData(newUser) {
  let query = await user.create(newUser);
  return query;
}
app.post("/users/new", async (req, res) => {
  try {
    let newUser = req.body.newUser;
    let response = await addNewUserData(newUser);
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update user data by id  🟢
// endpoint : http://localhost:3000/users/update/1
async function updateUserDetailsById(id, updatedBody) {
  let query = await user.findOne({ where: { id } });
  if (!query) {
    return null;
  } else {
    query.set(updatedBody);
    let result = query.save();
    return { message: "user update successfully ", result };
  }
}
app.post("/users/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let updatedBody = req.body;

    let response = await updateUserDetailsById(id, updatedBody);
    if (!response) {
      return res.status(404).json({ message: "User id not found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete  user by id  🟢
// endpoint : http://localhost:3000/users/delete/1
async function deleteUsersById(id) {
  let query = await user.destroy({ where: { id } });
  return { message: "user deleted successfully", query };
}
app.post("/users/delete/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await deleteUsersById(id);
    if (!response) {
      return res.status(404).json({ message: "User id not found" });
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listening inceming requests  🟢
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
