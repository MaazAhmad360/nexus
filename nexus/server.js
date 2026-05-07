import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    if (req.method === "POST" && req.url === "/api/internal/socket") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const data = JSON.parse(body);
          // Emit the event to the specified room (which will be the username)
          io.to(data.room).emit(data.event, data.payload);
          res.writeHead(200);
          res.end("OK");
        } catch (e) {
          res.writeHead(400);
          res.end("Bad Request");
        }
      });
      return;
    }
    return handler(req, res);
  });

  console.log("HTTP", httpServer);

  // Initialize Socket.IO without a custom path
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("join", (data) => {
      console.log("JOIN CALLED", data);
      const { chatId, username } = data;
      if (chatId) socket.join(chatId);
      if (username) socket.join(username);
      console.log("User joined chat/global room:", chatId, username);
    });

    socket.on("sendMessage", (data) => {
      console.log("SNED", data);
      const { chatId, message, username, sender } = data;
      io.to(chatId).emit("receiveMessage", {
        chatId,
        username,
        message,
        sender,
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Start the server and handle requests
  httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
