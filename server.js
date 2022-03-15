import app from "./app.js"

const PORT = process.env.PORT || 5000;
console.log("here")

app.listen( PORT, () => {
 
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
}
);
