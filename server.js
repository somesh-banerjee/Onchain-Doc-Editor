var express = require("express");
var socket = require("socket.io");
const path = require("path");
const port = process.env.PORT || 8080;
const Document = require("./Document");
const mongoose = require("mongoose");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __myPath = path.resolve();

app.use(express.static(path.join(__myPath, "/client/build")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__myPath, "client", "build", "index.html"))
);

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

mongoose.connect("mongodb://localhost:27017/docs-dapp", {
  // useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  // useCreateIndex: true,
});

const io = require("socket.io")(3001, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ["GET", "POST"],
  },
});

io.sockets.on("connection", connection);

const defaultValue = "";

function connection(socket) {
  socket.on("get-document", async (documentId) => {
    // console.log("Connected");
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
}

async function findOrCreateDocument(id) {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}
